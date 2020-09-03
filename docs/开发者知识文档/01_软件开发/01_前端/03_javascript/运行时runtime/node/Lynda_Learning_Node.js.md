
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

node --experimental-json-modules ./demo.mjs

```javascript
// 方法1，读出来就是个obj
import data from "./data.json";

console.log('out: ' + data.name)


// 方法2，读出来是个string
import fs from "fs";

fs.readFile('./data.json', 'utf-8', (err, data) => {
    let dataObj = JSON.parse(data)
    console.log(dataObj.name)
})
```


#### Access directories

```javascript
import fs from "fs";

fs.readdir('/', (err, data) => {
    console.log(data);
});
```


#### Write to a file

```javascript
import fs from "fs";

let data = {
    name: 'Bob'
};

fs.writeFile('data.json', JSON.stringify(data), (err) => {
    console.log('write finished', err);
});
```


### 5. Building Your Demo App Chat Client for the Browser

#### Static serving with Express

```javascript
import express from 'express';

let app = express();

app.use(express.static(process.cwd()));
let server = app.listen(3001, () => {
    console.log('server is listening on port', server.address().port);
});
```


#### Create your browser app

```html
<!doctype html>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/css/bootstrap.min.css"
      integrity="sha384-/Y6pD6FV/Vv2HJnA6t+vslU6fwYXjCFtcEpHbNJ0lyAFsXTsjBbfaDjzALeQsN6M" crossorigin="anonymous">
<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"
        integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN"
        crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.11.0/umd/popper.min.js"
        integrity="sha384-b/U6ypiBEHpOf/4+1nzFpr53nxSS+GLCkfwBdFNTxtclqqenISfwAzpKaMNFNmj4"
        crossorigin="anonymous"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/js/bootstrap.min.js"
        integrity="sha384-h0AbiXch4ZDo7tp9hKZ4TsHbi047NrKGLO3SEJAg45jXxnGIfYzk4Si90RDIqNm1"
        crossorigin="anonymous"></script>

<div class="container">
    <br>
    <div class="jumbotron">
        <h1 class="display-4">Send Message</h1>
        <br>
        <input class="form-control" placeholder="Name">
        <br>
        <button id="send" class="btn btn-success">Send</button>
    </div>
    <div id="messages">

    </div>
</div>
<script>
    $(() => {
        $("#send").click(() => {
            addMessages({name: 'Tim', message: 'hello'});
        });
    });

    function addMessages(message) {
        $("#messages").append(`<h4> ${message.name} </h4> <p> ${message.message} </p>`);
    }
</script>
```


#### Create a get message service

```javascript
import express from "express";

let app = express();

app.use(express.static(process.cwd()));

let messages = [
    {name: 'Tim', message: 'Hi'},
    {name: 'Jane', message: 'Hello'}
];

app.get('/messages', (req, res) => {
    res.send(messages);
});

let server = app.listen(3000, () => {
    console.log('server is listening on port', server.address().port);
});
```

```html
<script>
    $(() => {
        $("#send").click(() => {
            addMessages({name: 'Tim', message: 'hello'});
        });
        getMessages();
    });

    function addMessages(message) {
        $("#messages").append(`<h4> ${message.name} </h4> <p> ${message.message} </p>`);
    }

    function getMessages() {
        $.get('http://localhost:3000/messages', (data) => {
            data.forEach(addMessages);
        });
    }
</script>
```


#### Create a post messages service

```html
<!doctype html>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/css/bootstrap.min.css"
      integrity="sha384-/Y6pD6FV/Vv2HJnA6t+vslU6fwYXjCFtcEpHbNJ0lyAFsXTsjBbfaDjzALeQsN6M" crossorigin="anonymous">
<script src="https://code.jquery.com/jquery-3.2.1.min.js" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.11.0/umd/popper.min.js"
        integrity="sha384-b/U6ypiBEHpOf/4+1nzFpr53nxSS+GLCkfwBdFNTxtclqqenISfwAzpKaMNFNmj4"
        crossorigin="anonymous"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/js/bootstrap.min.js"
        integrity="sha384-h0AbiXch4ZDo7tp9hKZ4TsHbi047NrKGLO3SEJAg45jXxnGIfYzk4Si90RDIqNm1"
        crossorigin="anonymous"></script>

<div class="container">
    <br>
    <div class="jumbotron">
        <h1 class="display-4">Send Message</h1>
        <br>
        <input id="name" class="form-control" placeholder="Name">
        <br>
        <textarea id="message" class="form-control" placeholder="Message"></textarea>
        <br>
        <button id="send" class="btn btn-success">Send</button>
    </div>
    <div id="messages">

    </div>
</div>
<script>
    $(() => {
        $("#send").click(() => {
            let message = {name: $("#name").val(), message: $("#message").val()};
            postMessage(message);
        });
        getMessages();
    });

    function addMessages(message) {
        $("#messages").append(`<h4> ${message.name} </h4> <p> ${message.message} </p>`);
    }

    function getMessages() {
        $.get('http://localhost:3000/messages', (data) => {
            data.forEach(addMessages);
        });
    }

    function postMessage(message) {
        $.post('http://localhost:3000/messages', message);
    }
</script>
```

