
## Lynda: Bootstrap 4 Essential Training

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

**媒体查询 media queries**

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

- `pb(-BP)-(n)SIZ`

```
PRO: m margin, p padding
SID: t r b l x y (top right bottom left x-line y-line)
BP: sm>576px md>768px lg>992px xl>1200px
SIZ: 0, 1(0.25 rem), 2(0.5 rem), 3(1 rem), 4(1.5 rem), 5(3 rem), auto (单位：rem)

pb-sm-5
pb-sm-n5: n代表负数，对padding无效，对margin有效
```


#### Visibility

> visibility

- `invisible`, `visible`

```
invisible: 不可见，但是现实的时候空间仍然被占据了
visible: 对screen readers可见，一般用于已经隐藏的元素，比如d-none
```

- `d(-BP)-TYP`

```
BP: sm>576px md>768px lg>992px xl>1200px
TYP: none, inline, inline-block, block,
        table, table-cell, flex, inline-flex
```


#### Sizing utilities

> sizing

- `SIZ(-AMT)`

```
SIZ: w h, (mw mh, vw vh, min-vw min-vh)(只能和100匹配，max view min)
AMT: 25 50 75 100 auto
```


#### Using borders

> borders

- `border(-SID)(-COL)(-0)`

```
SID: top, right, bottom, left
COL: primary, secondary, success, danger, warning, info, light, dark, white
-0: clear border
```

> rounded

- `rounded(-SID)(-SHA)(-SIZ)`

```
SID: top, right, bottom, left
SHA: circle, pill
SIZ: 0 sm lg
```

示例

```html
<div class="container">
    <div class="item border"></div>
    <div class="item border border-primary"></div>
    <div class="item border-top"></div>
    <div class="item border-0 rounded-circle"></div>
</div>

```


### 4. Using Navs and Navbar Components

#### Navbar overview

navigation components

- navs
- tabs
- pills
- navbars
  - branding
  - color schemes
  - dropdowns
  - form elements


#### Create basic navigation

> basic nav classes

- with/without `UL`s
- `nav`
- `nav-item`
- `nav-link`

> nav link options

- `active`
- `disabled`

```
active: 表示这个nav被选中
disable: 不可点击
```

> nav styles

- `nav-pills`
- `nav-tabs`

> nav alignment

- `justify-content-center`
- `justify-content-end`
- `nav-fill`
- `nav-justified`
- `flex-column`

```
nav-justified: 让各个菜单占用的空间一样大
```

示例

```html
<ul class="nav nav-pills flex-column flex-sm-row">
    <li class="nav-item"><a class="nav-link active" href="#">Home</a></li>
    <li class="nav-item"><a class="nav-link" href="#">Mission Awesomeness</a></li>
    <li class="nav-item"><a class="nav-link" href="#">Services</a></li>
    <li class="nav-item"><a class="nav-link" href="#">Staff</a></li>
    <li class="nav-item"><a class="nav-link disabled" href="#">Testimonials</a></li>
</ul>

<!--
    默认是col，当大于sm，则变成一行row
-->
<nav class="nav nav-pills flex-column flex-sm-row">
    <a class="nav-item nav-link active" href="#">Home</a>
    <a class="nav-item nav-link" href="#">Mission Awesomeness</a>
    <a class="nav-item nav-link" href="#">Services</a>
    <a class="nav-item nav-link" href="#">Staff</a>
    <a class="nav-item nav-link disabled" href="#">Testimonials</a>
</nav>

```


#### Create a navbar

> navbar classes

- `navbar`
- `navbar-expand(-BP)`

```
BP: sm>576px md>768px lg>992px xl>1200px
```

> navbar colors

- `bg-COLOR` for backgrounds

```
COLOR: primary, secondary, success, danger, warning, info, light, dark, white
```

- `navbar-light`
- `navbar-dark`

> navbar-nav options

- `navbar-nav` container
  - `nav-item`
  - `nav-link`
  - `active`
  - `disabled`

示例

```html
<nav class="nav nav-pills flex-column flex-sm-row">
    <a class="nav-item nav-link active" href="#">Home</a>
    <a class="nav-item nav-link" href="#">Mission Awesomeness</a>
    <a class="nav-item nav-link" href="#">Services</a>
    <a class="nav-item nav-link" href="#">Staff</a>
    <a class="nav-item nav-link disabled" href="#">Testimonials</a>
</nav>

<!-- 对比 -->

<nav class="navbar bg-dark navbar-dark navbar-expand-sm">
    <div class="container">
        <div class="navbar-nav">
            <a class="nav-item nav-link active" href="#">Home</a>
            <a class="nav-item nav-link" href="#">Mission</a>
            <a class="nav-item nav-link" href="#">Services</a>
            <a class="nav-item nav-link disabled" href="#">Staff</a>
            <a class="nav-item nav-link" href="#">Testimonials</a>
        </div>
    </div>
</nav>

```

> tips: bootstrap 是一个mobile first的框架


#### Use branding and text

> navbar options

- `navbar-brand`
- Link or Headline
- using images
- `navbar-text`

示例

```html
<nav class="navbar bg-dark navbar-dark navbar-expand-sm">
    <div class="container">
        <a class="navbar-brand d-none d-sm-inline-block" href="#">
            <img src="images/wisdompetlogo.svg" style="width: 40px;" alt="Wisdom Pet Logo"/>
        </a>
        <div class="navbar-nav">
            <a class="nav-item nav-link active" href="#">Home</a>
            <a class="nav-item nav-link" href="#">Mission</a>
            <a class="nav-item nav-link" href="#">Services</a>
            <a class="nav-item nav-link" href="#">Staff</a>
            <a class="nav-item nav-link" href="#">Testimonials</a>
        </div>
        <span class="navbar-text d-none d-xl-inline-block">
            The best in traditional and alternative medicine
        </span>
    </div>
</nav>

```


