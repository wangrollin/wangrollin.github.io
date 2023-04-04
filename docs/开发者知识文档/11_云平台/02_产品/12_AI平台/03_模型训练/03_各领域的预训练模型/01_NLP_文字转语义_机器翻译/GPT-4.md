
Generative Pre-trained Transformer

- chatGPT
- GPT-4
使用了 RLHF


- [chatgpt plugins](https://openai.com/blog/chatgpt-plugins)

ChatGPT 向开发者开放了 Plugin API（需要申请 Waiting list），并且官方也同时发布了 web browser 和 code interpreter 两个插件，前者让 ChatGPT 可以及时访问互联网回答训练数据中没有的问题，后者可以直接在 ChatGPT UI 中执行代码。开发 ChatGPT Plugin 也非常简单，只需要提供一个 ai-plugin.json, API endpoint, 和 OpenAPI 描述文件即可，官方文档提供了非常详细的示例。