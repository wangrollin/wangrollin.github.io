

## 官网

https://cn.vuejs.org/v2/guide/


## Docs

- [官方文档 docker部署](https://cli.vuejs.org/guide/deployment.html#docker-nginx)
- [cn 爱好者：Vue3 相关入口](https://vue3js.cn/)

- [教程 -- vue3 官网中文文档](https://v3.cn.vuejs.org/guide/introduction.html)
- [风格指南 -- vue3 官网中文文档](https://v3.cn.vuejs.org/guide/introduction.html)
- [Cookbook -- vue3 官网中文文档](https://v3.cn.vuejs.org/guide/introduction.html)

## vue 特性

单文件组件，也就是 .vue

## vue 特性

### slot

```html
<template>
    <slot></slot>
    hello
</template>
```

```html
<Rate v-model="score">课程评分</Rate>
<Rate v-model="score">
    <img width="14" src="/favicon.ico">
</Rate>
```

### 动画

```css
<style>
.box{
  background:#d88986;
  height:100px;
  transition: width 1s linear;
}
</style>
```

```css
.box1{
  width:30px;
  height:30px;
  position: relative;
  background:#d88986;
  animation: move 2s linear infinite;
}
@keyframes move {
  0% {left:0px}
  50% {left:200px}
  100% {left:0}
}
```

## vue3 特性

Composition API 和 script setup

## 规范

### 工程文件组织规范

```
├── src
│   ├── api            数据请求
│   ├── assets         静态资源
│   ├── components     组件
│   ├── pages          页面
│   ├── router         路由配置
│   ├── store          vuex数据
│   └── utils          工具函数
```

## 插件

### Chrome 插件

- Vue.js devtools

### vscode 插件

- Volar