#### Add a dropdown to navigation

> dropdown setup

- `dropdown` to align
- `dropdown-toggle` on link
- `data-toggle="dropdown"`
- `dropdown-menu`
- `dropdown-item`
- `id` & aria attributes

示例

```html
<nav
    id="navbar-site"
    class="navbar navbar-dark bg-dark navbar-expand-sm"
>
    <div class="container">
        <div class="navbar-nav ml-sm-auto">
            <a class="nav-item nav-link" href="#mission">Mission</a>

            <div class="dropdown">
                <a
                    class="nav-item nav-link dropdown-toggle"
                    data-toggle="dropdown"
                    id="servicesDropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                    href="#"
                    >Services</a
                >

                <div
                    class="dropdown-menu"
                    aria-labelledby="servicesDropdown"
                >
                    <a class="dropdown-item" href="#">Grooming</a>
                    <a class="dropdown-item" href="#">General Health</a>
                    <a class="dropdown-item" href="#">Nutrition</a>
                    <a class="dropdown-item" href="#">Pest Control</a>
                    <a class="dropdown-item" href="#">Vaccinations</a>
                </div>
            </div>

            <a class="nav-item nav-link" href="#staff">Staff</a>
            <a class="nav-item nav-link" href="#testimonials"
                >Testimonials</a
            >
        </div>
    </div>
</nav>

```


#### Add form elements

> form classes

- `form-inline`
- `form-control`
- spacing as needed

示例

```html
<nav class="navbar navbar-dark bg-dark navbar-expand-sm">
    <div class="container">
        <ul class="navbar-nav">
            <li class="nav-item"><a class="nav-link" href="#mission">Mission</a></li>
            <li class="nav-item"><a class="nav-link" href="#services">Services</a></li>
            <li class="nav-item"><a class="nav-link" href="#staff">Staff</a></li>
            <li class="nav-item"><a class="nav-link" href="#testimonials">Testimonials</a></li>
        </ul><!-- navbar-nav -->
        <form class="form-inline">
            <input class="form-control mr-2" type="text" placeholder="Search">
            <button class="btn btn-outline-light" type="submit">Go</button>
        </form>
    </div><!-- container -->
</nav>

```


#### Control positioning

> placement options

- `fixed-top`
- `fixed-bottom`
- `sticky-top`
- spacing as needed

示例

```html
<nav class="navbar navbar-dark navbar-expand-sm sticky-top" style="background-color: #55A762;">
    <div class="container">
        <div class="navbar-brand">Wisdom Pet Medicine</div>
        <div class="navbar-nav">
            <a class="nav-item nav-link active" href="#">Home</a>
            <a class="nav-item nav-link" href="#">Mission</a>
            <a class="nav-item nav-link" href="#">Services</a>
            <a class="nav-item nav-link" href="#">Staff</a>
            <a class="nav-item nav-link" href="#">Testimonials</a>
        </div><!-- navbar-nav -->
    </div><!-- container -->
</nav>

```


#### Create collapsible content

> collapsable content

- `collapse`
- `navbar-collapse`
- `id`

> toggler classes

- `navbar-toggler`
- other properties
- `navbar-toggler-icon`

示例

```html
<nav class="navbar navbar-dark bg-dark navbar-expand-sm">
    <div class="container">

        <button class="navbar-toggler" type="button"
            data-toggle="collapse" data-target="#myTogglerNav"
            aria-controls="myTogglerNav"
            aria-expanded="false" aria-label="Toggle navigation">
            
            <span class="navbar-toggler-icon"></span>
        </button>

        <a href="#" class="navbar-brand">Wisdom Pet Medicine</a>

        <div class="collapse navbar-collapse" id="myTogglerNav">
            <div class="navbar-nav">
                <a class="nav-item nav-link active" href="#">Home</a>
                <a class="nav-item nav-link" href="#">Mission</a>
                <a class="nav-item nav-link" href="#">Services</a>
                <a class="nav-item nav-link" href="#">Staff</a>
                <a class="nav-item nav-link" href="#">Testimonials</a>
            </div><!-- navbar -->
        </div><!-- collapse -->

    </div><!-- container -->
</nav><!-- nav -->

```


### 5. Style Element Overview

#### Basic style element overview

- button
- progress bar
- list groups
- breadcrumb


#### Create buttons

> Button Options

- `btn` basic class
- `btn-SIZ` SIZ: `sm` `lg`
- `<a> <button> <input>` btn class 可以用在这些标签上

> Button Colors

- `btn-COLOR`: primary, secondary, success, danger, warning, info, light, dark
- `btn-outline-COLOR`: primary, secondary, success, danger, warning, info, light, dark

> Other Options

- `btn-block` full width
- `active`
- `disabled`


