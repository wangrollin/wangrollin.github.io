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
    函数调用() - 位操作符 - 数值计算操作符
    比较操作符(==, !=, >, <, >=, <=)
    逻辑操作符(and, or, not; is, is not; in, not in)
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
    函数调用()
    位操作符()
    数值计算操作符(+, -, *, /, //, %, **, (正负，相当于乘以-1 or 1)-, +)
                (+=, -=, *=, /=, //=, %=, **=)
                (没有++, --)
    比较操作符(==, !=, >, <, >=, <=)

    逻辑操作符(and, or, not; is, is not; in, not in)

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
    函数调用()
    位操作符(&, |, ^, <<, >>)
    数值计算操作符(+, -, *, /, //, %, **, (正负，相当于乘以-1 or 1)-, +)
                (+=, -=, *=, /=, //=, %=, **=)
                (没有++, --)
    比较操作符(==, !=, >, <, >=, <=)

    逻辑操作符(and, or, not; is, is not; in, not in)

    赋值操作符(=)
"""

x = 0x0a  # 16进制表示
y = 0x02
z = x & y

# 两位的string，补足0，16进制表示
print(f'(hex) x is {x:02x}, y is {y:02x}, z is {z:02x}')
print(f'(bin) x is {x:08b}, y is {y:08b}, z is {z:08b}')

# (hex) x is 0a, y is 02, z is 02
# (bin) x is 00001010, y is 00000010, z is 00000010

```


#### comparison operators

```python
#!/usr/bin/env python3

"""
优先级
    函数调用()
    位操作符(&, |, ^, <<, >>)
    数值计算操作符(+, -, *, /, //, %, **, (正负，相当于乘以-1 or 1)-, +)
                (+=, -=, *=, /=, //=, %=, **=)
                (没有++, --)
    比较操作符(==, !=, >, <, >=, <=)

    逻辑操作符(and, or, not; is, is not; in, not in)

    赋值操作符(=)
"""

x = 42
y = 73

if x < y:
    print('comparison is true')
else:
    print('comparison is false')

```


#### boolean operators

```python
#!/usr/bin/env python3

"""
优先级
    函数调用()
    位操作符(&, |, ^, <<, >>)
    数值计算操作符(+, -, *, /, //, %, **, (正负，相当于乘以-1 or 1)-, +)
                (+=, -=, *=, /=, //=, %=, **=)
                (没有++, --)
    比较操作符(==, !=, >, <, >=, <=)

    逻辑操作符(and, or, not; is, is not; in, not in)

    赋值操作符(=)
"""

a = True
b = False
x = ('bear', 'bunny', 'tree', 'sky', 'rain')
y = 'bear'

# str是不可变类型，所以指向同一个obj
if y is x[0]:
    print('expression is true')
else:
    print('expression is false')

```


#### operator precedence

操作优先级

- **
- +x, -x
- *, /, //, %
- +, -
- <<, >>
- &
- ^
- |
- in, not in, is, is not, <, <=, >, >=, !=, ==
- not x
- and
- or


### 6. loops

#### python loops

- for loop
- while loop


#### the while loop

```python
#!/usr/bin/env python3

secret = 'swordfish'
pw = ''

while pw != secret:
    pw = input("What's the secret word? ")

```


#### the for loop

```python
#!/usr/bin/env python3

animals = ('bear', 'bunny', 'dog', 'cat', 'velociraptor')

for pet in animals:
    print(pet)

```


#### additional controls

- continue -> body
- else -> some
- break -> skip else code

```python
#!/usr/bin/env python3

secret = 'swordfish'
pw = ''
auth = False
count = 0
max_attempt = 5

while pw != secret:
    count += 1
    if count > max_attempt:
        break
    if count == 3:
        continue
    pw = input("What's the secret word? ")
else:
    auth = True

print("Authorized" if auth else "Calling the FBI ...")

```


### 7. functions

#### defining a function

```python
#!/usr/bin/env python3

# 所有的函数都有返回值，所以不区分函数和过程

def main():
    kitten(5)


def kitten(n):
    print(f' {n} Meow.')


if __name__ == '__main__':
    main()

```


#### function arguments

```python
#!/usr/bin/env python3

# 所有的函数都有返回值，所以不区分函数和过程

def main():
    kitten(5, 6)


# 参数默认值；python是值传递
def kitten(a, b, c=1):
    print(f'Meow. {a} {b} {c}')


if __name__ == '__main__':
    main()

```


#### argument lists

```python
#!/usr/bin/env python3

def main():
    x = ('meow', 'grrr', 'purr')
    kitten(*x)
    kitten('meow', 'grrr', 'purr')


# 可变长度参数；args是tuple，不可变；args和caller的args id不同，说明引用传递是在里面一层的
def kitten(*args):
    if len(args):
        for s in args:
            print(s)
    else:
        print('Meow.')


if __name__ == '__main__':
    main()

```


#### keyword arguments

```python
#!/usr/bin/env python3

def main():
    x = {'Buffy': [1, 2], 'Zilla': 'grr', 'Angel': 'rawr'}
    kitten(**x)
    print(id(x))

    y = dict(Buffy='meow', Zilla='grr', Angel='rawr')
    kitten(**y)

    kitten(Buffy='meow', Zilla='grr', Angel='rawr')


# keyword args；args和caller的args id不同，说明引用传递是在里面一层的
def kitten(*args, a, **kwargs):
    # kwargs['Buffy'][0] = 2
    # print(type(kwargs))
    # print(id(kwargs))

    if len(kwargs):
        for k in kwargs:
            print('Kitten {} says {}'.format(k, kwargs[k]))
    else:
        print('Meow.')


# 会错乱，注意；
# test(1, 2, 3, 4, **{'a': 2, '3': 4})
def test(*args, a, **kwargs):
    print(args)  # (1, 2, 3, 4)
    print(a)  # 2
    print(kwargs)  # {'3': 4}


if __name__ == '__main__':
    main()

```


#### return values

```python
#!/usr/bin/env python3

def main():
    x = kitten()
    # <class 'tuple'> (1, 2)
    print(type(x), x)


def kitten():
    print(f'Meow.')
    return 1, 2


if __name__ == '__main__':
    main()

```


#### generators

```python
#!/usr/bin/env python3

def main():
    # <class 'generator'>
    print(type(inclusive_range(25)), inclusive_range(25))

    for i in inclusive_range(25):
        print(i, end=' ')
    print()


# return yield都有时是什么情况？
def inclusive_range(*args):
    numargs = len(args)
    start = 0
    step = 1

    # initialize parameters
    if numargs < 1:
        raise TypeError(f'expected at least 1 argument, got {numargs}')
    elif numargs == 1:
        stop = args[0]
    elif numargs == 2:
        (start, stop) = args
    elif numargs == 3:
        (start, stop, step) = args
    else:
        raise TypeError(f'expected at most 3 arguments, got {numargs}')

    # generator
    i = start
    while i <= stop:
        yield i
        i += step


if __name__ == '__main__':
    main()

```


#### decorators

```python
#!/usr/bin/env python3

# python中万物都是对象，class，prop，function
def f1():
    print('Hello, World. f1')


x = f1
x()


def f3(func):
    def f2():
        print('Hello, World. f2')
        func()
        print('Hello, World again. f2')

    return f2


x = f3(f1)
print(type(x))  # <class 'function'>
x()

# 装饰模式1
f1 = f3(f1)
f1()


# 装饰模式2
@f3  # 装饰上f3
def f4():
    print('Hello, World. f1')


# 头大，好像python的lambda多行不方便
x = lambda: print('aaa')
x = lambda a: print(a)


# 成功把f2从function类型变成了int类型
def f1(f):
    return 1


@f1
def f2():
    print('hello')


print(type(f2))

```

```python
#!/usr/bin/env python3

import time


def elapsed_time(f):
    def wrapper():
        t1 = time.time()
        f()
        t2 = time.time()
        print(f'Elapsed time: {(t2 - t1) * 1000} ms')

    return wrapper


@elapsed_time
def big_sum():
    num_list = []
    for num in (range(0, 10000)):
        num_list.append(num)
    print(f'Big sum: {sum(num_list)}')


def main():
    big_sum()


if __name__ == '__main__':
    main()

```


### 8. structured data

#### basic data structures

- list = [1, 2]
- tuple = (1, 2)
- dict = {'a': 'apple', 'b': 'banana'}
- set = {1, 2}


#### lists and tuples

```python
#!/usr/bin/env python3

def main():
    game = ['Rock', 'Paper', 'Scissors', 'Lizard', 'Spock']

    # start, stop, step
    print(game[1])
    print(game[1:3])
    print(game[1:5:2])
    print(game[:5:2])
    print(game[::2])
    print(game[::])

    print(game.index('Paper'))
    # print(game.index('paper'))  # ValueError: 'paper' is not in list

    game.append('new one')

    game.insert(-10, 'index1')  # 到头自动停止
    game.insert(10, 'index1')  # 到头自动停止
    game.insert(-1, 'index1')  # 从后往前数，0 1
    game.insert(1, 'index1')  # 从前往后数，0 1

    game.remove('index1')  # 删掉第一个遇到的符合的value
    removed_value = game.pop()  # default index = last
    removed_value = game.pop(2)  # index = 2
    del game[2]
    del game[1:3]
    del game[1:5:2]

    print(', '.join(game))
    print(len(game))

    print_list(game)


def print_list(o):
    for i in o:
        print(i, end=' ', flush=True)
    print()


if __name__ == '__main__':
    main()

```


#### dictionaries

```python
#!/usr/bin/env python3

"""
key和value可以是任意类型
key必须是不可变的 immutable: tuple, str, int ...
"""


def main():
    animals = dict(kitten='meow', puppy='ruff')  # 方便了key是str的情况

    animals = {'kitten': 'meow', 'puppy': 'ruff!', 'lion': 'grrr',
               'giraffe': 'I am a giraffe!', 'dragon': 'rawr'}
    print_dict(animals)
    print('found' if 'lion' in animals else 'nope!')

    print(animals['no_such'])  # KeyError: 'no_such'
    print(animals.get('no_such'))  # None

    animals['monkey'] = 'monkey hhh'  # 通过这种方式增加item
    animals['kitten'] = 'meow and meow'

    for k in animals.keys():
        pass
    for v in animals.values():
        pass
    for k, v in animals.items():
        pass


def print_dict(o):
    for x in o:
        print(f'{x}: {o[x]}')


if __name__ == '__main__':
    main()

```


#### sets

```python
#!/usr/bin/env python3

"""
set里天然去重且无序
用{}时，默认里面是一个一个的元素
用构造函数set()时，默认里面只有一个集合元素
"""


def main():
    a = {"We're gonna need a bigger boat."}
    print(a)

    a = set("We're gonna need a bigger boat.")
    b = set("I'm sorry, Dave. I'm afraid I can't do that.")

    print_set(a)
    print_set(b)

    # 交
    a.intersection()  # 返回交集
    a.intersection_update()  # 更新自身，作为交集
    print(a & b)  # 返回并集
    # 并
    print(a.union())  # 返回并集
    print(a.update())  # 更新自身，作为并集
    print(a | b)  # 返回并集
    # 差
    print_set(a - b)  # 从a中减去b元素
    print(a ^ b)  # a和b的互斥部分

    # 增
    a.add('new one')
    # 删
    a.clear()
    a.pop()
    a.discard()  # 存在时才删
    a.remove()  # 不存在就报错
    # 改
    a.discard('old')
    a.add('new')
    # 查
    if 'we' in a:
        pass


def print_set(o):
    print('{', end='')
    for x in o:
        print(x, end='')
    print('}')


if __name__ == '__main__':
    main()

```


#### list comprehension

```python
#!/usr/bin/env python3

"""
维基百科：
list comprehension是程序设计语言的一类语法结构，用于基于描述创建一个列表数据结构。
相当于数学上的集合建构式符号。但不同于map与filter函数。 
list comprehension没有统一的中文译法。有译作列表生成、列表构建、列表理解等。
"""


def main():
    seq = range(11)
    print(seq)
    print_list(seq)

    seq2 = [x * 2 for x in seq]
    print(seq2)

    seq2 = [x for x in seq if x % 3 != 0]
    print(seq2)

    # 我天，python的语法糖表达能力太强了
    # 怪不得「人生苦短，我用Python」
    seq2 = [x * 2 for x in seq if x % 3 != 0]
    print(seq2)

    seq2 = [(x, x ** 2) for x in seq if x % 3 != 0]
    print(seq2)

    from math import pi
    seq2 = [round(pi, x) for x in seq if x % 3 != 0]
    print(seq2)

    # to dict
    seq2 = {x: x ** 2 for x in seq if x % 3 != 0}
    print(seq2)

    # to set
    seq2 = {x ** 2 for x in seq if x % 3 != 0}
    print(seq2)

    # to tuple
    seq2 = tuple(x ** 2 for x in seq if x % 3 != 0)
    print(seq2)


def print_list(o):
    for x in o:
        print(x, end=' ')
    print()


if __name__ == '__main__':
    main()

```


#### mixed structures

```python
#!/usr/bin/env python3

# globals
dlevel = 0  # manage nesting level


def main():
    r = range(11)
    l = [1, 'two', 3, {'4': 'four'}, 5]
    t = ('one', 'two', None, 'four', 'five')
    s = set("It's a bird! It's a plane! It's Superman!")
    d = dict(one=r, two=l, three=s)
    mixed = [l, r, s, d, t]
    disp(mixed)


def disp(o):
    global dlevel

    dlevel += 1
    if isinstance(o, list):
        print_list(o)
    elif isinstance(o, range):
        print_list(o)
    elif isinstance(o, tuple):
        print_tuple(o)
    elif isinstance(o, set):
        print_set(o)
    elif isinstance(o, dict):
        print_dict(o)
    elif o is None:
        print('Nada', end=' ', flush=True)
    else:
        print(repr(o), end=' ', flush=True)
    dlevel -= 1

    if dlevel <= 1:
        print()  # newline after outer


def print_list(o):
    print('[', end=' ')
    for x in o:
        disp(x)
    print(']', end=' ', flush=True)


def print_tuple(o):
    print('(', end=' ')
    for x in o:
        disp(x)
    print(')', end=' ', flush=True)


def print_set(o):
    print('{', end=' ')
    for x in sorted(o):
        disp(x)
    print('}', end=' ', flush=True)


def print_dict(o):
    print('{', end=' ')
    for k, v in o.items():
        print(k, end=': ')
        disp(v)
    print('}', end=' ', flush=True)


if __name__ == '__main__':
    main()

```


### 9. classes

#### creating a class

```python
#!/usr/bin/env python3

class Duck:
    sound = 'Quack quack.'
    movement = 'Walks like a duck.'

    def quack(self):
        print(self.sound)

    def move(self):
        print(self.movement)


def main():
    donald = Duck()
    print(donald.sound)
    donald.move()


if __name__ == '__main__':
    main()

```


#### constructing an object

```python
#!/usr/bin/env python3

class Animal:
    def __init__(self, type, name, sound):
        # 君子契约：可见性控制，通过加上'_'前缀，变成private
        self._type = type
        self._name = name
        self._sound = sound

    def type(self):
        return self._type

    def name(self):
        return self._name

    def sound(self):
        return self._sound

    # def __func__(self):
    #     return self._sound


def print_animal(o):
    if not isinstance(o, Animal):
        raise TypeError('print_animal(): requires an Animal')
    print('The {} is named "{}" and says "{}".'.format(o.type(), o.name(), o.sound()))


def main():
    a0 = Animal('kitten', 'fluffy', 'rwar')
    a1 = Animal('duck', 'donald', 'quack')
    print_animal(a0)
    print_animal(a1)
    print_animal(Animal('velociraptor', 'veronica', 'hello'))


if __name__ == '__main__':
    main()

```


#### class methods

```python
#!/usr/bin/env python3

class Animal:
    def __init__(self, **kwargs):
        self._type = kwargs['type'] if 'type' in kwargs else 'kitten'
        self._name = kwargs['name'] if 'name' in kwargs else 'fluffy'
        self._sound = kwargs['sound'] if 'sound' in kwargs else 'meow'

    # getter setter二合一
    def type(self, t=None):
        if t:
            self._type = t
        return self._type

    def name(self, n=None):
        if n:
            self._name = n
        return self._name

    def sound(self, s=None):
        if s:
            self._sound = s
        return self._sound

    # 特殊方法名，详见python doc
    def __str__(self):
        return f'The {self.type()} is named "{self.name()}" and says "{self.sound()}".'


def main():
    a0 = Animal(type='kitten', name='fluffy', sound='rwar')
    a1 = Animal(type='duck', name='donald', sound='quack')
    print(a0)
    print(a1)


if __name__ == '__main__':
    main()

```


#### object data

```python
#!/usr/bin/env python3

class Animal:
    # class变量
    x = [1, 2, 3]

    def __init__(self, **kwargs):
        # 实例变量
        self._type = kwargs['type'] if 'type' in kwargs else 'kitten'
        self._name = kwargs['name'] if 'name' in kwargs else 'fluffy'
        self._sound = kwargs['sound'] if 'sound' in kwargs else 'meow'

    def type(self, t=None):
        if t:
            self._type = t
        return self._type

    def name(self, n=None):
        if n:
            self._name = n
        return self._name

    def sound(self, s=None):
        if s:
            self._sound = s
        return self._sound

    def __str__(self):
        return f'The {self.type()} is named "{self.name()}" and says "{self.sound()}".'


def main():
    a0 = Animal(type='kitten', name='fluffy', sound='rwar')
    a1 = Animal(type='duck', name='donald', sound='quack')
    print(a0)
    print(a1)


if __name__ == '__main__':
    main()

```


#### inheritance

```python
#!/usr/bin/env python3

class Animal:
    def __init__(self, **kwargs):
        if 'type' in kwargs:
            self._type = kwargs['type']
        if 'name' in kwargs:
            self._name = kwargs['name']
        if 'sound' in kwargs:
            self._sound = kwargs['sound']

    def type(self, t=None):
        if t:
            self._type = t
        try:
            return self._type
        except AttributeError:
            return None

    def name(self, n=None):
        if n:
            self._name = n
        try:
            return self._name
        except AttributeError:
            return None

    def sound(self, s=None):
        if s:
            self._sound = s
        try:
            return self._sound
        except AttributeError:
            return None


class Duck(Animal):
    def __init__(self, **kwargs):
        self._type = 'duck'
        if 'type' in kwargs:
            del kwargs['type']
        super().__init__(**kwargs)

    def kill(self, s):
        print(f'{self.name()} will now kill all {s}!')


class Kitten(Animal):
    def __init__(self, **kwargs):
        self._type = 'kitten'
        if 'type' in kwargs:
            del kwargs['type']
        super().__init__(**kwargs)


def print_animal(o):
    if not isinstance(o, Animal):
        raise TypeError('print_animal(): requires an Animal')
    print(f'The {o.type()} is named "{o.name()}" and says "{o.sound()}".')


def main():
    a0 = Kitten(name='fluffy', sound='rwar')
    a1 = Duck(name='donald', sound='quack')
    print_animal(a0)
    print_animal(a1)


if __name__ == '__main__':
    main()

```

```python
#!/usr/bin/env python3

class RevStr(str):
    def __str__(self):
        return self[::-1]


def main():
    hello = RevStr('Hello, World.')
    print(hello)


if __name__ == '__main__':
    main()

```


#### iterator objects

```python
#!/usr/bin/env python3

"""
generator是个方法类型 yield
iterator是个类的类型 __init__() __iter__() __next__()
"""


class inclusive_range:
    def __init__(self, *args):
        numargs = len(args)
        self._start = 0
        self._step = 1

        if numargs < 1:
            raise TypeError(f'expected at least 1 argument, got {numargs}')
        elif numargs == 1:
            self._stop = args[0]
        elif numargs == 2:
            (self._start, self._stop) = args
        elif numargs == 3:
            (self._start, self._stop, self._step) = args
        else:
            raise TypeError(f'expected at most 3 arguments, got {numargs}')

        self._next = self._start

    # 这个方法说明这个类是个iterator类型
    def __iter__(self):
        return self

    def __next__(self):
        if self._next > self._stop:
            raise StopIteration
        else:
            _r = self._next
            self._next += self._step
            return _r


def main():
    for n in inclusive_range(25):
        print(n, end=' ')
    print()


if __name__ == '__main__':
    main()

```

```python
#!/usr/bin/env python3
"""
generator会被消耗掉
range可以多次使用
"""


def inclusive_range(*args):
    numargs = len(args)
    start = 0
    step = 1

    # initialize parameters
    if numargs < 1:
        raise TypeError(f'expected at least 1 argument, got {numargs}')
    elif numargs == 1:
        stop = args[0]
    elif numargs == 2:
        (start, stop) = args
    elif numargs == 3:
        (start, stop, step) = args
    else:
        raise TypeError(f'expected at most 3 arguments, got {numargs}')

    # generator
    i = start
    while i <= stop:
        yield i
        i += step


a = inclusive_range(2)
b = range(2)


def main():
    # 0 1 2
    for i in a:
        print(i, end=' ')
    print()

    # 没有输出
    for i1 in a:
        print(i1, end=' ')
    print()

    # 0 1
    for j in b:
        print(j, end=' ')
    print()

    # 0 1
    for j1 in b:
        print(j1, end=' ')
    print()


if __name__ == '__main__': main()

```


### 10. exceptions

#### handling exceptions

```python
#!/usr/bin/env python3

import sys


def main():
    try:
        # x = int('foo')
        x = 5 / 0
    except ValueError:
        print('I caught a ValueError')
    except ZeroDivisionError:
        print(f'I caught a ZeroDivisionError：{sys.exc_info()}')
        print(f'I caught a ZeroDivisionError：{sys.exc_info()[1]}')
    except EOFError or TabError:
        pass
    # 除非要兜底
    except:
        print('兜底error')
    else:
        # 没有异常
        pass


if __name__ == '__main__':
    main()

```


#### reporting errors

```python
#!/usr/bin/env python3

def inclusive_range(*args):
    numargs = len(args)
    start = 0
    step = 1

    # initialize parameters
    if numargs < 1:
        raise TypeError(f'expected at least 1 argument, got {numargs}')
    elif numargs == 1:
        stop = args[0]
    elif numargs == 2:
        (start, stop) = args
    elif numargs == 3:
        (start, stop, step) = args
    else:
        raise TypeError(f'expected at most 3 arguments, got {numargs}')

    # generator
    i = start
    while i <= stop:
        yield i
        i += step


def main():
    try:
        for i in inclusive_range(1, 2, 3, 4, 5):
            print(i, end=' ', flush=True)
        print()
    except TypeError as e:
        print(f'range error: {e}')


if __name__ == '__main__':
    main()

```


### 11. string objects

#### overview of string objects

```python
#!/usr/bin/env python3

print('Hello, World.'.upper())
print('Hello, World.'.swapcase())
print('Hello, World. {}'.format(42 * 7))
print('Hello, World.')

```


#### common string methods

```python
#!/usr/bin/env python3

print('Hello, World.'.upper())
print('Hello, World.'.lower())
print('Hello, World.'.capitalize())
print('Hello, World.'.title())
print('Hello, World.'.swapcase())
print('Hello, World.'.casefold())  # 比lower(）更强，可以把其他语言的字母也小写了

s1 = 'str1' + ' str2'
s2 = 'str1' ' str2'
print(s1)  # str1 str2
print(s2)  # str1 str2

```


#### formatting strings

```python
#!/usr/bin/env python3

x = 42
print('the number is {}'.format(x))
print('the number is {0}'.format(x))
print('the number is {xx}'.format(xx=x))

y = 52
print('"{0:<5}" "{1:>05}"'.format(x, y))
print('"{0:<05}" "{1:>+05}"'.format(x, y))  # 00+52
print('"{0:<05}" "{1:+05}"'.format(x, y))  # +0052

print('num is {:,}'.format(100000))  # 100,000
print('num is {:,}'.format(100000).replace(',', '.'))  # 100,000

print('num is {:f}'.format(100000))  # 100000.000000
print('num is {:.3f}'.format(100000))  # 100000.000

print('num is {:x}'.format(23))  # 17 16进制
print('num is {:o}'.format(23))  # 27 8进制
print('num is {:b}'.format(23))  # 10111 2进制

print(f'num is {23:b}')  # 10111 2进制

```


#### splitting and joining

```python
#!/usr/bin/env python3

s = 'This is a long    string with a bunch of words in it.'
print(s.split())
print(s.split('i'))

list1 = s.split()

s2 = ':'.join(list1)
print(s2)

s2 = ' -- '.join(list1)
print(s2)

```


### 12. file I/O

#### opening files

```python
#!/usr/bin/env python3

def main():
    f = open('lines.txt', 'r')  # read
    f = open('lines.txt', 'w')  # write，会覆盖
    f = open('lines.txt', 'a')  # append
    f = open('lines.txt', 'r+')  # read write
    f = open('lines.txt', 'r+b')  # read write binary
    f = open('lines.txt', 'r+t')  # read write text
    f = open('lines.txt', 'r')

    f = open('lines.txt')  # 默认是read text模式 rt
    for line in f:
        print(line.rstrip())


if __name__ == '__main__':
    main()

```


#### text vs. binary mode

"String\n"

- String + LF
- String + CR
- String + CR + LF


#### text files

```python
#!/usr/bin/env python3

def main():
    infile = open('lines.txt', 'rt')
    outfile = open('lines-copy.txt', 'wt')
    for line in infile:
        # print(line.rstrip(), file=outfile)  # 使用本机系统的默认换行标志
        outfile.writelines(line)  # 使用infile的换行标志
        print('.', end='', flush=True)
    outfile.close()
    infile.close()
    print('\ndone.')


if __name__ == '__main__':
    main()

```


#### binary files

```python
#!/usr/bin/env python3

def main():
    infile = open('berlin.jpg', 'rb')
    outfile = open('berlin-copy.jpg', 'wb')
    while True:
        buf = infile.read(10240)  # byte
        if buf:
            outfile.write(buf)
            print('.', end='', flush=True)
        else:
            break
    outfile.close()
    print('\ndone.')


if __name__ == '__main__':
    main()

```


### 13. built-in functions

#### numeric functions

```python
#!/usr/bin/env python3

x = '47'
print(f'x is {type(x)}')
print(f'x is {x}')

y = int(x)  # int构造函数

y = float(x)  # float构造函数

x = -47
y = abs(x)  # 绝对值

x = -47.2
y = abs(x)  # 绝对值

y = divmod(5, 2)  # tuple 商 余数

y = complex(5, 2)  # 复数构造函数
y = 47 + 22j  # 复数

```


#### string functions

```python
#!/usr/bin/env python3

class Bunny:
    def __init__(self, n):
        self._n = n

    # 和repr函数呼应，有点像java里接口的意思，预定义函数
    # 没有这个repr的时候会打出地址
    # 有__repr__但是没有__str__的时候，tostring的时候会返回repr
    def __repr__(self):
        return f'repr: the name of this Bunny 你好 is {self._n}!'

    def __str__(self):
        return f'str: the name of this Bunny is {self._n}!'


s = 'Hello, World.'
print(repr(s))  # representation

s = Bunny('bunny')
print(s)  # str -> repr -> addr
print(repr(s))  # repr -> addr
# repr: the name of this Bunny \u4f60\u597d is bunny!
print(ascii(s))  # repr中其他编码转成ascii码 -> addr
print(chr(128406))  # 根据返回一个char
print(ord('🖖'))  # 根据char返回Unicode编码

```


#### container functions

```python
#!/usr/bin/env python3

x = (1, 2, 3, 4, 5)

y = len(x)  # 长度

y = reversed(x)  # 反向迭代器
y = list(reversed(x))  # list

y = sum(x)  # TypeError: unsupported operand type(s) for +: 'int' and 'str'
y = sum(x, 10)  # sum = sum(x) + 10

y = min(x)
y = max(x)

y = any(x)  # 只要有任何一个可以作为True，就是True
y = all(x)  # 只有全部都可以作为True，才是True

y = (6, 7, 8)
z = zip(x, y)  # <class 'zip'> 各处一个开始配对，到一个耗尽为止(1, 6)(2, 7)(3, 8)
z = enumerate(x)  # <class 'enumerate'> (index, value), index from 0

for i, v in z:
    print(f'{i}-{v}')

```


#### object and class functions

```python
#!/usr/bin/env python3

"""
这些是通用的，而不是只针对num str collection的
"""
x = 2

y = type(x)
y = id(x)
y = isinstance(x, int)

```


### 14. modules

#### using standard modules

> python标准库

```python
#!/usr/bin/env python3

import sys
import os
import random
import datetime


def main():
    v = sys.version_info
    print('Python version {}.{}.{}'.format(*v))
    print(sys.platform)

    print(os.name)
    print(os.getenv('PATH'))
    print(os.getcwd())
    print(os.urandom(25))
    print(os.urandom(25).hex())

    print(random.randint(1, 1000))
    x = list(range(25))
    random.shuffle(x)  # 乱序
    print(x)

    print(datetime.datetime.now())  # 2020-08-02 20:47:48.474847
    print(datetime.datetime.now().year)  # 2020


if __name__ == '__main__':
    main()

```


#### creating a module

```python
#!/usr/bin/env python3

import sys
import time

__version__ = '1.3.0'


class numwords():
    '''
        return a number as words,
        e.g., 42 becomes 'forty-two'
    '''
    _words = {
        'ones': (
            'oh', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'
        ), 'tens': (
            '', 'ten', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'
        ), 'teens': (
            'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'
        ), 'quarters': (
            'o\'clock', 'quarter', 'half'
        ), 'range': {
            'hundred': 'hundred'
        }, 'misc': {
            'minus': 'minus'
        }
    }
    _oor = 'OOR'  # Out Of Range

    def __init__(self, n):
        self._number = n;

    def numwords(self, num=None):
        'Return the number as words'
        n = self._number if num is None else num
        s = ''
        if n < 0:  # negative numbers
            s += self._words['misc']['minus'] + ' '
            n = abs(n)
        if n < 10:  # single-digit numbers
            s += self._words['ones'][n]
        elif n < 20:  # teens
            s += self._words['teens'][n - 10]
        elif n < 100:  # tens
            m = n % 10
            t = n // 10
            s += self._words['tens'][t]
            if m: s += '-' + numwords(m).numwords()  # recurse for remainder
        elif n < 1000:  # hundreds
            m = n % 100
            t = n // 100
            s += self._words['ones'][t] + ' ' + self._words['range']['hundred']
            if m: s += ' ' + numwords(m).numwords()  # recurse for remainder
        else:
            s += self._oor
        return s

    def number(self, n=None):
        'setter/getter'
        if n is not None:
            self._number = n
        return str(self._number);


class saytime(numwords):
    '''
        return the time (from two parameters) as words,
        e.g., fourteen til noon, quarter past one, etc.
    '''

    _specials = {
        'noon': 'noon',
        'midnight': 'midnight',
        'til': 'til',
        'past': 'past'
    }

    def __init__(self, h=None, m=None):
        self.time(h, m)

    def time(self, h=None, m=None):
        if h is not None:
            self._hour = abs(int(h))
        if m is not None:
            self._min = abs(int(m))
        return (h, m)

    def time_t(self, t=None):
        if t is None:
            t = time.localtime()
        self._hour = t.tm_hour
        self._min = t.tm_min

    def words(self):
        h = self._hour
        m = self._min

        if h > 23: return self._oor  # OOR errors
        if m > 59: return self._oor

        sign = self._specials['past']
        if self._min > 30:
            sign = self._specials['til']
            h += 1
            m = 60 - m
        if h > 23:
            h -= 24
        elif h > 12:
            h -= 12

        # hword is the hours word)
        if h == 0:
            hword = self._specials['midnight']
        elif h == 12:
            hword = self._specials['noon']
        else:
            hword = self.numwords(h)

        if m == 0:
            if h in (0, 12):
                return hword  # for noon and midnight
            else:
                return "{} {}".format(self.numwords(h), self._words['quarters'][m])
        if m % 15 == 0:
            return "{} {} {}".format(self._words['quarters'][m // 15], sign, hword)
        return "{} {} {}".format(self.numwords(m), sign, hword)

    def digits(self):
        'return the traditionl time, e.g., 13:42'
        return f'{self._hour:02}:{self._min:02}'


class saytime_t(saytime):  # wrapper for saytime to use time object
    '''
        set the time from a time object
    '''

    def __init__(self, t=None):
        self.time_t()


def main():
    if len(sys.argv) > 1:
        if sys.argv[1] == 'test':
            test()
        else:
            try:
                print(saytime(*(sys.argv[1].split(':'))).words())
            except TypeError:
                print('Invalid time ({})'.format(sys.argv[1]))
    else:
        print(saytime_t().words())


def test():
    st = saytime()
    print('\nnumbers test:')
    list = (
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 19, 20, 30,
        50, 51, 52, 55, 59, 99, 100, 101, 112, 900, 999, 1000
    )
    for l in list:
        st.number(l)
        print(l, st.numwords())

    print('\ntime test:')
    list = (
        (0, 0), (0, 1), (11, 0), (12, 0), (13, 0), (12, 29), (12, 30),
        (12, 31), (12, 15), (12, 30), (12, 45), (11, 59), (23, 15),
        (23, 59), (12, 59), (13, 59), (1, 60), (24, 0)
    )
    for l in list:
        st.time(*l)
        print(st.digits(), st.words())

    st.time_t()  # set time to now
    print('\nlocal time is ' + st.words())


if __name__ == '__main__':
    main()

```

```python
#!/usr/bin/env python3

import saytime


def main():
    st = saytime.saytime()
    print('\nnumbers test:')
    list = (
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 19, 20, 30,
        50, 51, 52, 55, 59, 99, 100, 101, 112, 900, 999, 1000
    )
    for l in list:
        st.number(l)
        print(l, st.numwords())

    print('\ntime test:')
    list = (
        (0, 0), (0, 1), (11, 0), (12, 0), (13, 0), (12, 29), (12, 30),
        (12, 31), (12, 15), (12, 30), (12, 45), (11, 59), (23, 15),
        (23, 59), (12, 59), (13, 59), (1, 60), (24, 0)
    )
    for l in list:
        st.time(*l)
        print(st.digits(), st.words())

    st.time_t()  # set time to now
    print('\nlocal time is ' + st.words())


if __name__ == '__main__':
    main()

```


### 15. databases

#### python database API

```python
#!/usr/bin/env python3

import sqlite3


def main():
    print('connect')
    db = sqlite3.connect('db-api.db')
    cur = db.cursor()
    print('create')
    cur.execute("DROP TABLE IF EXISTS test")
    cur.execute("""
        CREATE TABLE test (
            id INTEGER PRIMARY KEY, string TEXT, number INTEGER
        )
        """)
    print('insert row')
    cur.execute("""
        INSERT INTO test (string, number) VALUES ('one', 1)
        """)
    print('insert row')
    cur.execute("""
        INSERT INTO test (string, number) VALUES ('two', 2)
        """)
    print('insert row')
    cur.execute("""
        INSERT INTO test (string, number) VALUES ('three', 3)
        """)
    print('commit')
    db.commit()
    print('count')
    cur.execute("SELECT COUNT(*) FROM test")
    count = cur.fetchone()[0]
    print(f'there are {count} rows in the table.')
    print('read')
    for row in cur.execute("SELECT * FROM test"):
        print(row)
    print('drop')
    cur.execute("DROP TABLE test")
    print('close')
    db.close()


if __name__ == '__main__':
    main()

```


#### a database interface

```python
#!/usr/bin/env python3

import sqlite3

__version__ = '1.2.0'


class bwDB:
    def __init__(self, **kwargs):
        """
            db = bwDB( [ table = ''] [, filename = ''] )
            constructor method
                table is for CRUD methods 
                filename is for connecting to the database file
        """
        # see filename @property decorators below
        self._filename = kwargs.get('filename')
        self._table = kwargs.get('table', '')

    def set_table(self, tablename):
        self._table = tablename

    def sql_do(self, sql, params=()):
        """
            db.sql_do( sql[, params] )
            method for non-select queries
                sql is string containing SQL
                params is list containing parameters
            returns nothing
        """
        self._db.execute(sql, params)
        self._db.commit()

    def sql_do_nocommit(self, sql, params=()):
        """
            sql_do_nocommit( sql[, params] )
            method for non-select queries *without commit*
                sql is string containing SQL
                params is list containing parameters
            returns nothing
        """
        self._db.execute(sql, params)

    def sql_query(self, sql, params=()):
        """
            db.sql_query( sql[, params] )
            generator method for queries
                sql is string containing SQL
                params is list containing parameters
            returns a generator with one row per iteration
            each row is a Row factory
        """
        c = self._db.execute(sql, params)
        for r in c:
            yield r

    def sql_query_row(self, sql, params=()):
        """
            db.sql_query_row( sql[, params] )
            query for a single row
                sql is string containing SQL
                params is list containing parameters
            returns a single row as a Row factory
        """
        c = self._db.execute(sql, params)
        return c.fetchone()

    def sql_query_value(self, sql, params=()):
        """
            db.sql_query_row( sql[, params] )
            query for a single value
                sql is string containing SQL
                params is list containing parameters
            returns a single value
        """
        c = self._db.execute(sql, params)
        return c.fetchone()[0]

    def commit(self):
        self._db.commit()

    def getrec(self, recid):
        """
            db.getrec(recid)
            get a single row, by id
        """
        query = f'SELECT * FROM {self._table} WHERE id = ?'
        c = self._db.execute(query, (recid,))
        return c.fetchone()

    def getrecs(self):
        """
            db.getrecs()
            get all rows, returns a generator of Row factories
        """
        query = f'SELECT * FROM {self._table}'
        c = self._db.execute(query)
        for r in c:
            yield r

    def insert_nocommit(self, rec):
        """
            db.insert(rec)
            insert a single record into the table
                rec is a dict with key/value pairs corresponding to table schema
            omit id column to let SQLite generate it
        """
        klist = sorted(rec.keys())
        values = [rec[v] for v in klist]  # a list of values ordered by key
        q = 'INSERT INTO {} ({}) VALUES ({})'.format(
            self._table,
            ', '.join(klist),
            ', '.join('?' * len(values))
        )
        c = self._db.execute(q, values)
        return c.lastrowid

    def insert(self, rec):
        lastrowid = self.insert_nocommit(rec)
        self._db.commit()
        return lastrowid

    def update_nocommit(self, recid, rec):
        """
            db.update(id, rec)
            update a row in the table
                id is the value of the id column for the row to be updated
                rec is a dict with key/value pairs corresponding to table schema
        """
        klist = sorted(rec.keys())
        values = [rec[v] for v in klist]  # a list of values ordered by key

        for i, k in enumerate(klist):  # don't update id
            if k == 'id':
                del klist[i]
                del values[i]

        q = 'UPDATE {} SET {} WHERE id = ?'.format(
            self._table,
            ',  '.join(map(lambda s: '{} = ?'.format(s), klist))
        )
        self._db.execute(q, values + [recid])

    def update(self, recid, rec):
        self.update_nocommit(recid, rec)
        self._db.commit()

    def delete_nocommit(self, recid):
        """
            db.delete(recid)
            delete a row from the table, by recid
        """
        query = f'DELETE FROM {self._table} WHERE id = ?'
        self._db.execute(query, [recid])

    def delete(self, recid):
        self.delete_nocommit(recid)
        self._db.commit()

    def countrecs(self):
        """
            db.countrecs()
            count the records in the table
            returns a single integer value
        """
        query = f'SELECT COUNT(*) FROM {self._table}'
        c = self._db.execute(query)
        return c.fetchone()[0]

    # filename property
    @property
    def _filename(self):
        return self._dbfilename

    @_filename.setter
    def _filename(self, fn):
        self._dbfilename = fn
        self._db = sqlite3.connect(fn)
        self._db.row_factory = sqlite3.Row

    @_filename.deleter
    def _filename(self):
        self.close()

    def close(self):
        self._db.close()
        del self._dbfilename


def test():
    fn = ':memory:'  # in-memory database
    t = 'foo'

    recs = [
        dict(string='one', number=42),
        dict(string='two', number=73),
        dict(string='three', number=123)
    ]

    # -- for file-based database
    # try: os.stat(fn)
    # except: pass
    # else: 
    #     print('Delete', fn)
    #     os.unlink(fn)

    print('bwDB version', __version__)

    print(f'Create database file {fn} ...', end='')
    db = bwDB(filename=fn, table=t)
    print('Done.')

    print('Create table ... ', end='')
    db.sql_do(f' DROP TABLE IF EXISTS {t} ')
    db.sql_do(f' CREATE TABLE {t} ( id INTEGER PRIMARY KEY, string TEXT, number INTEGER ) ')
    print('Done.')

    print('Insert into table ... ', end='')
    for r in recs:
        db.insert(r)
    print('Done.')

    print(f'There are {db.countrecs()} rows')

    print('Read from table')
    for r in db.getrecs():
        print(dict(r))

    print('Update table')
    db.update(2, dict(string='TWO'))
    print(dict(db.getrec(2)))

    print('Insert an extra row ... ', end='')
    newid = db.insert({'string': 'extra', 'number': 512})
    print(f'(id is {newid})')
    print(dict(db.getrec(newid)))
    print(f'There are {db.countrecs()} rows')
    print('Now delete it')
    db.delete(newid)
    print(f'There are {db.countrecs()} rows')
    for r in db.getrecs():
        print(dict(r))
    for r in db.sql_query(f"select * from {t}"):
        print(r)
    db.close()


if __name__ == "__main__":
    test()

```
