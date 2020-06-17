## 语法

```css
body {
    color: read;
}
```





## Lynda: Introduction to CSS

### CSS Basics

##### what is css

三种方式：

​	inline

​	style标签

​	外部css文件



css解冲突：

​	用最具体的那个格式



##### default browser styles

写css实际上就是在覆盖浏览器默认的格式

不同的浏览器有不同的渲染引擎，同样的html和css，可能显示效果不一样



##### css syntax

```css
p {
    key: value;
}

.myclass {
    key: value;
}

p, h6 {
    key: value;
}
/* this */

/*
	this
*/

```



shorthand
pseudo-elements
pseudo-classes
inline style rules



##### basic selector types

element selector

```css
p {
    key: value;
}
```



class selector

```css
.error {
    key: value;
}

h1.page-title {
    key: value;
}
```



id selector

```css
#content {
    key: value;
}

id的可以覆盖class的格式
用id写的格式很难被覆盖

div#content {
    key: value;
}
```



descendant selector

```css
div p a {
    key: value;
}

只要是div下面的p就行，不需要时直接父子关系，只要是上下关系就行了
超过三层效率会很低，需要斟酌使用

```



group selector

```css
p, h6 {
    key: value;
}
```



##### how css works with html

先写好html的结构，然后在写css的东西



##### css authoring options

external stylesheet：为整个网站做格式【绝大部分】

enbedded styles：为某一个网页专门做格式【很小部分】

inline styles：通常用在html email中【不用】



##### how browsers apply styles

先加载html，遇到link就去加载外部文件

```css
div p a {
    key: value;
}

浏览器的寻找顺序，先找a，再找符合p a的a，再找符合div p a的a

```

css加载顺序：只看加载顺序，谁写在上面，谁先加载；同一个文件，写在前面的先加载，写在后面的后加载；理想情况：先加载外部的格式，然后叠加上style标签的，然后叠加上inline的，最上面的是实际显示的

css的继承：html中子标签会继承父标签的格式；如果有冲突，以子标签的为准

css的具体性：每个selector有个权重值

```css
id：100
class：10
element：1

100 + 1 + 10 = 111
#content p .alert {key: value;}

100 + 10 = 110
#content .alert {key: value;}

10 = 10
.alert {key: value;}
```



style是累积的



### CSS Specifications

##### css: then and now

css 1

css 2

css 2.1

css 3, css level 3: 是css2.1和之前的扩展

css4: css3的扩展



css的不同module有level，可能看出css的发展趋势，没搞懂



##### available css resources

已收藏到书签



##### checking browser support

w3c和浏览器都支持的才可以放心大胆的使用

已加入书签

何时使用，在网站最后检查阶段，或者使用了很高级的css特性



### Common CSS Concepts

##### css normalization and resets

##### working with fonts

##### understanding the box model

##### margins and padding

##### borders and backgrounds

##### working with color

##### units of measurement

##### vendor prefixes



### CSS Layouts

##### structuring a page with css

##### element positioning

##### floats

##### flexbox

##### css grid layout module



### Working with CSS

##### organizing css

##### maintaining css with version control

##### using browser inspect tools

##### validating css



### Responsive CSS

##### introduction to responsive web design

##### working with media queries

##### what is mobile-first



### Going Further with CSS

##### css frameworks and grids

##### css preprocessors

##### additional resources



### Conclusion

















