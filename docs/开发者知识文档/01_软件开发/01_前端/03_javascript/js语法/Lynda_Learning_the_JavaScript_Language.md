
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

```javascript
y = "hello world";

var x = 32;
x = 45;

var whereAmI = "Santa Barbara, CA";
whereAmI = 75;

var monster1 = "Grover",
    monster2 = "Cookie Monster",
    monster3 = "Animal";

// More info:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/var

```


##### Strings

```javascript
"This is a string";
"This is also a string";

'<a href="">';
"This is Joe's favorite string";

"This is Joe's \"favorite\" string";

"This is \
Joe's Favorite \
String EVER";

// More info:
// https://developer.mozilla.org/en-US/docs/JavaScript/Guide/Values,_variables,_and_literals
// https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/String
```


##### String properties and methods

```javascript
var myString = "This is my string. Leave it alone";
myString;
myString.length;
myString.toUpperCase();

"This is my string".length;

// More info:
// https://developer.mozilla.org/en-US/docs/JavaScript/Guide/Values,_variables,_and_literals
// https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/String

```


##### Numbers

```javascript
// JS中，所有的number都只是一个类型：Number
12;
12.0;
12.82358972893527582;
-12;
Infinity;
-Infinity;
NaN; // not a number

var myNumber = 33;

Math;
Math.round(12.4984012840918); // 12
Math.round(12.92309820948209384); // 13

Math.random(); // 0-1

// More info:
// https://developer.mozilla.org/en-US/docs/JavaScript/Guide/Values,_variables,_and_literals
// https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Infinity
// https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Infinity
// https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/NaN
// https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Math

```


##### Booleans and the quest for truth

```javascript
true;
false;

buttonHasBeenClicked = false;

var myLocation = "Santa Barbara",
    myOtherLocation = "Los Angeles";

myLocation === myOtherLocation;

myOtherLocation = "Santa Barbara";

myLocation === myOtherLocation;

// More info:
// https://developer.mozilla.org/en-US/docs/JavaScript/Guide/Values,_variables,_and_literals
// https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Boolean

```


### 3. Objects, Arrays, and More

##### Objects

```javascript
12;
("strings");
true;

{
}
var emptyObject = {};
emptyObject;

var notEmptyObject = {
    'label': "value",
    'label2': "value2",
};

var notEmptyObject = {
    label: "value",
    label2: "value2",
};
notEmptyObject;

// More info:
// https://developer.mozilla.org/en-US/docs/JavaScript/Guide/Working_with_Objects
// https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Objects

```


##### Objects for modeling data

```javascript
var bird = {
    genus: "corvus",
    species: "corvax",
    commonName: "raven",
    callType: "squawky",
    quote: "Nevermore",
    maxOffspring: 5,
    noisy: true,
    deadly: false,
};

var bear = {
    genus: "ursus",
    species: "arctos",
    commonName: "brown bear",
    callType: "roar",
    quote: "",
    maxOffspring: 3,
    noisy: true,
    deadly: true,
};

var bookOfKnowledge = {
    "lunch time": "12:30 PM",
    "the ultimate answer": 42,
    bestSong: "Lonnie's Lament",
    earth: "Mostly harmless.",
};

```


##### Manipulating objects

```javascript
var bird = {
    genus: "corvus",
    species: "corvax",
    commonName: "raven",
    callType: "squawky",
    quote: "Nevermore",
    maxOffspring: 5,
    noisy: true,
    deadly: false,
};

bird.quote;

bird."quote"; // this does not work

bird["quote"];

bird.color = "black"; // 添加，修改
bird["where it lives"] = "in a tree";
bird.whereItLives = "in a tree";
bird.whereItLives;
bird["whereItLives"];

delete bird.color;
bird;

// More info:
// https://developer.mozilla.org/en-US/docs/JavaScript/Guide/Working_with_Objects
// https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Object

```


##### Jargon: References and objects

```javascript
var animal = {
    genus: "corvus",
    species: "corvax",
    commonName: "raven",
    callType: "squawky",
    quote: "Nevermore",
    maxOffspring: 5,
    noisy: true,
    deadly: false,
};

var animal2 = animal;

animal2.genus = "ursus";

animal2 = {
    genus: "corvus",
    species: "corvax",
    commonName: "raven",
    callType: "squawky", // there is a deliberate bug here in the course, removed for your convenience :)
    quote: "Nevermore",
    maxOffspring: 5,
    noisy: true,
    deadly: false,
};

// bonus: make a copy of an object safely
animal2 = JSON.parse(JSON.stringify(animal));

animal2.genus = "ursus";

// More info:
// https://developer.mozilla.org/en-US/docs/JavaScript/Guide/Working_with_Objects
// https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Object

```