```html
<div class="container">
    <div class="row">
        <section class="col-12">

            <h2>Types</h2>
            <a class="btn btn-primary" href="#" role="button">Link</a>
            <button class="btn btn-primary" type="submit">Button</button>
            <input class="btn btn-primary" type="button" value="Input">

            <h2>Contextual Classes</h2>
            <button class="btn btn-primary">Primary</button>
            <button class="btn btn-secondary">Secondary</button>
            <button class="btn btn-success">Success</button>
            <button class="btn btn-danger">Danger</button>
            <button class="btn btn-warning">Warning</button>
            <button class="btn btn-info">Info</button>
            <button class="btn btn-light">Light</button>
            <button class="btn btn-dark">Dark</button>

            <h2>Outline</h2>
            <button class="btn btn-outline-primary">Primary</button>
            <button class="btn btn-outline-secondary">Secondary</button>
            <button class="btn btn-outline-success">Success</button>
            <button class="btn btn-outline-danger">Danger</button>
            <button class="btn btn-outline-warning">Warning</button>
            <button class="btn btn-outline-info">Info</button>
            <button class="btn btn-outline-light">Light</button>
            <button class="btn btn-outline-dark">Dark</button>

            <h2>Sizes</h2>
            <button class="btn btn-primary">Default</button>
            <button class="btn btn-primary btn-lg">Large</button>
            <button class="btn btn-primary btn-sm">Small</button>
            <button class="btn btn-primary btn-block">Block</button>

            <h2>States</h2>
            <h3>Active</h3>
            <button class="btn btn-primary active">Active Button</button>

            <h3>Disabled</h3>
            <button class="btn btn-primary disabled">Disabled Button</button>
            <a href="#" class="btn btn-primary disabled">Disabled Link Button</a>


        </section>
    </div><!-- row -->
</div><!-- content container -->

```


#### Button groups

> Button Group Classes

- `btn-group`
- `btn-group-vertical`
- `btn-toolbar`

> Button Group Options

- `btn-group-SIZ`: SIZ: sm, lg


```html
<div class="container">
    <div class="row">
        <section class="col-12">

            <h1>Our Mission</h1>

            <div class="btn-toolbar" aria-label="All Pets">
                <div class="btn-group  btn-group-lg mb-2 mr-2" aria-label="Common Pets">
                    <button type="button" class="btn btn-primary active">Cat</button>
                    <button type="button" class="btn btn-primary">Dog</button>
                    <button type="button" class="btn btn-primary">Fish</button>
                    <button type="button" class="btn btn-primary">Bird</button>
                </div>

                <div class="btn-group btn-group-sm mb-2" aria-label="Exotic Pets">
                    <button type="button" class="btn btn-primary">Amphibian</button>
                    <button type="button" class="btn btn-primary active">Reptile</button>
                    <button type="button" class="btn btn-primary">Other</button>
                </div>
            </div>

            <div class="btn-group btn-group-vertical" aria-label="Exotic Pets">
                <button type="button" class="btn btn-primary">Amphibian</button>
                <button type="button" class="btn btn-primary active">Reptile</button>
                <button type="button" class="btn btn-primary">Other</button>
            </div>

        </section>
    </div><!-- row -->
</div><!-- content container -->

```


#### Use badges

> Badge Classes

- `badge`
- `badge-pill`
- `badge-COLOR`: primary, secondary, success, danger, warning, info, light, dark

通常用在`<span>`里

badge is contextual, 和上下文相关，会自己调整大小


```html
<div class="container">
    <div class="row">
        <section class="col-12">

            <section class="content" id="mission">
                <h1>Our Commitment <span class="badge badge-default">to you</span></h1>
                <p class="lead">Wisdom Pet Medicine strives to blend the best in traditional and <em>alternative
                    medicine</em> in the <strong>diagnosis and treatment</strong> of companion animals including dogs,
                    cats, birds, reptiles, rodents, and fish. We apply the wisdom garnered in the
                    <mark>centuries old tradition</mark>
                    of veterinary medicine, to find the safest treatments and&nbsp;cures.
                </p>
                <p><span class="badge badge-info badge-pill">new</span> We strive to be your pet's medical
                </p>
            </section>

            <section class="content" id="services">
                <h3>Grooming <span class="badge badge-danger badge-pill">new</span></h3>
            </section>

        </section>
    </div><!-- row -->
</div><!-- content container -->

```


#### Progress bar styles

> Progress Classes

- `progress` containers
- `progress-bar` item
- style `width`, `height`: w-25
- `style="width: 73%; height: 40px"`
- Label text

> Progress Styles

- use `bg-COLOR`: success, info, warning, danger
- `progress-bar-striped`
- `progress-bar-animated`
- multiple bars

> accessibility properties

- `role="progressbar"`
- `aria-valuenow`
- `aria-valuemin`
- `aria-valuemax`


```html
<div class="container">
    <div class="row">
        <section class="col-12">

            <section class="content" id="services">
                <div class="progress">
                    <div class="progress-bar" role="progressbar" aria-value-now="73%" aria-value-min="0"
                         aria-value-max="100%" style="width:73%">73%
                    </div>
                </div>
              
                <div class="progress">
                    <div class="progress-bar bg-success progress-bar-striped" style="width:85%"></div>
                </div>
              
                <div class="progress">
                    <div class="progress-bar bg-info" style="width:15%"></div>
                    <div class="progress-bar bg-warning" style="width:30%"></div>
                </div>
            
                <div class="progress">
                    <div class="progress-bar bg-warning" style="width:15%"></div>
                </div>
            
                <div class="progress">
                    <div class="progress-bar bg-danger" style="width:15%"></div>
                </div>
             
            </section>

        </section>
    </div><!-- row -->
</div><!-- content container -->

```


#### List groups

> List Group Classes

- `list-group` containers, 和`<ul> <div>`搭配使用
- `list-group-item` items
- `<li> <button> <a>`

> List Group Styles

- `active` `disabled`
- `list-group-item-action` style
- `list-group-item-COLOR`: primary, secondary, success, danger, warning, info, light, dark
- `list-group-horizontal(-xx)`: xx: sm>576px md>768px lg>992px xl>1200px

> Adding Badges

- `badge` classes
- `justify-content-between`


