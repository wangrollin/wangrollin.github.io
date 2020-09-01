https://nodejs.org/zh-cn/

去官网安装windows版本的nodejs

npm包管理器

pm2

webpack



## nodejs中的包依赖

https://juejin.im/post/5c501d61f265da61290a8ca8



ncu

ncu -u

npm install





## 使用vscode进行远程调试







## 入门知识

https://github.com/i5ting/How-to-learn-node-correctly



早在2007年，Jeff Atwood 就提出了著名的 `Atwood定律`

> 任何能够用 JavaScript 实现的应用系统，最终都必将用 JavaScript 实现



另外，有不少知名的前端库也是使用 Node.js 开发的，比如，[Webpack](https://github.com/webpack/webpack) 是一个强大的打包器，[React](https://github.com/facebook/react)/[Vue](https://github.com/vuejs/vue) 是成熟的前端组件化框架。



构建在 Chrome's V8 这个著名的 JavaScript 引擎之上，Chrome V8 引擎以 C/C++ 为主，相当于使用JavaScript 写法，转成 C/C++ 调用，大大的降低了学习成本



核心

- Chrome V8 解释并执行 JavaScript 代码（这就是为什么浏览器能执行 JavaScript 原因）
- `libuv` 由事件循环和线程池组成，负责所有 I/O 任务的分发与执行



目前，Node.js 同时支持这2种 JavaScript 引擎，二者性能和特性上各有千秋，`ChakraCore` 在特性上感觉更潮一些，曾经是第一个支持 `Async函数` 的引擎，但目前 Node.js 还是以 Chrome V8 引擎为主， `ChakraCore` 版本需要单独安装，大家了解一下就好。



### 安装Node.js环境

3m安装法

- nvm（node version manager）【需要使用npm安装，替代品是yrm（支持yarn）】
- nrm（node registry manager）【需要使用npm安装，替代品是yrm（支持yarn）】
- npm（node packages manager）【内置，替代品是n或nvs（对win也支持）】

#### nvm

node版本发布非常快，而且多版本共存可能性较大，推荐使用nvm来安装node

```
$ curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.6/install.sh | bash

$ echo 'export NVM_DIR="$HOME/.nvm"' >> ~/.zshrc
$ echo '[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" # This loads nvm' >> ~/.zshrc
$ source ~/.zshrc

$ nvm install 0.10
$ nvm install 4
$ nvm install 6
$ nvm install 8
```

#### nrm

[https://registry.npmjs.com](https://registry.npmjs.com/) 是node官方的源（registry），服务器在国外，下载速度较慢，推荐安装nrm来切换源，国内的cnpm和taobao的源都非常快，当然，如果你想自建源也是支持的。

```
$ npm install --global nrm --registry=https://registry.npm.taobao.org
$ nrm use cnpm
```

#### npm

nrm切换完源之后，你安装npm模块的速度会更快。

```
$ npm install --global yarn
```

npm基本命令

| 名称                       | 描述                                                         | 简写                |
| -------------------------- | ------------------------------------------------------------ | ------------------- |
| npm install xxx            | 安装xxx模块，并且记录到package.json里，字段对应的dependency，是产品环境必须依赖的模块 | npm i xxx           |
| npm install --no-save xxx  | 安装xxx模块，但不记录到package.json里                        | npm i --no-save xxx |
| npm install --save-dev xxx | 安装xxx模块，并且记录到package.json里，字段对应的dev-dependency，是开发环境必须依赖的模块，比如测试类的（mocha、chai、sinon、zombie、supertest等）都在 | npm i -D xxx        |
| npm install --global xxx   | 全局安装xxx模块，但不记录到package.json里，如果模块里package.json有bin配置，会自动链接，作为cli命令 | npm i -g xxx        |

**注意：** npm 5 之前采用默认 --no-save 策略，需要加 --save 或 -S 参数将其记录到 package.json 里。



下面列出具体的 Node.js 的使用场景，以模块维度划分

| 分类           | 描述                                                         | 相关模块                                                     |
| -------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 网站           | 类似于 `cnodejs.org` 这样传统的网站                          | `Express` / `Koa`                                            |
| Api            | 同时提供给移动端，PC，`H5` 等前端使用的 `HTTP Api` 接口      | `Restify` / `HApi`                                           |
| Api代理        | 为前端提供的，主要对后端Api接口进行再处理，以便更多的适应前端开发 | `Express` / `Koa`                                            |
| IM即时聊天     | 实时应用，很多是基于 `WebSocket`协议的                       | `Socket.io` / `sockjs`                                       |
| 反向代理       | 提供类似于 `nginx` 反向代理功能，但对前端更友好              | `anyproxy` / `node-http-proxy` / `hiproxy`                   |
| 前端构建工具   | 辅助前端开发，尤其是各种预编译，构建相关的工具，能够极大的提高前端开发效率 | `Grunt` / `Gulp` / `Bower` / `Webpack` / `Fis3` / `YKit`     |
| 命令行工具     | 使用命令行是非常酷的方式，前端开发自定义了很多相关工具，无论是shell命令，node脚本，还是各种脚手架等，几乎每个公司\小组都会自己的命令行工具集 | `Cordova` / `Shell.js`                                       |
| 操作系统       | 有实现，但估计不太会有人用                                   | `NodeOS`                                                     |
| 跨平台打包工具 | 使用 Web 开发技术开发PC客户端是目前最流行的方式，会有更多前端开发工具是采用这种方式的 | PC端的electron、nw.js，比如钉钉PC客户端、微信小程序IDE、微信客户端，移动的Cordova，即老的Phonegap，还有更加有名的一站式开发框架Ionicframework |
| P2P            | 区块链开发、BT客户端                                         | `webtorrent` / `ipfs`                                        |
| 编辑器         | `Atom` 和 `VSCode` 都是基于 `electron` 模块的                | `electron`                                                   |
| 物联网与硬件   | ruff.io和很多硬件都支持node sdk                              | `ruff`                                                       |



| 编号 | 场景               | 说明                                                         |
| ---- | ------------------ | ------------------------------------------------------------ |
| 1    | 反向代理           | Node.js可以作为nginx这样的反向代理，虽然线上我们很少这样做，但它确确实实可以这样做。比如node-http-proxy和anyproxy等，其实使用Node.js做这种请求转发是非常简单的，在后面的http章节里，有单独的讲解。 |
| 2    | 爬虫               | 有大量的爬虫模块，比如node-crawler等，写起来比python要简单一些，尤其搭配jsdom（node版本的jQuery）类库的，对前端来说尤其友好 |
| 3    | 命令行工具         | 所有辅助开发，运维，提高效率等等可以用cli做的，使用node来开发都非常合适，是编写命令行工具最简单的方式，java8以后也参考了node的命令行实现 |
| 4    | 微服务与RPC        | node里有各种rpc支持，比如node编写的dnode，seneca，也有跨语言支持的grpc，足够应用了 |
| 5    | 微信公众号开发     | 相关sdk，框架非常多，是快速开发的利器                        |
| 6    | 前端流行SSR && PWA | SSR是服务器端渲染，PWA是渐进式Web应用，都是今年最火的技术。如果大家用过，一定对Node.js不陌生。比如React、Vuejs都是Node.js实现的ssr。至于pwa的service-worker也是Node.js实现的。那么为啥不用其他语言实现呢？不是其他语言不能实现，而是使用Node.js简单、方便、学习成本低，轻松获得高性能，如果用其他语言，我至少还得装环境 |





直面问题才能有更好的解决方式，Node.js的异步是整个学习Node.js过程中重中之重。

- 1）异步流程控制学习重点
- 2）Api写法：Error-first Callback 和 EventEmitter
- 3）中流砥柱：Promise
- 4）终极解决方案：Async/Await



结论

1. Node.js SDK里callback写法必须会的。
2. Node.js学习重点: Async函数与Promise
    1. 中流砥柱：Promise
    2. 终极解决方案：Async/Await



#### 2）Api写法：Error-first Callback 和 EventEmitter

a）Error-first Callback 定义错误优先的回调写法只需要注意2条规则即可：

- 回调函数的第一个参数返回的error对象，如果error发生了，它会作为第一个err参数返回，如果没有，一般做法是返回null。
- 回调函数的第二个参数返回的是任何成功响应的结果数据。如果结果正常，没有error发生，err会被设置为null，并在第二个参数就出返回成功结果数据。

下面让我们看一下调用函数示例，Node.js 文档里最常采用下面这样的回调方式：

```
function(err, res) {
  // process the error and result
}
```

这里的 `callback` 指的是带有2个参数的函数："err"和 "res"。语义上讲，非空的“err”相当于程序异常；而空的“err”相当于可以正常返回结果“res”，无任何异常。

b）EventEmitter

事件模块是 Node.js 内置的对观察者模式“发布/订阅”（publish/subscribe）的实现，通过`EventEmitter`属性，提供了一个构造函数。该构造函数的实例具有 `on` 方法，可以用来监听指定事件，并触发回调函数。任意对象都可以发布指定事件，被 `EventEmitter` 实例的 `on` 方法监听到。

在node 6之后，可以直接使用`require('events')`类

```
var EventEmitter = require('events')
var util = require('util')

var MyEmitter = function () {

}

util.inherits(MyEmitter, EventEmitter)

const myEmitter = new MyEmitter();

myEmitter.on('event', (a, b) => {
  console.log(a, b, this);
    // Prints: a b {}
});

myEmitter.emit('event', 'a', 'b');
```

和jquery、vue里的Event是非常类似的。而且前端自己也有EventEmitter。

