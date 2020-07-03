

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






#### understanding two-way data binding

#### methods and event handling



### 2. essential directives, options, and tools

#### rendering elements conditionally

#### loading data asynchrounously

#### using the created lifecycle hook

#### using the vue devtools browser extension

#### rendering lists with v-for

#### using additional v-for parameters

#### combining v-for with event handling

#### using computed properties



### 3. enhancing user interfaces

#### adding dynamic style attributes

#### adding dynamic class attributes

#### using css transitions

#### applying transitions to lists

#### using css animations



### 4. vue components

#### using vue components

#### registering and using components

#### adding component props

#### managing component content with slots

#### componentizing existing in-DOM templates

#### handling events in components

#### installing vue cli

#### vue cli project template

#### moving to single-file components

#### building for production



### conclusion























