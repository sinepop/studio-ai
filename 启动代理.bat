@echo off
title CORS Proxy :8787
cd /d "%~dp0"
echo 启动代理中...
node proxy.mjs
pause
