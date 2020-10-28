
## TypeScript Essential Training

### Introduction

#### What you should know before watching this course

typescript是javascript的超集，扩展了新特性和语法


#### Introducing TypeScript

typescript是javascript的超集，添加了新特性（静态类型）

可以在需要的时候使用**静态类型**，也可以在需要的时候使用**动态类型**


#### Writing your first TypeScript function

```typescript
function speak(value: string): string {
    console.log(value);
    return value;
}

var greeted = "world";
var greeting = "Hello, ";
var whatToSay: string = greeting + greeted;

speak(whatToSay);

```


### 1.Configuring Your Environment

#### Choosing your TypeScript editor

VS code | webstorm | ts cli


#### Creating a TypeScript project

├── app.ts
├── index.html
└── tsconfig.json

```json
{
    "compilerOptions": {
        "target": "es5"
    }
}
```

tsc运行时，会在根目录下找tsconfig.json，如果找到了，会把真个目录当作一个project，这样就不需要指定编译哪个文件了，只需要`tsc -w`


### 2.ES6 Language Features

#### Default parameters

```typescript
var container = document.getElementById('container');

function countdown(initial, final = 0, interval = 1) {

    var current = initial;

    while (current > final) {
        container.innerHTML = current;
        current -= interval;
    }

}

countdown(10, 5, 2)
```


#### Template strings

```typescript
var container = document.getElementById('container');

var todo = {
    id: 123,
    name: 'Pick up drycleaning',
    completed: true
}

container.innerHTML = `
<div todo='${todo.id}' class="list-group-item}">
    <i class="${todo.completed ? "" : "hidden"} text-success glyphicon glyphicon-ok"></i>
    <span class="name">${todo.name}</span>
</div>
`
```


#### Let and const

```typescript
var container = document.getElementById('container');

for (var x = 0; x <= 5; x++) {
    const counter = x;
    // counter = 1; error const不能改变
}

// console.log(counter); error 外面不能访问
```


#### For...of loops

```typescript
var array = [
    "Pick up drycleaning",
    "Clean Batcave",
    "Save Gotham"
];

for (var value of array) {
    console.log(value);
}
```


#### Lambdas

```typescript
var container = document.getElementById('container');

function Counter(el) {

    this.count = 0;

    el.innerHTML = this.count;

    el.addEventListener('click',
        (event) => el.innerHTML = (this.count += 1))
}

new Counter(container);

var filtered = [1, 2, 3].filter(x => x > 0)
```


#### Destructuring

```typescript
// example 1
let array = [1, "1", false]
let [n, str, bool] = array;

// example 2
let a = 1;
let b = 2;
[a, b] = [b, a] // 交换值

// example 3
let todo = {
    id1: 123,
    title1: "Pick"
}
let {id1, title1} = todo;

// example 4
function getTodo() {
    return {
        id: 123,
        title: "Pick"
    };
}

let {title: myTitle, id} = getTodo();

// example 4
function countdown({
                       initial,
                       final: final = 0,
                       interval: interval = 1,
                       initial: current
                   }) {

    while (current > final) {
        console.log(current);
        current -= interval;
    }

}
```


#### The spread operator

```typescript
function calculate(action, ...values) {
    var total = 0;

    for (var value of values) {
        switch (action) {
            case 'add':
                total += value;
                break;

            case 'subtract':
                total -= value;
                break;
        }
    }

    return total;
}

calculate('add', 1, 2, 3, 4, 5)


var source = [3, 4, 5]
var target = [1, 2, ...source, 6, 7]


var list = [1, 2, 3]
var toAdd = [4, 5, 6];

list.push(...toAdd)
```


#### Computed properties

```typescript
const osPrefix = 'os_';

// 动态的属性名字
var support = {
    [osPrefix + 'Windows']: isSupported('Windows'),
    [osPrefix + 'iOS']: isSupported('iOS'),
    [osPrefix + 'Android']: isSupported('Android'),
}

function isSupported(os) {
    return Math.random() >= 0.5;
}

let v = support["os_Windows"]
```


### 3.Type Fundamentals

#### Introducing JavaScript types

不可变类型：
- boolean
- number
- string

- null / undefined
- object (可以想像成一个map，string作为key，内容可以改变)
  - prototype (prototypical inheritance)
    - function
    - array []
  - regex
  - object literals {name: "wang", age: 3}

```javascript
var animal = {
    name: "Fido",
    species: "Dog",
    age: 5,
    speak: function () {
        console.log('Woof!');
    }
}
```


#### Understanding type inference

