
## 网页

- [github](https://github.com/npm/npx)
- [阮一峰 npx 使用教程](https://www.ruanyifeng.com/blog/2019/02/npx.html)
- [npx和npm之间的关系](https://juejin.cn/post/6844903945664462855)

## npx的主要作用

- 调用项目安装的模块
- 避免全局安装模块

## 简介

npx 是 npm 提供的一个工具，用于临时执行 npm 包中的可执行文件。它会在 npm 仓库中查找指定的包，并在临时环境中运行该包的可执行文件，运行完成后不会在本地全局安装该包。这使得开发者可以方便地使用一些一次性的工具或测试某个包的功能，而无需担心全局安装带来的版本冲突等问题。
