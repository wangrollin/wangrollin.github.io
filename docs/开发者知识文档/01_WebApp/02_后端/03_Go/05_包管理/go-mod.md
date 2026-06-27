
##  go mod tidy


## 源码级别依赖

没有中心二进制仓库，分发的是代码+版本+hash

拉取代码 -> 本地编译 -> 本地编译缓存 -> 和 go runtime 打包成一个独立的binary

## goproxy

  默认通过 GOPROXY 下载时，你的 go 命令访问的是 module proxy 的 HTTP 接口，不是直接访问 Git 仓库。

  但默认 GOPROXY 末尾通常带 direct，所以当 proxy 没有该模块、模块是私有的、或配置要求绕过 proxy 时，Go 还是可能直接访问 Git 仓库。

可以这么理解：`GOPROXY` 基本上就是 **Go 模块级别的代码缓存服务器**。

但更精确地说，它不是“Git 仓库缓存服务器”，而是 **Go module artifact 缓存服务器**。

它缓存和提供的是 Go 模块协议里的这些产物：

```text
<module>/@v/list
<module>/@v/<version>.info
<module>/@v/<version>.mod
<module>/@v/<version>.zip
```

例如：

```text
github.com/gin-gonic/gin/@v/v1.10.0.zip
github.com/gin-gonic/gin/@v/v1.10.0.mod
github.com/gin-gonic/gin/@v/v1.10.0.info
```

所以它缓存的是：

- 某个模块版本的源码 zip
- 该版本的 `go.mod`
- 该版本的元信息
- 可用版本列表

它通常不是缓存整个 Git 仓库，也不一定保存 `.git` 历史、branches、tags 的完整对象数据库。Go 客户端也不会通过它执行 `git clone`，而是通过 HTTP 下载标准化后的 module 文件。

可以类比成：

```text
Git 仓库:
  github.com/foo/bar.git
  branches / tags / commits / history

Go proxy:
  module foo/bar
  versions: v1.0.0, v1.1.0
  artifacts: .mod, .info, .zip
```

一个典型流程是：

```text
go get github.com/foo/bar@v1.2.3
        |
        v
GOPROXY
        |
        | 如果 proxy 已缓存
        v
直接返回 .mod / .zip / .info

        |
        | 如果 proxy 未缓存
        v
proxy 服务端可能去上游 Git 仓库拉取
        |
        v
生成并缓存 Go module artifact
        |
        v
返回给你的 go 命令
```

所以结论是：

```text
可以把 GOPROXY 理解成 Go 模块的代码缓存服务器，
但它缓存的是 module 版本产物，不是完整 Git 仓库。
```

这也是为什么 `GOPROXY` 可以提升下载速度、减少对 GitHub/GitLab 的依赖，并让构建更稳定。

## Go mod 和 Git 的关系

可以理解为：

`go.mod` 记录“这个项目依赖哪些模块、用哪个版本”；Git 通常是这些模块源码的版本来源。

Go 本身不要求模块一定来自 Git，但现实中大多数 Go module 都托管在 GitHub、GitLab、自建 Git 仓库等 Git 仓库里。

**核心关系**

- `go.mod` 里的版本通常对应 Git tag
- `go.mod` 里的伪版本对应 Git commit
- `go.sum` 记录模块内容的校验和，保证下载到的源码没变
- `go` 命令默认通过 `GOPROXY` 下载模块，不一定直接访问 Git
- 如果绕过 proxy，Go 会根据 module path 去找背后的 VCS 仓库，常见就是 Git

例如：

```go
require github.com/gin-gonic/gin v1.10.0
```

通常对应 Git 仓库：

```text
https://github.com/gin-gonic/gin
```

以及 Git tag：

```text
v1.10.0
```

你可以这样找到代码版本：

```bash
git clone https://github.com/gin-gonic/gin
cd gin
git checkout v1.10.0
```

---

**如果是普通语义化版本**

`go.mod`：

```go
require github.com/foo/bar v1.2.3
```

对应 Git 里通常是 tag：

```bash
git checkout v1.2.3
```

也可以查看：

```bash
git show v1.2.3
```

---

**如果是伪版本**

`go.mod` 里可能看到：

```go
require github.com/foo/bar v0.0.0-20240510123456-abcdef123456
```

这个版本由三部分组成：

```text
v0.0.0-20240510123456-abcdef123456
        时间戳            commit 前缀
```

其中 `abcdef123456` 是 Git commit hash 的前缀。

可以这样找代码：

```bash
git clone https://github.com/foo/bar
cd bar
git checkout abcdef123456
```

如果前缀不够唯一，可以用：

```bash
git log --all --oneline | grep abcdef123456
```

---

**查看当前项目实际用了哪个模块版本**

在项目目录里：

```bash
go list -m all
```

查某个模块：

```bash
go list -m github.com/gin-gonic/gin
```

输出类似：

```text
github.com/gin-gonic/gin v1.10.0
```

更详细：

```bash
go list -m -json github.com/gin-gonic/gin
```

如果已经下载，会看到类似：

```json
{
  "Path": "github.com/gin-gonic/gin",
  "Version": "v1.10.0",
  "Dir": "/Users/xxx/go/pkg/mod/github.com/gin-gonic/gin@v1.10.0"
}
```