##### Arrays

```javascript
// arr是一个obj
var myArray = [];

var daysOfTheWeek = ["Sunday", "Monday", "Tuesday", "Wednesday"];

var myArray = [0, 1, 2, "string1", "string2", "string3", true, false];

var counties = ["Belknap", "Strafford", "Carroll", "Rockingham"];

var arrayOfStuff = [{ name: "value" }, [1, 2, 3], true, "nifty"];
arrayOfStuff.length;

// More info:
// https://developer.mozilla.org/en-US/docs/JavaScript/Guide/Values%2C_variables%2C_and_literals#Array_literals
// https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array

```


##### Manipulating arrays

```javascript
var counties = ["Belknap", "Strafford", "Carroll", "Rockingham"];

// 查看
counties[0];
counties[2];

// 修改
counties[2] = "Cheshire";
counties[4] = "Carroll";

// 添加
counties[counties.length] = "Merrimack";
counties.push("Coos");
counties.shift("front")

// 删除 不会改变length，用empty替代了那个位置
counties.pop();
delete counties[2];
counties.unshift()

// 切片，从第2个index开始删，一共删掉1个item
counties.splice(2, 1);

counties.length;

// More info:
// https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array

```


##### Readability: Whitespace

```javascript
var year=2012,month='October',day=31,holiday='Halloween';

var year   = 2012,       month    =    'October', day =          31,          holiday='Halloween';

var year = 2012,
    month = 'October',
    day = 31,
    holiday = 'Halloween';

var year    = 2012,
    month   = 'October',
    day     = 31,
    holiday = 'Halloween';

var tinyAlmanac={'year':2012,'month':'October','day':31,'holiday':'Halloween'};

var tinyAlmanac = {
    'year' : 2012,
    'month' : 'October',
    'day' : 31,
    'holiday' : 'Halloween'
};

var longString = "Four score \
and seven years ago \
our fathers brought forth \
on this continent \
a new nation";

// More info: 
// These are not specifications on whitespace, but the Mozilla recommended coding style concerning whitespace.
// https://developer.mozilla.org/en-US/docs/Mozilla/Developer_guide/Coding_Style#Whitespace

```


##### Readability: Comments

```javascript
// another after the slashes does not execute
var year = 2012,
    month = "October", // this is the month
    day = 31,
    holiday = "Halloween";

/*
You can write comments
across multiple lines
finally ending with:
*/

var tinyAlmanac = {
    year: 2012,
    month: "October",
    day: 31,
    holiday: "Halloween"
};

// watch out for block comments here
var myRegExp = /[0-9].*/;

// More info:
// https://developer.mozilla.org/en-US/docs/JavaScript/Guide/Statements#Comments

```


##### Regular expressions

```javascript
var string1 = 'This is the longest string ever-';
var string2 = 'This is the shortest string ever.';
var string3 = 'Is this the thing called Mount Everest?';
var string4 = 'This is the Sherman on the Mount.';

// 正则表达式是js中的一种数据类型，就像Number
var regex = /this/; // 大小写敏感

console.log(regex.test(string1)); // false
console.log(regex.test(string2)); // false
console.log(regex.test(string3)); // true
console.log(regex.test(string4)); // false
console.log()

regex = /this/i; // ignore大小写

regex = /^this/i; // 以此开头

regex = /this$/i; // 以此结尾

regex = /ever.$/i; // 以ever加一个字符结尾

regex = /ever\.$/i; // 以ever.结尾

regex = /Moun.$/i;

// More info:
// https://developer.mozilla.org/en-US/docs/JavaScript/Guide/Regular_Expressions
// http://regex.info/book.html

```



### 4. Operators and Control Structures

##### Simple comparisons

```javascript
var one = 1,
    two = 2;

one === one; // true 严格相等
one !== one; // false 严格不相等
one !== two; // true
one === two; // false

one == one; // true
one == "1"; // true (?!) 会自动做类型转换，字母1和数字1也就相等了，
one != "1"; // false (?!)
one === "1"; // false

one < two; // true

one > two; // false

one <= two; // true

one <= one; // true

one >= two; // false

10 >= two; // true

// More info:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Comparison_Operators

```


##### Arithmetic operators

