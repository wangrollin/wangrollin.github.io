# python3 语法

## Lynda 课程：Python Essential Training

### 2. Language overview

#### About the overview

python信条(在python解释器中输入`import this`查看完整版)：

- Beautify is better than ugly
- Explicit is better than implicit
- Simple is better than complex
- Complex is better than complicated
- Readability counts

python3

- Not backward compatible
- Everything is an object
- Print is a function
- One integer type
- All text is now Unicode
- Python3 is ten years old
- New code should be Python3

python没有`{}`和`;`


#### Hello world

```python
print('Hello, World.')

```

print在python2是一个关键字，在python3是一个方法


#### python anatomy

shebang：在第一行的前两个字符是`#!`

```python
#! /usr/bin/env python3

#! /usr/local/bin/python3

```

```python
#!/usr/bin/env python3
# Copyright 2009-2017 BHG http://bw.org/

import platform

print('This is python version {}'.format(platform.python_version()))

```


```python
#!/usr/bin/env python3
# Copyright 2009-2017 BHG http://bw.org/

import platform


def main():
    message()


def message():
    print('This is python version {}'.format(platform.python_version()))


if __name__ == '__main__':
    main()

```


#### expressions and statements

> expressions（只要能返回一个值 就是 表达式）

- `x = y`
- `x * y`
- `(x, y)`
- `x`
- `True`
- `f()`

> statements （是一行代码，可能仅仅是一个表达式）

```python
#!/usr/bin/env python3
# Copyright 2009-2017 BHG http://bw.org/

import platform

version = platform.python_version()

print('This is python version {}'.format(version))

print('This is python version {}'.format(version)); print("hello")

```


#### whitespace and comments

空格用来区分代码块

`#`之后是注释


#### using print()

```python
#!/usr/bin/env python3
# Copyright 2009-2017 BHG http://bw.org/


x = 1
y = '2'
print('Hello, World.{}'.format(0) + str(x) + y)
print(f'Hello, World.{x}')

```


#### blocks and scope

不管中间有多少空行，只要前面空格一样多，就是一个block

如果用两个空格，报语法错误，没有匹配的level

虽然变量是在内层block定义的，但是生效范围scope是这个代码块的各个层级

block无法定义scope；functions, object, modules 能够定义scope

```python
#!/usr/bin/env python3
# Copyright 2009-2017 BHG http://bw.org/

x = 42
print(x)  # 42

if True:
    x = '11' # 仍然是外部变量x的引用
    print(x)  # 11

print(x)  # 11

```


#### conditionals

python没有swtich case语句

```python
#!/usr/bin/env python3
# Copyright 2009-2017 BHG http://bw.org/


x = 42
y = 73

if x < y:
    print('hello')
elif x > y:
    pass
else:
    print('world')

if x < y: print('hello')

```


#### loops

while for --> 从这里就能看出来，python干一件事只有一种方法

```python
#!/usr/bin/env python3
# Copyright 2009-2017 BHG http://bw.org/

words = ['one', 'two', 'three', 'four', 'five']

n = 0
while n < 5:
    print(words[n])
    n += 1

```

```python
#!/usr/bin/env python3
# Copyright 2009-2017 BHG http://bw.org/

# simple fibonacci series
# the sum of two elements defines the next set

a, b = 0, 1
while b < 1000:
    print(b, end=' ', flush=True)
    a, b = b, a + b

print()  # line ending

```

```python
#!/usr/bin/env python3
# Copyright 2009-2017 BHG http://bw.org/

words = ['one', 'two', 'three', 'four', 'five']

for i in words:
    print(i)

print(i)  # five

```


#### functions

python种function的作用：function 和 subroutines（子程序）

```python
#!/usr/bin/env python3
# Copyright 2009-2017 BHG http://bw.org/

def function(x, n='default', m=2):
    print(f'x is {x}, n is {n}, m is {m}')


result = function(12, m=4)

print(result)  # None

```

```python
#!/usr/bin/env python3
# Copyright 2009-2017 BHG http://bw.org/

def isprime(n):  # 这个n可以覆盖外面的n，因为function有scope
    if n <= 1:
        return False
    for x in range(2, n):
        if n % x == 0:
            return False
    else:
        return True


n = 5
if isprime(n):
    print(f'{n} is prime')
else:
    print(f'{n} not prime')

```


#### objects

```python
#!/usr/bin/env python3
# Copyright 2009-2017 BHG http://bw.org/

class Duck:

    sound = 'Quaaack!'
    walking = 'Walks like a duck.'

    # 在class内部的method，第一个参数都是self（由python自己赋值），后面的参数由调用方赋值
    # 再一次证明在python中做一件事情只有一种方法，不像java中this可以省略
    def quack(self):
        print(self.sound)

    def walk(self):
        print(self.walking)


def main():
    donald = Duck()
    donald.quack()
    donald.walk()


if __name__ == '__main__':
    main()

```


### 3. types and values

#### overview

```python
#!/usr/bin/env python3
# Copyright 2009-2017 BHG http://bw.org/

# 并不是所谓的无类型，而是可变类型，而是类型完全由变量的值来决定
# python里的所有值都是对象，class
x = 7  # <class 'int'>
x = 7.0  # <class 'float'>
x = '7'  # <class 'str'>
x = True  # <class 'bool'>
x = None  # <class 'NoneType'>

print(type(x))

```


#### The string type






```python

```


```python

```


#### numeric types





```python

```


```python

```


#### the bool type





```python

```


```python

```


#### sequence types





```python

```


```python

```


#### type() and id()





```python

```


```python

```


### 4. Conditionals

#### conditional syntax

#### conditional operators

#### conditional assignment

### 5. operators

#### arithmetic operators

#### bitwise operators

#### comparison operators

#### boolean operators

#### operator precedence

### 6. loops

#### python loops

#### the while loop

#### the for loop

#### additional controls

### 7. functions

#### defining a function

#### function arguments

#### argument lists

#### keyword arguments

#### return values

#### generators

#### decorators

### 8. structured data

#### basic data structures

#### lists and tuples

#### dictionaries

#### sets

#### list comprehension

#### mixed structures

### 9. classes

#### creating a class

#### constructing an object

#### class methods

#### object data

#### inheritance

#### iterator objects

### 10. exceptions

#### handling exceptions

#### reporting errors

### 11. string objects

#### overview of string objects

#### common string methods

#### formatting strings

#### splitting and joining

### 12. file I/O

#### opening files

#### text vs. binary mode

#### text files

#### binary files

### 13. built-in functions

#### numeric functions

#### string functions

#### container functions

#### object and class functions

### 14. modules

#### using standard modules

#### creating a module

### 15. databases

#### python database API

#### a database interface

#### example: short URL database

### Conclusion
