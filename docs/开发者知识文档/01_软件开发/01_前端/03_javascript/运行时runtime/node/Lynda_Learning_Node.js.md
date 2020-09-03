
## Lynda: Learning Node.js

### 1. Introduction to Node

#### Understanding Node

node基于Chrome V8引擎开发


#### Demo application overview

Demo是个聊天网站


#### Download and install Node

```bash
node -v
```


#### Why is Javascript Node's language?

前后端统一语言，好处多多


#### The benefits and features of Javascript

- 前后端共享语言
- 前后端共享代码
- 动态语言
- JSON是内置的，JavaScript Object Notation（JS对象符号）


#### Asynvhronous takes and callbacks

耗时大头：

- 从网络中获取数据
- 从文件系统中获取数据

```javascript
// sync
fs = require('fs');

data = fs.readdirSync('/');
console.log('data:', data);

console.log("this comes after");


//async
fs = require('fs');

function phoneNumber(err, data) {
    console.log('data:', data);
}

fs.readdir('/', phoneNumber);

console.log("this comes after");
```

callback和callback也不一样，java中的callback，很多都是同步的，而node中的callback大多数都是异步的


### 2. Understanding npm: Node Package Manager

#### Write your own module

```json
// package.json
{
    "name": "02_01",
    "version": "1.0.0",
    "type":  "module", // 默认是commonjs
    "dependencies": {
    }
}
```

```javascript
// my-module.js
const myText = "hello from module";
export default myText;

// my-demo
import myText from "./my-module.js";
console.log(myText)
```


#### Manage third-party packages with npm

package = 一个或多个 module(s)

```json
// package.json
{
    "name": "02_02",
    "version": "1.0.0",
    "type": "module",
    "dependencies": {
        "lodash": "latest"
    }
}
```

```javascript
// demo.js
import _ from "lodash";
console.log(_.random(1, 1000))
```


#### What is the package.json file?

### 3. Reading and Writing Files

#### Read from files

```javascript

```


#### Access directories

```javascript

```


#### Write to a file

```javascript

```


### 4. Exploring Web Frameworks

#### Node.js frameworks

```javascript

```


#### Express

```javascript

```


#### Socket.io

```javascript

```


### 5. Building Your Demo App Chat Client for the Browser

#### Static serving with Express

```javascript

```


#### Create your browser app

```javascript

```


#### Create a get message service

```javascript

```


#### Create a post messages service

```javascript

```


#### Connect to Socket.io from the browser app

```javascript

```


#### Create your Socket.io event

```javascript

```


### 6. Exploring Databases

#### Types of data frameworks

```javascript

```


#### Set up MongoDB

```javascript

```


#### Mongoose

```javascript

```


#### Saving data to MongoDB with Mongoose

```javascript

```


### 7. Improving Asynchronous Code

#### Nested callbacks

```javascript

```


#### Promises

```javascript

```


#### Async/await

```javascript

```


### 8. Error Handling and Debugging

#### Tyr/catch

```javascript

```


#### Finally

```javascript

```


#### Editor debugging

```javascript

```


### 9. Testing

#### Simple test with Jasmine

```javascript

```


#### Async test with Jasmine

```javascript

```


#### Introduction to test first development

```javascript

```


### Conclusion

#### Next steps
