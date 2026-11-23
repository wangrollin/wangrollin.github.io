
## 官网

- [github](https://github.com/musistudio/claude-code-router)
- [github 中文介绍](https://github.com/musistudio/claude-code-router/blob/main/README_zh.md)

## 机制

claude-code-router：核心机制与优势

值得庆幸的是，Anthropic 为 Claude Code 提供了自定义 API 的功能。这意味着您可以配置 Claude Code 调用任何兼容 Anthropic API 格式的第三方模型，从而实现更灵活和经济的使用。

开源项目 claude-code-router 正是利用了这一特性。它充当了一个中间层，能够将 Claude Code 发出的 Anthropic API 请求格式转换为 OpenAI API 的格式，然后转发给任何兼容 OpenAI API 接口的模型（例如 OpenRouter、Google Gemini deepseek 等），并将模型的响应再转换回 Anthropic 格式返回给 Claude Code。

## 安装

npm install -g @musistudio/claude-code-router

vim ~/.claude-code-router/config.json

```json
{
    "LOG": false,
    "OPENAI_API_KEY": "",
    "OPENAI_BASE_URL": "",
    "OPENAI_MODEL": "",
    "Providers": [
        {
            "name": "aliyun",
            "api_base_url": "https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions",
            "api_key": "sk-xxxxxx",
            "models": [
                "deepseek-v3",
                "deepseek-r1-0528"
            ],
            "transformer": {
                "use": ["deepseek"]
            }
        }
    ],
    "Router": {
        "default": "aliyun,deepseek-v3",
        "think": "aliyun,deepseek-v3",
        "background": "aliyun,deepseek-v3",
        "longContext": "aliyun,deepseek-v3"
    }
}
```

## 常用命令

ccr restart
ccr code
ccr ui

