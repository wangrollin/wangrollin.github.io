# JS 语法


## Lynda 课程：Learning the JavaScript Language

### 1. Getting started

##### Versions of javascript

ECMAScript 5: ES5；可以把这个版本当作baseline

ECMAScript 2015: ES6

ECMAScript 2016


##### Additional helpful resources

http://eloquentjavascript.net/
http://exploringjs.com/
https://github.com/getify/You-Dont-Know-JS
https://shop.oreilly.com/product/9780596517748.do
https://github.com/dwyl/Javascript-the-Good-Parts-notes
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference
https://caniuse.com/
https://quirksmode.org/


### 2. Variables and types

##### Declaring and assigning variabes







##### Strings

##### String properties and methods

##### Numbers

##### Booleans and the quest for truth


### 3. Objects, Arrays, and More

##### Objects

##### Objects for modeling data

##### Manipulating objects

##### Jargon: References and objects

##### Arrays

##### Manipulating arrays

##### Readability: Whitespace

##### Readability: Comments

##### Regular expressions


### 4. Operators and Control Structures

##### Simple comparisons

##### Arithmetic operators

##### Logical operators

##### Conditionals: if

##### Conditionals: switch

##### Terse ifs

##### Ternary operator

##### type checking


### 5. Iterating with loops

##### For loops: Sequential

##### For loops: Enumerative

##### while loops


### 6. Functions

##### Basic functions

##### Arguments in functions

##### more on arguments

##### objects, references, and functions

##### functions are objects

##### Jargon: Scope in javascript

##### variable scope in functions

##### Jargon: Callback functions


### 7. More Advanced pieces

##### Asynchronous code: The waiting is the hardest part

##### Promises, async, and await

##### object-oriented javascript: Prototypes and classes

##### JargonL: Strong vs loose typing 

##### Modern javascript tooling


