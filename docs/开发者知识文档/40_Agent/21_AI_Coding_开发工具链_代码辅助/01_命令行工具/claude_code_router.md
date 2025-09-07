
## 官网

- [github](https://github.com/musistudio/claude-code-router)
- [github 中文介绍](https://github.com/musistudio/claude-code-router/blob/main/README_zh.md)


## 安装

npm install -g @musistudio/claude-code-router

vim ~/.claude-code-router/config.json

```json
{
"LOG": false,
"OPENAI_API_KEY": "",
"OPENAI_BASE_URL": "",
"OPENAI_MODEL": "",
"Providers": [
    {
      "name": "bytedance-ark",
      "api_base_url": "https://ark-cn-beijing.bytedance.net/api/v3/chat/completions",
      "api_key": "{Your API Key}",
      "models": [
        "{Your Model Name}"
      ]
    }
  ],
"Router": {
    "default": "ark,{Your Model Name}",
    "think": "ark,{Your Model Name}",
    "background": "ark,{Your Model Name}",
    "longContext": "ark,{Your Model Name}"
  }
}
```

## 常用命令

ccr restart
ccr code
ccr ui

