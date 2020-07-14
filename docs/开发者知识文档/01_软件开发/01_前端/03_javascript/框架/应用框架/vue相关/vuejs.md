

## 官网

https://cn.vuejs.org/v2/guide/


## Lynda课程：Learning Vue.js

### 1. The simplest form

#### why use a javaScript framework

为了更好地 **data-binding**

就像java spring框架的核心是 IoC 和 AOP，js框架的核心是data-binding


#### adding vue to a webpage

[vue 官网](https://cn.vuejs.org/index.html)

Vue让数据绑定更加简洁

```html
<!DOCTYPE html>

<div id="app">
    <h1>{{greeting}}</h1>
</div>

<script src="https://cdn.jsdelivr.net/npm/vue@2.5.17/dist/vue.js"></script>
<script>
    // 一个Vue实例会挂载在id为app的元素上面
    new Vue({
        el: "#app",
        data: {
            greeting: "Hello from Vue!",
        },
    });
</script>
```


#### understanding execution flow

顺序很重要：

- 只有先加载了html，js中的`#app`才能找到
- 只有先下载了vue.js，js中的`new Vue()`才不会报错


#### a bootstrap detour

[bootstrap 官网](https://getbootstrap.com/)

```html
<!DOCTYPE html>

<link
    rel="stylesheet"
    href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"
    integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO"
    crossorigin="anonymous"
/>

<div id="app">
    <div class="container">
        <form class="mt-5">
            <div class="form-group">
                <label for="email">Email</label>
                <input
                    type="email"
                    id="email"
                    class="form-control form-control-lg"
                />
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/vue@2.5.17/dist/vue.js"></script>
<script>
    new Vue({
        el: "#app",
        data: {},
    });
</script>
```


#### thinking declaratively with data binding

```html
<!DOCTYPE html>

<link
    rel="stylesheet"
    href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"
    integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO"
    crossorigin="anonymous"
/>

<div id="app">
    <div class="container">
        <form class="mt-5">
            <div class="form-group">
                <label for="email">Email</label>

                <!-- 
                    茴香豆的三种写法：
                        value="{{email}}"  这种写法在vue未加载的时候有副作用
                        v-bind:value="email" 这种写法在vue未加载的时候会被浏览器略过去
                        :value="email"  这种写法在vue未加载的时候会被浏览器略过去，语法糖，更简洁
                -->
                <input
                    type="email"
                    :value="email" 
                    id="email"
                    class="form-control form-control-lg"
                />
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/vue@2.5.17/dist/vue.js"></script>
<script>
    new Vue({
        el: "#app",
        data: {
            email: "mike@example.com",
        },
    });
</script>
```


#### understanding two-way data binding

```html
<!DOCTYPE html>

<link
    rel="stylesheet"
    href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"
    integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO"
    crossorigin="anonymous"
/>

<div id="app">
    <div class="container">
        <form class="mt-5">
            <div class="form-group">
                <label for="email">Email</label>

                <!--
                    v-model 和 v-bind 的区别：前者是双向的，后者是单向的
                    所以在用户可以更改的地方用v-model，在其他地方用v-bind
                -->
                <input
                    type="email"
                    v-model="email"
                    id="email"
                    class="form-control form-control-lg"
                />
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/vue@2.5.17/dist/vue.js"></script>
<script>
    // vm: view model
    // 可以通过浏览器的console拿到，vm.email
    var vm = new Vue({
        el: "#app",
        data: {
            email: "mike@example.com",
        },
    });
</script>
```


#### methods and event handling

```html
<!DOCTYPE html>

<link
    rel="stylesheet"
    href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"
    integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO"
    crossorigin="anonymous"
/>

<div id="app">
    <div class="container">
        <form class="mt-5">
            <div class="form-group">
                <label for="email">Email</label>
                <input
                    type="email"
                    v-model="email"
                    id="email"
                    class="form-control form-control-lg"
                />
            </div>
            <!--
                v-on:click="process"
                v-on:click.prevent="process"
                @click.prevent="process"
            -->
            <button
                type="submit"
                @click.prevent="process"
                class="btn btn-primary"
            >
                Submit
            </button>
        </form>
    </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/vue@2.5.17/dist/vue.js"></script>
<script>
    var vm = new Vue({
        el: "#app",
        data: {
            email: "mike@example.com",
        },
        methods: {
            process: function () {
                alert("Submitted " + this.email);
            },
            // v-on:click.prevent="process" 可以作为event.preventDefault()的替代
            /*
                process2: function (event) {
                event.preventDefault();
                alert('Submitted ' + this.email);
            }
            */
        },
    });
</script>

```


### 2. essential directives, options, and tools

#### rendering elements conditionally

```html
<!DOCTYPE html>

<link
    rel="stylesheet"
    href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"
    integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO"
    crossorigin="anonymous"
/>
<style>
    /*
        属性用[]
        配合 v-cloak 使用，可以有奇效
    */
    [v-cloak] {
        display: none;
    }
</style>

<div id="app">
    <div class="container">
        <!--
            v-if="!submitted"
            v-if="submitted"
            被隐藏的部分html不是被css隐藏了，而是直接从html中删掉了

            v-if="!submitted"
            v-else

            v-show 不能和 v-else 一起使用
            v-show="!submitted"
            v-show="submitted"
            v-show使用css隐藏的，东西还在html里，这样可以节省计算

            当vue还没有加载进来的时候，两段都会加载，然后一方隐藏，造成闪烁
            解决方法：用css隐藏，然后vue加载的时候接管
        -->
        <form v-show="!submitted" class="mt-5">
            <div class="form-group">
                <label for="email">Email</label>
                <input
                    type="email"
                    v-model="email"
                    id="email"
                    class="form-control form-control-lg"
                />
            </div>
            <button
                type="submit"
                @click.prevent="process"
                class="btn btn-primary"
            >
                Submit
            </button>
        </form>

        <!--
            v-cloak 的唯一作用是，当vue加载进来的时候消失
        -->
        <h2 v-show="submitted" v-cloak class="mt-5">Thanks for signing up!</h2>
    </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/vue@2.5.17/dist/vue.js"></script>
<script>
    var vm = new Vue({
        el: "#app",
        data: {
            email: "mike@example.com",
            submitted: false,
        },
        methods: {
            process: function () {
                this.submitted = true;
            },
        },
    });
</script>

```


#### loading data asynchrounously

[NASA api](https://api.nasa.gov/)

```html
<!DOCTYPE html>

<link
    rel="stylesheet"
    href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css"
    integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4"
    crossorigin="anonymous"
/>
<style>
    [v-cloak] {
        display: none;
    }
</style>

<div id="app">
    <div class="container">
        <!-- v-bind: -->
        <img :src="imgSrc" :title="imgTitle" />
    </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/vue@2.5.17/dist/vue.js"></script>
<!-- axios 轻量级ajax框架，不需要加载JQuery了 -->
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script>
    var apiKey = "lkgI9to0hRizfzk4xTAxtNTTFkkA4Mtq7y1yW5me";
    var url = "https://api.nasa.gov/planetary/apod?api_key=" + apiKey;

    var vm = new Vue({
        el: "#app",
        data: {
            imgSrc: "",
            imgTitle: "",
        },
    });

    axios.get(url).then(function (res) {
        vm.imgSrc = res.data.url;
        vm.imgTitle = res.data.title;
    });
</script>

```


#### using the created lifecycle hook

Vue Instance Lifecycle

|new Vue()      |
|---------      |
|beforeCreate   |
|created        |
|beforeMount    |
|mounted        |
|beforeUpdate   |
|updated        |
|beforeDestory  |
|destroyed      |

- vue的属性和方法刚刚创建好
- root DOM元素刚刚第一次被替换成vue的版本
- 元素属性变化的时候，会发生很多次
- vm.$destroy()被调用的时候

```html
<!DOCTYPE html>

<link
    rel="stylesheet"
    href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css"
    integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4"
    crossorigin="anonymous"
/>
<style>
    [v-cloak] {
        display: none;
    }
</style>

<div id="app">
    <div class="container">
        <img :src="imgSrc" :title="imgTitle" />
    </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/vue@2.5.17/dist/vue.js"></script>
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script>
    var vm = new Vue({
        el: "#app",
        data: {
            imgSrc: "",
            imgTitle: "",
        },
        created: function () {
            this.fetchApod();
        },
        methods: {
            fetchApod: function () {
                var apiKey = "lkgI9to0hRizfzk4xTAxtNTTFkkA4Mtq7y1yW5me";
                var url =
                    "https://api.nasa.gov/planetary/apod?api_key=" + apiKey;
                axios.get(url).then(function (res) {
                    vm.imgSrc = res.data.url;
                    vm.imgTitle = res.data.title;
                });
            },
        },
    });
</script>

```


#### using the vue devtools browser extension

```html
<!DOCTYPE html>

<link
    rel="stylesheet"
    href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css"
    integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4"
    crossorigin="anonymous"
/>
<style>
    [v-cloak] {
        display: none;
    }
</style>

<div id="app">
    <div class="container"></div>
</div>

<script src="https://cdn.jsdelivr.net/npm/vue@2.5.17/dist/vue.js"></script>
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script>
    var vm = new Vue({
        el: "#app",
        data: {
            asteroids: [],
        },
        created: function () {
            this.fetchAsteroids();
        },
        methods: {
            fetchAsteroids: function () {
                var apiKey = "lkgI9to0hRizfzk4xTAxtNTTFkkA4Mtq7y1yW5me";
                var url =
                    "https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=" +
                    apiKey;
                axios.get(url).then(function (res) {
                    vm.asteroids = res.data.near_earth_objects.slice(0, 10);
                });
            },
        },
    });
</script>

```


#### rendering lists with v-for

```html
<!DOCTYPE html>

<link
    rel="stylesheet"
    href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css"
    integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4"
    crossorigin="anonymous"
/>
<style>
    [v-cloak] {
        display: none;
    }
</style>

<div id="app">
    <div class="container">
        <div class="card mt-5">
            <h2 class="card-header">Near-Earth Objects</h2>
            <table class="table">
                <thead class="thead-light">
                    <th>Name</th>
                    <th>Close Approach Date</th>
                </thead>
                <tbody v-cloak>
                    <!-- v-for 是个好东东 -->
                    <tr v-for="a in asteroids">
                        <td>{{a.name}}</td>
                        <td>{{getCloseApproachDate(a)}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/vue@2.5.17/dist/vue.js"></script>
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script>
    var vm = new Vue({
        el: "#app",
        data: {
            asteroids: [],
        },
        created: function () {
            this.fetchAsteroids();
        },
        methods: {
            fetchAsteroids: function () {
                var apiKey = "lkgI9to0hRizfzk4xTAxtNTTFkkA4Mtq7y1yW5me";
                var url =
                    "https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=" +
                    apiKey;
                axios.get(url).then(function (res) {
                    vm.asteroids = res.data.near_earth_objects.slice(0, 10);
                });
            },
            getCloseApproachDate: function (a) {
                if (a.close_approach_data.length > 0) {
                    return a.close_approach_data[0].close_approach_date;
                }
                return "N/A";
            },
        },
    });
</script>

```


#### using additional v-for parameters

```html
<!DOCTYPE html>

<link
    rel="stylesheet"
    href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css"
    integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4"
    crossorigin="anonymous"
/>
<style>
    [v-cloak] {
        display: none;
    }
</style>

<div id="app">
    <div class="container">
        <div class="card mt-5">
            <h2 class="card-header">Near-Earth Objects</h2>
            <table class="table">
                <thead class="thead-light">
                    <th>#</th>
                    <th>Name</th>
                    <th>Close Approach Date</th>
                    <th>Miss Distance</th>
                </thead>
                <tbody v-cloak>
                    <!-- 注意index的用法 -->
                    <tr v-for="(a, index) in asteroids">
                        <td>{{index + 1}}</td>
                        <td>{{a.name}}</td>
                        <td>{{getCloseApproachDate(a)}}</td>
                        <td>
                            <!-- v-if 的用法 -->
                            <!-- v-if="a.close_approach_data.length" 也可以，因为0是false，正数是true -->
                            <ul v-if="a.close_approach_data.length > 0">
                                <!-- key value index -->
                                <li
                                    v-for="(value, key, index) in a.close_approach_data[0].miss_distance"
                                >
                                    {{key}}: {{value}}
                                </li>
                            </ul>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/vue@2.5.17/dist/vue.js"></script>
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script>
    var vm = new Vue({
        el: "#app",
        data: {
            asteroids: [],
        },
        created: function () {
            this.fetchAsteroids();
        },
        methods: {
            fetchAsteroids: function () {
                var apiKey = "lkgI9to0hRizfzk4xTAxtNTTFkkA4Mtq7y1yW5me";
                var url =
                    "https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=" +
                    apiKey;
                axios.get(url).then(function (res) {
                    vm.asteroids = res.data.near_earth_objects.slice(0, 10);
                });
            },
            getCloseApproachDate: function (a) {
                if (a.close_approach_data.length > 0) {
                    return a.close_approach_data[0].close_approach_date;
                }
                return "N/A";
            },
        },
    });
</script>

```


#### combining v-for with event handling

```html
<!DOCTYPE html>

<link
    rel="stylesheet"
    href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css"
    integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4"
    crossorigin="anonymous"
/>
<style>
    [v-cloak] {
        display: none;
    }
</style>

<div id="app">
    <div class="container">
        <div class="card mt-5">
            <h2 class="card-header">Near-Earth Objects</h2>
            <table class="table">
                <thead class="thead-light">
                    <th>#</th>
                    <th>Name</th>
                    <th>Close Approach Date</th>
                    <th>Miss Distance</th>
                    <th>Remove</th>
                </thead>
                <tbody v-cloak>
                    <!-- 
                        在list改变时，vue会重新渲染 re-render
                        :key 的作用：需要唯一，unique key
                                    和v-for一起使用，当list会增删改查时，vue会使用key来打补丁，而不是重新渲染全部的list
                     -->
                    <tr
                        v-for="(a, index) in asteroids"
                        :key="a.neo_reference_id"
                    >
                        <td>{{index + 1}}</td>
                        <td>{{a.name}}</td>
                        <td>{{getCloseApproachDate(a)}}</td>
                        <td>
                            <ul v-if="a.close_approach_data.length > 0">
                                <li
                                    v-for="(value, key, index) in a.close_approach_data[0].miss_distance"
                                >
                                    {{key}}: {{value}}
                                </li>
                            </ul>
                        </td>
                        <td>
                            <button
                                @click="remove(index)"
                                class="btn btn-warning"
                            >
                                remove
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/vue@2.5.17/dist/vue.js"></script>
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script>
    var vm = new Vue({
        el: "#app",
        data: {
            asteroids: [],
        },
        created: function () {
            this.fetchAsteroids();
        },
        methods: {
            fetchAsteroids: function () {
                var apiKey = "lkgI9to0hRizfzk4xTAxtNTTFkkA4Mtq7y1yW5me";
                var url =
                    "https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=" +
                    apiKey;
                axios.get(url).then(function (res) {
                    vm.asteroids = res.data.near_earth_objects.slice(0, 10);
                });
            },
            getCloseApproachDate: function (a) {
                if (a.close_approach_data.length > 0) {
                    return a.close_approach_data[0].close_approach_date;
                }
                return "N/A";
            },
            // 删掉一个数据
            remove: function (index) {
                this.asteroids.splice(index, 1);
            },
        },
    });
</script>
```


#### using computed properties

```html
<!DOCTYPE html>

<link
    rel="stylesheet"
    href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css"
    integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4"
    crossorigin="anonymous"
/>
<style>
    [v-cloak] {
        display: none;
    }
</style>

<div id="app">
    <div class="container">
        <div class="card mt-5">
            <h2 class="card-header">Near-Earth Objects</h2>
            <div class="m-3" v-cloak v-if="numAsteroids > 0">
                <p>showing {{numAsteroids}} items</p>
                <p>{{closestObject}} has the shortest miss distance.</p>
            </div>
            <table class="table">
                <thead class="thead-light">
                    <th>#</th>
                    <th>Name</th>
                    <th>Close Approach Date</th>
                    <th>Miss Distance</th>
                    <th>Remove</th>
                </thead>
                <tbody v-cloak>
                    <tr
                        v-for="(a, index) in asteroids"
                        :key="a.neo_reference_id"
                    >
                        <td>{{index + 1}}</td>
                        <td>{{a.name}}</td>
                        <td>{{getCloseApproachDate(a)}}</td>
                        <td>
                            <ul v-if="a.close_approach_data.length > 0">
                                <li
                                    v-for="(value, key, index) in a.close_approach_data[0].miss_distance"
                                >
                                    {{key}}: {{value}}
                                </li>
                            </ul>
                        </td>
                        <td>
                            <button
                                @click="remove(index)"
                                class="btn btn-warning"
                            >
                                remove
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/vue@2.5.17/dist/vue.js"></script>
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script>
    var vm = new Vue({
        el: "#app",
        data: {
            asteroids: [],
        },
        // computed 可以被看作视图，是会跟着变的
        computed: {
            numAsteroids: function () {
                return this.asteroids.length;
            },
            closestObject: function () {
                var neosHavingData = this.asteroids.filter(function (neo) {
                    return neo.close_approach_data.length > 0;
                });
                var simpleNeos = neosHavingData.map(function (neo) {
                    return {
                        name: neo.name,
                        miles: neo.close_approach_data[0].miss_distance.miles,
                    };
                });
                var sortedNeos = simpleNeos.sort(function (a, b) {
                    return a.miles - b.miles;
                });
                return sortedNeos[0].name;
            },
        },
        created: function () {
            this.fetchAsteroids();
        },
        methods: {
            fetchAsteroids: function () {
                var apiKey = "lkgI9to0hRizfzk4xTAxtNTTFkkA4Mtq7y1yW5me";
                var url =
                    "https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=" +
                    apiKey;
                axios.get(url).then(function (res) {
                    vm.asteroids = res.data.near_earth_objects.slice(0, 10);
                });
            },
            getCloseApproachDate: function (a) {
                if (a.close_approach_data.length > 0) {
                    return a.close_approach_data[0].close_approach_date;
                }
                return "N/A";
            },
            remove: function (index) {
                this.asteroids.splice(index, 1);
            },
        },
    });
</script>

```


### 3. enhancing user interfaces

#### adding dynamic style attributes

```html
<!DOCTYPE html>

<link
    rel="stylesheet"
    href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css"
    integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4"
    crossorigin="anonymous"
/>
<style>
    [v-cloak] {
        display: none;
    }
</style>

<div id="app">
    <div class="container">
        <div class="card mt-5">
            <h2 class="card-header">Near-Earth Objects</h2>
            <div class="m-3" v-cloak v-if="numAsteroids > 0">
                <p>showing {{numAsteroids}} items</p>
                <p>{{closestObject}} has the shortest miss distance.</p>
            </div>
            <table class="table table-striped">
                <thead class="thead-light">
                    <th>#</th>
                    <th>Name</th>
                    <th>Close Approach Date</th>
                    <th>Miss Distance</th>
                    <th>Remove</th>
                </thead>
                <tbody v-cloak>
                    <!--
                        :style="{border: 'solid 3px red'}" 可以
                        :style="{border-top: 'solid 3px red'}" 不可以，因为变量里不能有-
                        :style="{borderTop: 'solid 3px red'}" 可以
                        :style="{'border-top': 'solid 3px red'}" 可以

                        静态style里的是默认的，会被动态:style里的替换掉，
                        在动态的style里，后面的覆盖前面的
                    -->
                    <tr
                        v-for="(a, index) in asteroids"
                        :key="a.neo_reference_id"
                        :style="[getRowStyle(a), {color: 'blue'}]"
                        style="color: green;"
                    >
                        <td>{{index + 1}}</td>
                        <td>{{a.name}}</td>
                        <td>{{getCloseApproachDate(a)}}</td>
                        <td>
                            <ul v-if="a.close_approach_data.length > 0">
                                <li
                                    v-for="(value, key, index) in a.close_approach_data[0].miss_distance"
                                >
                                    {{key}}: {{value}}
                                </li>
                            </ul>
                        </td>
                        <td>
                            <button
                                @click="remove(index)"
                                class="btn btn-warning"
                            >
                                remove
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/vue@2.5.17/dist/vue.js"></script>
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script>
    var vm = new Vue({
        el: "#app",
        data: {
            asteroids: [],
        },
        computed: {
            numAsteroids: function () {
                return this.asteroids.length;
            },
            closestObject: function () {
                var neosHavingData = this.asteroids.filter(function (neo) {
                    return neo.close_approach_data.length > 0;
                });
                var simpleNeos = neosHavingData.map(function (neo) {
                    return {
                        name: neo.name,
                        miles: neo.close_approach_data[0].miss_distance.miles,
                    };
                });
                var sortedNeos = simpleNeos.sort(function (a, b) {
                    return a.miles - b.miles;
                });
                return sortedNeos[0].name;
            },
        },
        created: function () {
            this.fetchAsteroids();
        },
        methods: {
            fetchAsteroids: function () {
                var apiKey = "lkgI9to0hRizfzk4xTAxtNTTFkkA4Mtq7y1yW5me";
                var url =
                    "https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=" +
                    apiKey;
                axios.get(url).then(function (res) {
                    vm.asteroids = res.data.near_earth_objects.slice(0, 10);
                });
            },
            getCloseApproachDate: function (a) {
                if (a.close_approach_data.length > 0) {
                    return a.close_approach_data[0].close_approach_date;
                }
                return "N/A";
            },
            remove: function (index) {
                this.asteroids.splice(index, 1);
            },
            // 如果不为0，则返回undefined，会被忽略
            getRowStyle: function (a) {
                if (a.close_approach_data.length == 0) {
                    return {
                        border: "solid 3px red",
                        color: "red",
                    };
                }
            },
        },
    });
</script>

```


#### adding dynamic class attributes

```html
<!DOCTYPE html>

<link
    rel="stylesheet"
    href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css"
    integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4"
    crossorigin="anonymous"
/>
<style>
    [v-cloak] {
        display: none;
    }
    .highlight {
        border: solid 3px red;
        color: red;
    }
</style>

<div id="app">
    <div class="container">
        <div class="card mt-5">
            <h2 class="card-header">Near-Earth Objects</h2>
            <div class="m-3" v-cloak v-if="numAsteroids > 0">
                <p>showing {{numAsteroids}} items</p>
                <p>{{closestObject}} has the shortest miss distance.</p>
            </div>
            <!--
                :class 可以写多个class
                    放在[]里，代表叠加
                    放在{}里代表map 有true和false
            -->
            <table
                class="table table-striped"
                :class="[{'table-dark': false}, 'table-bordered']"
            >
                <thead class="thead-light">
                    <th>#</th>
                    <th>Name</th>
                    <th>Close Approach Date</th>
                    <th>Miss Distance</th>
                    <th>Remove</th>
                </thead>
                <tbody v-cloak>
                    <!--
                        这里的:class 用来控制某个class的开关
                    -->
                    <tr
                        v-for="(a, index) in asteroids"
                        :key="a.neo_reference_id"
                        :class="{highlight: isMissingData(a), 'shadow-sm': true}"
                    >
                        <td>{{index + 1}}</td>
                        <td>{{a.name}}</td>
                        <td>{{getCloseApproachDate(a)}}</td>
                        <td>
                            <ul v-if="a.close_approach_data.length > 0">
                                <li
                                    v-for="(value, key, index) in a.close_approach_data[0].miss_distance"
                                >
                                    {{key}}: {{value}}
                                </li>
                            </ul>
                        </td>
                        <td>
                            <button
                                @click="remove(index)"
                                class="btn btn-warning"
                            >
                                remove
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/vue@2.5.17/dist/vue.js"></script>
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script>
    var vm = new Vue({
        el: "#app",
        data: {
            asteroids: [],
        },
        computed: {
            numAsteroids: function () {
                return this.asteroids.length;
            },
            closestObject: function () {
                var neosHavingData = this.asteroids.filter(function (neo) {
                    return neo.close_approach_data.length > 0;
                });
                var simpleNeos = neosHavingData.map(function (neo) {
                    return {
                        name: neo.name,
                        miles: neo.close_approach_data[0].miss_distance.miles,
                    };
                });
                var sortedNeos = simpleNeos.sort(function (a, b) {
                    return a.miles - b.miles;
                });
                return sortedNeos[0].name;
            },
        },
        created: function () {
            this.fetchAsteroids();
        },
        methods: {
            fetchAsteroids: function () {
                var apiKey = "lkgI9to0hRizfzk4xTAxtNTTFkkA4Mtq7y1yW5me";
                var url =
                    "https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=" +
                    apiKey;
                axios.get(url).then(function (res) {
                    vm.asteroids = res.data.near_earth_objects.slice(0, 10);
                });
            },
            getCloseApproachDate: function (a) {
                if (a.close_approach_data.length > 0) {
                    return a.close_approach_data[0].close_approach_date;
                }
                return "N/A";
            },
            remove: function (index) {
                this.asteroids.splice(index, 1);
            },
            getRowStyle: function (a) {
                if (a.close_approach_data.length == 0) {
                    return {
                        border: "solid 3px red",
                        color: "red",
                    };
                }
            },
            isMissingData: function (a) {
                return a.close_approach_data.length == 0;
            },
        },
    });
</script>

```


#### using css transitions

```html
<!DOCTYPE html>

<link
    rel="stylesheet"
    href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css"
    integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4"
    crossorigin="anonymous"
/>
<style>
    [v-cloak] {
        display: none;
    }
    .highlight {
        border: solid 3px red;
        color: red;
    }
    /*
        v-enter
        v-enter-to
        v-enter-active
        
        v-leave
        v-leave-to
        v-leave-active
    */
    .shooting-star-leave-to,
    .shooting-star-enter {
        transform: translateX(150px) rotate(30deg);
        opacity: 0;
    }
    .shooting-star-enter-active,
    .shooting-star-leave-active {
        transition: all 0.5s ease;
    }
</style>

<div id="app">
    <div class="container">
        <div class="card mt-5">
            <h2 class="card-header">Near-Earth Objects</h2>
            <!--
                transition 标签
                name="shooting-star" 可以替换 v-enter 为 shooting-star-enter
                这样很多个transition就可以分别有自己的css class了

                数据第一次加载的时候，是enter的效果
            -->
            <transition name="shooting-star">
                <div class="m-3" v-cloak v-if="numAsteroids > 0 && showSummary">
                    <p>showing {{numAsteroids}} items</p>
                    <p>{{closestObject}} has the shortest miss distance.</p>
                </div>
            </transition>
            <div class="m-3">
                <a href="#" @click="showSummary = !showSummary"
                    >Show/hide summary</a
                >
            </div>
            <table
                class="table table-striped"
                :class="[{'table-dark': false}, 'table-bordered']"
            >
                <thead class="thead-light">
                    <th>#</th>
                    <th>Name</th>
                    <th>Close Approach Date</th>
                    <th>Miss Distance</th>
                    <th>Remove</th>
                </thead>
                <tbody v-cloak>
                    <tr
                        v-for="(a, index) in asteroids"
                        :key="a.neo_reference_id"
                        :class="{highlight: isMissingData(a), 'shadow-sm': true}"
                    >
                        <td>{{index + 1}}</td>
                        <td>{{a.name}}</td>
                        <td>{{getCloseApproachDate(a)}}</td>
                        <td>
                            <ul v-if="a.close_approach_data.length > 0">
                                <li
                                    v-for="(value, key, index) in a.close_approach_data[0].miss_distance"
                                >
                                    {{key}}: {{value}}
                                </li>
                            </ul>
                        </td>
                        <td>
                            <button
                                @click="remove(index)"
                                class="btn btn-warning"
                            >
                                remove
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/vue@2.5.17/dist/vue.js"></script>
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script>
    var vm = new Vue({
        el: "#app",
        data: {
            asteroids: [],
            showSummary: true,
        },
        computed: {
            numAsteroids: function () {
                return this.asteroids.length;
            },
            closestObject: function () {
                var neosHavingData = this.asteroids.filter(function (neo) {
                    return neo.close_approach_data.length > 0;
                });
                var simpleNeos = neosHavingData.map(function (neo) {
                    return {
                        name: neo.name,
                        miles: neo.close_approach_data[0].miss_distance.miles,
                    };
                });
                var sortedNeos = simpleNeos.sort(function (a, b) {
                    return a.miles - b.miles;
                });
                return sortedNeos[0].name;
            },
        },
        created: function () {
            this.fetchAsteroids();
        },
        methods: {
            fetchAsteroids: function () {
                var apiKey = "lkgI9to0hRizfzk4xTAxtNTTFkkA4Mtq7y1yW5me";
                var url =
                    "https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=" +
                    apiKey;
                axios.get(url).then(function (res) {
                    vm.asteroids = res.data.near_earth_objects.slice(0, 10);
                });
            },
            getCloseApproachDate: function (a) {
                if (a.close_approach_data.length > 0) {
                    return a.close_approach_data[0].close_approach_date;
                }
                return "N/A";
            },
            remove: function (index) {
                this.asteroids.splice(index, 1);
            },
            getRowStyle: function (a) {
                if (a.close_approach_data.length == 0) {
                    return {
                        border: "solid 3px red",
                        color: "red",
                    };
                }
            },
            isMissingData: function (a) {
                return a.close_approach_data.length == 0;
            },
        },
    });
</script>

```


#### applying transitions to lists

```html
<!DOCTYPE html>

<link
    rel="stylesheet"
    href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css"
    integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4"
    crossorigin="anonymous"
/>
<style>
    [v-cloak] {
        display: none;
    }
    .highlight {
        border: solid 3px red;
        color: red;
    }
    .shooting-star-leave-to,
    .shooting-star-enter {
        transform: translateX(150px) rotate(30deg);
        opacity: 0;
    }
    .shooting-star-enter-active,
    .shooting-star-leave-active {
        transition: all 0.5s ease;
    }
    .neo-list-leave-to,
    .neo-list-enter {
        opacity: 0;
        transform: translateY(30px);
    }
    .neo-list-enter-active,
    .neo-list-leave-active {
        transition: all 1s linear;
    }
</style>

<div id="app">
    <div class="container">
        <div class="card mt-5">
            <h2 class="card-header">Near-Earth Objects</h2>
            <transition name="shooting-star">
                <div class="m-3" v-cloak v-if="numAsteroids > 0 && showSummary">
                    <p>showing {{numAsteroids}} items</p>
                    <p>{{closestObject}} has the shortest miss distance.</p>
                </div>
            </transition>
            <div class="m-3">
                <a href="#" @click="showSummary = !showSummary"
                    >Show/hide summary</a
                >
            </div>
            <table
                class="table table-striped"
                :class="[{'table-dark': false}, 'table-bordered']"
            >
                <thead class="thead-light">
                    <th>#</th>
                    <th>Name</th>
                    <th>Close Approach Date</th>
                    <th>Miss Distance</th>
                    <th>Remove</th>
                </thead>
                <!--
                    这次在v-for中针对每一个tr table row搞动态效果，所以不能直接用transition，要用transition-group
                    <transition-group>会被真实渲染，样式像<span>
                    <transition-group tag="tbody" ame="neo-list" v-cloak >，这样就不会渲染了，删掉<tbody>标签，替换成此标签
                    浏览器不允许table中有transition-group标签
                        于是会在vue还没加载完的时候，把table中的transition标签扔到table外面去
                        然后把tbody放进来
                    <tbody is="transition-group" name="neo-list" v-cloak>
                        让浏览器ok，同时告诉vue把这个标签当作transition-group
                -->
                <tbody is="transition-group" name="neo-list" v-cloak>
                    <tr
                        v-for="(a, index) in asteroids"
                        :key="a.neo_reference_id"
                        :class="{highlight: isMissingData(a), 'shadow-sm': true}"
                    >
                        <td>{{index + 1}}</td>
                        <td>{{a.name}}</td>
                        <td>{{getCloseApproachDate(a)}}</td>
                        <td>
                            <ul v-if="a.close_approach_data.length > 0">
                                <li
                                    v-for="(value, key, index) in a.close_approach_data[0].miss_distance"
                                >
                                    {{key}}: {{value}}
                                </li>
                            </ul>
                        </td>
                        <td>
                            <button
                                @click="remove(index)"
                                class="btn btn-warning"
                            >
                                remove
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/vue@2.5.17/dist/vue.js"></script>
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script>
    var vm = new Vue({
        el: "#app",
        data: {
            asteroids: [],
            showSummary: true,
        },
        computed: {
            numAsteroids: function () {
                return this.asteroids.length;
            },
            closestObject: function () {
                var neosHavingData = this.asteroids.filter(function (neo) {
                    return neo.close_approach_data.length > 0;
                });
                var simpleNeos = neosHavingData.map(function (neo) {
                    return {
                        name: neo.name,
                        miles: neo.close_approach_data[0].miss_distance.miles,
                    };
                });
                var sortedNeos = simpleNeos.sort(function (a, b) {
                    return a.miles - b.miles;
                });
                return sortedNeos[0].name;
            },
        },
        created: function () {
            this.fetchAsteroids();
        },
        methods: {
            fetchAsteroids: function () {
                var apiKey = "lkgI9to0hRizfzk4xTAxtNTTFkkA4Mtq7y1yW5me";
                var url =
                    "https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=" +
                    apiKey;
                axios.get(url).then(function (res) {
                    vm.asteroids = res.data.near_earth_objects.slice(0, 10);
                });
            },
            getCloseApproachDate: function (a) {
                if (a.close_approach_data.length > 0) {
                    return a.close_approach_data[0].close_approach_date;
                }
                return "N/A";
            },
            remove: function (index) {
                this.asteroids.splice(index, 1);
            },
            getRowStyle: function (a) {
                if (a.close_approach_data.length == 0) {
                    return {
                        border: "solid 3px red",
                        color: "red",
                    };
                }
            },
            isMissingData: function (a) {
                return a.close_approach_data.length == 0;
            },
        },
    });
</script>

```


#### using css animations

```html
<!DOCTYPE html>

<link
    rel="stylesheet"
    href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css"
    integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4"
    crossorigin="anonymous"
/>
<style>
    [v-cloak] {
        display: none;
    }
    .highlight {
        border: solid 3px red;
        color: red;
    }
    .shooting-star-leave-to,
    .shooting-star-enter {
        transform: translateX(150px) rotate(30deg);
        opacity: 0;
    }
    .shooting-star-enter-active,
    .shooting-star-leave-active {
        transition: all 0.5s ease;
    }
    .neo-list-leave-to,
    .neo-list-enter {
        opacity: 0;
        transform: translateY(30px);
    }
    .neo-list-enter-active,
    .neo-list-leave-active {
        transition: all 1s linear;
    }
    .spin-enter-active {
        animation: spin-steps 2s;
    }
    @keyframes spin-steps {
        0% {
            transform: scale(1) rotate(0);
        }
        50% {
            transform: scale(10) rotate(360deg);
        }
        100% {
            transform: scale(1) rotate(1080deg);
        }
    }
</style>

<div id="app">
    <div class="container">
        <div class="card mt-5">
            <h2 class="card-header">
                Near-Earth
                <!--
                    使用span包裹之后，位置上在同一行像inline，但是可以被处理像block
                    没有enter和enter to，leave和leave to，所以加上一个appear解决
                    虽然是animation，但是还是用transition标签包裹
                -->
                <transition name="spin" appear>
                    <span style="display: inline-block;">Objects</span>
                </transition>
            </h2>
            <transition name="shooting-star">
                <div class="m-3" v-cloak v-if="numAsteroids > 0 && showSummary">
                    <p>showing {{numAsteroids}} items</p>
                    <p>{{closestObject}} has the shortest miss distance.</p>
                </div>
            </transition>
            <div class="m-3">
                <a href="#" @click="showSummary = !showSummary"
                    >Show/hide summary</a
                >
            </div>
            <table
                class="table table-striped"
                :class="[{'table-dark': false}, 'table-bordered']"
            >
                <thead class="thead-light">
                    <th>#</th>
                    <th>Name</th>
                    <th>Close Approach Date</th>
                    <th>Miss Distance</th>
                    <th>Remove</th>
                </thead>
                <tbody is="transition-group" name="neo-list" v-cloak>
                    <tr
                        v-for="(a, index) in asteroids"
                        :key="a.neo_reference_id"
                        :class="{highlight: isMissingData(a), 'shadow-sm': true}"
                    >
                        <td>{{index + 1}}</td>
                        <td>{{a.name}}</td>
                        <td>{{getCloseApproachDate(a)}}</td>
                        <td>
                            <ul v-if="a.close_approach_data.length > 0">
                                <li
                                    v-for="(value, key, index) in a.close_approach_data[0].miss_distance"
                                >
                                    {{key}}: {{value}}
                                </li>
                            </ul>
                        </td>
                        <td>
                            <button
                                @click="remove(index)"
                                class="btn btn-warning"
                            >
                                remove
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/vue@2.5.17/dist/vue.js"></script>
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script>
    var vm = new Vue({
        el: "#app",
        data: {
            asteroids: [],
            showSummary: true,
        },
        computed: {
            numAsteroids: function () {
                return this.asteroids.length;
            },
            closestObject: function () {
                var neosHavingData = this.asteroids.filter(function (neo) {
                    return neo.close_approach_data.length > 0;
                });
                var simpleNeos = neosHavingData.map(function (neo) {
                    return {
                        name: neo.name,
                        miles: neo.close_approach_data[0].miss_distance.miles,
                    };
                });
                var sortedNeos = simpleNeos.sort(function (a, b) {
                    return a.miles - b.miles;
                });
                return sortedNeos[0].name;
            },
        },
        created: function () {
            this.fetchAsteroids();
        },
        methods: {
            fetchAsteroids: function () {
                var apiKey = "lkgI9to0hRizfzk4xTAxtNTTFkkA4Mtq7y1yW5me";
                var url =
                    "https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=" +
                    apiKey;
                axios.get(url).then(function (res) {
                    vm.asteroids = res.data.near_earth_objects.slice(0, 10);
                });
            },
            getCloseApproachDate: function (a) {
                if (a.close_approach_data.length > 0) {
                    return a.close_approach_data[0].close_approach_date;
                }
                return "N/A";
            },
            remove: function (index) {
                this.asteroids.splice(index, 1);
            },
            getRowStyle: function (a) {
                if (a.close_approach_data.length == 0) {
                    return {
                        border: "solid 3px red",
                        color: "red",
                    };
                }
            },
            isMissingData: function (a) {
                return a.close_approach_data.length == 0;
            },
        },
    });
</script>

```


### 4. vue components

#### using vue components

vue component是什么？
- 很像基础的vue instance，只是没有el，而是 customed element
- 在template选项里，template定义为一个string
- data选项是一个函数（不是object）
- 可通过props属性传给parent data
- 如果使用一个build tool，可以存储在类似html中的文件中(.vue)

为什么要使用vue components
- 可重用性
- 封装性
- 可移植性
- 组织性
- 可读性


#### registering and using components

```html
<!DOCTYPE html>

<link
    rel="stylesheet"
    href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"
    integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO"
    crossorigin="anonymous"
/>

<div id="app">
    <div class="container">
        <another-component></another-component>
        <my-component v-for="i in 1000"></my-component>
    </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/vue@2.5.17/dist/vue.js"></script>
<script>
    // 局部声明一个component
    var anotherComponent = {
        data: function () {
            return {
                msg: "Hello from another component!",
            };
        },
        template: "<h1>{{msg}}</h1>",
    };
    // Vue.component("my-component", anotherComponent);

    // 全局声明一个component，不需要显示赋值给vue实例，所有的vue实例都能访问到
    Vue.component("my-component", {
        template: "<strong>A static element...</strong>",
    });

    var vm = new Vue({
        el: "#app",
        components: {
            "another-component": anotherComponent,
        },
    });
</script>

```


#### adding component props

```html
<!DOCTYPE html>

<link
    rel="stylesheet"
    href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css"
    integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4"
    crossorigin="anonymous"
/>
<style>
    [v-cloak] {
        display: none;
    }
</style>

<div id="app">
    <div class="container">
        <a-pod></a-pod>
        <a-pod date="2018-08-07"></a-pod>
    </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/vue@2.5.17/dist/vue.js"></script>
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script>
    Vue.component("a-pod", {
        // template里面的html必只有一个root element，不能有并列的
        template:
            '<div> \
                    <img :src="imgSrc" :title="imgTitle"> \
                    <p>{{date || "today"}}</p> \
                   </div>',
        props: ["date"],
        data: function () {
            return {
                imgSrc: "",
                imgTitle: "",
            };
        },
        created: function () {
            this.fetchApod();
        },
        methods: {
            fetchApod: function () {
                var apiKey = "lkgI9to0hRizfzk4xTAxtNTTFkkA4Mtq7y1yW5me";
                var url =
                    "https://api.nasa.gov/planetary/apod?api_key=" + apiKey;
                if (this.date) {
                    url += "&date=" + this.date;
                }
                var self = this;
                axios.get(url).then(function (res) {
                    self.imgSrc = res.data.url;
                    self.imgTitle = res.data.title;
                });
            },
        },
    });

    var vm = new Vue({
        el: "#app",
    });
</script>

```


#### managing component content with slots

```html
<!DOCTYPE html>

<link
    rel="stylesheet"
    href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css"
    integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4"
    crossorigin="anonymous"
/>
<style>
    [v-cloak] {
        display: none;
    }
</style>

<div id="app">
    <div class="container">
        <a-pod>
            <h3 slot="title">#1</h3>
            <p slot="caption">Here's today's Astronomy Picture of the Day!</p>
        </a-pod>
        <a-pod date="2018-08-07">
            <h3 slot="title">#2</h3>
            <p slot="caption" slot-scope="pic">
                Here's the picture from {{pic.date}}
                <!--
                    如果直接这么使用：Here's the picture from {{date}}
                    会直接去vue实例的数据里找，但是vue实例里找不到

                    正确的姿势：
                        在component props里定义数据date
                        在component template slot定义里引用, :date
                        在component引用的地方赋值date
                        在slot引用的地方定义scope
                        在替换html里使用scope.date
                -->
            </p>
        </a-pod>
    </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/vue@2.5.17/dist/vue.js"></script>
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script>
    Vue.component("a-pod", {
        /*
            slot 更加灵活，可扩展
            a-pod标签内的所有html会被放在template的slot位置
            在template的slot里写的内容会作为默认值

            如果有多个slot，需要在定义和使用的地方都指明 name="xxx" slot="xxx"
        */
        template:
            '<div> \
                    <slot name="title"><h3>Untitled</h3></slot> \
                    <img width="300" height="200" :src="imgSrc" :title="imgTitle"> \
                    <slot name="caption" :date="date"><p>unknown date</p></slot> \
                   </div>',
        props: ["date"],
        data: function () {
            return {
                imgSrc: "",
                imgTitle: "",
            };
        },
        created: function () {
            this.fetchApod();
        },
        methods: {
            fetchApod: function () {
                var apiKey = "lkgI9to0hRizfzk4xTAxtNTTFkkA4Mtq7y1yW5me";
                var url =
                    "https://api.nasa.gov/planetary/apod?api_key=" + apiKey;
                if (this.date) {
                    url += "&date=" + this.date;
                }
                var self = this;
                axios.get(url).then(function (res) {
                    self.imgSrc = res.data.url;
                    self.imgTitle = res.data.title;
                });
            },
        },
    });

    var vm = new Vue({
        el: "#app",
    });
</script>

```


#### componentizing existing in-DOM templates

```css
[v-cloak] {
    display: none;
}
.highlight {
    border: solid 3px red;
    color: red;
}
.shooting-star-leave-to,
.shooting-star-enter {
    transform: translateX(150px) rotate(30deg);
    opacity: 0;
}
.shooting-star-enter-active,
.shooting-star-leave-active {
    transition: all 0.5s ease;
}
.neo-list-leave-to,
.neo-list-enter {
    opacity: 0;
    transform: translateY(30px);
}
.neo-list-enter-active,
.neo-list-leave-active {
    transition: all 1s linear;
}

```

```javascript
// requires Vue.js and Bootstrap
Vue.component("asteroid-grid", {
    props: ["asteroids", "header"],
    data: function () {
        return {
            showSummary: true,
        };
    },
    computed: {
        numAsteroids: function () {
            return this.asteroids.length;
        },
        closestObject: function () {
            var neosHavingData = this.asteroids.filter(function (neo) {
                return neo.close_approach_data.length > 0;
            });
            var simpleNeos = neosHavingData.map(function (neo) {
                return {
                    name: neo.name,
                    miles: neo.close_approach_data[0].miss_distance.miles,
                };
            });
            var sortedNeos = simpleNeos.sort(function (a, b) {
                return a.miles - b.miles;
            });
            return sortedNeos[0].name;
        },
    },
    methods: {
        getCloseApproachDate: function (a) {
            if (a.close_approach_data.length > 0) {
                return a.close_approach_data[0].close_approach_date;
            }
            return "N/A";
        },
        remove: function (index) {
            this.asteroids.splice(index, 1);
        },
        getRowStyle: function (a) {
            if (a.close_approach_data.length == 0) {
                return {
                    border: "solid 2px red",
                    color: "red",
                };
            }
        },
        isMissingData: function (a) {
            return a.close_approach_data.length == 0;
        },
    },
    template:
        '<div class="card mt-5"> \
                    <h2 class="card-header">{{header}}</h2> \
                    <transition name="shooting-star"> \
                        <div class="mt-3 ml-3" v-cloak v-if="numAsteroids > 0 && showSummary"> \
                            <p>showing {{numAsteroids}} items</p> \
                            <p>{{closestObject}} has the smallest miss distance.</p> \
                        </div> \
                    </transition> \
                    <div class="m-3"> \
                        <a href="#" @click="showSummary = !showSummary">Show/hide summary</a> \
                    </div> \
                    <table class="table table-striped" :class="[{\'table-dark\': false}, \'table-bordered\']"> \
                        <thead class="thead-light"> \
                            <th>#</th> \
                            <th>Name</th> \
                            <th>Close Approach Date</th> \
                            <th>Miss Distance</th> \
                            <th>Remove</th> \
                        </thead> \
                        <tbody is="transition-group" name="neo-list" v-cloak> \
                            <tr v-for="(a, index) in asteroids" \
                                :key="a.neo_reference_id" \
                                :class="{highlight: isMissingData(a), \'shadow-sm\': true}"> \
                                <td>{{index + 1}}</td> \
                                <td>{{a.name}}</td> \
                                <td>{{getCloseApproachDate(a)}}</td> \
                                <td> \
                                    <ul v-if="a.close_approach_data.length > 0"> \
                                        <li v-for="(value, key) in a.close_approach_data[0].miss_distance"> \
                                            {{key}}: {{value}} \
                                        </li> \
                                    </ul> \
                                </td> \
                                <td><button class="btn btn-warning" @click="remove(index)">remove</button></td> \
                             </tr> \
                        </tbody> \
                    </table> \
                </div>',
});

```

```html
<!DOCTYPE html>

<link
    rel="stylesheet"
    href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css"
    integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4"
    crossorigin="anonymous"
/>
<link rel="stylesheet" href="style.css" />

<div id="app">
    <div class="container">
        <asteroid-grid
            :asteroids="asteroids"
            header="Near-Earth Objects"
        ></asteroid-grid>
    </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/vue@2.5.17/dist/vue.js"></script>
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script src="AsteroidGrid.js"></script>
<script>
    var vm = new Vue({
        el: "#app",
        data: {
            asteroids: [],
        },
        created: function () {
            this.fetchAsteroids();
        },
        methods: {
            fetchAsteroids: function () {
                var apiKey = "lkgI9to0hRizfzk4xTAxtNTTFkkA4Mtq7y1yW5me";
                var url =
                    "https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=" +
                    apiKey;
                axios.get(url).then(function (res) {
                    vm.asteroids = res.data.near_earth_objects.slice(0, 10);
                });
            },
        },
    });
</script>

```


#### handling events in components

```css
[v-cloak] {
    display: none;
}
.highlight {
    border: solid 3px red;
    color: red;
}
.shooting-star-leave-to,
.shooting-star-enter {
    transform: translateX(150px) rotate(30deg);
    opacity: 0;
}
.shooting-star-enter-active,
.shooting-star-leave-active {
    transition: all 0.5s ease;
}
.neo-list-leave-to,
.neo-list-enter {
    opacity: 0;
    transform: translateY(30px);
}
.neo-list-enter-active,
.neo-list-leave-active {
    transition: all 1s linear;
}

```

```javascript
// requires Vue.js and Bootstrap
Vue.component("asteroid-grid", {
    /*
        asteroids 数组在从parent data传进来的时候，是传引用而不是传值
        在component里 asteroids = []，parent data asteroids仍然有10个
        parent data asteroids pop，然后会rerender，重新传递下去，所以component里 asteroids恢复成了9个
        原因：parent修改会传递下来，component修改会直接改变值
        特别注意！！极其小心！！
        解决方法：让值的修改，和引用的改变指向，由vue instance完成
     */
    props: ["asteroids", "header"],
    data: function () {
        return {
            showSummary: true,
        };
    },
    computed: {
        numAsteroids: function () {
            return this.asteroids.length;
        },
        closestObject: function () {
            var neosHavingData = this.asteroids.filter(function (neo) {
                return neo.close_approach_data.length > 0;
            });
            var simpleNeos = neosHavingData.map(function (neo) {
                return {
                    name: neo.name,
                    miles: neo.close_approach_data[0].miss_distance.miles,
                };
            });
            var sortedNeos = simpleNeos.sort(function (a, b) {
                return a.miles - b.miles;
            });
            return sortedNeos[0].name;
        },
    },
    methods: {
        getCloseApproachDate: function (a) {
            if (a.close_approach_data.length > 0) {
                return a.close_approach_data[0].close_approach_date;
            }
            return "N/A";
        },
        remove: function (index) {
            /**
             * 让parent去处理，这是component的一个event
             */
            this.$emit("remove", index);
        },
        getRowStyle: function (a) {
            if (a.close_approach_data.length == 0) {
                return {
                    border: "solid 2px red",
                    color: "red",
                };
            }
        },
        isMissingData: function (a) {
            return a.close_approach_data.length == 0;
        },
    },
    template:
        '<div class="card mt-5"> \
                    <h2 class="card-header">{{header}}</h2> \
                    <transition name="shooting-star"> \
                        <div class="mt-3 ml-3" v-cloak v-if="numAsteroids > 0 && showSummary"> \
                            <p>showing {{numAsteroids}} items</p> \
                            <p>{{closestObject}} has the smallest miss distance.</p> \
                        </div> \
                    </transition> \
                    <div class="m-3"> \
                        <a href="#" @click="showSummary = !showSummary">Show/hide summary</a> \
                    </div> \
                    <table class="table table-striped" :class="[{\'table-dark\': false}, \'table-bordered\']"> \
                        <thead class="thead-light"> \
                            <th>#</th> \
                            <th>Name</th> \
                            <th>Close Approach Date</th> \
                            <th>Miss Distance</th> \
                            <th>Remove</th> \
                        </thead> \
                        <tbody is="transition-group" name="neo-list" v-cloak> \
                            <tr v-for="(a, index) in asteroids" \
                                :key="a.neo_reference_id" \
                                :class="{highlight: isMissingData(a), \'shadow-sm\': true}"> \
                                <td>{{index + 1}}</td> \
                                <td>{{a.name}}</td> \
                                <td>{{getCloseApproachDate(a)}}</td> \
                                <td> \
                                    <ul v-if="a.close_approach_data.length > 0"> \
                                        <li v-for="(value, key) in a.close_approach_data[0].miss_distance"> \
                                            {{key}}: {{value}} \
                                        </li> \
                                    </ul> \
                                </td> \
                                <td><button class="btn btn-warning" @click="remove(index)">remove</button></td> \
                             </tr> \
                        </tbody> \
                    </table> \
                </div>',
});

```

```html
<!DOCTYPE html>

<link
    rel="stylesheet"
    href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css"
    integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4"
    crossorigin="anonymous"
/>
<link rel="stylesheet" href="style.css" />

<div id="app">
    <div class="container">
        <!--
            rmove event的处理
        -->
        <asteroid-grid
            @remove="remove"
            :asteroids="asteroids"
            header="Near-Earth Objects"
        ></asteroid-grid>
    </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/vue@2.5.17/dist/vue.js"></script>
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script src="AsteroidGrid.js"></script>
<script>
    var vm = new Vue({
        el: "#app",
        data: {
            asteroids: [],
        },
        created: function () {
            this.fetchAsteroids();
        },
        methods: {
            fetchAsteroids: function () {
                var apiKey = "lkgI9to0hRizfzk4xTAxtNTTFkkA4Mtq7y1yW5me";
                var url =
                    "https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=" +
                    apiKey;
                axios.get(url).then(function (res) {
                    vm.asteroids = res.data.near_earth_objects.slice(0, 10);
                });
            },
            remove: function (index) {
                this.asteroids.splice(index, 1);
            },
        },
    });
</script>

```


#### installing vue cli

```bash
npm install -g @vue/cli
# OR
yarn global add @vue/cli

vue create hello-world

npm run serve # 会热加载
```


#### moving to single-file components

```html
<!-- components/AsteroidGrid.vue -->
<template>
    <div class="card mt-5">
        <h2 class="card-header">{{ header }}</h2>
        <transition name="shooting-star">
            <div
                class="mt-3 ml-3"
                v-cloak
                v-if="numAsteroids > 0 && showSummary"
            >
                <p>showing {{ numAsteroids }} items</p>
                <p>{{ closestObject }} has the smallest miss distance.</p>
            </div>
        </transition>
        <div class="m-3">
            <a href="#" @click="showSummary = !showSummary"
                >Show/hide summary</a
            >
        </div>
        <table
            class="table table-striped"
            :class="[{ 'table-dark': false }, 'table-bordered']"
        >
            <thead class="thead-light">
                <th>#</th>
                <th>Name</th>
                <th>Close Approach Date</th>
                <th>Miss Distance</th>
                <th>Remove</th>
            </thead>
            <tbody is="transition-group" name="neo-list" v-cloak>
                <tr
                    v-for="(a, index) in asteroids"
                    :key="a.neo_reference_id"
                    :class="{ highlight: isMissingData(a), 'shadow-sm': true }"
                >
                    <td>{{ index + 1 }}</td>
                    <td>{{ a.name }}</td>
                    <td>{{ getCloseApproachDate(a) }}</td>
                    <td>
                        <ul v-if="a.close_approach_data.length > 0">
                            <li
                                v-for="(value, key) in a.close_approach_data[0]
                                    .miss_distance"
                            >
                                {{ key }}: {{ value }}
                            </li>
                        </ul>
                    </td>
                    <td>
                        <button class="btn btn-warning" @click="remove(index)">
                            remove
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    props: ["asteroids", "header"],
    data: function () {
        return {
            showSummary: true,
        };
    },
    computed: {
        numAsteroids: function () {
            return this.asteroids.length;
        },
        closestObject: function () {
            var neosHavingData = this.asteroids.filter(function (neo) {
                return neo.close_approach_data.length > 0;
            });
            var simpleNeos = neosHavingData.map(function (neo) {
                return {
                    name: neo.name,
                    miles: neo.close_approach_data[0].miss_distance.miles,
                };
            });
            var sortedNeos = simpleNeos.sort(function (a, b) {
                return a.miles - b.miles;
            });
            return sortedNeos[0].name;
        },
    },
    methods: {
        getCloseApproachDate: function (a) {
            if (a.close_approach_data.length > 0) {
                return a.close_approach_data[0].close_approach_date;
            }
            return "N/A";
        },
        remove: function (index) {
            this.$emit("remove", index);
        },
        getRowStyle: function (a) {
            if (a.close_approach_data.length == 0) {
                return {
                    border: "solid 2px red",
                    color: "red",
                };
            }
        },
        isMissingData: function (a) {
            return a.close_approach_data.length == 0;
        },
    },
};
</script>

<style scoped>
.highlight {
    border: solid 3px red;
    color: red;
}
.shooting-star-leave-to,
.shooting-star-enter {
    transform: translateX(150px) rotate(30deg);
    opacity: 0;
}
.shooting-star-enter-active,
.shooting-star-leave-active {
    transition: all 0.5s ease;
}
.neo-list-leave-to,
.neo-list-enter {
    opacity: 0;
    transform: translateY(30px);
}
.neo-list-enter-active,
.neo-list-leave-active {
    transition: all 1s linear;
}
</style>

```

```html
<!-- components/HelloWorld.vue -->
<template>
    <div class="hello">
        <h1>{{ msg }}</h1>
        <p>
            For guide and recipes on how to configure / customize this
            project,<br />
            check out the
            <a href="https://cli.vuejs.org" target="_blank" rel="noopener"
                >vue-cli documentation</a
            >.
        </p>
        <h3>Installed CLI Plugins</h3>
        <ul>
            <li>
                <a
                    href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel"
                    target="_blank"
                    rel="noopener"
                    >babel</a
                >
            </li>
            <li>
                <a
                    href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint"
                    target="_blank"
                    rel="noopener"
                    >eslint</a
                >
            </li>
        </ul>
        <h3>Essential Links</h3>
        <ul>
            <li>
                <a href="https://vuejs.org" target="_blank" rel="noopener"
                    >Core Docs</a
                >
            </li>
            <li>
                <a href="https://forum.vuejs.org" target="_blank" rel="noopener"
                    >Forum</a
                >
            </li>
            <li>
                <a href="https://chat.vuejs.org" target="_blank" rel="noopener"
                    >Community Chat</a
                >
            </li>
            <li>
                <a
                    href="https://twitter.com/vuejs"
                    target="_blank"
                    rel="noopener"
                    >Twitter</a
                >
            </li>
            <li>
                <a href="https://news.vuejs.org" target="_blank" rel="noopener"
                    >News</a
                >
            </li>
        </ul>
        <h3>Ecosystem</h3>
        <ul>
            <li>
                <a
                    href="https://router.vuejs.org"
                    target="_blank"
                    rel="noopener"
                    >vue-router</a
                >
            </li>
            <li>
                <a href="https://vuex.vuejs.org" target="_blank" rel="noopener"
                    >vuex</a
                >
            </li>
            <li>
                <a
                    href="https://github.com/vuejs/vue-devtools#vue-devtools"
                    target="_blank"
                    rel="noopener"
                    >vue-devtools</a
                >
            </li>
            <li>
                <a
                    href="https://vue-loader.vuejs.org"
                    target="_blank"
                    rel="noopener"
                    >vue-loader</a
                >
            </li>
            <li>
                <a
                    href="https://github.com/vuejs/awesome-vue"
                    target="_blank"
                    rel="noopener"
                    >awesome-vue</a
                >
            </li>
        </ul>
    </div>
</template>

<script>
    // 意思是这个component的name是HelloWorld，数据在props里
    export default {
        name: "HelloWorld",
        props: {
            msg: String,
        },
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
    margin: 40px 0 0;
}
ul {
    list-style-type: none;
    padding: 0;
}
li {
    display: inline-block;
    margin: 0 10px;
}
a {
    color: #42b983;
}
</style>

```

```html
<!-- App.vue -->
<template>
    <div id="app">
        <AsteroidGrid
            @remove="remove"
            :asteroids="asteroids"
            header="Near-Earth Objects"
        />
    </div>
</template>

<script>
import AsteroidGrid from "./components/AsteroidGrid.vue";
import axios from "axios";

export default {
    name: "app",
    components: {
        AsteroidGrid,
    },
    data() {
        return {
            asteroids: [],
        };
    },
    created: function () {
        this.fetchAsteroids();
    },
    methods: {
        fetchAsteroids: function () {
            var apiKey = "lkgI9to0hRizfzk4xTAxtNTTFkkA4Mtq7y1yW5me";
            var url =
                "https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=" + apiKey;
            axios.get(url).then((res) => {
                this.asteroids = res.data.near_earth_objects.slice(0, 10);
            });
        },
        remove: function (index) {
            this.asteroids.splice(index, 1);
        },
    },
};
</script>

<style>
[v-cloak] {
    display: none;
}
</style>

```

```javascript
// main.js
import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;

new Vue({
    render: (h) => h(App),
}).$mount("#app");

```


#### building for production

默认状态下，index.html是无法展示任何东西的，除非有vue dev server的帮助，所以需要手动build

```bash
npm run build # minified version
# dist -> distribution 发布版本

```


### conclusion

[official vuejs github](https://github.com/vuejs)

[awesome-vue project](https://github.com/vuejs/awesome-vue)



## Lynda课程：Vue.js Essential Training

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
