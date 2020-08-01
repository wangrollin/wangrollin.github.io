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

import platform

print('This is python version {}'.format(platform.python_version()))

```


```python
#!/usr/bin/env python3

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

words = ['one', 'two', 'three', 'four', 'five']

n = 0
while n < 5:
    print(words[n])
    n += 1

```

```python
#!/usr/bin/env python3

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

words = ['one', 'two', 'three', 'four', 'five']

for i in words:
    print(i)

print(i)  # five

```


#### functions

python种function的作用：function 和 subroutines（子程序）

```python
#!/usr/bin/env python3

def function(x, n='default', m=2):
    print(f'x is {x}, n is {n}, m is {m}')


result = function(12, m=4)

print(result)  # None

```

```python
#!/usr/bin/env python3

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
#!/usr/bin/env python3

x = 'se"123"ven'
print(x)

x = "s'123'ev'''123'''en"
print(x)

x = ''' 'line1'
line2 "seven"
line3 '''

x = """
    hhh
"""

str(2)

x.capitalize()  # 第一个字母大写
x.lower()
x.upper()
x = 'seven {} {}'.format(8, 9).lower()
x = 'seven {1} {0}'.format(8, 9).lower()  # 自己选位置
x = 'seven "{1:<9}" "{0:>9}"'.format(8, 9).lower()  # 自己选位置，左对齐，右对齐，{}内占用9个位置，不足处填充空格
x = 'seven "{1:<09}" "{0:>09}"'.format(8, 9).lower()  # 自己选位置，左对齐，右对齐，{}内占用9个位置，不足处填充空格0

x = f'seven "{1:<09}" "{0:>09}'

print(x)

```


#### numeric types

```python
#!/usr/bin/env python3

x = 7 / 2  # 3.5 <class 'float'>
x = 7 // 2  # 3 <class 'int'>
x = 7  # <class 'int'>
x = 2.0  # <class 'float'>

x = .1  # 0.1 <class 'float'>

x = .1 + .1 + .1  # 0.30000000000000004 <class 'float'>
x = .1 + .1 + .1 - .3  # 5.551115123125783e-17 != 0 <class 'float'>

# 不要使用float类型来处理money

print(x)
print(type(x))

```

```python
#!/usr/bin/env python3

import decimal

a = decimal.Decimal()

```

```python
#!/usr/bin/env python3

from decimal import *

a = Decimal('.10')
b = Decimal('.30')
x = a + a + a - b  # 0.00 <class 'decimal.Decimal'>

print(x)
print(type(x))

```


#### the bool type

```python
#!/usr/bin/env python3

x = False
x = True
x = 7 > 5

# 除了bool类型，0、空字符串、None都可以表示false，用于逻辑判断表达式

x = None
if x:
    print('x exist')
else:
    print('x is None')

x = 0
if x:
    print('x != 0')
else:
    print('x == 0')

x = ''
if x:
    print('x is not empty')
else:
    print('x is empty')

```


#### sequence types

```python
#!/usr/bin/env python3

# list, tuple, range, dict

# list, 从0开始index，可变类型
x = [1, 2, 3, 4, 5]
x[2] = 42

# tuple，不可变类型，默认使用tuple，除非要改变才使用list
x = (1, 2, 3, 4, 5)

# range，不可变类型
x = range(5)  # 0 1 2 3 4
x = range(1, 5)  # 1 2 3 4
x = range(1, 5, 2)  # 1 3
x = list(range(1, 5, 2))  # list, 1 3

# dict，可变类型
x = {'one': 1, 'two': 2, 'three': 3}
for k in x:
    print('k is {}'.format(k))

x['one'] = 42
for k, v in x.items():
    print(f'{k}: {v}')

```


#### type() and id()

```python
#!/usr/bin/env python3

x = (1, 'two', 3.0, False, [4, 'str'])
y = (1, 'two', 3.0, False, [4, 'str'])
z = x

