
## 常用网页

- [rust安装](https://rust-lang.org/tools/install/)

## 常用命令

```bash
# 安装
xcode-select --install
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# 查看
rustup toolchain list
rustc --version
cargo --version
rustup --version

# 更新
rustup update

# 卸载
rustup self uninstall
```

## 语法

### 智能指针

  常见智能指针对比：

  Box<T>        独占所有权，数据放堆上
  Rc<T>         单线程引用计数共享
  Arc<T>        多线程引用计数共享
  RefCell<T>    单线程内部可变性，运行时借用检查
  Mutex<T>      多线程内部可变性，加锁
  Cow<T>        写时克隆，能借用就借用，需要修改才复制

  一句话总结：

  智能指针解决的是“普通引用太简单，不足以表达复杂内存管理和所有权关系”的问题。

### 生态

命令行参数常见 `clap`
序列化常见 `serde`

http web框架 `axum`
GRPC框架 `tonic`
protobuf 框架 `prost` `prost-types`
HTTP 客户端常见 `reqwest`
sql访问 `sqlx`
Rust 的统一存储访问层 `opendal`

异步运行时常见 `tokio`
网络中间件 `tower`


### ！！！
### ！！！
### ！！！

## toolchain

Rust toolchain 一般指一整套用于编译、构建、测试和管理 Rust 项目的工具集合，不只是 Rust 编译器本身。

  通常包括：

  - rustc：Rust 编译器，把 .rs 源码编译成二进制或库。
  - cargo：Rust 的包管理器和构建工具，用来 build、run、test、管理依赖等。
  - rust-std：标准库，针对不同目标平台会有不同版本。
  - rustup：工具链管理器，用来安装、切换 Rust 版本和目标平台。
  - clippy：Rust linter，用来发现潜在问题和改进代码风格。
  - rustfmt：代码格式化工具。
  - 目标平台相关组件：比如 x86_64-unknown-linux-gnu、aarch64-apple-darwin、wasm32-unknown-unknown 等 target 的支持。

  比如你执行：

  rustup toolchain list

  可能会看到：

  stable-aarch64-apple-darwin
  nightly-aarch64-apple-darwin

  这里的 stable、nightly 就是不同的 Rust toolchain channel。

  常见说法：

  rustup default stable

  意思是把默认 Rust 工具链设为稳定版。

  rustup override set nightly

  意思是在当前项目目录下使用 nightly 工具链。

  所以简单理解：

  > Rust toolchain = 某个版本/渠道的 Rust 编译器 + Cargo + 标准库 + 相关开发组件。

  在日常开发里，说“安装 Rust toolchain”通常就是指通过 rustup 安装完整 Rust 开发环境。

## crate

Rust 里的 crate 可以理解为“一份可被 Rust 编译器编译的代码单元”，也是 Rust 代码复用和发布的基本单位。

  常见理解：

  - crate 是 Rust 的编译单元。
  - 一个 crate 可以生成：
      - 可执行程序，叫 binary crate
      - 库，叫 library crate
  - 别人发布到 crates.io 上的 Rust 库，也通常被称为 crate。
  - Cargo.toml 里声明的依赖，比如：

  [dependencies]
  serde = "1"

  这里的 serde 就是一个 crate。

  和几个概念的关系：

  package
    └── crate
          └── modules

  更具体一点：

  - package：Cargo 管理的项目，通常有一个 Cargo.toml
  - crate：实际被编译的目标，可以是库或可执行程序
  - module：crate 内部组织代码的方式，比如 mod user;

  例如创建一个项目：

  cargo new hello

  它默认会创建一个 binary crate，因为里面有：

  src/main.rs

  如果是库项目：

  cargo new mylib --lib

  它会创建一个 library crate，入口是：

  src/lib.rs

  简单类比：

  - Python 的 package/library
  - JavaScript/npm 的 package
  - Go 的 module/package

  但在 Rust 里，crate 更强调“编译单元”和“依赖单位”。

