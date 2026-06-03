export const CHAT_PROVIDERS = [
  { id: 'claude', name: 'Claude', defaultUrl: 'https://api.anthropic.com', format: 'anthropic', defaultModel: 'claude-sonnet-4-6' },
  { id: 'openai', name: 'OpenAI GPT', defaultUrl: 'https://api.openai.com', format: 'openai', defaultModel: 'gpt-5.1' },
  { id: 'gemini', name: 'Gemini', defaultUrl: 'https://generativelanguage.googleapis.com', format: 'gemini', defaultModel: 'gemini-2.5-pro' },
  { id: 'deepseek', name: 'DeepSeek', defaultUrl: 'https://api.deepseek.com', format: 'openai', defaultModel: 'deepseek-v4-pro' },
  { id: 'qwen', name: 'Qwen / 通义千问', defaultUrl: 'https://dashscope.aliyuncs.com/compatible-mode', format: 'openai', defaultModel: 'qwen-plus-latest' },
  { id: 'kimi', name: 'Kimi / Moonshot', defaultUrl: 'https://api.moonshot.cn', format: 'openai', defaultModel: 'kimi-k2-0711-preview' },
  { id: 'doubao', name: 'Doubao / 火山方舟', defaultUrl: 'https://ark.cn-beijing.volces.com/api/v3', format: 'openai', defaultModel: 'doubao-seed-1-6-250615' },
  { id: 'zhipu', name: 'GLM / 智谱', defaultUrl: 'https://open.bigmodel.cn/api/paas/v4', format: 'openai', defaultModel: 'glm-4.6' },
  { id: 'openrouter', name: 'OpenRouter', defaultUrl: 'https://openrouter.ai/api', format: 'openai', defaultModel: 'openai/gpt-5.1' }
]