```html
<div class="container">
    <div class="row">
        <section class="col-12">

            <section class="content" id="services">
                <h3>Exotic Pets</h3>
                <p>We offer <strong>specialized</strong> care for <em>reptiles, rodents, birds,</em> and other exotic
                    pets.</p>

                <ul class="list-group mb-3">
                    <li class="list-group-item active">Grooming</li>
                    <li class="list-group-item list-group-item-action">General Health</li>
                    <li class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                        Nutrition
                        <span class="badge badge-primary badge-pill">12</span>
                    </li>
                    <li class="list-group-item list-group-item-action">Pest Control</li>
                    <li class="list-group-item list-group-item-action">Vaccinations</li>
                </ul>

                <div class="list-group mb-3">
                    <a class="list-group-item list-group-item-action list-group-item-success" href="#">Grooming</a>
                    <a class="list-group-item list-group-item-action list-group-item-info" href="#">General Health</a>
                    <a class="list-group-item list-group-item-action list-group-item-warning" href="#">Nutrition</a>
                    <a class="list-group-item list-group-item-action list-group-item-danger" href="#">Pest Control</a>
                    <a class="list-group-item list-group-item-action" href="#">Vaccinations</a>
                </div>

                <div class="list-group list-group-horizontal-md mb-3">
                    <button class="list-group-item list-group-item-action" type="button">Grooming</button>
                    <button class="list-group-item list-group-item-action" type="button">General Health</button>
                    <button class="list-group-item list-group-item-action" type="button">Nutrition</button>
                    <button class="list-group-item list-group-item-action" type="button">Pest Control</button>
                    <button class="list-group-item list-group-item-action" type="button">Vaccinations</button>
                </div>

            </section>
        </section>
    </div><!-- row -->
</div><!-- content container -->

```


#### Breadcrumbs

> Breadcrumb Links

- `breadcrumb` containers
- `breadcrumb-item` items
- `active` style
- `<li> or <nav>的<a>`


```html
<div class="container">
    <div class="row">
        <section class="col-12">

            <style>
                .breadcrumb-item + .breadcrumb-item::before {
                    content: '>'
                }
            </style>

            <h3>Exotic Pets</h3>

            <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="#">Home</a></li>
                <li class="breadcrumb-item"><a href="#">Exotic Pets</a></li>
                <li class="breadcrumb-item active">Nutrition</li>
            </ol>


            <nav class="breadcrumb">
                <a class="breadcrumb-item" href="#">Home</a>
                <a class="breadcrumb-item" href="#">Exotic Pets</a>
                <span class="breadcrumb-item active">Nutrition</span>
            </nav>

        </section>
    </div><!-- row -->
</div><!-- content container -->

```


#### Shadows

not for text, only for box elements

> shadows

- `shadow-none`
- `shadow-sm`
- `shadow`
- `shadow-lg`


```html
<div class="container">
    <h2 class="mt-4">Services</h2>

    <section class="border my-4 p-3 shadow-none" style="box-shadow: 10px 10px 10px #DDD">
        <h4>Exotic Pets</h4>
        <div>We offer specialized care for reptiles, rodents, birds, and other exotic pets.</div>
    </section>

    <section class="border my-4 p-3 shadow">
        <h4>Grooming</h4>
        <div>Our therapeutic grooming treatments help battle fleas, allergic dermatitis, and other challenging skin
            conditions.
        </div>
    </section>

    <section class="border my-4 p-3 shadow-sm">
        <h4>General Health</h4>
        <div>Wellness and senior exams, ultrasound, x-ray, and dental cleanings are just a few of our general health
            services.
        </div>
    </section>

    <section class="border my-4 p-3 shadow-lg">
        <h4>Nutrition</h4>
        <div>Let our nutrition experts review your pet's diet and prescribe a custom nutrition plan for optimum health
            and disease prevention.
        </div>
    </section>

</div><!-- container -->

```


### 6. Using Layout Component

#### Layout conponents overview

Design Patterns

- jumbotron
- table style
- card layout
- media elements


#### Add a jumbotron

> Jumbotron Classes

- `jumbotron` container
- `jumbotron-fluid` items
- use styles as needed


```html
<header class="jumbotron jumbotron-fluid">
    <div class="container">
        <div class="display-2 mb-4">Our Mission</div>
        <p class="lead">Wisdom Pet Medicine strives to blend the best in traditional and alternative medicine in the
            diagnosis and treatment of companion animals including dogs, cats, birds, reptiles, rodents, and fish. We
            apply the wisdom garnered in the centuries old tradition of veterinary medicine, to find the safest
            treatments and cures.</p>
    </div>
</header>

```


#### Table styles

> table classes

- `table`
- `table-dark`

> style

- `table-striped`
- `table-bordered`
- `table-borderless`
- `table-hover`

> head colors

- `thead-light`
- `thead-dark`

> color options

- `table-COLOR` TRs & TDs: active, primary,secondary, success, danger, warning, info, light, dark
- `bg-COLOR` TRs & TDs: primary, success, danger, warning, info
- `text-COLOR` for text: primary,secondary, success, danger, warning, info, light, dark

> size/responsive

- `table-sm`
- `table-responsive(-BP)`: sm>576px md>768px lg>992px xl>1200px


