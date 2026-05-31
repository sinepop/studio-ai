import http from "http";
import https from "https";
import { URL } from "url";

const PORT = 8787;

const server = http.createServer(async (req, res) => {
  // CORS preflight
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "*");
  if (req.method === "OPTIONS") { res.writeHead(204); res.end(); return; }

  // POST /proxy { url, method, headers, body }
  if (req.method === "POST" && req.url === "/proxy") {
    let data = "";
    for await (const chunk of req) data += chunk;
    try {
      const { url, method = "GET", headers = {}, body } = JSON.parse(data);
      const u = new URL(url);
      const mod = u.protocol === "https:" ? https : http;
      const proxyReq = mod.request(u, { method, headers }, proxyRes => {
        res.writeHead(proxyRes.statusCode, {
          ...proxyRes.headers,
          "Access-Control-Allow-Origin": "*",
        });
        proxyRes.pipe(res);
      });
      proxyReq.on("error", e => {
        res.writeHead(502);
        res.end(JSON.stringify({ error: e.message }));
      });
      if (body) proxyReq.write(typeof body === "string" ? body : JSON.stringify(body));
      proxyReq.end();
    } catch (e) {
      res.writeHead(400);
      res.end(JSON.stringify({ error: e.message }));
    }
    return;
  }

  // GET / (health check)
  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("CORS proxy running on :8787");
    return;
  }

  res.writeHead(404);
  res.end("Not found");
});

server.listen(PORT, () => {
  console.log(`CORS proxy → http://127.0.0.1:${PORT}`);
  console.log(`  Studio AI 代理地址填: http://127.0.0.1:${PORT}`);
});
