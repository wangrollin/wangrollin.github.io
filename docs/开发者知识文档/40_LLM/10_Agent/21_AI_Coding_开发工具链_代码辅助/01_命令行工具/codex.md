

## Q&A

### 恢复会话


**交互式**
codex openai --profile key2026 -- resume --all

**精准**
!echo $CODEX_THREAD_ID 
codex openai --profile key2026 -- resume 019e2965-c514-7933-xxxx-0fc5cd097353

### /goal

**开启**
codex features enable goals

**常见用法**
/goal：查看当前目标
/goal finish rfcs：设置目标为“finish rfcs”
/goal pause：暂停当前目标
/goal resume：恢复暂停的目标
/goal clear：清掉当前目标

**用法**
/goal
docs/rfcs/xxxx-v2-rfc.md 落地并实施这个 rfc
对于比较复杂和需要状态跟踪的任务，需要拆分出 implement plan 并 review 多轮
每一次开发完成都需要进行一轮彻底的 review

**解释**
/goal finish rfcs 是 Codex TUI 里的“长期目标”命令。

含义大概是：把当前 thread 的目标设置成 finish rfcs，让 Codex 后续围绕这个目标持续推进。这里的 finish 不是特殊子命令，只是目标文本的一部分。

它不是 shell 命令，也不会立刻执行某个固定动作；更像给当前会话挂一个持久任务目标。Codex 可能会在多轮里继续推进，直到目标完成、暂停、清除或达到预算限制。



### alias codex='codex --dangerously-bypass-approvals-and-sandbox'


### codex --sandbox workspace-write --ask-for-approval on-request

  --sandbox workspace-write 控制 Codex 能在本机做什么。

  它的意思是：Codex 可以在当前工作区内读文件、改文件、运行常规本地命令，例如 rg、测试、lint、构建等；但它不能默认随便改工作区外的文件，也不是全机器权限。OpenAI 文档把它描述为本地开发的低摩擦默认模式：能在 workspace 边界内自主工作。参考：
  Sandboxing (https://developers.openai.com/codex/concepts/sandboxing)、CLI reference (https://developers.openai.com/codex/cli/reference)。

  --ask-for-approval on-request 控制 Codex 什么时候停下来问你。

  它的意思是：Codex 在 sandbox 允许范围内会直接执行；如果它需要越界，例如写工作区外目录、请求网络访问、运行需要更高权限的命令，或者做配置认为需要确认的事，就会弹出 approval 请求，让你批准或拒绝。它不是“每个命令都问”，也不是“永远不问”。

  组合起来的效果是：

  工作区内：Codex 可以比较顺畅地读、改、测、跑命令
  工作区外/高风险：Codex 必须先问你

  这就是为什么它适合日常开发。比如：

  codex --sandbox workspace-write --ask-for-approval on-request
  codex exec --sandbox workspace-write --ask-for-approval on-request "修复失败测试并运行验证"

  和其他模式对比：

  - --sandbox read-only：更保守，主要适合让 Codex 看代码、分析问题；编辑和很多命令会需要批准。
  - --sandbox danger-full-access：无沙箱边界，Codex 能访问更多本机资源，风险明显更高。
  - --ask-for-approval untrusted：对不在可信集合里的命令更频繁地询问。
  - --ask-for-approval never：不弹 approval，适合非交互自动化，但如果任务需要越权，通常会直接受限或失败。
  - --dangerously-bypass-approvals-and-sandbox / --yolo：同时绕过 approval 和 sandbox，只应在隔离 VM/临时环境里用。

  如果你想把它设成默认值，可以写进 ~/.codex/config.toml：

  sandbox_mode = "workspace-write"
  approval_policy = "on-request"

  一句话总结：workspace-write 给 Codex 一个可工作的项目边界，on-request 让它在要越界时先问你。这是本地编码最实用的安全/效率平衡。
