
## 详解

npm包：可能是模块(npm install)，也可能是可执行文件（使用npm install -g）


## 常用命令

```bash
# 查看全局安装的包
npm list -g --depth 0
npm outdated -g --depth 0
npm update -g xxx

# 初始化
npm init # 会自动去node_modules目录下，把相关模块自动加进来
npm init --yes

npm install -g xxx
npm install xxx
npm install -s xxx
npm install --save-dev xxx # 只在开发阶段使用，如：测试框架
```


## 博客

[package.json中的type字段含义—— node官方翻译](https://blog.csdn.net/huzhenv5/article/details/105232187)


## 如何自己写一个nodejs的npm的程序

1. 写npm程序
2. 发布到npm上面
3. npm install安装后使用
