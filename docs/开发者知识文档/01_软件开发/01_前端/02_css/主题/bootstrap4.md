
[bootstrap 官网](https://getbootstrap.com/)


## Lynda课程：Bootstrap 4 Essential Training

### 1. Getting Started

#### Introduction

**CDN**

好处：会在用户的电脑上缓存

**预处理文件**

好处：可以离线开发

**其他方式**

- 使用sass来定制化安装
- 使用包管理工具来安装


#### Installation options

- 预处理的CSS和JS
- Bootstrap CDN
- Source files，不仅包含css和js，还包含开发者开发bootstrap的文件；适用情况：bootstrap贡献者，定制化bootstrap
- 包管理软件

文件内容

- css
  - bootstrap.min.css，普通版本，包含了 bootstrap-grid 和 bootstrap-reboot
  - bootstrap-grid.min.css，主要功能是layout
  - bootstrap-reboot.min.css，重置css和浏览器，让个平台看起来一致
- js
  - bootstrap.bundle.min.js，包含所有bootstrap code，外加一个 popper.js
  - bootstrap.min.js

最常用的：

- bootstrap.min.css
- bootstrap.min.js


#### Creating a basic template

- bootstrap
- jQuery
- Popper

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta http-equiv="x-ua-compatible" content="ie=edge" />
        <link rel="stylesheet" href="css/bootstrap.min.css" />
        <title>Bootstrap</title>
    </head>
    <body>
        <div class="container"></div>
        <!-- container -->

        <script src="js/jquery.slim.min.js"></script>
        <script src="js/popper.min.js"></script>
        <script src="js/bootstrap.min.js"></script>
    </body>
</html>

```


### 2. Using Basic Styles

#### Basic styles overview

顺序如下：

- 浏览器style
- bootstrap css（更改浏览器默认的样式reboot.css，更好看同时让各个浏览器一致，添加新的样式）
- custom css


#### Basic typography

样式：

- Reboot.css
- 测量手段：rems ems （没有pixels）
- 避免了margin-top，只有margin-bottom
- 可能的情况下使用inherit（继承）
- border-box sizing
- 原生字体栈 Native font stacks，会使用各个平台自己的默认字体
- 特殊样式

```html
<div class='h2 display-1 lead'></div>

```


#### Typographic utilities 样式工具

**水平对齐 Horizontal Alignment**

- `text-justify`（在一个段落里，两侧对齐的）

- `text(-xx)-POS`

```
xx: sm>576px md>768px lg>992px xl>1200px
POS: left center right
例子：text-lg-center
```


**行高对齐 Line Height Alignment**

只对这些可用：inline，inline block，inline table， table cell elements

- `align-SID`

```
SID: baseline, top, middle, bottom, text-bottom, text-top, right
```

**字母大小写 Capitalization**

- `text-TYP`

```
TYP: lowercase, uppercase, capitalize, monospace(等宽字体)
```

**文本样式 Text Styles**

- `font-STYL`

```
STYL: italic, weight-normal, weight-light, weight-lighter, weight-bold, weight-bolder
```

**文本修改器 Text Modifiers**

- `text-decoration-none` （比如：让link没有下划线）
- `text-reset` （可以取消link的颜色）

**漂浮 Flow**

- `text-FLOW`

```
FLOW: wrap, nowrap, break, truncate
```

示例：

```html
<div class='bg-warning'></div>

```


#### Blockquotes and lists

**Lists**

- `list-unstyled`: no bulltes
- inline lists
  - `list-inline` on UL
  - `list-inline-item` on each LI

**blockquote 标签**

- `blockquote`
- `blockquote-reverse`
- `blockquote-footer`


#### Using colors with Bootstrap

语境文本颜色 contextual

**文本颜色**

- `text-COLOR` for text

```
COLOR: primary secondary success danger warning info light dark body black-50 white-50 muted white
```

**背景颜色**

- `bg-COLOR` for text

```
COLOR: primary secondary success danger waining info light dark white transparent faded
```

> tips: `text-COLOR` 和 `bg-COLOR` 可以一起使用


#### Working with images

**basic images**

- `img-fluid` 响应式图片 responsive images
- `img-thumbnail` 包含1px的border

**Rounded**

- `rounded` 有一点圆角效果

- `rounded-NUM` rounded-0 

```css
/* rounded-20 效果相当于圆角效果 */

img {
    border-radius: 20px;
}
```

- `rounded-SID`
- `rounded-SHA`
- `rounded-SIZ`

```
SID: top, right, bottom, left （只有上下左右才有圆角效果）
SHA: circle, pill
SIZ: 0, sm, lg
```

**Aligning Images**

- `float-left` `float-right`
- `text-center` center inline
- `mx-auto` center block

**Figures**

- `figure` on the \<figure\> tag
- `figure-img` on the images，让图片有点margin
- `figure-caption` on the text，让文本更小更透明


#### CSS variables

**variables**

- 是CSS的新特性
- 浏览器兼容是个问题
- var() and :root
- 不影响已存的样式

**颜色/语境 变量**

```
--blue --indigo --purple --pink --red
--orange --yellow --green --teal --cyan
--white --gray --gray-dark --light --dark

--primary --secondary --success
--info --warning --danger
```

**m媒体查询 media queries**

```
--breakpoint-xs --breakpoint-sm --breakpoint-md
--breakpoint-lg --breakpoint-xl
```

**字体 Fonts**

```
--font-family-sans-serif --font-family-monospace
```

```html
<div>
    
    <style>
        :root {
            --pink: #c4226f;
        }
    </style>

    <h2 style="color: var(--pink);"></h2>

    <!--
        class的权重更大，所以还是danger的颜色
    -->
    <h2 class="text-danger" style="color: var(--pink);"></h2>
</div>
```


### 3. Mastering layout with Bootstrap

#### Layout overview

Grid是bootstrap最有用的部分，可以使用这个框架来实现各种布局

三个主要部分：

- container：响应式内容
- ?
- ?

**12-Column Grid Breakpoints**

- Extra small
- Small
- Medium
- Latge
- Extra large


#### Using containers

**The Grid**

- 响应式 12列
- Flexbox Based
- `container` `row` `column`

**Grid Containers**

- `container(-SIZ)`

```
SIZ: sm, md, lg, xl, fluid
所有的container都会做的：加15px padding
当使用了row和column，container的15px就会消失，变成column之间的30px
```

![](bootstrap4.assets/pic-20200715-212648.png)

```html
<!--
    放不满就扩大每一个的尺寸，尺寸到了最小还是一行放不下，就溢出到下一行，下一行的尺寸再去适应该行的空间
-->
<div class="container">
    <div class="row">
        <article class="col"></article>

        <article class="col"></article>

        <article class="col"></article>
    </div>
</div>
```


#### Working with rows and columns

**Rows**

Rows要放在container下面

- `row`
- `row-cols(-BP)(-COL)`

```
BP: sm>576px md>768px lg>992px xl>1200px
COL: 1-6
row-cols-2 代表一行有两个item来分享12col
```

- `no-gutters` 删除中间的空间

**Columns**

最多12列

- `col(-BP)(-COL)`

```
BP: sm>576px md>768px lg>992px xl>1200px
COL: 1-12，代表这个col要占用多少个col
```

**Aligning Columns**

Vertical

- `align-TYP-DIR`

```
TYP: items, self
DIR: start, center, end
```

Horizontal

- `justify-content-DIR`

```
DIR: start, center, end, around, between
```

示例

```html
<!--
    一行放2个，在页面为lg状态，一行放4个
-->
<div class="row row-cols-2 row-lg-cols-4 no-gutters"></div>
<div class="row justify-content-center"></div>
<div class="col-3 col-lg-6"></div>

<!--
    vh-100代表占用百分百的view高度，垂直居中
-->
<div class="row vh-100 align-items-center"></div>
<div class="col-3 align-self-end"></div>

```


#### Multiple column classes

**Multiple Rows & cols**

> container

- `container(-SIZ)`

```
SIZ: sm, md, lg, xl, fluid
可以控制在不同大小的设备上如何布局
```

> row

- `row`
- `row-cols(-BP)(-COL)`

```
BP: sm>576px md>768px lg>992px xl>1200px
COL: 1-6
row-cols-2 代表一行有两个item来分享12col
```

> col

- `col(-BP)(-COL)`

```
BP: sm>576px md>768px lg>992px xl>1200px
COL: 1-12，代表这个col要占用多少个col
```

示例

```html
<div class="row row-cols-2 row-cols-lg-4"></div>

<div class="row row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-6"></div>

<div class="col-3 align-self-end"></div>
```


#### Offset columns

> Column Offsets

- 'offset-BP-COL'

```
BP: sm>576px md>768px lg>992px xl>1200px
COL: 1-11
```

示例

```html
<!--
    前面空出来1个col的空间
-->
<div class="col col-sm-4 offset-sm-1"></div>
```


#### Nested columns

> Nesting

- `row` inside column
- 会在这个col里创建一个12-col的grid
- 使用相同的class

示例

```html
<div class="row justify-content-center">
    <div class="col-3 col-lg-6">
        <div class="row justify-content-center">
            <div class="col-3 col-lg-6"></div>
        </div>
    </div>
</div>

```


#### Custom order

> Order

- `order(-BP)-ORD`

```
BP: sm>576px md>768px lg>992px xl>1200px
ORD: 1-12
```

示例

```html
<div class="row">
    <div class="col order-3">3</div>
    <div class="col order-2">2</div>
    <div class="col order-1">1</div>
    <div class="col">0</div>
</div>
<!---
    如果要进行order指定，最好同时指定所有的col，否则可能有奇怪的事情发生
    不添加order，则在第一层，所以在第一位；然后有order的是第二层，进行排序
-->

```


#### Grid alignment options

> Vertical Alignment

- use in rows
- `align-items-ALN`
- works on nested cols

```
ALN: start, center, end
```

> individual alignment

- use in cols
- `align-self-ALN`

```
ALN: start, center, end
```

> horizontal alignment

- use in rows
- need col width
- `justify-content-ALN`

```
ALN: start, center, end, around, between
```


#### Display properties

> position(作用和标准css的一样)

- position classes (`fixed-top`, `fixed-bottom`, `sticky-top`)
- `sticky-top` lacks support

> basic display

- 模仿的css
- `d(-BP)-TYP`

```
BP: sm>576px md>768px lg>992px xl>1200px
TYP: none, inline, inline-block, block, 
    table, table-row, table-cell, 
    flex, inline-flex
```

> print display

- `d-print-TYP`

```
TYP: none, inline, inline-block, block, 
    table, table-row, table-cell, 
    flex, inline-flex
```

> basic flex container

- `d(-BP)(-inline)-flex`

```
BP: sm>576px md>768px lg>992px xl>1200px
```


#### Flexbox container options

> flex container

- container/item classes, 可以用container层面的class，可以用内部item层面的class
- `d(-BP)(-inline)-flex`

```
BP: sm>576px md>768px lg>992px xl>1200px
```

> direction

- `flex(-BP)(-DIR)(-reverse)`

```
BP: sm>576px md>768px lg>992px xl>1200px
DIR: row(default), column
```

> order

- `order(-BP)-ORD`

```
BP: sm>576px md>768px lg>992px xl>1200px
ORD: 1-12
```

> justify

- `justify-content(-BP)-ALG`

```
BP: sm>576px md>768px lg>992px xl>1200px
ALG: start, end, center, around, between
```

> wrap

- `flex(-BP)-WRP(-reverse)`

```
BP: sm>576px md>768px lg>992px xl>1200px
WRP: wrap, nowrap(default)
```

> vertical alignment

- `align-content(-BP)-ALG`

```
BP: sm>576px md>768px lg>992px xl>1200px
ALG: start, end, center, around, between, stretch
```


#### Individual flex elements

> align self

- `align-self(-BP)-ALG`

```
BP: sm>576px md>768px lg>992px xl>1200px
ALG: start, end, center, baseline, stretch(default)
```

> controlling order

- `order(-BP)-ORD`

```
BP: sm>576px md>768px lg>992px xl>1200px
ORD: 1-12
```


#### Floating elements

> floating elements

- `float-(BP)-SID`

```
BP: sm>576px md>768px lg>992px xl>1200px
SID: left, right, none
```

示例

```html
<div class="container bg-danger">
    <div class="bg-info clearfix">
        <div class="item float-sm-left">Exotic</div>
        <div class="item float-sm-left">Grooming</div>
        <div class="item float-sm-left">Health</div>
        <div class="item float-sm-left">Nutrition</div>
        <div class="item float-sm-right">Pests</div>
        <div class="item float-sm-right">Vaccinations</div>
    </div>
</div>
<!---
    使用了float，上层会失去内部item的track，加上clearfix可以解决这个问题
    就像一个栈，Pests在最右侧，Vaccinations次之
-->

```


#### Margin and padding

space相关的是成员最多的class group，模仿的CSS里的margin和padding

> margin/padding

- `pb(-BP)-(N)SIZ`

```
PRO: m margin, p padding
SID: t r b l x y
BP: sm>576px md>768px lg>992px xl>1200px
SIZ: 0, 1, 2, 3, 4, 5, auto
```


















#### Visibility

#### Sizing utilities

#### Using borders


### 4. Using Navs and Navbar Components

#### Navbar overview

#### Create basic navigation

#### Create a navbar

#### Use branding and text

#### Add a dropdown to navigation

#### Add form elements

#### Control positioning

#### Create collapsible content



### 5. Style Element Overview

#### Basic style element overview

#### Create buttons

#### Button groups

#### Use badges

#### Progress bar styles

#### List groups

#### Breadcrumbs

#### Shadows



### 6. Using Layout Component

#### Layout conponents overview

#### Add a jumbotron

#### Table styles

#### Basic card layouts

#### Card content classes

#### Card layouts

#### Use the media object



### 7. Using Form Styles

#### Form styles overview

#### Create a basic form

#### Checkboxes and radio classes

#### Size and validation styles

#### Multicolumn forms

#### Create input groups

#### Custom form components


### 8. Working with Interactive Components

#### Interactive component overview

#### Add tooltips

#### Display popovers

#### Create alerts

#### Use dropdowns

#### Add collapse accordions

#### Use modals

#### Build carousels

#### Use scrollspy

#### Toasts

#### Spinners

#### Pagination

#### Stretched links

#### Embeds


### Conclusion

