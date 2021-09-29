## 基础语法

学HTML主要学标签、属性、最佳实践

标签中的属性，有些是全局都有的属性，有些是特有的属性

​		属性分为两类：提供信息，提供动作

不是所有的标签都能互相嵌套



## 基础结构

```html
<!doctype html> 告诉浏览器这个html用哪个版本
<html lang="en">
	<head>
        <meta charset="utf-8">
        <meta name="" content=""> 搜索引擎会查看这两个字段
        <title></title>
    </head>
    
    <body>     
    </body>
</html>
```



## content model

```
html4
content model
	block level 独自占一行
	inline 在行内显示
	
html5
content model 细分扩展成了
	flow
	metadata
	embedded
	interactive
	heading
	phrasing
	sectioning
```



## 标签大全

```html
html只关心内容结构，表现的东西交给css

<h1-6></h1-6> 标题
用heading的原则是基于内容结构和重要性，而不是字体大小（可以用css调整）
不要跳着用，从h1慢慢用下来，除非有全站的使用策略

<p></p> 段落
段落有自己的上部和下部margin，而两行它们的上下交汇处会重合，20px+20px=20px
如果想要两行之间有更多的间隙，不要加一行空的<p></p>，而应该使用css，不要用结构的html来做css的任务
</p>闭合标签是可选的，没有也能正常显示，但是不建议这么做

<br> 换行
有时候需要换行，但是不想另起一个段落

<em></em> <i></i> 斜体 表现层一样，但是逻辑层不一样，读屏的时候，em会加重读
<strong></strong> <b></b> 加粗
<pre></pre> 提前格式化，空格、换行都会如实显示，典型场景：展示代码

html character entitise
键盘打不出来的符号、html渲染用的符号
<
< - &lang; 
& - &amp;
版权标志 - &copy;
商标标志 - &trade;

   
控制空白
&nbsp;  none breaking space
这个不是用来控制空格、tab什么的的，而是用来让不可分割的单词始终连在不起，不会分到两行
Fa&nbsp;Fa

展示图片
<img src="_images/xxx.jpg" width="300" height="300" alt="xxx picture">

```



## 结构奥义

```
让页面可读性对人和机器都很友好

sectioning elements，会影响页面的outline结构
<nav> 一组链接
<artical> 
	<section>
	<aside> sidebar
<h1><h6>

    
semantic elements 语义的元素，不会影响页面的outline结构
<header> 在一个页面可以有多个header，放着介绍性质的内容
<main> 一个页面只能有一个main
<footer> 在一个页面可以有多个footer


<artical>和<main>一起使用，main不会创建一个section，但是artical会创建，毕竟是sectioning

group elements
<div> 把东西聚集在一起 class id


WAI-ARIA roles
Web Accessibility Initiative Accessible Rich Internet Applications

<header role="banner">
	<nav role="navigation">
<main role="main">
	<artical role="artical">
		<aside role="complementary">
<footer role="contentinfo">

application
banner
complementary
contentinfo
form
main
navigation
search

```



## 链接大法

```html
ancher 猜测的默认值
<a href="必填" taget="_self" rel="" title="">anchor</a>

href 表示引用的位置
taget 表示在哪里打开引用
	_blank
	_parent
	_self
	_top
	framename
rel 表示引用和当前位置的关系
	alternate
	author
	bookmark
	download*
	help
	license
	next
	nofollow
	noreferrer
	prefetch
	prev
	search
	tag
title 是通用属性，可以让辅助设备知道这里是什么

链接到下载
浏览器无法打开的默认会下载
<a href="same.zip">anchor</a> 会下载
<a href="same.pdf">anchor</a> 会打开
<a href="same.pdf" download="自定义名字">anchor</a> 强制下载
download是一个boolean值的属性，有就是下载，没有就是不下载
如果不自定义名字，那就是原始名称

链接到页面位置
使用id属性作为跳转的标志
<h1 id="top">
<a href="#top">anchor</a>
<a href="same.html#top">anchor</a>
    
链接到网站其他页面
<a href="same.html" title="link to same directory">anchor</a>
<a href="info/same.html" title="link to same directory">anchor</a>
<a href="../same.html" title="link to same directory">anchor</a>

链接到其他网站
<a href="http://www.baidu.com" title="link to xxx">anchor</a>


```



## 列表大全

```html
有序列表 ordered list
<ol start="6" reversed type="i">
</ol>
start 代表从几开始计数
reversed 代表倒着数
type i I 1 A a ，代表哪种计数符号 123， i ii

无序列表 unordered list, list iterm 
<ul>
    <li></li>
    <li></li>
    <li>xxx
        <ul>
            <li></li>
            <li></li>
        </ul>
    </li>
</ul>

定义列表 definition list, dt term, dd description
<dl>
    <dt></dt>
    <dd></dd>
    
    <dt></dt>
    <dd></dd>
    
    <dt></dt>
    <dd></dd>
</dl>

<dl>
    <dt></dt>
    <dt></dt>
    <dt></dt>
    <dd>
        <p> </p>
        <p> </p>
    </dd>
</dl>

<dl>
    <dt></dt>
    <dd></dd>
    
    <dt></dt>
    <dd></dd>
    
    <dt></dt>
    <dd></dd>
    <dd></dd>
    <dd></dd>
</dl>
```



## CSS

```html
浏览器有标签的默认格式，默认值

css, cascading style sheets, 用来覆盖默认值


<html>
    <head>
        style element
        <style>
            selector {
                key: value;
            }
            body {
                font: 100% Arial; 100%=1em
            }
            h2 {
                 font-familt: Georgia, "Times New Roman", serif;
                font-size: 2em; em是测量的相对单元，比较灵活，不管默认是多大，给我两个这么大
                font-size: 32px;
                font-weight: normal;
                font-style: italic;
                backgroud: rgb(44,45,140);
                color: #ddd; 字体颜色
            }
            
            .alert {
                class
            }
            h2.alert {
                class
            }
            body {
                width: 70%;
                matgin: 0 auto; 上下是0，左右auto
                background: white; white是保留关键字
                border-bottom: 10px solid gold; 
            }
            html {
                margin: 0;
                padding: 0;
                background-color: #367; 相当于#336677
            }
            a {
                text-decoration: none;
                color: red;
            }
            a:hover {
                color:black;
            }
            /* css的注释 */
            group selector
            html,body {
                
            }
        </style>
    </head>
    <body>
        inline style，广泛用于email渲染，是唯一的方法
        <h2 style="color:red;"></h2>
    </body>
</html>


css有冲突，选择最具体的那个

外部css  .css
<head>
    <link href="styles.css" rel="stylesheet" type="text/css">
</head>


firfox 可以关闭css
```



## JS

```html
firfox 可以关闭js

在设计的时候，尽量让没启用css和js的页面也可以看


把js<script></script>放在body的最下面来加载
<script type="text/javascript">
    // js的注释
    window.onload = function() {
         
    }
    
    function displayPanel() {
        
    }
</script>



<head>
     <link href="styles.css" rel="stylesheet" type="text/css">
     <scipt src="xxx.js"></scipt>
</head>

```