```html
<table class="table table-hover table-responsive">
  <thead><tr><th scope="col">Item #</th><th scope="col">Product or Service</th><th scope="col">Price (ea.)</th><th scope="col">Retail Price (Case)</th><th scope="col">Case Discount</th><th scope="col">Wholesale Price</th><th scope="col">Wholesale Discount</th></tr></thead>
  <tbody>
    <tr><th scope="row">100050</th><td>Advance Pet Oral Care Toothbrush and Toothpaste</td><td>$9.55 </td><td>$108.87</td><td>$5.73</td><td>$103.14</td><td>$11.46</td></tr>
    <tr><th scope="row">100043</th><td>Basic Teeth Cleaning and Exam</td><td>$100.00 </td><td>$1,140.00</td><td>$60.00</td><td>$1,080.00</td><td>$120.00</td></tr>
    <tr><th scope="row">100013</th><td class="table-success">Calm Cat Anxiety Relief Spray</td><td>$9.49 </td><td>$108.19</td><td>$5.69</td><td>$102.49</td><td>$11.39</td></tr>
    <tr><th scope="row">100041</th><td>Cat Hairball Remedy Gel</td><td>$6.00 </td><td>$68.40</td><td>$3.60</td><td>$64.80</td><td>$7.20</td></tr>
    <tr><th scope="row">100051</th><td>Cat Vaccination Package</td><td>$55.00 </td><td>$627.00</td><td>$33.00</td><td>$594.00</td><td>$66.00</td></tr>
    <tr><th scope="row">100046</th><td>Dog Vaccination Package</td><td>$65.00 </td><td>$741.00</td><td>$39.00</td><td>$702.00</td><td>$78.00</td></tr>
    <tr><th scope="row">100044</th><td>Healthy Coat Dog Supplement</td><td>$6.44 </td><td>$73.42</td><td>$3.86</td><td>$69.55</td><td>$7.73</td></tr>
    <tr><th scope="row">100030</th><td>Healthy Coat Dog Supplement</td><td>$9.56 </td><td>$108.98</td><td>$5.74</td><td>$103.25</td><td>$11.47</td></tr>
    <tr><th scope="row">100045</th><td>Here Kitty Kitty Organic Catnip</td><td>$7.75 </td><td>$88.35</td><td>$4.65</td><td>$83.70</td><td>$9.30</td></tr>
    <tr><th scope="row">100053</th><td>Kidney Support Liquid Dietary Supplement</td><td>$9.12 </td><td>$103.97</td><td>$5.47</td><td>$98.50</td><td>$10.94</td></tr>
    <tr><th scope="row">100040</th><td>Large Hypoallergenic Pet Bowl</td><td>$8.14 </td><td>$92.80</td><td>$4.88</td><td>$87.91</td><td>$9.77</td></tr>
    <tr><th scope="row">100005</th><td>Medicated Dog Shampoo</td><td>$8.73 </td><td>$99.52</td><td>$5.24</td><td>$94.28</td><td>$10.48</td></tr>
    <tr><th scope="row">100039</th><td>Microchip Service</td><td>$15.00 </td><td>$171.00</td><td>$9.00</td><td>$162.00</td><td>$18.00</td></tr>
    <tr><th scope="row">100054</th><td>Parasite Treatment Package</td><td>$75.00 </td><td>$855.00</td><td>$45.00</td><td>$810.00</td><td>$90.00</td></tr>
    <tr><th scope="row">100059</th><td>Probiotic Cat Treats</td><td>$7.89 </td><td>$89.95</td><td>$4.73</td><td>$85.21</td><td>$9.47</td></tr>
    <tr><th scope="row">100042</th><td>Probiotic Dog Treats</td><td>$8.89 </td><td>$101.35</td><td>$5.33</td><td>$96.01</td><td>$10.67</td></tr>
    <tr><th scope="row">100009</th><td>Rabies 1 or 3 year Vaccination</td><td>$18.00 </td><td>$205.20</td><td>$10.80</td><td>$194.40</td><td>$21.60</td></tr>
    <tr><th scope="row">100055</th><td>Senior Dog Vitamin Chews</td><td>$9.66 </td><td>$110.12</td><td>$5.80</td><td>$104.33</td><td>$11.59</td></tr>
    <tr><th scope="row">100032</th><td>Small Hypoallergenic Pet Bowl</td><td>$6.55 </td><td>$74.67</td><td>$3.93</td><td>$70.74</td><td>$7.86</td></tr>
    <tr><th scope="row">100021</th><td>Strong Joints Cat Supplement</td><td>$5.53 </td><td>$63.04</td><td>$3.32</td><td>$59.72</td><td>$6.64</td></tr>
    <tr><th scope="row">100047</th><td>Strong Joints Dog Supplement</td><td>$5.87 </td><td>$66.92</td><td>$3.52</td><td>$63.40</td><td>$7.04</td></tr>
  </tbody>
</table>

```


#### Basic card layouts

> basic card classes

- `card` container
- `card-body`

> card content

- `card-text`
- `card-title`
- `card-subtitle`
- `card-link`
- `card-img`

> colors

- `bg-COLOR`: primary, secondary, success, danger, warning, info, light, dark, white
- `border-COLOR`: primary, secondary, success, danger, warning, info, light, dark
- `text-COLOR`: primary, secondary, success, danger, warning, info, light, dark