---

**查看 Go 下载到本地的源码**

```bash
go env GOMODCACHE
```

通常是：

```text
$GOPATH/pkg/mod
```

也可以直接让 Go 告诉你模块源码在哪：

```bash
go mod download -json github.com/gin-gonic/gin@v1.10.0
```

里面的 `Dir` 就是本地缓存源码路径。

---

**注意 replace**

`go.mod` 里如果有：

```go
replace github.com/foo/bar => ../bar
```

那就不是用远程 Git 版本了，而是用本地目录 `../bar`。

如果是：

```go
replace github.com/foo/bar => github.com/myfork/bar v1.2.3
```

那实际代码来自 `github.com/myfork/bar` 的 `v1.2.3`，不是原来的仓库。

所以找版本时一定要先看有没有 `replace`。

---

**多模块仓库的 tag 规则**

如果一个 Git 仓库下面有子目录模块，例如：

```text
github.com/org/repo/submodule
```

那么 tag 可能不是：

```text
v1.2.3
```

而是：

```text
submodule/v1.2.3
```

例如：

```bash
git checkout submodule/v1.2.3
```

---

**v2 及以上版本**

Go module 的大版本从 `v2` 开始，module path 通常要带 `/v2`：

```go
require github.com/foo/bar/v2 v2.3.0
```

对应 Git tag：

```bash
git checkout v2.3.0
```

源码里的 `go.mod` 通常是：

```go
module github.com/foo/bar/v2
```

---

一句话总结：

`go.mod` 记录模块版本；普通版本一般对应 Git tag；伪版本对应 Git commit；用 `go list -m -json` 或 `go mod download -json` 可以确认 Go 实际下载和使用的是哪份代码。

## go mod是如何处理依赖传递和依赖冲突的

Go Modules 的核心规则是：先构建完整依赖图，再用 MVS（Minimal Version Selection，最小版本选择）选出每个模块路径的一个版本。

**依赖传递**

假设你的项目依赖：

```text
main
 ├─ A v1.0.0
 │   └─ C v1.2.0
 └─ B v1.0.0
     └─ D v1.3.0
```

你只需要在 `go.mod` 里直接声明 `A` 和 `B`。`C`、`D` 会通过依赖图传递引入。

`go.mod` 里可能出现：

```go
require (
    example.com/a v1.0.0
    example.com/b v1.0.0
    example.com/c v1.2.0 // indirect
)
```

`// indirect` 表示这个模块不是你的代码直接 import 的，而是被依赖传递进来的。它不代表“不重要”，只是说明来源不同。

常用命令：

```bash
go mod tidy      # 清理无用依赖，补齐缺失依赖
go mod graph     # 查看完整依赖图
go list -m all   # 查看最终选中的模块版本
go mod why -m X  # 解释为什么需要某个模块
```

**依赖冲突**

Go Modules 不像 npm、Maven 那样做复杂的约束求解。它使用 MVS：对同一个 module path，只选择一个版本，并且选择所有依赖要求中的最高版本。

例如：

```text
main
 ├─ A v1.0.0 -> C v1.2.0
 └─ B v1.0.0 -> C v1.5.0
```

最终会选：

```text
C v1.5.0
```

因为 `v1.5.0` 满足 `A` 对 `C v1.2.0` 的最低要求，也满足 `B` 对 `C v1.5.0` 的要求。

这里的“最小版本选择”意思是：在满足所有最低版本要求的前提下，选择最小的那个可行版本。由于多个要求里最高的最低版本就是可行解，所以最终表现为“选最高 require 版本”。

**同一个模块不能同时存在多个 v0/v1 版本**

如果两个依赖都依赖 `example.com/c`，一个要 `v1.2.0`，一个要 `v1.5.0`，最终只会有一个：

```text
example.com/c v1.5.0
```

不会同时出现：

```text
example.com/c v1.2.0
example.com/c v1.5.0
```

这降低了运行时和编译时的复杂度，但也意味着如果 `v1.5.0` 破坏了兼容性，Go 不会自动帮你解决，编译可能失败。

**v2+ 通过 import path 隔离**

Go Modules 对主版本号 `v2` 及以上有特殊规则：模块路径必须带主版本后缀。

例如：

```go
import "example.com/lib"
import "example.com/lib/v2"
```

它们是两个不同的 module path，因此可以共存：

```text
example.com/lib v1.9.0
example.com/lib/v2 v2.3.0
```

这就是 Go 处理大版本不兼容的主要方式。

**如果真的冲突怎么办**

常见处理方式：

```go
replace example.com/c => example.com/c v1.4.0
```

或替换成本地目录：

```go
replace example.com/c => ../local-c
```

也可以排除某个坏版本：

```go
exclude example.com/c v1.5.0
```

不过 `replace` 和 `exclude` 只对当前主模块生效，不会传递给依赖你的其他项目。

**一句话总结**

Go Modules 会自动拉取传递依赖；同一个模块路径只保留一个版本；版本冲突时用 MVS 选择满足所有最低要求的最高版本；不兼容的大版本通过 `/v2`、`/v3` 这样的模块路径隔离；如果选出的版本有问题，需要用升级、降级、`replace`、`exclude` 或修代码来处理。