## Lynda: Learning ECMAScript 6

### 1. What is ECMAScript 6(ES6)

#### What is ECMAScript 6?

- 1995 JS诞生
- 1997 ECMAScript 1
- 2009 ECMAScript 5
- 2015 ECMAScript 6


#### ES6 browser support

支持不够，需要转译成ES5


#### Using ES6 now

同样需要转译的语言包括：CoffeeScript, TypeScript


### 2. Transpiling ES6

#### Introduction to Babel

ES6 -> ES5

Babel作者：Sebastian McKenzie, 澳大利亚的开发者，现就职于facebook


#### In-browser Babel transpiling

在运行时做转换，会让速度变慢

```html
<!DOCTYPE html>
<html>
<head>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.29/browser.js"></script>
    <script type="text/babel">
        var nameBuilder = function (firstName = "John", lastName = "Doe") {
            console.log(firstName + " " + lastName);
        };

        nameBuilder();
    </script>
    <title>Working with Babel</title>
</head>
<body>

</body>
</html>

```


#### Transpiling with webpack

```bash
# 生成package.json
npm init
npm install -g webpack
npm install --save-dev babel-loader

# 手动创建好webpack.config之后
webpack

# 这一节使用的是webpack v1
npm install --save-dev webpack@1.12.2
npm install --save-dev babel-core@5.8.29
npm install --save-dev babel-loader@5.3.2
```

```json
// package.json
{
    "name": "testing-webpack",
    "version": "1.0.0",
    "description": "",
    "main": "script.js",
    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1"
    },
    "keywords": [
        "webpack",
        "es6"
    ],
    "author": "Eve Porcello",
    "license": "MIT"
}

```

```javascript
// webpack.config.js
module.exports = {
    entry: './script.js',
    output: {filename: 'bundle.js'},
    module: {
        loaders: [
            {test: /\.js?/, loader: 'babel-loader', exclude: /node_modules/}
        ]
    }
};

```

```javascript
// script.js
var nameBuilder = function (firstName = "Joe", lastName = "Doe") {
    console.log(firstName + " " + lastName);
};

nameBuilder();

```

```html
<!-- index.html -->
<!DOCTYPE html>
<html>
<head>
    <script src="bundle.js">
    </script>
    <title>Working with Babel</title>
</head>
<body>

</body>
</html>

```


#### Migrating to webpack 3

```bash
# 这一节使用webpack v3
npm install --save-dev webpack@3.1.0
npm install --save-dev babel-core@6.25.0
npm install --save-dev babel-loader@7.1.1
npm install --save-dev babel-preset-env@1.6.0

webpack
# or
./node_modules/.bin/webpack
# or
npm run build
```

```json
// package.json
{
    "name": "testing-webpack",
    "version": "1.0.0",
    "description": "",
    "main": "script.js",
    "scripts": {
        "build": "./node_modules/.bin/webpack"
    },
    "keywords": [
        "webpack",
        "es6"
    ],
    "author": "Eve Porcello",
    "license": "MIT",
    "devDependencies": {
        "babel-core": "^6.25.0",
        "babel-loader": "^7.1.1",
        "babel-preset-env": "^1.6.0",
        "webpack": "^3.1.0"
    }
}
```

```javascript
// webpack.config.js
var webpack = require('webpack');

module.exports = {
    entry: './script.js',
    output: {
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js?/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['env']
                }
            }
        ]
    }
};
```

```json
// .babelrc
{
	"presets": ["env"]
}
```


### 3. ES6 Syntax

#### Let keyword

变量的生效范围，可重载范围

```javascript
var x = 10;
if(x) {
    var x = 4;
}
console.log(x) // 4

var x = 10;
if(x) {
    let x = 4;
}
console.log(x) // 10

for (var i = 0; i < 45; i++) {
    var div = document.createElement('div');
    div.onclick = function () {
        alert("you clicked on a box #" + i); // 一直是45
    };
    document.getElementsByTagName('section')[0].appendChild(div);
}

for (let i = 0; i < 45; i++) {
    var div = document.createElement('div');
    div.onclick = function () {
        alert("you clicked on a box #" + i); // 是0-44
    };
    document.getElementsByTagName('section')[0].appendChild(div);
}
```


