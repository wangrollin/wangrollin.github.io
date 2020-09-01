
## Lynda: Vue.js Essential Training

### 0. Introduction

#### Using the exercises for this course

[exercise file on github](https://github.com/planetoftheweb/vue-essentials)

```bash
git clone https://github.com/planetoftheweb/vue-essentials.git

```


### 1. Vue.js Overview

#### Basic installation

两种使用方式：
- 直接在已有的项目中添加vue.js依赖，然后开始使用
- 使用vue cli创建一个vue项目，对于大型项目比较有用


#### Reactive data

reactive是什么意思呢，就是跟着变的意思：一个变量变了，另一个依赖的变量会自动跟着变，而不需要手动去操作


#### Binding data to attributes

最佳实践：
- 对于内容，使用{{ var }}
- 对于标签属性，使用 :attribute="var"


#### Looping through data

属性 v-for


#### Conditional data

属性
- v-if
- v-else-if
- v-else

v-for v-if 可以放在同一个div的属性里


#### Handing user input

- :value="max"  仅展示，而不负责set
- v-model="max" 双向传递


#### Events and methods

@click="cart.push(item)"


### 2. Working with Templates

#### Template interpolations

```html
<!--会显示string-->
<span>{{ name }}</span>

<!--会当作html渲染后显示-->
<span v-html="name"></span>

<!--
    会显示，然后保持不变，即使name变了也不会重新渲染
    对该标签和它的子标签有效
-->
<span v-once>{{ name }}</span>

<script>
    name="xxx <b>hello</b>"
<script>

```


#### Binding attributes with v-bind

```html
<!-- 茴香豆的三种写法 -->

<img
    v-bind="{
        class: imgClass,
        src: products[0].image,
        alt: products[0].name
    }"
/>

<img v-bind:src="products[0].image"
     v-bind:alt="products[0].name">

<img :src="products[0].image"
     :alt="products[0].name">

```


#### Using computed properties

就像数据库的一个视图


#### Using methods

computed 和 methods 的区别
- computed只有存在reactive var的时候，才会计算，其他情况只返回缓存的计算结果（所以在conputed里放一个var date = new Date()，这个date不会更新，因为不是reactive var）
- methods每次都会计算


### 3. managing CSS Styles

#### Binding classes with objects and arrays

```html
<!-- 其他属性只有一个值，但是class和style有很多值 -->

<div class="font-weight-bold mr-2"></div>
<div :class="['font-weight-bold', 'mr-2']"></div>

<div style="width: 60px; text-align: center"></div>
<div :style="{'width': '60px', 'text-align': 'center'}"></div>

```


#### Expressions and computed classes

```html
<div :style="{'width': '60px', 'text-align': 'center'}"></div>

<div :style="{'width': '60px', textAlign: 'center'}"></div>

<div :style="{'width': inputWidth, 'text-align': 'center'}"></div>
inputWidth: '60px'

<div :style="{'width': inputWidth + 'px', 'text-align': 'center'}"></div>
inputWidth: 60


<div class="font-weight-bold mr-2"></div>

<div class="font-weight-bold" :class="'mr-2'"></div>

<div class="font-weight-bold" :class="sliderState"></div>

<script>
    computed: {
        silderState: function() {
            return 'mr-2';
        }
    }
</script>

```


#### Creating transitions and animations

vue做这些变换的原理是：添加和去掉一些class


#### Using an animation framework

animate.css

```html
<!-- animated 代表由animate.css来控制 -->
<transition name="custom" 
        enter-active-class="animated fadeInDown"
        leave-active-class="animated fadeOutRight"></transition>

```


#### Working with transition groups

```html
<transition-group name="fade" tag="dev"
    enter-active-class="animated fadeInDown"
    leave-active-class="animated fadeOutRight">

    <div v-for="item in products"></div>

</transition-group>

```


#### namaging styles with javaScript

```html
<transition-group name="fade" tag="dev"
    @beforeEnter="beforeEnter"
    @enter="enter"
    @leave="leave">

    <div v-for="item in products"></div>

</transition-group>

<script>
    methods: {
        beforeEnter: function(el) {
            el.className='d-none'
        },
        enter: function(el) {
            var delay = el.dataset.index * 100;
            setTimeout(function() {
                el.classNamr='row d-flex mb-3 animated fadeInRight'
            }, delay);
        },
        leave: function(el) {
            var delay = el.dataset.index * 100;
            setTimeout(function() {
                el.classNamr='row d-flex mb-3 animated fadeOutRight'
            }, delay);
        }
    }
</script>

```


### 4. Digging Deeper

#### Creating filters

```html

<p>{{ price | currency }}</p>

<script>
    var app = new Vue({
        filters: {
            currency: function(value) {
                return "$" + Number.parseFloat(value).toFixed(2);
            }
        }
    })
</script>
```

```html
<!-- filter can be chained -->
<p :class="price | currency | func">aaa</p>
<p>{{ price | currency | func }}</p>

<script>

    // 可以在外部定义filter
    Vue.filter('currency', function(value) {
                return "$" + Number.parseFloat(value).toFixed(2);
            })

    var app = new Vue({

    })
</script>
```


#### Deleting items and modifiers

```html
<!-- stop 就是一个 modifiers，bootstrap默认点击下拉菜单，菜单会消失，加了这个，就不会消失了 -->
<a @click.stop="remove"></a>

```


### 5. Component Based Vue

#### Prop options

```html
<script>
    Vue.component("a-pod", {
        props: ["date"]
    });

    // 可以传递默认值
    Vue.component("a-pod", {
        props: {
            value: Number,
            prefix: {
                type: String,
                default: '$'
            },
            precision: {
                type: Number,
                default: 2
            },
            conversion: {
                type: Number,
                default: 1
            }
        }
    });

</script>
```


### 6. Building with the CLI

#### Installing additional modules

```bash
npm i --save animate.css bootstrap jquery popper.js vue-router

npm i --save @fortawesome/fontawesome-free \
                @fortawesome/fontawesome-svg-core \
                @fortawesome/free-solid-svg-icons \
                @fortawesome/vue-fontawesome

```

```javascript
// main.js
import Vue from "vue";
import App from "./App.vue";
import "bootstrap";
import { library } from "@fortawesome/fontawesome-svg-core";

import "bootstrap/dist/css/bootstrap.css";
import "animate.css/animate.css";

import {
    faShoppingCart,
    faDollarSign,
} from "@fortawesome/free-solid-svg-icons";

library.add(faShoppingCart, faDollarSign);

Vue.config.productionTip = false;

new Vue({
    render: (h) => h(App),
}).$mount("#app");

```


#### Testing your module installations

```html
<!-- App.vue -->
<template>
  <div id="app" class="container mt-5">
    <h1>My Shop</h1>
    <p class="animated fadeInRight">Take a look at our offerings below</p>
    <font-awesome-icon icon="shopping-cart"></font-awesome-icon>
  </div>
</template>

<script>
// 从外面拿到vue component
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default {
  name: "app",
  components: {
    FontAwesomeIcon
  }
};
</script>

```


### 7. Projects with the Build Tools

#### Creating a component

```html
<!-- Price.vue -->
<template>
    <span>{{
        this.prefix +
        Number.parseFloat(this.value * this.conversion).toFixed(this.precision)
    }}</span>
</template>

<script>
export default {
    props: {
        value: Number,
        prefix: {
            type: String,
            default: "$",
        },
        precision: {
            type: Number,
            default: 2,
        },
        conversion: {
            type: Number,
            default: 1,
        },
    },
};
</script>

```


#### Managing complex child components

```html
<!-- ProductList.vue -->
<template>
    <transition-group
        name="fade"
        tag="div"
        @beforeEnter="beforeEnter"
        @enter="enter"
        @leave="leave"
    >
        <div
            class="row d-none mb-3 align-items-center"
            v-for="(item, index) in products"
            :key="item.id"
            v-if="item.price <= Number(maximum)"
            :data-index="index"
        >
            <div class="col-1 m-auto">
                <button class="btn btn-info" @click="$emit('add', item)">
                    +
                </button>
            </div>
            <div class="col-4">
                <img
                    class="img-fluid d-block"
                    :src="item.image"
                    :alt="item.name"
                />
            </div>
            <div class="col">
                <h3 class="text-info">{{ item.name }}</h3>
                <p class="mb-0">{{ item.description }}</p>
                <div class="h5 float-right">
                    <price :value="Number(item.price)"></price>
                </div>
            </div>
        </div>
    </transition-group>
</template>

<script>
import Price from "./Price.vue";

export default {
    name: "product-list",
    components: { Price },
    props: ["products", "maximum"],
    methods: {
        beforeEnter: function (el) {
            el.className = "d-none";
        },
        enter: function (el) {
            var delay = el.dataset.index * 100;
            setTimeout(function () {
                el.className =
                    "row d-flex mb-3 align-items-center animated fadeInRight";
            }, delay);
        },
        leave: function (el) {
            var delay = el.dataset.index * 100;
            setTimeout(function () {
                el.className =
                    "row d-flex mb-3 align-items-center animated fadeOutRight";
            }, delay);
        },
    },
};
</script>

```

```html
<!-- App.vue -->
<template>
    <div id="app" class="container mt-5">
        <h1>My Shop</h1>
        <product-list
            :maximum="maximum"
            :products="products"
            @add="addItem"
        ></product-list>
    </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import ProductList from "./components/ProductList.vue";

export default {
    name: "app",
    data: function () {
        return {
            maximum: 99,
            cart: [],
            products: null,
        };
    },
    methods: {
        addItem: function (product) {
            var whichProduct;
            var existing = this.cart.filter(function (item, index) {
                if (item.product.id == Number(product.id)) {
                    whichProduct = index;
                    return true;
                } else {
                    return false;
                }
            });

            if (existing.length) {
                this.cart[whichProduct].qty++;
            } else {
                this.cart.push({ product: product, qty: 1 });
            }
        },
    },
    components: {
        FontAwesomeIcon,
        ProductList,
    },
    mounted: function () {
        fetch("https://hplussport.com/api/products/order/price")
            .then((response) => response.json())
            .then((data) => {
                this.products = data;
            });
    },
};
</script>

```


#### Emitting updates

```html
<!-- PriceSlider.vue -->
<template>
    <transition name="fade">
        <div v-if="sliderStatus">
            <div class="align-items-center" :class="sliderState">
                <label :class="labelArr" for="formMax">max</label>
                <input
                    type="text"
                    id="formMax"
                    class="form-control mx-2 text-center"
                    style="width: 60px;"
                    v-model="maxAmount"
                    @change="$emit('update:maximum', maxAmount)"
                />
                <!--
                    更新parent的maximun，本质上是一个，但是不能下面改上面
                -->
                <input
                    type="range"
                    class="custom-range"
                    min="0"
                    max="200"
                    v-model="maxAmount"
                    @input="$emit('update:maximum', maxAmount)"
                />
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    name: "price-slider",
    data: function () {
        return {
            maxAmount: 99,
        };
    },
    props: ["sliderStatus"],
    computed: {
        sliderState: function () {
            return this.sliderStatus ? "d-flex" : "d-none";
        },
    },
};
</script>

<style>
.fade-enter,
.fade-leave-to {
    opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
    transition: all 1s ease-in-out;
}
</style>

```

```html
<!-- App.vue -->
<template>
    <div id="app" class="container mt-5">
        <h1>My Shop</h1>
        <!--
            这里直接sync
        -->
        <price-slider
            :sliderStatus="sliderStatus"
            :maximum.sync="maximum"
        ></price-slider>
        <product-list
            :maximum="maximum"
            :products="products"
            @add="addItem"
        ></product-list>
    </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import ProductList from "./components/ProductList.vue";
import PriceSlider from "./components/PriceSlider.vue";

export default {
    name: "app",
    data: function () {
        return {
            maximum: 99,
            sliderStatus: true,
            cart: [],
            products: null,
        };
    },
    methods: {
        addItem: function (product) {
            var whichProduct;
            var existing = this.cart.filter(function (item, index) {
                if (item.product.id == Number(product.id)) {
                    whichProduct = index;
                    return true;
                } else {
                    return false;
                }
            });

            if (existing.length) {
                this.cart[whichProduct].qty++;
            } else {
                this.cart.push({ product: product, qty: 1 });
            }
        },
    },
    components: {
        FontAwesomeIcon,
        ProductList,
        PriceSlider,
    },
    mounted: function () {
        fetch("https://hplussport.com/api/products/order/price")
            .then((response) => response.json())
            .then((data) => {
                this.products = data;
            });
    },
};
</script>

```


#### Adding navigation

```html
<!-- Navbar.vue -->
<template>
    <nav class="navbar navbar-light fixed-top">
        <div class="navbar-text ml-auto d-flex">
            <button
                class="btn btn-sm btn-outline-success"
                @click="$emit('toggle')"
            >
                <i class="fas fa-dollar-sign"></i>
                <font-awesome-icon icon="dollar-sign"></font-awesome-icon>
            </button>
            <div class="dropdown ml-2" v-if="cart.length > 0">
                <button
                    class="btn btn-success btn-sm dropdown-toggle"
                    id="cartDropdown"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                >
                    <span class="badge badge-pill badge-light">{{
                        cartQty
                    }}</span>
                    <i class="fas fa-shopping-cart mx-2"></i>
                    <price :value="Number(cartTotal)"></price>
                </button>
                <div
                    class="dropdown-menu dropdown-menu-right"
                    aria-labelledby="cartDropdown"
                >
                    <div v-for="(item, index) in cart" :key="index">
                        <div class="dropdown-item-text text-nowrap text-right">
                            <span
                                class="badge badge-pill badge-warning align-text-top mr-1"
                                >{{ item.qty }}</span
                            >
                            {{ item.product.name }}
                            <b>
                                <price
                                    :value="
                                        Number(item.qty * item.product.price)
                                    "
                                ></price>
                            </b>
                            <a
                                href="#"
                                @click.stop="$emit('delete', index)"
                                class="badge badge-danger text-white"
                                >-</a
                            >
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
import Price from "./Price.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default {
    name: "navbar",
    props: ["cart", "cartQty", "cartTotal"],
    components: {
        FontAwesomeIcon,
        Price,
    },
};
</script>

```

```html
<!-- App.vue -->
<template>
    <div id="app" class="container mt-5">
        <h1>My Shop</h1>
        <navbar
            :cart="cart"
            :cartQty="cartQty"
            :cartTotal="cartTotal"
            @toggle="toggleSliderStatus"
            @delete="deleteItem"
        ></navbar>
        <price-slider
            :sliderStatus="sliderStatus"
            :maximum.sync="maximum"
        ></price-slider>
        <product-list
            :maximum="maximum"
            :products="products"
            @add="addItem"
        ></product-list>
    </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import ProductList from "./components/ProductList.vue";
import PriceSlider from "./components/PriceSlider.vue";
import Navbar from "./components/Navbar.vue";

export default {
    name: "app",
    components: {
        FontAwesomeIcon,
        ProductList,
        PriceSlider,
        Navbar,
    },
    data: function () {
        return {
            maximum: 99,
            sliderStatus: true,
            cart: [],
            products: null,
        };
    },
    computed: {
        cartTotal: function () {
            let sum = 0;
            for (let key in this.cart) {
                sum = sum + this.cart[key].product.price * this.cart[key].qty;
            }
            return sum;
        },
        cartQty: function () {
            let qty = 0;
            for (let key in this.cart) {
                qty = qty + this.cart[key].qty;
            }
            return qty;
        },
    },
    methods: {
        toggleSliderStatus: function () {
            this.sliderStatus = !this.sliderStatus;
        },
        deleteItem: function (id) {
            if (this.cart[id].qty > 1) {
                this.cart[id].qty--;
            } else {
                this.cart.splice(id, 1);
            }
        },
        addItem: function (product) {
            var whichProduct;
            var existing = this.cart.filter(function (item, index) {
                if (item.product.id == Number(product.id)) {
                    whichProduct = index;
                    return true;
                } else {
                    return false;
                }
            });

            if (existing.length) {
                this.cart[whichProduct].qty++;
            } else {
                this.cart.push({ product: product, qty: 1 });
            }
        },
    },
    mounted: function () {
        fetch("https://hplussport.com/api/products/order/price")
            .then((response) => response.json())
            .then((data) => {
                this.products = data;
            });
    },
};
</script>

```


### 8. Using the Vue Router

#### Reorganizing hierarchy

**把component降一级**

```html
<template>
  <transition name="fade">
    <div v-if="sliderStatus">
      <div class="align-items-center" :class="sliderState">
        <label class="font-weight-bold mr-2" for="formMax">max</label>
        <input
          type="text"
          id="formMax"
          class="form-control mx-2 text-center"
          style="width: 60px;"
          v-model="maxAmount"
          @change="$parent.$emit('update:maximum', maxAmount)"
        >
        <!-- $parent.$emit -->
        <input
          type="range"
          class="custom-range"
          min="0"
          max="200"
          v-model="maxAmount"
          @input="$parent.$emit('update:maximum', maxAmount)"
        >
      </div>
    </div>
  </transition>
</template>

```


#### Creating route links

```html
<!-- Checkout.vue -->
<template>
    <div>
        <h1>Checkout</h1>

        <table class="table table-hover" v-if="cart.length">
            <caption class="text-right h3">
                <b>Total:</b>
                <price
                    class="d-block text-success font-weight-light"
                    :value="Number(cartTotal)"
                ></price>
            </caption>
            <thead>
                <tr>
                    <th scope="col"></th>
                    <th scope="col">Item</th>
                    <th scope="col" class="text-center">Qty</th>
                    <th scope="col" class="text-right">Price</th>
                    <th scope="col" class="text-right">Sub-total</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in cart" :key="item.product.id">
                    <td class="text-center">
                        <div
                            class="btn-group"
                            role="group"
                            aria-label="Basic example"
                        >
                            <button
                                @click="$emit('add', item.product)"
                                class="btn btn-info"
                            >
                                +
                            </button>
                            <button
                                @click="$emit('delete', index)"
                                class="btn btn-outline-info"
                            >
                                -
                            </button>
                        </div>
                    </td>
                    <th scope="row">{{ item.product.name }}</th>
                    <td class="text-center">{{ item.qty }}</td>
                    <td class="text-right">{{ Number(item.product.price) }}</td>
                    <td class="text-right">
                        {{ Number(item.qty * item.product.price) }}
                    </td>
                </tr>
            </tbody>
        </table>
        <!--
            使用router-link
        -->
        <router-link class="btn btn-sm btn-outline-info text-dark" to="/"
            >Keep Shopping</router-link
        >
    </div>
</template>

<script>
import Price from "./Price.vue";

export default {
    name: "checkout",
    props: ["cart", "cartTotal"],
    components: {
        Price,
    },
};
</script>

```

```html
<!-- App.vue -->
<template>
    <div id="app" class="container mt-5">
        <!--
            把各个component需要的参数都传进去
        -->
        <router-view
            :cart="cart"
            :cartQty="cartQty"
            :cartTotal="cartTotal"
            :sliderStatus="sliderStatus"
            :maximum.sync="maximum"
            :products="products"
            @add="addItem"
            @delete="deleteItem"
            @toggle="toggleSliderStatus"
        ></router-view>
    </div>
</template>

<script>
export default {
    name: "app",
    data: function () {
        return {
            maximum: 99,
            sliderStatus: true,
            cart: [],
            products: null,
        };
    },
    computed: {
        cartTotal: function () {
            let sum = 0;
            for (let key in this.cart) {
                sum = sum + this.cart[key].product.price * this.cart[key].qty;
            }
            return sum;
        },
        cartQty: function () {
            let qty = 0;
            for (let key in this.cart) {
                qty = qty + this.cart[key].qty;
            }
            return qty;
        },
    },
    methods: {
        toggleSliderStatus: function () {
            this.sliderStatus = !this.sliderStatus;
        },
        deleteItem: function (id) {
            if (this.cart[id].qty > 1) {
                this.cart[id].qty--;
            } else {
                this.cart.splice(id, 1);
            }
        },
        addItem: function (product) {
            var whichProduct;
            var existing = this.cart.filter(function (item, index) {
                if (item.product.id == Number(product.id)) {
                    whichProduct = index;
                    return true;
                } else {
                    return false;
                }
            });

            if (existing.length) {
                this.cart[whichProduct].qty++;
            } else {
                this.cart.push({ product: product, qty: 1 });
            }
        },
    },
    mounted: function () {
        fetch("https://hplussport.com/api/products/order/price")
            .then((response) => response.json())
            .then((data) => {
                this.products = data;
            });
    },
};
</script>

```

```javascript
// main.js
import Vue from "vue";
import VueRouter from "vue-router";

import App from "./App.vue";
import "bootstrap";
import { library } from "@fortawesome/fontawesome-svg-core";

import "bootstrap/dist/css/bootstrap.css";
import "animate.css/animate.css";

import {
    faShoppingCart,
    faDollarSign,
} from "@fortawesome/free-solid-svg-icons";

library.add(faShoppingCart, faDollarSign);

import Products from "./components/Products.vue";
import Checkout from "./components/Checkout.vue";

Vue.use(VueRouter);
Vue.config.productionTip = false;

// 创建一个路由
const router = new VueRouter({
    routes: [
        {
            path: "*",
            component: Products,
        },
        {
            path: "/checkout",
            component: Checkout,
        },
    ],
});

new Vue({
    render: (h) => h(App),
    router,
}).$mount("#app");

```