```javascript
import express from "express";
import bodyParser from "body-parser";

let app = express();

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

let messages = [
    {name: 'Tim', message: 'Hi'},
    {name: 'Jane', message: 'Hello'}
];

app.get('/messages', (req, res) => {
    res.send(messages);
});

app.post('/messages', (req, res) => {
    messages.push(req.body);
    res.sendStatus(200);
});

let server = app.listen(3000, () => {
    console.log('server is listening on port', server.address().port);
});
```


#### Connect to Socket.io from the browser app

#### Create your Socket.io event

```html
<!doctype html>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/css/bootstrap.min.css"
      integrity="sha384-/Y6pD6FV/Vv2HJnA6t+vslU6fwYXjCFtcEpHbNJ0lyAFsXTsjBbfaDjzALeQsN6M" crossorigin="anonymous">
<script src="https://code.jquery.com/jquery-3.2.1.min.js" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.11.0/umd/popper.min.js"
        integrity="sha384-b/U6ypiBEHpOf/4+1nzFpr53nxSS+GLCkfwBdFNTxtclqqenISfwAzpKaMNFNmj4"
        crossorigin="anonymous"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/js/bootstrap.min.js"
        integrity="sha384-h0AbiXch4ZDo7tp9hKZ4TsHbi047NrKGLO3SEJAg45jXxnGIfYzk4Si90RDIqNm1"
        crossorigin="anonymous"></script>
<script src="/socket.io/socket.io.js"></script>

<div class="container">
    <br>
    <div class="jumbotron">
        <h1 class="display-4">Send Message</h1>
        <br>
        <input id="name" class="form-control" placeholder="Name">
        <br>
        <textarea id="message" class="form-control" placeholder="Message"></textarea>
        <br>
        <button id="send" class="btn btn-success">Send</button>
    </div>
    <div id="messages">

    </div>
</div>
<script>
    let socket = io();
    $(() => {
        $("#send").click(() => {
            let message = {name: $("#name").val(), message: $("#message").val()};
            postMessage(message);
        });
        getMessages();
    });

    socket.on('message', addMessage);

    function addMessage(message) {
        $("#messages").append(`<h4> ${message.name} </h4> <p> ${message.message} </p>`);
    }

    function getMessages() {
        $.get('http://localhost:3000/messages', (data) => {
            data.forEach(addMessage);
        });
    }

    function postMessage(message) {
        $.post('http://localhost:3000/messages', message);
    }
</script>
```

```javascript
import express from "express";
import bodyParser from "body-parser";
import {Server} from "http";
import socket from 'socket.io';

let app = express();
let http = Server(app);
let io = socket(http);

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

let messages = [
    {name: 'Tim', message: 'Hi'},
    {name: 'Jane', message: 'Hello'}
];

app.get('/messages', (req, res) => {
    res.send(messages);
});

app.post('/messages', (req, res) => {
    messages.push(req.body);
    io.emit('message', req.body);
    res.sendStatus(200);
});

io.on('connection', (socket) => {
    console.log('a user connected');
});

let server = http.listen(3000, () => {
    console.log('server is listening on port', server.address().port);
});
```


### 6. Exploring Databases

#### Saving data to MongoDB with Mongoose