#### Const keyword

```javascript
const birthYear = 1900;
var birthYear = 2000; // 报错

function coldEnough(deg) {
    const freezingTemp = 32;
    if (freezingTemp <= deg) {
        return deg + " is above freezing.";
    } else {
        return deg + " is below freezing.";
    }
}

console.log(coldEnough(40));
console.log(coldEnough(12));
console.log(coldEnough(-10));
```


#### Template strings

```javascript
function createEmail(firstName, purchasePrice) {
    var shipping = 5.95;
    console.log(
        `Hi ${firstName}, Thanks for buying from us!
            Total: $${purchasePrice}
            Shipping: $${shipping}
            Grand Total: $${purchasePrice + shipping};
        `
    );
}

createEmail("Gina", 100);
```


#### Spread operators

```javascript
var cats = ["Tabby", "Siamese", "Persian"];
var dogs = ["Golden Retriever", "Pug", "Schnauzer"];

var animals = ["Whale", "Giraffe", cats, "Snake", dogs, "Coyote"];
console.log(animals);

var animals = ["Whale", "Giraffe", ...cats, "Snake", ...dogs, "Coyote"];
console.log(animals);
// 就像python里的*
```


#### Maps

为什么要使用Map，而不是直接用{}

- 可以用string之外的类型作为key
- 可以使用值相同的key value pair
- 可以有顺序的遍历，按照插入顺序

```javascript
var course = new Map();
course.set('react', {description: 'ui'});
course.set('jest', {description: 'testing'});

console.log(course);
// console.log(course.react); 不能用这种方式
console.log(course.get('react'));

// 构造函数，接受一个array，每一个array都是一个key value
var details = new Map([
    [new Date(), 'today'],
    ['items', [1, 2]]
]);

console.log(details.size); // 2

details.forEach(function (item) {
    console.log(item);
});
```


#### Sets

```javascript
var books = new Set();
books.add('Pride and Prejudice');
books.add('War and Peace')
    .add('Oliver Twist');

console.log(books);
console.log('how many books?', books.size);
console.log('has Oliver Twist?', books.has('Oliver Twist'));
books.delete('Oliver Twist');
console.log('has Oliver Twist still?', books.has('Oliver Twist'));

var data = [4, 2, 4, 4, 2, 5, 1, 6, 7, 5, 6, 8, 2, 7];
var set = new Set(data);
console.log('data.length', data.length);
console.log('set.size', set.size);
```


#### The for...of loop

```javascript
// string
for (let letter of 'JavaScript') {
    console.log(letter);
}

// array
var topics = ['JavaScript', 'Node', 'React'];

for (let topic of topics) {
    console.log(topic);
}

// map
var topics = new Map();
topics.set('HTML', '/class/html');
topics.set('CSS', '/class/css');
topics.set('JavaScript', '/class/javascript');
topics.set('Node', '/class/node');

for (let topic of topics.keys()) {
    console.log(topic, "is the course name");
}

for (let topic of topics.values()) {
    console.log("The course description can be found at", topic);
}

for (let course of topics) {
    console.log(course);
}
for (let course of topics.entries()) {
    console.log(course);
}
```


### 4. ES6 Functions & Objects

#### Default function parameters

```javascript
function haveFun(activityName = "hiking", time = 3) {
    console.log(`Today I will go ${activityName} for ${time} hours.`)
}

haveFun("biking", 5);
```


#### Enhacing object literals

```javascript
var cat = {
    meow(times) {
        console.log("meow".repeat(times));
    },
    purr(times) {
        console.log("purr".repeat(times));
    },
    snore(times) {
        console.log("ZZZ".repeat(times));
    }
};

cat.meow(3);
cat.purr(4);
cat.snore(5);
```


#### Arrow functions

```javascript
var studentList = students => console.log(students);
studentList(["Joe", "Cindy", "Jeanne"]);
```


