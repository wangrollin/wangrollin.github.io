
boxlite-ai 是一个组织（Organization），做的是「给 AI agent 用的微虚拟机（micro-VM）沙箱」。定位是 "The AI agent infrastructure company"。

核心项目是 boxlite-ai/boxlite（★2536，Apache-2.0，Rust/TypeScript，2025-12 建仓，活跃更新）：

它是什么

一句话：一个可嵌入的、无 daemon 的 micro-VM 运行时，用来安全地跑 AI agent 生成的代码，自比 "sandbox 界的 SQLite"。

- 每个 Box 是一个硬件隔离的 micro-VM（KVM / macOS Hypervisor.framework），能原样跑任意 OCI/Docker 镜像（python:slim、node:alpine…）
- 比容器隔离强（有自己的 kernel），比完整 VM 轻；无 root、无后台服务，直接当库嵌入应用
- Box 是持久化的：agent 装的包、写的文件跨多轮对话保留，不用每次冷启动
- 网络可控：allow_net 出站白名单、密钥占位符注入（真实密钥不进 VM）
- 从笔记本一路到多租户云，同一个 engine
