## Lynda 课程：Learning ECMAScript 6

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


#### Transpiling with webpack

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


#### Migrating to webpack 3

```html

```

```javascript

```



### 3. ES6 Syntax

#### Let keyword

```html

```

```javascript

```


#### Const keyword

```html

```

```javascript

```


#### Template strings

```html

```

```javascript

```


#### Spread operators

```html

```

```javascript

```


#### Maps

```html

```

```javascript

```


#### Sets

```html

```

```javascript

```


#### The for...of loop

```html

```

```javascript

```



### 4. ES6 Functions & Objects

#### Default function parameters

```html

```

```javascript

```


#### Enhacing object literals

```html

```

```javascript

```


#### Arrow functions

```html

```

```javascript

```


#### Arrow functions and the 'this' scope

```html

```

```javascript

```


#### Destructuring assignment

```html

```

```javascript

```


#### Generators

```html

```

```javascript

```


#### Symbols

```html

```

```javascript

```


#### Iterators

```html

```

```javascript

```



### 5. Asynchronous Features

#### Intro to promises

```html

```

```javascript

```


#### Building promises

```html

```

```javascript

```


#### Loading data with fetch

```html

```

```javascript

```


#### Async and await

```html

```

```javascript

```


#### Async with fetch

```html

```

```javascript

```



### 6. ES6 Classes

#### ES6 class syntax

```html

```

```javascript

```


#### Class inheritance

```html

```

```javascript

```


#### Getters and setters

```html

```

```javascript

```



### Conclusion

#### Next steps