#### Arrow functions and the 'this' scope

```javascript
var person = {
    first: "Doug",
    actions: ['bike', 'hike', 'ski', 'surf'],
    printActions() {
        this.actions.forEach(action => {
            var str = this.first + " likes to " + action;
            console.log(str);
        });
    }
};
person.printActions();
```


#### Destructuring assignment

```javascript
// array
var [first, fourth] = ["Spokane", "Boston", "Los Angeles", "Seattle", "Portland"];
console.log(first); // Spokane
console.log(fourth); // Boston

var [first,,, fourth,] = ["Spokane", "Boston", "Los Angeles", "Seattle", "Portland"];
console.log(first); // Spokane
console.log(fourth); // Boston

// object
var vacation = {
    destination: "Chile",
    travelers: 2,
    activity: "skiing",
    cost: 4000
};

var {destination, activity} = vacation;

function vacationMarketing({destination, activity}) {
    return `Come to ${destination} and do some ${activity}`
}
console.log(vacationMarketing(vacation));
```


#### Generators

```javascript
<script src="https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.29/browser-polyfill.js"></script>

// Generators是一种新的函数类型
function* director() {
    yield '3';
    yield '2';
    yield '1';
    yield 'Action';
}

var action = director(); // 注意，这里()是调用

console.log(action.next().value)
console.log(action.next().value)
console.log(action.next().value)
console.log(action.next().value)

// example 2
function* eachItem(arr) {
    for (var i = 0; i < arr.length; i++) {
        yield arr[i];
    }
}

var letters = eachItem(["a", "b", "c", "d", "e", "f", "g"]);

var abcs = setInterval(function () {
        var letter = letters.next();
        if (letter.done) {
            clearInterval(abcs);
            console.log("Now I know my ABC's");
        } else {
            console.log(letter.value);
        }
    },

    500);
```


#### Symbols

primitive:

- number
- string
- array
- string
- Symbol (new)

Symbol:

- 新的js原生类型
- 经常被用作唯一的id
- 定义定制的遍历行为

```javascript
const id = Symbol(); // 工厂方法，用来创建things
const courseInfo = {
    title: "ES6",
    topics: ["babel", "syntax", "functions", "classes"],
    id: "js-course"
};

courseInfo[id] = 41284;
console.log(courseInfo); // Symbol(): 41284
```


#### Iterators

新的协议(Protocols)

- iterable：js object定义他们自己的遍历行为
- iterator：产生一系列值的标准方式

```javascript
var title = 'ES6';
console.log(typeof title[Symbol.iterator]); // function

var iterateIt = title[Symbol.iterator](); // 调用iterator这个function
console.log(iterateIt.next());
console.log(iterateIt.next());
console.log(iterateIt.next());
console.log(iterateIt.next());

function tableReady(arr) {
    var nextIndex = 0;
    return {
        next() {
            if (nextIndex < arr.length) {
                return {value: arr.shift(), done: false}
            } else {
                return {done: true}
            }
        }
    }
}

var waitingList = ['Sarah', 'Heather', 'Anna', 'Meagan'];
var iterateList = tableReady(waitingList);

console.log(`${iterateList.next().value}, your table is ready`);
console.log(`${iterateList.next().value}, your table is ready`);
console.log(`${iterateList.next().value}, your table is ready`);
console.log(`${iterateList.next().value}, your table is ready`);
console.log(`Is this finished? ${iterateList.next().done}`);
```

> iterator和generator都是函数，通过调用()它们，返回一个object，这个object有next()方法


### 5. Asynchronous Features

#### Intro to promises

```javascript
const delay = seconds => {
    return new Promise((resolve, reject) => {
        if (typeof seconds !== 'number') {
            reject(new Error('Argument seconds must be a number'));
        }
        setTimeout(
            () => resolve(`${seconds} second delay is up`),
            seconds * 1000
        );
    });
};

console.log("zero seconds");
delay("10 Minutes").then(msg => msg.toUpperCase())
    .then(msg => `${msg}!!!!!!`)
    .then(msg => console.log(msg));
delay(2).then(msg => msg.toUpperCase())
    .then(msg => `${msg}!!!!!!`)
    .then(msg => console.log(msg));
```