```javascript
2 + 5;
4 - 3;
5 - 9;
3 * 5;
36 / 6;
36 / 5; // 7.2

20 % 2;
19 % 2;

// twenty an even number?
20 % 2 === 0; // true

var counter = 0;
counter = counter + 1;

counter += 1;
counter++;
++counter;

counter += 5;
counter += -4;

counter -= 1;
counter--;

counter *= 2;

"cat" + "dog";
"cat " + "dog";
"cat" + " and " + "dog";

str = "123"
str += " 456"
console.log(str) // 123 456

// More info:
// https://developer.mozilla.org/en-US/docs/JavaScript/Guide/Expressions_and_Operators#Arithmetic_operators
// https://developer.mozilla.org/en-US/docs/JavaScript/Guide/Expressions_and_Operators#String_operators

```


##### Logical operators

```javascript
var animal1 = "monkey";
var animal2 = "bear";
var animal3 = "tiger";

animal1 === "monkey" && animal2 === "bear"; // true
animal1 === "ape" && animal2 === "bear"; // false
animal1 === "ape" && animal2 === "bear" && animal3 === "tiger"; // false
animal1 === "monkey" && animal2 === "bear" && animal3 === "tiger"; // true

animal1 === "monkey" || animal2 === "bear"; // true
animal1 === "ape" || animal2 === "bear"; // true
animal1 === "ape" || animal2 === "ostrich"; // false

animal1 === "monkey" || animal2 === "monkey" && animal3 === "tiger";
(animal1 === "monkey" || animal2 === "monkey") && animal3 === "tiger";

!true; // false
!false; // true

animal1 === "monkey" && animal2 === "bear"; // true
!(animal1 === "monkey" && animal2 === "bear"); // false
animal1 !== "monkey" && animal2 !== "bear"; // false

// More info:
// https://developer.mozilla.org/en-US/docs/JavaScript/Guide/Expressions_and_Operators#Logical_operators

```


##### Conditionals: if

```javascript
var answer = window.confirm("Click OK, get true.  Click cancel, get false.");
answer;

if (answer === true) {
    console.log("You said true!");
}

if (answer === true) {
    console.log("You said true!");
} else {
    console.log("You said something else");
}

var answer = window.prompt("Type YES, NO, or MAYBE.  Then click OK.");
if (answer === "YES") {
    console.log("You said YES!");
} else if (answer === "MAYBE") {
    console.log("You said maybe. I don't know what to make of that."); // note the double primes
} else if (answer === "NO") {
    console.log("You said no. :(");
} else {
    console.log("You rebel, you!");
}

var answer = window.prompt("Type YES, NO, or MAYBE.  Then click OK.");
if (answer === "YES" || answer === "NO") {
    // Do some common actions for YES and NO

    if (answer === "YES") {
        console.log("You said YES!");
        // do some other things
    } else {
        console.log("You said no. :(");
        // do some things only for NO
    }
} else if (answer === "MAYBE") {
    console.log("You said maybe.  I don't know what to make of that.");
} else {
    console.log("You rebel, you!");
}

// More info:
// https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Statements/if...else

```


##### Conditionals: switch

```javascript
var answer = window.prompt("Type YES, NO, or MAYBE.  Then click OK.");

if (answer === "YES") {
    console.log("You said YES!");
} else if (answer === "MAYBE") {
    console.log("You said maybe. I don't know what to make of that.");
} else if (answer === "NO") {
    console.log("You said no. :(");
} else {
    console.log("You rebel, you!");
}

switch (answer) {
    case "YES":
        console.log("You said YES!");
        break;
    case "MAYBE":
        console.log("You said maybe. I don't know what to make of that.");
        break;
    case "NO":
        console.log("You said no. :(");
        break;
    default:
        console.log("You rebel, you!");
        break;
}

// More info:
// https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Statements/switch

```


##### Terse ifs

```javascript
var cherub = "Cupid";
// cherub = 'Some Other Guy';

if (cherub === "Cupid") {
    console.log("Ouch, an arrow!  Ooo, I'm in love!");
}

if (cherub === "Cupid") {
    console.log("Ouch, an arrow!  Ooo, I'm in love!");
} else {
    console.log("I feel nothing!");
}

var wantForChristmas = "puppy",
    gotForChristmas = "puppy",
    cryAboutIt = false;

if (wantForChristmas === gotForChristmas) {
    console.log("Yay! The little children are so pleased!");
    cryAboutIt = false;
} else {
    console.log("Oh no! Sad Christmas!");
    cryAboutIt = true;
}

if (cryAboutIt) {
    console.log("Child says: WAAAAAAAAAAAAAAAAAAAAAAAAA!");
}

if (!cryAboutIt) {
    console.log("Child says: YAY!!");
}

// More info:
// https://developer.mozilla.org/en-US/docs/JavaScript/Guide/Statements#if...else_Statement
//
// Truthy and falsy values are discussed here:
// https://developer.mozilla.org/en-US/docs/Glossary/Truthy

```