```html
<div class="container">

    <section class="card mb-5" id="drwinthrop">
        <div class="card-body">
            <img class="card-img img-fluid" src="images/doctor-winthrop.jpg" alt="Doctor Winthrop Photo">
            <h2 class="card-title">Dr. Stanley Winthrop</h2>
            <h5 class="card-subtitle">Behaviorist</h5>
            <p class="card-text">Dr. Winthrop is the guardian of Missy, a three-year old Llaso mix, who he adopted at
                the shelter. Dr. Winthrop is passionate about spay and neuter and pet adoption, and works tireless hours
                outside the clinic, performing free spay and neuter surgeries for the shelter.</p>
            <a class="card-link" href="#">About Me</a>
            <a class="card-link" href="#">My Pets</a>
            <a class="card-link" href="#">Client Slideshow</a>
        </div>
    </section>

    <section class="card mb-5 bg-primary text-light" id="drchase">
        <div class="card-body">
            <img class="card-img img-fluid" src="images/doctor-chase.jpg" alt="Doctor Chase Photo">
            <h2 class="card-title">Dr. Elizabeth Chase</h2>
            <h5 class="card-subtitle">Dentistry</h5>
            <p class="card-text">Dr. Chase spends much of her free time helping the local bunny rescue organization find
                homes for bunnies, such as Kibbles - a Dalmatian bunny who is part of the large Chase household,
                including two dogs, three cats, and a turtle.</p>
            <a class="card-link text-light" href="#">About Me</a>
            <a class="card-link text-light" href="#">My Pets</a>
            <a class="card-link text-light" href="#">Client Slideshow</a>
        </div>
    </section>

    <section class="card mb-5 border-warning" id="drsanders">
        <div class="card-body">
            <img class="card-img img-fluid" src="images/doctor-sanders.jpg" alt="Doctor Sanders Photo">
            <h2 class="card-title">Dr. Kenneth Sanders</h2>
            <h5 class="card-subtitle">Nutritionist</h5>
            <p class="card-text">Leroy walked into Dr. Sanders front door when she was moving into a new house. After
                searching for weeks for Leroy's guardians, she decided to make Leroy a part of her pet family, and now
                has three cats.</p>
            <a class="card-link" href="#">About Me</a>
            <a class="card-link" href="#">My Pets</a>
            <a class="card-link" href="#">Client Slideshow</a>
        </div>
    </section>

    <section class="card mb-5" id="drgardner">
        <div class="card-body">
            <img class="card-img img-fluid" src="images/doctor-gardner.jpg" alt="Doctor Gardner Photo">
            <h2 class="card-title">Dr. Michael Gardner</h2>
            <h5 class="card-subtitle">Practitioner</h5>
            <p class="card-text">When Dr. Gardner was 8 his family moved to Colorado, where he spent most of his free
                time playing on his neighbors farm. He came to love spending time with the horses, chickens, and goats.
                He still considers all of his family's farm animals his own, but Frank, his Cattle dog is his nearest
                and dearest friend.</p>
            <a class="card-link" href="#">About Me</a>
            <a class="card-link" href="#">My Pets</a>
            <a class="card-link" href="#">Client Slideshow</a>
        </div>
    </section>

    <section class="card mb-5" id="drruiz">
        <div class="card-body">
            <img class="card-img img-fluid" src="images/doctor-ruiz.jpg" alt="Doctor Ruiz Photo">
            <h2 class="card-title">Dr. Brook Ruiz</h2>
            <h5 class="card-subtitle">Radiology</h5>
            <p class="card-text">Dr. Brook has spent countless hours helping the local animal shelter with injured
                animals ,that find their way into their doors. She recently adopted a new feline friend, Trish, that she
                helped rescue from a flooded area. Trish loves playing with her new sister, Else.</p>
            <a class="card-link" href="#">About Me</a>
            <a class="card-link" href="#">My Pets</a>
            <a class="card-link" href="#">Client Slideshow</a>
        </div>
    </section>

    <section class="card mb-5" id="drwong">
        <div class="card-body">
            <img class="card-img img-fluid" src="images/doctor-wong.jpg" alt="Doctor Wong Photo">
            <h2 class="card-title">Dr. Olivia Wong</h2>
            <h5 class="card-subtitle">Preventive Care</h5>
            <p class="card-text">Dr. Wong is a cancer survivor who was fortunate enough to get to spend time with a
                therapy dog during her recovery. She became passionate about therapy animals, and has started her own
                foundation to train and provide education to patients in recovery. Now she gets her own dose of daily
                therapy from her husky, Lilla.</p>
            <a class="card-link" href="#">About Me</a>
            <a class="card-link" href="#">My Pets</a>
            <a class="card-link" href="#">Client Slideshow</a>
        </div>
    </section>

</div><!-- content container -->

```


#### Card content classes

> basic card classes

- `card` container
- `card-body`
- `card-header`
- `card-footer`

> card images

- `card-img`
- `card-img-top`
- `card-img-bottom`
- `card-img-overlay` 来替换 `card-body`

> list groups

- `list-group` container
- `list-group-item`
- `list-group-flush`