```javascript
import express from "express";
import bodyParser from "body-parser";
import {Server} from "http";
import socket from 'socket.io';
import mongoose from "mongoose";

let app = express();
let http = Server(app);
let io = socket(http);

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

let dbUrl = 'mongodb://user:user@ds155424.mlab.com:55424/learning-node';

/**
 * Message代表一个table
 * message代表一个record
 */
let Message = mongoose.model('Message', {
    name: String,
    message: String
});

app.get('/messages', (req, res) => {
    Message.find({}, (err, messages) => {
        res.send(messages);
    });
});

app.post('/messages', (req, res) => {

    let message = new Message(req.body);

    message.save((err) => {

        if (err) {
            res.sendStatus(500);
        }
        io.emit('message', req.body);
        res.sendStatus(200);
    });

});

io.on('connection', (socket) => {
    console.log('a user connected');
});

mongoose.connect(dbUrl, {useMongoClient: true}, (err) => {
    console.log('mongo db connection', err);
});

let server = http.listen(3000, () => {
    console.log('server is listening on port', server.address().port);
});
```


### 7. Improving Asynchronous Code

#### Nested callbacks

```javascript
app.post('/messages', (req, res) => {

    let message = new Message(req.body);

    message.save((err) => {

        if (err) {
            res.sendStatus(500);
        }

        Message.findOne({message: 'badword'}, (err, censored) => {
            if (censored) {
                console.log('censored words found', censored);
                Message.remove({_id: censored.id}, (err) => {
                    console.log('removed censored message');
                });
            }
        });

        io.emit('message', req.body);
        res.sendStatus(200);
    });
});
```


#### Promises

```javascript
mongoose.Promise = Promise;

app.post('/messages', (req, res) => {
    
    let message = new Message(req.body);

    message
        .save()
        .then(() => {
            console.log('saved');
            return Message.findOne({message: 'badword'});
        })
        .then(censored => {
            if (censored) {
                console.log('censored words found', censored);
                return Message.remove({_id: censored.id});
            }
            io.emit('message', req.body);
            res.sendStatus(200);
        })
        .catch((err) => {
            res.sendStatus(500);
            return console.error(err);
        });
});
```


#### Async/await

```javascript
mongoose.Promise = Promise;

app.post('/messages', async (req, res) => {

    let message = new Message(req.body);
    let savedMessage = await message.save();
    console.log('saved');

    let censored = await Message.findOne({message: 'badword'});
    if (censored) {
        await Message.remove({_id: censored.id});
    } else {
        io.emit('message', req.body);
    }

    res.sendStatus(200);
});
```


### 8. Error Handling and Debugging

#### Tyr/catch/Finally

```javascript
mongoose.Promise = Promise;

app.post('/messages', async (req, res) => {

    try {
        let message = new Message(req.body);
        let savedMessage = await message.save();
        console.log('saved');

        let censored = await Message.findOne({message: 'badword'});
        if (censored)
            await Message.remove({_id: censored.id});
        else
            io.emit('message', req.body);

        res.sendStatus(200);
    } catch (error) {
        res.sendStatus(500);
        return console.error(error);
    } finally {
        console.log('message post called');
    }
});
```


### 9. Testing

#### Simple test with Jasmine

```javascript
// root/spec/server.spec.js
describe('calc', () => {
    it('should multiply 2 and 2', () => {
        expect(2 * 2).toBe(5);
    });
});
```


#### Async test with Jasmine

```javascript
// root/spec/server.spec.js
import request from "request";

// a set of tests
describe('calc', () => {
    it('should multiply 2 and 2', () => {
        expect(2 * 2).toBe(4);
    });
});

describe('get messages', () => {
    it('should return 200 Ok', (done) => {
        // npm start，然后进行npm test
        request.get('http://localhost:3000/messages', (err, res) => {
            expect(res.statusCode).toEqual(200);
            done(); // 等待异步结束
        });
    });
    it('should return a list, thats not empty', (done) => {
        request.get('http://localhost:3000/messages', (err, res) => {
            expect(JSON.parse(res.body).length).toBeGreaterThan(0);
            done();
        });
    });
});
```


#### Introduction to test first development

```javascript
// root/spec/server.spec.js
describe('get messages from user', () => {
    it('should return 200 Ok', (done) => {
        request.get('http://localhost:3000/messages/tim', (err, res) => {
            expect(res.statusCode).toEqual(200);
            done();
        });
    });
    it('name should be tim', (done) => {
        request.get('http://localhost:3000/messages/tim', (err, res) => {
            expect(JSON.parse(res.body)[0].name).toEqual('tim');
            done();
        });
    });
});

// root/server.js
app.get('/messages/:user', (req, res) => {
    let user = req.params.user;
    Message.find({name: user}, (err, messages) => {
        res.send(messages);
    });
});
```