##### Ternary operator

```javascript
var animal = "cat";
// animal = 'dog';

animal === "cat"
    ? console.log("You will be a cat herder.")
    : console.log("You will be a dog catcher.");

var job = animal === "cat" ? "cat herder" : "dog catcher";

// More info:
// https://developer.mozilla.org/en-US/docs/JavaScript/Guide/Statements#if...else_Statement
//
// Truthy and falsy values are discussed here:
// https://developer.mozilla.org/en-US/docs/Glossary/Truthy
//
// https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Operators/Conditional_Operator

```


##### type checking

```javascript
var thing = 12;
thing = "twelve";
typeof thing; // string

thing = 12;
typeof thing; // number

thing = false;
typeof thing; // boolean

thing = {};
typeof thing; // object

thing = [];
typeof thing; // object

/**
 * 因为object和array都是object，想区分开就要使用特殊手段，如下：
 */
typeof thing === "object" && thing.hasOwnProperty("length"); // true

thing = {};
typeof thing === "object" && thing.hasOwnProperty("length"); // false

NaN;
typeof NaN; // number

/**
 * 因为number和NaN都是number类型，所以要区分需要使用特殊手段，如下：
 */
Number.isNaN();

typeof null; // object

/**
 * 因为null也是object，所以要判断是不是null，要用 ===
 */
thing === null;

// More info:
// https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Operators/typeof

// https://lodash.com/docs/#isNumber

```



### 5. Iterating with loops

##### For loops: Sequential

```javascript
for (var i = 0; i < 10; i += 1) {
    console.log(i);
}

// very common use case: looping over an array.
var pageNames = [
    "Home",
    "About Us",
    "Contact Us",
    "JavaScript Playground",
    "News",
    "Blog"
];

for (i = 0; i < pageNames.length; i += 1) {

    if (document.title === pageNames[i]) {
        console.log("We ARE here: " + pageNames[i]);
        break;
    } else {
        console.log("We are not here: " + pageNames[i]);
    }
}

// don't repeat yourself:
var pageNames = [
    "Home",
    "About Us",
    "Contact Us",
    "JavaScript Playground",
    "News",
    "Blog"
];

for (i = 0; i < pageNames.length; i += 1) {

    var currentPageTitle = pageNames[i];

    if (document.title === currentPageTitle) {
        console.log("We ARE here: " + currentPageTitle);
    } else {
        console.log("We are not here: " + currentPageTitle);
    }
}

// More info:
// https://developer.mozilla.org/en-US/docs/JavaScript/Guide/Statements#for_Statement
// https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Statements/for

```


##### For loops: Enumerative

```javascript
// iterate over an array
var pageNames = [
    "Home",
    "About Us",
    "Contact Us",
    "JavaScript Playground",
    "News",
    "Blog"
];
// 不保证遍历顺序
// p是index， 0,1,2,3...
for (var p in pageNames) {
    console.log(p, pageNames[p]);
}

// iterate over an object
var pages = {
    first: "Home",
    second: "About Us",
    third: "Contact Us",
    fourth: "JavaScript Playground",
    fifth: "Blog"
};
for (var p in pages) {

    // hasOwnProperty，非继承来的prop；为了只遍历自己的属性，要加上判断
    if (pages.hasOwnProperty(p)) {
        console.log(p, pages[p]);
    }
}

// More info:
// https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Statements/for...in

```


##### while loops

```javascript
// for loop
for (var i = 0; i < 10; i++) {
    console.log(i);
}

// same thing as a while loop
var i = 0;
while (i < 10) {
    console.log(i + "... This will go until we hit 10");
    i += 1;
}

var myArray = [true, true, true, false, true, true];

var myItem = null;

while (myItem !== false) {
    console.log(
        "myArray has " +
        myArray.length +
        " items now. This loop will go until we pop a false."
    );
    myItem = myArray.pop();
}

var counter = 1;
while (true) {
    console.log(counter);
    counter++;
    break; // comment out this break statement to make this loop go forever and potentially lock up your web browser
}

var myArray = [true, true, true, false, true, true];

var myItem = false;
do {
    console.log(
        "myArray has " +
        myArray.length +
        " items now. This loop will go until we pop a false."
    );
    myItem = myArray.pop();
} while (myItem !== false);

// More info:
// https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Statements/while
// https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Statements/do...while

```