```html
<div class="container">

    <section class="card mb-5" id="drwinthrop">
        <div class="card-header">
            <h2 class="card-title">Dr. Stanley Winthrop</h2>
            <h5 class="card-subtitle">Behaviorist</h5>
        </div>
        <div class="card-body">
            <img class="card-img img-fluid" src="images/doctor-winthrop.jpg" alt="Doctor Winthrop Photo">
            <p class="card-text">Dr. Winthrop is the guardian of Missy, a three-year old Llaso mix, who he adopted at
                the shelter. Dr. Winthrop is passionate about spay and neuter and pet adoption, and works tireless hours
                outside the clinic, performing free spay and neuter surgeries for the shelter.</p>
        </div>
        <div class="card-footer">
            <a class="card-link" href="#">About Me</a>
            <a class="card-link" href="#">My Pets</a>
            <a class="card-link" href="#">Client Slideshow</a>
        </div>
    </section>

    <section class="card mb-5 bg-primary text-light" id="drchase">
        <div class="card-body">
            <h2 class="card-title">Dr. Elizabeth Chase</h2>
            <h5 class="card-subtitle">Dentistry</h5>
            <p class="card-text">Dr. Chase spends much of her free time helping the local bunny rescue organization find
                homes for bunnies, such as Kibbles - a Dalmatian bunny who is part of the large Chase household,
                including two dogs, three cats, and a turtle.</p>
            <a class="card-link text-light" href="#">About Me</a>
            <a class="card-link text-light" href="#">My Pets</a>
            <a class="card-link text-light" href="#">Client Slideshow</a>
        </div>
        <img class="card-img-bottom img-fluid" src="images/doctor-chase.jpg" alt="Doctor Chase Photo">
    </section>

    <section class="card mb-5 border-warning" id="drsanders">
        <img class="card-img img-fluid" src="images/doctor-sanders.jpg" alt="Doctor Sanders Photo">
        <div class="card-img-overlay">
            <h2 class="card-title">Dr. Kenneth Sanders</h2>
            <h5 class="card-subtitle">Nutritionist</h5>
            <p class="card-text">Leroy walked into Dr. Sanders front door when she was moving into a new house. After
                searching for weeks for Leroy's guardians, she decided to make Leroy a part of her pet family, and now
                has three cats.</p>
            <a class="card-link" href="#">About Me</a>
            <a class="card-link" href="#">My Pets</a>
            <a class="card-link" href="#">Client Slideshow</a>
        </div>
    </section>

    <section class="card mb-5" id="drgardner">
        <div class="card-body">
            <img class="card-img img-fluid" src="images/doctor-gardner.jpg" alt="Doctor Gardner Photo">
            <h2 class="card-title">Dr. Michael Gardner</h2>
            <h5 class="card-subtitle">Practitioner</h5>
            <p class="card-text">When Dr. Gardner was 8 his family moved to Colorado, where he spent most of his free
                time playing on his neighbors farm. He came to love spending time with the horses, chickens, and goats.
                He still considers all of his family's farm animals his own, but Frank, his Cattle dog is his nearest
                and dearest friend.</p>
        </div>
        <div class="list-group list-group-flush">
            <a class="list-group-item" href="#">About Me</a>
            <a class="list-group-item" href="#">My Pets</a>
            <a class="list-group-item" href="#">Client Slideshow</a>
        </div>
    </section>

    <section class="card mb-5" id="drruiz">
        <div class="card-body">
            <img class="card-img img-fluid" src="images/doctor-ruiz.jpg" alt="Doctor Ruiz Photo">
            <h2 class="card-title">Dr. Brook Ruiz</h2>
            <h5 class="card-subtitle">Radiology</h5>
            <p class="card-text">Dr. Brook has spent countless hours helping the local animal shelter with injured
                animals ,that find their way into their doors. She recently adopted a new feline friend, Trish, that she
                helped rescue from a flooded area. Trish loves playing with her new sister, Else.</p>
            <a class="card-link" href="#">About Me</a>
            <a class="card-link" href="#">My Pets</a>
            <a class="card-link" href="#">Client Slideshow</a>
        </div>
    </section>

    <section class="card mb-5" id="drwong">
        <div class="card-body">
            <img class="card-img img-fluid" src="images/doctor-wong.jpg" alt="Doctor Wong Photo">
            <h2 class="card-title">Dr. Olivia Wong</h2>
            <h5 class="card-subtitle">Preventive Care</h5>
            <p class="card-text">Dr. Wong is a cancer survivor who was fortunate enough to get to spend time with a
                therapy dog during her recovery. She became passionate about therapy animals, and has started her own
                foundation to train and provide education to patients in recovery. Now she gets her own dose of daily
                therapy from her husky, Lilla.</p>
            <a class="card-link" href="#">About Me</a>
            <a class="card-link" href="#">My Pets</a>
            <a class="card-link" href="#">Client Slideshow</a>
        </div>
    </section>

</div><!-- content container -->

```


#### Card layouts

> card layout containers

- `card-group`
- `card-deck` 默认间隔 30pixel
- `card-columns`

> using the grid

- `row row-cols`

grid col 使用 card，非常好的布局