#### Building promises

```javascript
const spacePeople = () => {
    return new Promise((resolves, rejects) => {
        const api = 'http://api.open-notify.org/astros.json';
        const request = new XMLHttpRequest();
        request.open('GET', api);
        request.onload = () => {
            if (request.status === 200) {
                resolves(JSON.parse(request.response));
            } else {
                rejects(Error(request.statusText));
            }
        };
        request.onerror = err => rejects(err);
        request.send();
    });
};

spacePeople().then(
    spaceData => console.log(spaceData),
    err => console.error(
        new Error('Cannot load space people')
    )
);
```


#### Loading data with fetch

```javascript
const getPeopleInSpace = () =>
    fetch('http://api.open-notify.org/astros.json')
        .then(res => res.json());

const spaceNames = () =>
    getPeopleInSpace()
        .then(json => json.people)
        .then(people => people.map(p => p.name))
        .then(names => names.join(', '));

spaceNames()
    .then(console.log); // 函数引用，像java中的Map::get
```


#### Async and await

```javascript
const delay = seconds => {
    return new Promise(
        resolve => setTimeout(resolve, seconds * 1000)
    )
};

const countToFive = async () => {
    console.log('zero seconds');
    await delay(1);
    console.log('one second');
    await delay(1);
    console.log('two seconds');
    await delay(3);
    console.log('five seconds');
};

countToFive();
```


#### Async with fetch

```javascript
(async (loginName) => {
    try {
        var response = await fetch(`https://api.github.com/users/${loginName}/followers`);
        var json = await response.json();
        var followerList = json.map(user => user.login);
        console.log(followerList);
    } catch (e) {
        console.log("Data didn't load", e);
    }
})('eveporcello');
```

await，async是Promise的语法糖，自动封装成Promise; Note that the await keyword only works inside async functions

[From JavaScript Promises to Async/Await: why bother?](https://blog.pusher.com/promises-async-await/)

The fundamental difference between await and vanilla Promises is that await X() suspends execution of the current function, while promise.then(X) continues execution of the current function after adding the X call to the callback chain.


### 6. ES6 Classes

#### ES6 class syntax

```javascript
class Vehicle {
    constructor(description, wheels) {
        this.description = description;
        this.wheels = wheels;
    }

    describeYourself() {
        console.log(`I am a ${this.description} with ${this.wheels} wheels`);
    }
}

var coolSkiVan = new Vehicle("cool ski van", 4);

coolSkiVan.describeYourself();
```


#### Class inheritance

```javascript
class Vehicle {
    constructor(description, wheels) {
        this.description = description;
        this.wheels = wheels;
    }

    describeYourself() {
        console.log(`I am a ${this.description} with ${this.wheels} wheels`);
    }
}

var coolSkiVan = new Vehicle("cool ski van", 4);

coolSkiVan.describeYourself();

class SemiTruck extends Vehicle {
    constructor() {
        super("semi truck", 18)
    }
}

var groceryStoreSemi = new SemiTruck();
groceryStoreSemi.describeYourself();
```


#### Getters and setters

```javascript
var attendance = {
    _list: [],
    set addName(name) {
        this._list.push(name);
    },
    get list() {
        return this._list.join(', ');
    }
};

attendance.addName = 'Joanne'; // 不需要加()
console.log("List getter:", attendance.list); // 不需要加()
console.log("Underscore list (prop)", attendance._list);

attendance.addName = 'Anna';
attendance.addName = 'Charlie';
console.log(attendance.list);

console.log("============= Classes ============== ")

class Hike {
    constructor(distance, pace) {
        this.distance = distance;
        this.pace = pace;
    }

    get lengthInHours() {
        return `${this.calcLength()} hours`;
    }

    calcLength() {
        return this.distance / this.pace;
    }
}

const mtTallac = new Hike(10, 2);
console.log(mtTallac.lengthInHours);
```
