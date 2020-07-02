# JS 语法

## Lynda 课程：JavaScript for Web Designers

### 0. Introduction

#### What you should know

会使用 css 和 html，了解一些 js

#### Compatibility notes

能用 css 高效解决的，就不用 js；只在 js 擅长的地方使用 js

### 1. JavaScript in Use

#### What is JavaScript?

js 的国际标准名字是：ECMAScript

js 可以用在很多领域，该课程主要关注前台 web 领域

#### Live example

渐进增强式编程：一个网页，应该对残疾人友好，应该在只显示 html 的时候也能看，只有 html 和 css 的时候也能看，html css js 全有时也能看

#### Where you don't use JavaScript

css 来操作 hover、focus 更简单

高级的动画：同时使用 CSS 和 JS

html 能做的就让 html 做

#### JavaScript's power can be dangerous

- 安全风险（XSS）
- 性能问题：避免使用过多脚本

js 可能被拦截掉

### 2. Writing and Debugging

#### Your friend the text editor

more readable

more writable

#### Tools in action

browser develop tool：console， debugger

```javascript
(function () {
  "use strict";

  var variable1 = 2,
    variable2 = "Hello";

  console.log("Variable 1, and variable 2", variable1, variable2);
  console.error("Variable 2", variable2);
})();
```

#### Jargon 行话

数据类型

- Numbers
- Strings
- Boolean
- Objects(window, document)
- Arrays

变量和操作符

- +, =, ==, !=

函数

- 也是一种数据类型
- 在对象中的函数叫做方法

控制结构

- 条件判断：if, else, switch
- 循环：for, while

#### Jargon: The DOM

web 环境下的 js

Document Object Model(DOM)

从另一个角度看 css 的 class id tags，也是一种 dom 的接口

- 方法
  - document.getElementByID 速度最快
  - document.QuerySelector 速度也快，同时更灵活，参数使用css语法
  - document.QuerySelectorAll 速度也快，同时更灵活，参数使用css语法
- 属性
  - value
  - checked
  - className
  - id
  - forms
  - forms[1].elements

#### Vanilla JavaScript versus frameworks

单纯使用 js vs. 使用 js 的框架

### 3. Working with Forms

#### Text fields and select boxes

在浏览器console里使用 dom api来获取html数据

#### Radio buttons and checkboxes

属性：checked(true, false)

#### Changing submission with events

对事件作出反应，就会有交互性

完全由页面跳转来完成后台调用 -> 部分页面跳转调用后台 + 部分js调用后台 -> 全部js调用后台（单页面应用）

```javascript
(function() {
  "use strict";

  document
    .getElementById("cart-hplus")
    .addEventListener("submit", estimateTotal);

  function estimateTotal(event) {
    event.preventDefault;

    console.log("You submitted the form");
  }
})();
```

#### Starting to validate input

```javascript
(function() {
  "use strict";

  document
    .getElementById("cart-hplus")
    .addEventListener("submit", estimateTotal);

  function estimateTotal(event) {
    event.preventDefault();

    var state = document.getElementById("s-state");

    if (state.value === "") {
      alert("Please choose your shipping state");

      // 在alert点掉之后出现
      state.focus();

      return;
    }
  }
})();
```


#### Disabling and enabling fields

```javascript
(function() {
  "use strict";

  document.addEventListener("DOMContentLoaded", function() {
    var state = document.getElementById("s-state");

    document
      .getElementById("cart-hplus")
      .addEventListener("submit", estimateTotal);

    var btnEstimate = document.getElementById("btn-estimate");

    btnEstimate.disabled = true;

    state.addEventListener("change", function() {
      if (state.value === "") {
        btnEstimate.disabled = true;
      } else {
        btnEstimate.disabled = false;
      }
    });

    // 避免js加载陷阱，所以还是要加上这个
    function estimateTotal(event) {
      event.preventDefault();

      if (state.value === "") {
        alert("Please choose your shipping state");

        state.focus();

        return;
      }
    }
  });
})();
```


#### The basics of sanitizing user input