```html
<div class="container">
    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4">
        <div class="col">
            <section class="card mb-5" id="drwinthrop">
                <img class="card-img-top" src="images/doctor-winthrop.jpg" alt="Doctor Winthrop Photo">
                <div class="card-body">
                    <h2 class="card-title">Dr. Stanley Winthrop</h2>
                    <h5 class="card-subtitle">Behaviorist</h5>
                    <p class="card-text">Dr. Winthrop is the guardian of Missy, a three-year old Llaso mix, who he
                        adopted at the shelter. Dr. Winthrop is
                        passionate about spay and neuter and pet adoption, and works tireless hours outside the clinic,
                        performing free
                        spay and neuter surgeries for the shelter.</p>
                </div>
                <div class="list-group list-group-flush">
                    <a class="list-group-item" href="#">About Me</a>
                    <a class="list-group-item" href="#">My Pets</a>
                    <a class="list-group-item" href="#">Client Slideshow</a>
                </div>
            </section><!-- card -->
        </div>

        <div class="col">
            <section class="card mb-5" id="drchase">
                <img class="card-img-top" src="images/doctor-chase.jpg" alt="Doctor Chase Photo">
                <div class="card-body">
                    <h2 class="card-title">Dr. Elizabeth Chase</h2>
                    <h5 class="card-subtitle">Dentistry</h5>
                    <p class="card-text">Dr. Chase spends much of her free time helping the local bunny rescue
                        organization find homes for bunnies, such as
                        Kibbles - a Dalmatian bunny who is part of the large Chase household, including two dogs, three
                        cats, and a turtle.</p>
                </div>
                <div class="list-group list-group-flush">
                    <a class="list-group-item" href="#">About Me</a>
                    <a class="list-group-item" href="#">My Pets</a>
                    <a class="list-group-item" href="#">Client Slideshow</a>
                </div>
            </section><!-- card -->
        </div>

        <div class="col">
            <section class="card mb-5" id="drsanders">
                <img class="card-img-top" src="images/doctor-sanders.jpg" alt="Doctor Sanders Photo">
                <div class="card-body">
                    <h2 class="card-title">Dr. Kenneth Sanders</h2>
                    <h5 class="card-subtitle">Nutritionist</h5>
                    <p class="card-text">Leroy walked into Dr. Sanders front door when she was moving into a new house.
                        After searching for weeks for Leroy's
                        guardians, she decided to make Leroy a part of her pet family, and now has three cats.</p>
                </div>
                <div class="list-group list-group-flush">
                    <a class="list-group-item" href="#">About Me</a>
                    <a class="list-group-item" href="#">My Pets</a>
                    <a class="list-group-item" href="#">Client Slideshow</a>
                </div>
            </section><!-- card -->
        </div>

        <div class="col">
            <section class="card mb-5" id="drgardner">
                <img class="card-img-top" src="images/doctor-gardner.jpg" alt="Doctor Gardner Photo">
                <div class="card-body">
                    <h2 class="card-title">Dr. Michael Gardner</h2>
                    <h5 class="card-subtitle">Practitioner</h5>
                    <p class="card-text">When Dr. Gardner was 8 his family moved to Colorado, where he spent most of his
                        free time playing on his neighbors
                        farm. He came to love spending time with the horses, chickens, and goats. He still considers all
                        of his family's
                        farm animals his own, but Frank, his Cattle dog is his nearest and dearest friend.</p>
                </div>
                <div class="list-group list-group-flush">
                    <a class="list-group-item" href="#">About Me</a>
                    <a class="list-group-item" href="#">My Pets</a>
                    <a class="list-group-item" href="#">Client Slideshow</a>
                </div>
            </section><!-- card -->
        </div>

        <div class="col">
            <section class="card mb-5" id="drruiz">
                <img class="card-img-top" src="images/doctor-ruiz.jpg" alt="Doctor Ruiz Photo">
                <div class="card-body">
                    <h2 class="card-title">Dr. Brook Ruiz</h2>
                    <h5 class="card-subtitle">Radiology</h5>
                    <p class="card-text">Dr. Brook has spent countless hours helping the local animal shelter with
                        injured animals ,that find their way into
                        their doors. She recently adopted a new feline friend, Trish, that she helped rescue from a
                        flooded area. Trish
                        loves playing with her new sister, Else.</p>
                </div><!-- card-body -->
                <div class="list-group list-group-flush">
                    <a class="list-group-item" href="#">About Me</a>
                    <a class="list-group-item" href="#">My Pets</a>
                    <a class="list-group-item" href="#">Client Slideshow</a>
                </div>
            </section><!-- card -->
        </div>

        <div class="col">
            <section class="card mb-5" id="drwong">
                <img class="card-img-top" src="images/doctor-wong.jpg" alt="Doctor Wong Photo">
                <div class="card-body">
                    <h2 class="card-title">Dr. Olivia Wong</h2>
                    <h5 class="card-subtitle">Preventive Care</h5>
                    <p class="card-text">Dr. Wong is a cancer survivor who was fortunate enough to get to spend time
                        with a therapy dog during her recovery.
                        She became passionate about therapy animals, and has started her own foundation to train and
                        provide education
                        to patients in recovery. Now she gets her own dose of daily therapy from her husky, Lilla.</p>
                </div><!-- card-body -->
                <div class="list-group list-group-flush">
                    <a class="list-group-item" href="#">About Me</a>
                    <a class="list-group-item" href="#">My Pets</a>
                    <a class="list-group-item" href="#">Client Slideshow</a>
                </div>
            </section><!-- card -->
        </div>
    </div>
</div><!-- content container -->

```


#### Use the media object

> media classes

- `media` containers
- `media-body`
- use flexbox classes


```html
<div class="container">

    <section class="media mb-4" id="drwinthrop">
        <div class="media-body">
            <h2>Dr. Stanley Winthrop</h2>
            <h5>Behaviorist</h5>
            <p>Dr. Winthrop is the guardian of Missy, a three-year old Llaso mix, who he adopted at the shelter. Dr.
                Winthrop is passionate about spay and neuter and pet adoption, and works tireless hours outside the
                clinic, performing free spay and neuter surgeries for the shelter.</p>
        </div>
        <img class="d-flex mr-3 img-fluid rounded" style="width: 100px;" src="images/doctor-winthrop.jpg"
             alt="Doctor Winthrop Photo">
    </section>

    <section class="media mb-4" id="drchase">
        <img class="d-flex mr-3 img-fluid rounded" style="width: 100px;" src="images/doctor-chase.jpg"
             alt="Doctor Chase Photo">
        <div class="media-body">
            <h2>Dr. Elizabeth Chase</h2>
            <h5>Dentistry</h5>
            <p>Dr. Chase spends much of her free time helping the local bunny rescue organization find homes for
                bunnies, such as Kibbles - a Dalmatian bunny who is part of the large Chase household, including two
                dogs, three cats, and a turtle.</p>
        </div>
    </section>

</div><!-- content container -->

```


### 7. Using Form Styles

#### Form styles overview

```html


```


#### Create a basic form

```html


```


#### Checkboxes and radio classes

```html


```


#### Size and validation styles

```html


```


#### Multicolumn forms

```html


```


#### Create input groups

```html


```


#### Custom form components

```html


```



### 8. Working with Interactive Components

#### Interactive component overview

```html


```


#### Add tooltips

```html


```


#### Display popovers

```html


```


#### Create alerts

```html


```


#### Use dropdowns

```html


```


#### Add collapse accordions

```html


```


#### Use modals

```html


```


#### Build carousels

```html


```


#### Use scrollspy

```html


```


#### Toasts

```html


```


#### Spinners

```html


```


#### Pagination

```html


```


#### Stretched links

```html


```


#### Embeds

```html


```


### Conclusion
