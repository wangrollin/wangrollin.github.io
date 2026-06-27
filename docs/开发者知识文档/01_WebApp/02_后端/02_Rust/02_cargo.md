
## cargo clippy

## Cargo.toml

Cargo.toml 是 Rust 项目的配置清单文件，给 Rust 的包管理器和构建工具 cargo 用。

  它主要负责这些事情：

  - 定义项目基本信息：包名、版本、作者、Rust edition 等
  - 声明依赖：项目需要哪些第三方 crate
  - 配置构建目标：库、二进制程序、examples、tests、benchmarks
  - 配置 feature：按需开启可选功能
  - 配置 workspace：管理多个 Rust crate 的大型仓库
  - 配置发布信息：license、description、repository 等，用于发布到 crates.io

  一个简单例子：

  [package]
  name = "my_app"
  version = "0.1.0"
  edition = "2021"

  [dependencies]
  serde = "1.0"
  tokio = { version = "1", features = ["full"] }

  这里的意思是：

  - 项目名叫 my_app
  - 版本是 0.1.0
  - 使用 Rust 2021 edition
  - 依赖 serde
  - 依赖 tokio，并开启 full 功能

  常见命令都会读取它：

  cargo build
  cargo run
  cargo test
  cargo check

  另外，Cargo.toml 和 Cargo.lock 不一样：

  - Cargo.toml：你手写，声明“我需要什么依赖”
  - Cargo.lock：cargo 自动生成，锁定“实际用了哪个精确版本”

  简单说，Cargo.toml 就是 Rust 项目的“项目配置 + 依赖说明书”。

## Rust workspace

Rust workspace 是 Cargo 用来管理“一个仓库里的多个 Rust crate”的机制。

  简单说：如果你的项目里有多个相关包，比如一个主程序、几个库、工具包、测试辅助包，就可以放进同一个 workspace 里统一管理。

  例如：

  my-project/
    Cargo.toml
    crates/
      app/
        Cargo.toml
        src/main.rs
      core/
        Cargo.toml
        src/lib.rs
      cli/
        Cargo.toml
        src/main.rs

  根目录 Cargo.toml 可以写：

  [workspace]
  members = [
    "crates/app",
    "crates/core",
    "crates/cli",
  ]
  resolver = "2"

  这样 app、core、cli 都是这个 workspace 的成员。

  它主要解决这些问题：

  - 统一构建：在根目录运行 cargo build，可以构建整个 workspace。
  - 统一测试：cargo test 可以跑所有成员的测试。
  - 共享 Cargo.lock：整个 workspace 通常只有一个锁文件，依赖版本更一致。
  - 共享 target/：构建产物统一放在根目录的 target/，避免重复编译。
  - 管理多个 crate：适合 monorepo、库拆分、CLI + library 组合项目。
  - 统一依赖版本：可以用 [workspace.dependencies] 统一声明常用依赖。