print(type(x))  # <class 'tuple'>
print(type(x[4]))  # <class 'list'>

print(id(x))  # 4383298160
print(id(y))  # 4382809120
print(id(z))  # 4383298160

# x和y的所有元素，除了list的id不一样，其他的id都一样
print(id(x[3]))
print(id(y[3]))

# 在python里只有一个 1 object，所以大家都指向这里

# is 来判断是不是同一个obj
if x[0] is y[0]:
    print('they are the same obj')

# isinstance 来判断是不是同一个class type
if isinstance(x, tuple):
    print('x is a tuple')

```


### 4. Conditionals

#### conditional syntax

```python
#!/usr/bin/env python3

if True:
    print('if true')
elif False:
    print('elif true')
else:
    print('neither true')

```


#### conditional operators

```python
#!/usr/bin/env python3

"""
优先级
    函数调用(is, is not; in, not in) - 位操作符 - 数值计算操作符
    比较操作符(==, !=, >, <, >=, <=)
    逻辑操作符(and, or, not)
    赋值操作符
"""
```


#### conditional assignment

```python
#!/usr/bin/env python3

hungry = True
x = 'Feed the bear now!' if hungry else 'Do not feed the bear.'
print(x)

```


### 5. operators

#### arithmetic operators

```python
#!/usr/bin/env python3

"""
优先级
    函数调用(is, is not; in, not in)
    位操作符()
    数值计算操作符(+, -, *, /, //, %, **, (正负，相当于乘以-1 or 1)-, +)
                (+=, -=, *=, /=, //=, %=, **=)
                (没有++, --)
    比较操作符(==, !=, >, <, >=, <=)

    逻辑操作符(and, or, not)

    赋值操作符(=)
"""

x = 5
y = -3

print(-x)  # -5
print(+x)  # 5
print(-y)  # 3
print(+y)  # -3

```


#### bitwise operators

```python
#!/usr/bin/env python3

"""
优先级
    函数调用(is, is not; in, not in)
    位操作符(&, |, ^, <<, >>)
    数值计算操作符(+, -, *, /, //, %, **, (正负，相当于乘以-1 or 1)-, +)
                (+=, -=, *=, /=, //=, %=, **=)
                (没有++, --)
    比较操作符(==, !=, >, <, >=, <=)

    逻辑操作符(and, or, not)

    赋值操作符(=)
"""
```


#### comparison operators


```python

```

#### boolean operators


```python

```

#### operator precedence


```python

```

### 6. loops

#### python loops


```python

```

#### the while loop


```python

```

#### the for loop


```python

```

#### additional controls


```python

```

### 7. functions

#### defining a function


```python

```

#### function arguments


```python

```

#### argument lists


```python

```

#### keyword arguments


```python

```

#### return values


```python

```

#### generators


```python

```

#### decorators


```python

```

### 8. structured data

#### basic data structures


```python

```

#### lists and tuples


```python

```

#### dictionaries


```python

```

#### sets


```python

```

#### list comprehension


```python

```

#### mixed structures


```python

```

### 9. classes

#### creating a class


```python

```

#### constructing an object


```python

```

#### class methods


```python

```

#### object data


```python

```

#### inheritance


```python

```

#### iterator objects


```python

```

### 10. exceptions

#### handling exceptions


```python

```

#### reporting errors


```python

```

### 11. string objects

#### overview of string objects


```python

```

#### common string methods


```python

```

#### formatting strings


```python

```

#### splitting and joining


```python

```

### 12. file I/O

#### opening files


```python

```

#### text vs. binary mode


```python

```

#### text files


```python

```

#### binary files


```python

```

### 13. built-in functions

#### numeric functions


```python

```

#### string functions


```python

```

#### container functions


```python

```

#### object and class functions


```python

```

### 14. modules

#### using standard modules


```python

```

#### creating a module


```python

```

### 15. databases

#### python database API


```python

```

#### a database interface


```python

```

#### example: short URL database


```python

```

### Conclusion