### 6. Functions

##### Basic functions

```javascript
console.log('Arf');
console.log('Woof');
console.log('Meow');
console.log('Moooooooooooo');

function speak() {

    console.log('Arf');
    console.log('Woof');
    console.log('Meow');
    console.log('Moooooooooooo');
}

speak();

// More info:
// https://developer.mozilla.org/en-US/docs/JavaScript/Guide/Functions
// https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Statements/function

```


##### Arguments in functions

```javascript
fuddify("Be very quiet, I'm hunting rabbits.");
fuddify("You screwy rabbit.");
fuddify("Rabbit tracks!");

function fuddify(speech) {
    // if it's not a string, return an error message
    if (typeof speech !== "string") {
        console.error("Nice twy, wabbit!");
        return;
    }

    // otherwise, make it sound like Elmer Fudd
    speech = speech.replace(/r/g, "w");
    speech = speech.replace(/R/g, "W");

    return speech;
}

var utterance = fuddify("You screwy rabbit");
utterance;

function isEven(num) {
    if (num % 2 === 0) {
        return true;
    } else {
        return false;
    }
}

function isEven(num) {
    return num % 2 === 0;
}

12 % 2;
isEven(44);

// More info:
// https://developer.mozilla.org/en-US/docs/JavaScript/Guide/Functions
// https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Statements/function

```


##### more on arguments

```javascript
function speakSomething(what = "Default speech", howMany) {
    // this pattern works nicely for default values:
    // check if the argument is undefined, and if it is, provide a default value
    var what = (typeof what !== "undefined") ? what : "Default speech";
    //var what = (typeof what !== "undefined") ? arguments[0] : "Default speech";
    var howMany = (typeof howMany !== "undefined") ? howMany : 10;

    // shorter version that could get tripped up by truthiness
    // what = what || 'Default speech';
    // howMany = howMany || 10;

    for (var i = 0; i < howMany; i += 1) {
        console.log(what + " (" + i + ")");
    }
}

speakSomething("Hey hey", 5);
speakSomething("Hey hey");
speakSomething();

function addingMachine() {
    // initialize the total we'll be returning
    var total = 0;

    for (var i = 0; i < arguments.length; i += 1) {
        // grab the next number
        var number = arguments[i];

        // check if the argument is a number.
        // if so, add it to the running total
        if (typeof number === "number") {
            total += number;
        }
    }

    // done - return the total
    return total;
}

addingMachine(1, 2, 3);
addingMachine(1, 2, 3, 4, 5, 6, 7, 8, 9, 1204910249014);

// More info:
// https://developer.mozilla.org/en-US/docs/JavaScript/Guide/Functions
// https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Statements/function

```


##### objects, references, and functions

```javascript
var calvin = {
    name: "Calvin",
    bestFriend: "Hobbes",
    form: "human boy"
};

// you can also pass an object to a function
// because objects are passed by reference, the argument will be modified
function transmogrifier(calvin) {
    if (typeof calvin !== "object") {
        console.error("argument is of the wrong type");
        return;
    }

    // generate a random number between 1 and 5
    var randomNumber = Math.floor(Math.random() * 5) + 1;

    switch (randomNumber) {
        case 1:
            calvin.form = "tyrannosaurus";
            break;
        case 2:
            calvin.form = "grey wolf";
            break;
        case 3:
            calvin.form = "bengal tiger";
            break;
        case 4:
            calvin.form = "grizzly bear";
            break;
        case 5:
            calvin.form = "canary";
            break;
        default:
            // he stays human
            calvin.form = "human boy";
            break;
    }
}

// this version of the transmogifier does return a copy, leaving the original alone
function transmogrifyCopy(calvin) {
    if (typeof calvin !== "object") {
        console.log("argument is of the wrong type");
        return;
    }

    // generate a random number between 1 and 5
    var randomNumber = Math.floor(Math.random() * 5) + 1;
    var newForm = calvin.form; // by default, do not change

    switch (randomNumber) {
        case 1:
            newForm = "tyrannosaurus";
            break;
        case 2:
            newForm = "grey wolf";
            break;
        case 3:
            newForm = "bengal tiger";
            break;
        case 4:
            newForm = "grizzly bear";
            break;
        case 5:
            newForm = "canary";
            break;
        default:
            // he stays human
            newForm = "human boy";
            break;
    }

    // return a new object that's just like calvin,
    // but transmogrified!
    return {
        name: calvin.name,
        bestFriend: calvin.bestFriend,
        form: newForm
    };
}

// More info:
// https://developer.mozilla.org/en-US/docs/JavaScript/Guide/Functions
// https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Statements/function

```


