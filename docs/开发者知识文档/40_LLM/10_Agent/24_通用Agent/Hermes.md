

## 出圈原因

独有的内置学习循环，智能体实现 “自我进化”

这是 Hermes Agent 最具辨识度的核心技术，区别于传统智能体 “被动执行指令” 的模式，它能从经验中自主创建skill，在使用过程中持续优化skill效果；还会主动触发知识持久化，通过 FTS5 会话搜索和 LLM 总结实现跨会话记忆召回，甚至能构建深度用户模型，越用它越懂你、越用它越聪明，再也不用反复教同样的东西。

## 常用网页

- [github](https://github.com/nousresearch/hermes-agent)
- [官网](https://hermes-agent.nousresearch.com/)
- [官方文档](https://hermes-agent.nousresearch.com/docs)
- [知乎介绍](https://zhuanlan.zhihu.com/p/2024913544848623338)
- []()

## 常用命令

```bash
hermes                  # 进入交互式 CLI，开始对话
hermes setup        # 运行完整设置向导（一次性配置所有内容）
hermes model        # 选择 LLM 提供商和模型
hermes tools        # 配置要启用的工具
hermes config set    # 设置单个配置项
hermes gateway       # 启动消息网关（支持 Telegram、Discord 等）
hermes claw migrate    # 从 OpenClaw 迁移数据（如果之前在使用 OpenClaw）
hermes update       # 更新到最新版本
hermes doctor       # 诊断并排查问题
```

## 本地启动

- [docker方法](https://hermes-agent.nousresearch.com/docs/user-guide/docker)

```bash
# 第一次启动
mkdir -p ~/.hermes
docker run -it --rm \
  -v ~/.hermes:/opt/data \
  nousresearch/hermes-agent setup

# 模型上下文设置为1M:
hermes config set model.context_length 1000000
hermes config set model.context_length 128000

# 网关配置
docker run -it --rm \
  -v ~/.hermes:/opt/data \
  nousresearch/hermes-agent gateway setup

# 网关模式
docker run -d \
  --name hermes \
  --restart unless-stopped \
  -v ~/.hermes:/opt/data \
  nousresearch/hermes-agent gateway run

# CLI方式
docker run -it --rm \
  -v ~/.hermes:/opt/data \
  nousresearch/hermes-agent

```