```javascript
(function() {
  "use strict";

  document.addEventListener("DOMContentLoaded", function() {
    var state = document.getElementById("s-state");

    document
      .getElementById("cart-hplus")
      .addEventListener("submit", estimateTotal);

    var btnEstimate = document.getElementById("btn-estimate");

    btnEstimate.disabled = true;

    state.addEventListener("change", function() {
      if (state.value === "") {
        btnEstimate.disabled = true;
      } else {
        btnEstimate.disabled = false;
      }
    });

    function estimateTotal(event) {
      event.preventDefault();

      if (state.value === "") {
        alert("Please choose your shipping state");

        state.focus();

        return;
      }

      var itemBball =
          parseInt(document.getElementById("txt-q-bball").value, 10) || 0,
        itemJersey =
          parseInt(document.getElementById("txt-q-jersey").value, 10) || 0,
        itemPower =
          parseInt(document.getElementById("txt-q-power").value, 10) || 0,
        shippingState = state.value,
        shippingMethod =
          document.querySelector("[name=r_method]:checked").value || "";

      var totalQty = itemBball + itemJersey + itemPower,
        shippingCostPer,
        shippingCost,
        taxFactor = 1,
        estimate,
        totalItemPrice = 90 * itemBball + 25 * itemJersey + 30 * itemPower;

      if (shippingState === "CA") {
        taxFactor = 1.075;
      }

      switch (shippingMethod) {
        case "usps":
          shippingCostPer = 2;
          break;
        case "ups":
          shippingCostPer = 3;
          break;
        default:
          shippingCostPer = 0;
          break;
      }

      shippingCost = shippingCostPer * totalQty;

      estimate = "$" + (totalItemPrice * taxFactor + shippingCost).toFixed(2);

      document.getElementById("txt-estimate").value = estimate;
    }
  });
})();
```


#### Get and set with innerHTML

```javascript
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    var state = document.getElementById("s-state");

    document
      .getElementById("cart-hplus")
      .addEventListener("submit", estimateTotal);

    var btnEstimate = document.getElementById("btn-estimate");

    btnEstimate.disabled = true;

    state.addEventListener("change", function () {
      if (state.value === "") {
        btnEstimate.disabled = true;
      } else {
        btnEstimate.disabled = false;
      }
    });

    function estimateTotal(event) {
      event.preventDefault();

      if (state.value === "") {
        alert("Please choose your shipping state");

        state.focus();

        return;
      }

      var itemBball =
          parseInt(document.getElementById("txt-q-bball").value, 10) || 0,
        itemJersey =
          parseInt(document.getElementById("txt-q-jersey").value, 10) || 0,
        itemPower =
          parseInt(document.getElementById("txt-q-power").value, 10) || 0,
        shippingState = state.value,
        shippingMethod =
          document.querySelector("[name=r_method]:checked").value || "";

      var totalQty = itemBball + itemJersey + itemPower,
        shippingCostPer,
        shippingCost,
        taxFactor = 1,
        estimate,
        totalItemPrice = 90 * itemBball + 25 * itemJersey + 30 * itemPower;

      if (shippingState === "CA") {
        taxFactor = 1.075;
      }

      switch (shippingMethod) {
        case "usps":
          shippingCostPer = 2;
          break;
        case "ups":
          shippingCostPer = 3;
          break;
        default:
          shippingCostPer = 0;
          break;
      }

      shippingCost = shippingCostPer * totalQty;

      estimate = "$" + (totalItemPrice * taxFactor + shippingCost).toFixed(2);

      document.getElementById("txt-estimate").value = estimate;

      var results = document.getElementById("results");

      results.innerHTML = "Total items: " + totalQty + "<br>";
      results.innerHTML +=
        "Total shipping: $" + shippingCost.toFixed(2) + "<br>";
      results.innerHTML +=
        "Tax: " +
        ((taxFactor - 1) * 100).toFixed(2) +
        "% (" +
        shippingState +
        ")<br>";

      // total items
      // total shipping cost
      // tax
    }
  });
})();
```

```javascript
.innerHtml 保留了html标签
.textContent 把html标签去掉了，只有text
```


### 4. A Matter of Time

#### Use JavaScript to tell time







#### Get pieces of time

#### Use timers to update the page

#### Polish the clock

#### Challenge: Add the date

#### Solution: Add the date

#### Filling in gaps with Moment.js

### 5. Consuming a Third-Party API

#### What is an API?

#### Create a map

#### Change the center point

#### Change the type and zoom level

#### Add a marker

#### Add a popup to the marker

#### Challenge: Modify the map

#### Solution: Modify the map

### 6. Better User Experience with an API

#### Introducing Ziptastic

#### Fetching data from a third party API

#### Better UX for the checkout page

### 7. Conclusion

#### Next step: More about JavaScript
