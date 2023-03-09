
调度集群资源

探索：docker on yarn

## 组件

Yarn Node Labels

### RM（ResourceManager）

负责所有资源的监控、分配和管理

### NM（NodeManager）

负责每一个节点的维护

### AM（ApplicationMaster）

负责每一个具体应用程序的调度和协调

## 流程

- client向RM提交应用程序，其中包括启动该应用的ApplicationMaster的必须信息，例如ApplicationMaster程序、启动ApplicationMaster的命令、用户程序等。
- ResourceManager启动一个container用于运行ApplicationMaster。
- 启动中的ApplicationMaster向ResourceManager注册自己，启动成功后与RM保持心跳。
- ApplicationMaster向ResourceManager发送请求，申请相应数目的container。
- ResourceManager返回ApplicationMaster的申请的containers信息。申请成功的container，由ApplicationMaster进行初始化。container的启动信息初始化后，AM与对应的NodeManager通信，要求NM启动container。AM与NM保持心跳，从而对NM上运行的任务进行监控和管理。
- container运行期间，ApplicationMaster对container进行监控。container通过RPC协议向对应的AM汇报自己的进度和状态等信息。
- 应用运行期间，client直接与AM通信获取应用的状态、进度更新等信息。
- 应用运行结束后，ApplicationMaster向ResourceManager注销自己，并允许属于它的container被收回。


## resource profile

定义一个 resource 组合，比如 middle = 4c + 16g