### Conclusion



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
(function () {
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
(function () {
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
                    parseInt(
                        document.getElementById("txt-q-bball").value,
                        10
                    ) || 0,
                itemJersey =
                    parseInt(
                        document.getElementById("txt-q-jersey").value,
                        10
                    ) || 0,
                itemPower =
                    parseInt(
                        document.getElementById("txt-q-power").value,
                        10
                    ) || 0,
                shippingState = state.value,
                shippingMethod =
                    document.querySelector("[name=r_method]:checked").value ||
                    "";

            var totalQty = itemBball + itemJersey + itemPower,
                shippingCostPer,
                shippingCost,
                taxFactor = 1,
                estimate,
                totalItemPrice =
                    90 * itemBball + 25 * itemJersey + 30 * itemPower;

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

            estimate =
                "$" + (totalItemPrice * taxFactor + shippingCost).toFixed(2);

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
                    parseInt(
                        document.getElementById("txt-q-bball").value,
                        10
                    ) || 0,
                itemJersey =
                    parseInt(
                        document.getElementById("txt-q-jersey").value,
                        10
                    ) || 0,
                itemPower =
                    parseInt(
                        document.getElementById("txt-q-power").value,
                        10
                    ) || 0,
                shippingState = state.value,
                shippingMethod =
                    document.querySelector("[name=r_method]:checked").value ||
                    "";

            var totalQty = itemBball + itemJersey + itemPower,
                shippingCostPer,
                shippingCost,
                taxFactor = 1,
                estimate,
                totalItemPrice =
                    90 * itemBball + 25 * itemJersey + 30 * itemPower;

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

            estimate =
                "$" + (totalItemPrice * taxFactor + shippingCost).toFixed(2);

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

```javascript
(function () {
    "use strict";

    document.addEventListener("DOMContentLoaded", function () {
        var c = document.getElementById("current-time");

        var d = new Date();

        c.innerHTML = d.toTimeString();
    });
})();
```


#### Get pieces of time

```javascript
(function () {
    "use strict";

    document.addEventListener("DOMContentLoaded", function () {
        var c = document.getElementById("current-time");

        var d = new Date();

        var hours = d.getHours();
        if (hours > 12) {
            hours -= 12;
        }

        c.innerHTML = hours + ":" + d.getMinutes();
    });
})();
```


#### Use timers to update the page

```javascript
(function () {
    "use strict";

    document.addEventListener("DOMContentLoaded", function () {
        var c = document.getElementById("current-time");

        setInterval(updateTime, 1000);

        function updateTime() {
            var d = new Date();

            var hours = d.getHours();
            if (hours > 12) {
                hours -= 12;
            }

            var sep = ":";
            if (d.getSeconds() % 2 === 1) sep = " ";

            c.innerHTML = hours + sep + d.getMinutes();
        }
    });
})();
```


#### Polish the clock

```javascript
(function () {
    "use strict";

    document.addEventListener("DOMContentLoaded", function () {
        var c = document.getElementById("current-time");

        setInterval(updateTime, 1000);

        function updateTime() {
            var d = new Date();

            var hours = d.getHours(),
                minutes = d.getMinutes(),
                ampm = "AM";

            if (hours > 12) {
                hours -= 12;
                ampm = "PM";
            } else if (hours === 0) {
                hours = 12;
            }

            if (minutes < 10) {
                minutes = "0" + minutes;
            }

            var sepClass = "";
            if (d.getSeconds() % 2 === 1) sepClass = "trans";

            var sep = "<span class='" + sepClass + "'>:</span>";

            c.innerHTML = hours + sep + minutes + " " + ampm;
        }
    });
})();
```


#### Solution: Add the date

```javascript
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
      var currentTime = document.getElementById("current-time"),
          currentDate = document.getElementById("current-date");

      setInterval(function () {
          var d = new Date();

          var hours = d.getHours(),
              minutes = d.getMinutes(),
              month = formatMonth(d.getMonth()),
              date = d.getDate(),
              ampm = "AM";

          if (hours > 12) {
              hours -= 12;
              ampm = "PM";
          } else if (hours === 0) {
              hours = 12;
          }

          if (minutes < 10) {
              minutes = "0" + minutes;
          }

          var sepClass = "";
          if (d.getSeconds() % 2 === 1) sepClass = "trans";

          var sep = '<span class="' + sepClass + '">:</span>';

          currentTime.innerHTML = hours + sep + minutes + " " + ampm;
          currentDate.textContent = month + " " + date;
      }, 1000);

      function formatMonth(m) {
          m = parseInt(m, 10);

          if (m < 0) {
              m = 0;
          } else if (m > 11) {
              m = 11;
          }

          /*
      var monthName;
      switch(m) {
        case 0 :
          monthName = "January";
          break;
        case 1 :
          monthName = "February";
          break;
        // and so on...
      }
    */

          var monthNames = [
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December",
          ];

          return monthNames[m];
      }
  });
})();
```


#### Filling in gaps with Moment.js

```javascript
(function () {
    "use strict";

    document.addEventListener("DOMContentLoaded", function () {
        var currentTime = document.getElementById("current-time"),
            currentDate = document.getElementById("current-date");

        setInterval(function () {
            // var dm = moment();
            var d = new Date();
            date.plugin("meridiem");

            var sepClass = "";
            if (d.getSeconds() % 2 === 1) sepClass = "trans";

            var sep = '<span class="' + sepClass + '">:</span>';

            currentTime.innerHTML =
                date.format(d, "h") + sep + date.format(d, "mm AA");
            currentDate.textContent = date.format(d, "MMMM D");
        }, 1000);
    });
})();
```


### 5. Consuming a Third-Party API

#### What is an API?

[bing的内嵌地图](https://www.bing.com/maps/embed-a-map?src=SHELL&cp=22.404211197667138~114.52010172663205&lvl=10&form=LMLTEW)


#### Create a map

[bing maps portal 网站](https://www.bingmapsportal.com/)

[Bing Maps 文档](https://docs.microsoft.com/en-us/bingmaps/)

```javascript
var bMapAPIKey = "YOUR_API_KEY";

function initMap() {
    "use strict";

    var map = new Microsoft.Maps.Map("#hplus-map", {
        // credentials: 'Your Bing Maps Key',
        center: new Microsoft.Maps.Location(51.50632, -0.12714),
        mapTypeId: Microsoft.Maps.MapTypeId.aerial,
        zoom: 10,
    });
}
```


#### Change the center point

[gpsvisualizer](https://www.gpsvisualizer.com/)

geocoding


#### Change the type and zoom level

```html
<div id="hplus-map"></div>

<script type='text/javascript' src='https://www.bing.com/api/maps/mapcontrol?callback=initMap&key=YOUR_API_KEY' async defer></script>
```


```javascript
var bMapAPIKey = "YOUR_API_KEY";

var map;
function initMap() {
    "use strict";

    map = new Microsoft.Maps.Map("#hplus-map", {
        credentials: bMapAPIKey,
        center: new Microsoft.Maps.Location(34.10309, -118.326493),
        mapTypeId: Microsoft.Maps.MapTypeId.road,
        zoom: 14,
        disableScrollWheelZoom: true,
        disablePanning: true,
    });
}
```


#### Add a marker

```javascript
var bMapAPIKey = "YOUR_API_KEY";

var map;
function initMap() {
    "use strict";

    var storeLocation = new Microsoft.Maps.Location(34.10309, -118.326493);

    map = new Microsoft.Maps.Map("#hplus-map", {
        credentials: bMapAPIKey,
        center: storeLocation,
        mapTypeId: Microsoft.Maps.MapTypeId.road,
        zoom: 14,
        disableScrollWheelZoom: true,
        disablePanning: true,
    });

    var pin = new Microsoft.Maps.Pushpin(storeLocation, {
        title: "H+ Sport in Hollywood",
        subTitle: "(Actually Capitol Records)",
    });

    //Add the pushpin to the map
    map.entities.push(pin);
}
```


#### Add a popup to the marker

```javascript
var bMapAPIKey = "YOUR_API_KEY";

var map;
function initMap() {
    "use strict";

    var storeLocation = new Microsoft.Maps.Location(34.10309, -118.326493);

    map = new Microsoft.Maps.Map("#hplus-map", {
        credentials: bMapAPIKey,
        center: storeLocation,
        mapTypeId: Microsoft.Maps.MapTypeId.road,
        zoom: 14,
        disableScrollWheelZoom: true,
        disablePanning: true,
    });

    //Create an infobox at the center of the map but don't show it.
    var infobox = new Microsoft.Maps.Infobox(map.getCenter(), {
        visible: false,
    });

    //Assign the infobox to a map instance.
    infobox.setMap(map);

    var pin = new Microsoft.Maps.Pushpin(storeLocation, {
        title: "H+ Sport in Hollywood",
        subTitle: "(Actually Capitol Records)",
    });
    pin.metadata = {
        title: "H+ Sport in Hollywood",
        description: "1750 Vine St, Los Angeles, CA",
    };

    //Add the pushpin to the map
    map.entities.push(pin);

    Microsoft.Maps.Events.addHandler(pin, "click", function pushpinClicked(e) {
        //Make sure the infobox has metadata to display.
        if (e.target.metadata) {
            //Set the infobox options with the metadata of the pushpin.
            infobox.setOptions({
                location: e.target.getLocation(),
                title: e.target.metadata.title,
                description: e.target.metadata.description,
                visible: true,
            });
        }
    });
}
```


#### Solution: Modify the map

```javascript
var bMapAPIKey = "YOUR_API_KEY";

var map;
function initMap() {
    "use strict";

    var storeLocationHollywood = new Microsoft.Maps.Location(
            34.1031131,
            -118.326343
        ),
        storeLocationChavez = new Microsoft.Maps.Location(
            34.073873,
            -118.24077740000001
        ),
        centerPoint = new Microsoft.Maps.Location(
            34.0937772394951,
            -118.27888622568359
        );

    map = new Microsoft.Maps.Map("#hplus-map", {
        credentials: bMapAPIKey,
        center: centerPoint,
        zoom: 12,
        mapTypeId: Microsoft.Maps.MapTypeId.road,
        disableScrollWheelZoom: true,
        disablePanning: true,
    });

    // Create infobox, which is reusable
    var infobox = new Microsoft.Maps.Infobox(map.getCenter(), {
        visible: false,
    });

    // Assign the infobox to a map instance.
    infobox.setMap(map);

    // add a pin for the Hollywood location
    var pinHollywood = new Microsoft.Maps.Pushpin(storeLocationHollywood, {
        title: "H+ Sport in Hollywood",
        subTitle: "(actually Capitol Records)",
    });
    Microsoft.Maps.Events.addHandler(pinHollywood, "click", pinClick);

    pinHollywood.metadata = {
        title: "H+ Sport Hollywood",
        description: "1750 Vine St, Los Angeles, CA",
    };

    map.entities.push(pinHollywood);

    // add a pin for the Chavez Ravine location
    var pinChavez = new Microsoft.Maps.Pushpin(storeLocationChavez, {
        title: "H+ Sport in Chavez Ravine",
        subTitle: "(actually Dodger Stadium)",
    });

    Microsoft.Maps.Events.addHandler(pinChavez, "click", pinClick);

    pinChavez.metadata = {
        title: "H+ Sport Chavez Ravine",
        description: "1000 Vin Scully Ave<br>Los Angeles, CA",
    };

    map.entities.push(pinChavez);

    function pinClick(e) {
        //Make sure the infobox has metadata to display.
        if (e.target.metadata) {
            //Set the infobox options with the metadata of the pushpin.
            infobox.setOptions({
                location: e.target.getLocation(),
                title: e.target.metadata.title,
                description: e.target.metadata.description,
                visible: true,
            });
        }
    }
}

// https://dev.virtualearth.net/REST/v1/Locations?q=1000 Vin Scully Ave, Los Angeles,CA&key=YOUR_KEY_HERE
```


### 6. Better User Experience with an API

#### Introducing Ziptastic

#### Fetching data from a third party API

```javascript
(function () {
    "use strict";

    document.addEventListener("DOMContentLoaded", function () {
        document.querySelector("body").classList.add("js");

        var zipField = document.getElementById("billing_postcode"),
            cityField = document.getElementById("billing_city"),
            stateField = document.getElementById("billing_state");

        zipField.addEventListener("blur", function queryPostalCode() {
            var zipCode = parseInt(zipField.value, 10);
            if (zipCode <= 0 || zipCode > 99999) return;

            // making the query

            cityField.parentNode.parentNode.style.display = "block";
            stateField.parentNode.parentNode.style.display = "block";
        });
    });
})();
```


#### Better UX for the checkout page

```javascript
(function () {
    "use strict";

    document.addEventListener("DOMContentLoaded", function () {
        document.querySelector("body").classList.add("js");

        var zipField = document.getElementById("billing_postcode"),
            cityField = document.getElementById("billing_city"),
            stateField = document.getElementById("billing_state");

        zipField.addEventListener("blur", function queryPostalCode() {
            var zipCode = parseInt(zipField.value, 10);
            if (zipCode <= 0 || zipCode > 99999) return;

            // making the query
            axios
                .get("../api?zip=" + zipCode)
                .then(function (response) {
                    // handle success
                    console.log(response.data);

                    var state = response.data.abbr;
                    var city = response.data.city;

                    cityField.value = city;
                    stateField.value = state;

                    cityField.parentNode.parentNode.style.display = "block";
                    stateField.parentNode.parentNode.style.display = "block";
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                });
        });
    });
})();
```


### 7. Conclusion

#### Next step: More about JavaScript




