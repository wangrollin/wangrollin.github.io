
dlv
go test -race
go tool pprof
go tool trace
GODEBUG=...

其中 dlv，也就是 Delve，是 Go 最常用的源码级调试器。

## 工具链介绍

Go 工具链可以按“狭义内置工具”和“广义生态工具”来看。

狭义上，Go 自带的核心入口是 `go` 命令，常用子命令包括：

- `go build`：编译包和依赖
- `go run`：编译并运行程序
- `go test`：运行测试、基准测试、覆盖率、race 检查等
- `go install`：编译并安装命令
- `go mod`：管理 `go.mod`、依赖、版本
- `go work`：管理多模块 workspace
- `go get`：添加或调整依赖
- `go list`：查询包、模块信息
- `go env`：查看 Go 环境变量
- `go fmt` / `gofmt`：格式化代码
- `go vet`：静态检查常见错误
- `go doc`：查看文档
- `go generate`：执行代码生成指令
- `go clean`：清理构建缓存
- `go tool`：调用底层工具

你本机 `go tool` 当前列出的底层工具是：

```text
asm
cgo
compile
cover
link
preprofile
vet
```

它们大致对应：

- `compile`：Go 编译器
- `asm`：汇编器
- `link`：链接器
- `cgo`：Go 和 C 互操作
- `cover`：测试覆盖率相关
- `vet`：静态检查底层实现
- `preprofile`：profile 相关预处理工具

广义上，Go 开发常用但不一定随 Go 本体一起安装的工具还有：

- `gopls`：Go 语言服务器，编辑器补全、跳转、诊断
- `staticcheck`：更强的静态分析
- `golangci-lint`：聚合型 lint 工具
- `govulncheck`：漏洞检查
- `dlv` / Delve：Go 调试器
- `mockgen` / `moq`：生成 mock
- `protoc-gen-go`：Protocol Buffers Go 代码生成
- `protoc-gen-go-grpc`：gRPC Go 代码生成
- `air` / `reflex`：开发时热重载

一句话概括：日常开发主要围绕 `go build`、`go test`、`go mod`、`gofmt`、`go vet`；底层编译链是 `compile`、`asm`、`link`、`cgo`；工程化会再配 `gopls`、`golangci-lint`、`govulncheck`、`dlv` 这些生态工具。