类型推断：即使完全是js的语法，ts也能推断出一些类型

```typescript
var animal = {
    name: "Fido",
    species: "Dog",
    age: 5,
    speak: function () {
        console.log('Woof!');
    }
}
// animal.name = 1; ts报类型错误


// 自动类型推断出了，返回值为number
function func() {
    return 1;
}


// 这种函数，ts没法直接推断出具体类型
function totalLength(x, y) {
    const total = x.length + y.lengt;
    return total;
}
```


#### Specifying JavaScript types

```typescript
function totalLength(x: any[], y: string): number {
    const total: number = x.length + y.length;
    return total;
}
```


#### Specifying function parameter types

union type，组合类型

```typescript
function totalLength(x: (string | any[]), y: (string | any[])): number {

    const total: number = x.length + y.length;

    x.slice(0)

    if (x instanceof Array) {
        x.push('TypeScript')
    }

    if (x instanceof String) {
        x.substr(0)
    }

    return total;
}
```


#### Adding function overloads

方法重载，ts特有的方式

```typescript
function totalLength(x: string, y: string): number
function totalLength(x: any[], y: any[]): number
function totalLength(x: (string | any[]), y: (string | any[])): number {
    var total: number = x.length + y.length;

    x.slice(0)

    if (x instanceof Array) {
        x.push('TypeScript')
    }

    if (x instanceof String) {
        x.substr(0)
    }

    return total;
}
```


### 4.Custom Types

#### Defining custom types with interfaces

- interface
- class
- enum

由于ts只在编译时做检查，在运行时是纯js，所以如果调后台api，返回的类型变了，ts无可奈何

```typescript
interface Todo {
    name: string;
    completed?: boolean; // make it optional
}

interface ITodoService {
    add(todo: Todo): Todo;

    delete(todo: Todo): void;

    getAll(): Todo[];

    getById(todoId: number): Todo;
}

const todo1: Todo = {
    name: "Pick up drycleaning"
};

const todo2 = <Todo>{
    name: "Pick up drycleaning"
};
```


#### Using interfaces to describe functions

```typescript
interface jQuery {
    (selector: string): HTMLElement;

    version: number;
}


var $ = <jQuery>function (selector: string) {
    // Find DOM element
}

$.version = 1.18

var container = $('#container');
```


#### Extending interface definitions

js的function的重复会导致第二个定义的覆盖第一个定于的；但是ts的interface重复定义没有问题，会把之后的定义都附加到第一个定义里面；这样就可以不修改**别人**的原代码，而扩展了功能

```typescript
var $ = <jQuery>function (selector: string) {
    // Find DOM element
}

$.version = 1.18;


interface Todo {
    name: string;
    completed?: boolean;
}

interface jQuery {
    (selector: (string | any)): jQueryElement;

    fn: any;
    version: number;
}

interface jQueryElement {
    data(name: string): any;

    data(name: string, data: any): jQueryElement;
}

interface jQueryElement {
    todo(): Todo;

    todo(todo: Todo): jQueryElement;
}

$.fn.todo = function (todo?: Todo): Todo {

    if (todo) {
        $(this).data('todo', todo)
    } else {
        return $(this).data('todo');
    }

}

var todo = {name: "Pick up drycleaning"};
var container = $('#container');
container.data('todo', todo)
var savedTodo = container.data('todo');

container.todo(todo)
```


#### Defining constant values with enums

```typescript

```


#### Defining anonymous types

```typescript

```



### 5.Classes

#### Understanding prototypical inheritance

#### Defining a class

#### Applying static properties

#### Making properties smarter with accessors

#### Inheriting behavior from a base class

#### Implementing an abstract class

#### Controlling visibility with access modifiers

#### Implementing interfaces


### 6.Generics

#### Introducing generics

#### Creating generic classes

#### Applying generic constraints


### 7.Modules

#### Understanding the need for modules in JavaScript

#### Organizing your code with namespaces

#### Using namespaces to encapsulate private members

#### Understanding the difference between internal and external modules

#### Switching from internal to external modules

#### Importing modules using CommonJS syntax

#### Importing modules using EXMAScript 2015 syntax

#### Loading external modules


### 8.Real-World Application Development

#### Introducing the sample JavaScript application

#### Converting existing JavaScript code to TypeScript

#### Generating declaration files

#### Referencing third-party libraries

#### Converting to external modules

#### Debugging TypeScript with source maps


### 9.Decorators

#### Implementing method decorators

#### implementing class decorators

#### Implementing property decorators

#### Implementing decorator factories


### Conclusion

#### Next steps