##### functions are objects

```javascript
function speakSomething(what) {
    what = what || "Speaking!";

    for (var i = 0; i < 10; i += 1) {
        console.log(what);
    }
}

var speakSomething = function (what) {
    what = what || "Speaking!";

    for (var i = 0; i < 10; i += 1) {
        console.log(what);
    }
};

window.setTimeout(speakSomething, 5000);

var obj = {
    sayHello: function () {
        console.log("Hello");
    }
};

obj.sayHello();

// More info:
// https://developer.mozilla.org/en-US/docs/JavaScript/Guide/Functions
// https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Statements/function

```


##### Jargon: Scope in javascript

避免使用全局变量，尽量使用本地变量，by using (var let const)


##### variable scope in functions

```javascript
var myNum = 32;
var myResult = "Success!";

/**
 * 函数可以生成scope，scope意味着可以覆盖外面的变量
 */
function randomizer(limit) {

    var randomNumber = Math.floor(Math.random() * limit);

    var myNum = randomNumber;

    console.log("myNum is", myNum);
    console.log("Global myNum is", window.myNum); // windows是global namespace

    console.log("Our result is", myResult);

    {
        let a = 1;
        const aa = 1;
        var b = 2;
    }
    console.log(a); // 找不到变量，就像java的表现
    console.log(b); // 能找到，就像python的表现

    return myNum;
}

randomizer(10);

function doubleIt(num) {
    var myNum = num * 2;

    return myNum;
}

// More info:
// https://developer.mozilla.org/en-US/docs/JavaScript/Guide/Functions#Function_scope

```


##### Jargon: Callback functions

```javascript
function doubleIt(number) {
    return (number *= 2);
}

var myNumbers = [1, 2, 3, 4, 5];

var myDoubles = myNumbers.map(doubleIt);

myNumbers.forEach(function (number) {
    console.log("My array contains", number);
});

var myDoubles = myNumbers.map(num1 => num1 *= 2);

doubleIt = number => (number *= 2);
doubleIt = number => {
    return number *= 2
};
doubleIt = number => (number ** 2);

console.log(typeof doubleIt) // function
console.log(typeof doubleIt()) // number

// https://developer.mozilla.org/en-US/docs/Glossary/Callback_function
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach

```



### 7. More Advanced pieces

##### Asynchronous code: The waiting is the hardest part


##### Promises, async, and await

```javascript
/**
 * Callbacks
 */

// With one, it's simple enough
jQuery.get("https://httpbin.org/get?data=1", function (response) {
    // Now I have some data
});

// Callbacks get nested ad infinitum
jQuery.get("https://httpbin.org/get", function (response) {
    // Now I have some data

    jQuery.get("https://httpbin.org/get", function (response) {
        // Now I have some more data

        jQuery.get("https://httpbin.org/get", function (response) {
            // Now I have even more data!
        });
    });
});

/**
 * Promises
 */

// One Promise
axios.get("https://httpbin.org/get").then(function (response) {
    // now I have some data
});

// Multiple promises in sequence, no nesting
axios
    .get("https://httpbin.org/get")
    .then(function (response) {
        // now I have some data

        return axios.get("https://httpbin.org/get");
    })
    .then(function (response) {
        // now I have some data

        return axios.get("https://httpbin.org/get");
    });

/**
 * Async / Await
 */

// One request
async function getOneThing() {
    var response = await axios.get("https://httpbin.org/get");

    // now I have some data
}

// Multiple requests
async function getLotsOfThings() {
    var response1 = await axios.get("https://httpbin.org/get");
    var response2 = await axios.get("https://httpbin.org/get");
    var response3 = await axios.get("https://httpbin.org/get");

    // Now I have lots of data
}

```


##### object-oriented javascript: Prototypes and classes

```javascript
Cake.prototype.back = function(temp, minutes) {
    // do something
}

class 关键字 - prototype的语法糖
```


##### JargonL: Strong vs loose typing 

typescript


##### Modern javascript tooling

```javascript
// dynamic imports
import {myHelper} from helperFunctions;

```

> 打包工具

- webpack
- rollup


> 包管理工具

- npm
- yarn


> 编译工具

- babel
