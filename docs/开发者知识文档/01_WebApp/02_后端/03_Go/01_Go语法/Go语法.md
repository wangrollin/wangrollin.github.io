
## 特殊语法

### 自动加;

不用加;，自动会加

### 可见性

首字母大写的，可以被外部 package 使用


## 表达式

const a = 1
var a = 1
var a int

a := 1
a := int32(1)

var a, b = 1, true

## 基础类型

int 0
float64 0
bool false
string ""

## 复合类型

### 指针

var p *int
i := 42
p = &i

> 可以存在指针的指针，类似：

var pp **int

> c中的未初始化pointer是随机数，但go中nil的指针也是随机数吗？

不是。Go 里没有“未初始化变量”这个概念，变量声明后一定有零值。

对指针来说，零值就是 `nil`，不是随机地址：

```go
var p *int

fmt.Println(p)        // <nil>
fmt.Printf("%p\n", p) // 0x0
fmt.Println(p == nil) // true
```

如果解引用：

```go
fmt.Println(*p)
```

会触发运行时 panic：

```text
panic: runtime error: invalid memory address or nil pointer dereference
```

和 C 的区别是：

```c
int *p;   // 自动局部变量，未初始化，值是 indeterminate
*p = 1;   // 未定义行为
```

C 里这种 `p` 不是严格意义上的“随机数”，而是未定值，可能看起来像某个旧栈地址，也可能导致未定义行为。只有显式初始化或静态/全局变量才会是空指针：

```c
int *p = NULL;        // 明确为空指针
static int *q;        // 自动零初始化，等价于 NULL
```

Go 则是：

```go
var p *int // 一定是 nil
```

所以结论：Go 中的 `nil` 指针不是随机数，是确定的空指针值。只是不要把它当成可解引用的地址。

> 打印go中的指针，什么情况下打印出来的是地址，什么情况下打印出来的是类似这种 &{96 72} ？

在 Go 里通常说的“打印指针”是指用 `fmt.Println(p)` 或 `fmt.Printf("%v", p)`。它的默认行为不是永远打印地址。

核心规则：

```go
type Size struct {
    W int
    H int
}

n := 10
p1 := &n

s := Size{96, 72}
p2 := &s

fmt.Println(p1) // 0xc0000120c0 之类，地址
fmt.Println(p2) // &{96 72}
```

区别在于：

- 指针指向普通标量值，比如 `int`、`string`、`bool`，默认通常打印地址。
- 指针指向结构体、数组、切片这类复合值时，`fmt` 默认会把它格式化成 `&` 加上被指向值的内容。
- 所以 `&{96 72}` 的意思是：这是一个指向结构体的指针，结构体字段值是 `96` 和 `72`。
- 它不是原始地址，而是 `fmt` 为了可读性做的展示。

如果你想强制打印地址，用 `%p`：

```go
fmt.Printf("%p\n", p2) // 0xc000010030 之类
```

如果你想打印指针指向的值，用解引用：

```go
fmt.Println(*p2) // {96 72}
```

结构体还可以这样打印字段名：

```go
fmt.Printf("%+v\n", p2) // &{W:96 H:72}
fmt.Printf("%#v\n", p2) // &main.Size{W:96, H:72}
```

另外，如果类型实现了 `String()`、`GoString()` 或自定义 `Format()`，打印结果还可能被这些方法接管。

### struct 结构体

> 定义结构体

```go
type Vertex struct {
	X int
	Y int
}

func main() {
	v := Vertex{1, 2}
	v.X = 4
	fmt.Println(v.X)
}
```

> 可以通过结构体指针访问结构体字段。

要访问结构体指针 p 指向的字段 X，我们可以写成 (*p).X。然而，这种写法比较繁琐，因此语言允许我们直接写成 p.X，而无需显式地进行解引用。

```go
type Vertex struct {
	X int
	Y int
}

func main() {
	v := Vertex{1, 2}
	p := &v
	p.X = 1e9
	fmt.Println(v)
}
```

> 结构体字面量

```go
type Vertex struct {
	X, Y int
}

var (
	v1 = Vertex{1, 2}  // has type Vertex
	v2 = Vertex{X: 1}  // Y:0 is implicit
	v3 = Vertex{}      // X:0 and Y:0
	p  = &Vertex{1, 2} // has type *Vertex
)

func main() {
	fmt.Println(v1, p, v2, v3)
}
```

#### struct tag

Go 里的 struct tag 是写在结构体字段后面的“元数据字符串”，主要给反射和第三方库读取，用来控制序列化、校验、ORM 映射等行为。

例如：

```go
type User struct {
    ID    int    `json:"id" db:"id"`
    Name  string `json:"name,omitempty" validate:"required"`
    Email string `json:"email"`
}
```

这里的：

```go
`json:"name,omitempty" validate:"required"`
```

就是 struct tag。

**基本语法**

字段声明后面可以跟一个字符串字面量，通常使用反引号：

```go
FieldName FieldType `key:"value" key2:"value2"`
```

常见规则：

- tag 本质上是一个字符串
- 通常用反引号写，避免转义双引号
- 多个 tag 之间用空格分隔
- 每个 tag 一般是 `key:"value"` 格式
- Go 编译器不会理解 `json`、`db`、`validate` 这些含义，具体含义由库决定

例如：

```go
type Product struct {
    Name  string  `json:"name" yaml:"name"`
    Price float64 `json:"price" validate:"gte=0"`
}
```

**主要作用**

1. 控制 JSON 序列化和反序列化

最常见的是 `encoding/json`：

```go
type User struct {
    ID       int    `json:"id"`
    UserName string `json:"user_name"`
    Password string `json:"-"`
}
```

使用：

```go
u := User{
    ID:       1,
    UserName: "alice",
    Password: "secret",
}

b, _ := json.Marshal(u)
fmt.Println(string(b))
```

输出：

```json
{"id":1,"user_name":"alice"}
```

说明：

- `json:"id"` 表示 JSON 字段名叫 `id`
- `json:"user_name"` 表示字段名从 `UserName` 改成 `user_name`
- `json:"-"` 表示忽略该字段

2. 控制空值字段是否省略

```go
type User struct {
    Name  string `json:"name"`
    Email string `json:"email,omitempty"`
}
```

如果 `Email` 是空字符串，序列化时会被省略：

```json
{"name":"alice"}
```

常见空值包括：

- `""`
- `0`
- `false`
- `nil`
- 长度为 0 的 slice、map 等

3. 数据库字段映射

很多 ORM 或数据库库会读取 tag，比如：

```go
type User struct {
    ID   int    `db:"id"`
    Name string `db:"name"`
}
```

或者 GORM：

```go
type User struct {
    ID    uint   `gorm:"primaryKey"`
    Email string `gorm:"uniqueIndex;not null"`
}
```

这些 tag 的含义不是 Go 自带的，而是对应库定义的。

4. 参数校验

例如使用 `go-playground/validator`：

```go
type RegisterRequest struct {
    Email    string `json:"email" validate:"required,email"`
    Password string `json:"password" validate:"required,min=8"`
    Age      int    `json:"age" validate:"gte=18"`
}
```

含义通常是：

- `required`：必填
- `email`：必须是邮箱格式
- `min=8`：最小长度为 8
- `gte=18`：大于等于 18

5. YAML、XML、表单参数等映射

```go
type Config struct {
    Host string `yaml:"host"`
    Port int    `yaml:"port"`
}

type Form struct {
    Username string `form:"username"`
    Password string `form:"password"`
}

type Book struct {
    Title string `xml:"title"`
}
```

不同库读取不同的 tag key。

**通过反射读取 tag**

struct tag 可以通过 `reflect` 读取：

```go
package main

import (
    "fmt"
    "reflect"
)

type User struct {
    Name string `json:"name" validate:"required"`
}

func main() {
    t := reflect.TypeOf(User{})

    field, _ := t.FieldByName("Name")

    fmt.Println(field.Tag.Get("json"))
    fmt.Println(field.Tag.Get("validate"))
}
```

输出：

```text
name
required
```

`field.Tag` 的类型是：

```go
reflect.StructTag
```

常用方法：

```go
field.Tag.Get("json")
field.Tag.Lookup("json")
```

区别：

```go
value := field.Tag.Get("json")
```

如果不存在，返回空字符串。

```go
value, ok := field.Tag.Lookup("json")
```

可以区分“不存在”和“存在但值为空”。

**常见 JSON tag 写法**

```go
type User struct {
    ID        int    `json:"id"`
    Name      string `json:"name,omitempty"`
    Password  string `json:"-"`
    CreatedAt string `json:"created_at"`
}
```

常见形式：

```go
`json:"name"`
```

指定 JSON 字段名。

```go
`json:"name,omitempty"`
```

空值时省略字段。

```go
`json:"-"`
```

完全忽略字段。

```go
`json:",omitempty"`
```

使用默认字段名，但空值时省略。

**注意点**

1. 只有导出字段通常才能被 JSON 等库处理

```go
type User struct {
    name string `json:"name"`
}
```

`name` 是小写开头，未导出，`encoding/json` 默认不会处理它。

应该写成：

```go
type User struct {
    Name string `json:"name"`
}
```

2. tag 不是注释

tag 是结构体类型信息的一部分，运行时可以通过反射拿到。

注释不行：

```go
type User struct {
    // json name
    Name string
}
```

3. tag 内容是否有效，编译器通常不管

例如：

```go
type User struct {
    Name string `json:name`
}
```

这在语义上是不规范的，`reflect.StructTag.Get("json")` 可能读不到预期值，但 Go 编译器不一定报错。

推荐总是写标准格式：

```go
`json:"name"`
```

4. 多个 tag 用空格隔开

正确：

```go
Name string `json:"name" db:"name" validate:"required"`
```

不推荐：

```go
Name string `json:"name",db:"name"`
```

5. tag 不会自动产生行为

例如：

```go
type User struct {
    Name string `validate:"required"`
}
```

这不会自动校验。你必须使用对应的 validator 库去读取并执行校验逻辑。

**一个完整例子**

```go
package main

import (
    "encoding/json"
    "fmt"
)

type User struct {
    ID       int    `json:"id"`
    Name     string `json:"name"`
    Email    string `json:"email,omitempty"`
    Password string `json:"-"`
}

func main() {
    u := User{
        ID:       1,
        Name:     "Alice",
        Email:    "",
        Password: "secret",
    }

    data, _ := json.Marshal(u)
    fmt.Println(string(data))
}
```

输出：

```json
{"id":1,"name":"Alice"}
```

总结一下：struct tag 是 Go 结构体字段上的元数据，Go 本身只负责保存它，具体怎么解释由 `json`、`gorm`、`validator`、`yaml` 等库决定。最常见用途就是字段名映射、字段忽略、空值省略、数据库映射和参数校验。

#### 结构体嵌入和组合

- `struct` 里放另一个 `struct`：是组合，has-a 关系。
- 匿名嵌入另一个 `struct`：是结构体嵌入，Go 会做字段/方法提升，看起来有点像继承，但本质仍然不是继承。

例如：

```go
type Engine struct {
    Power int
}

func (e Engine) Start() {
    fmt.Println("engine start")
}

type Car struct {
    Engine // 匿名嵌入
}
```

这时可以写：

```go
car := Car{}
car.Start()
car.Power = 100
```

看起来像 `Car` 继承了 `Engine`，但实际是 Go 把 `Engine` 的字段和方法提升到了 `Car` 上。`Car` 里面仍然有一个 `Engine` 字段：

```go
car.Engine.Start()
```

如果是命名字段：

```go
type Car struct {
    Engine Engine
}
```

那就必须这样调用：

```go
car.Engine.Start()
```

这就是普通组合。

接口组合是这种：

```go
type Reader interface {
    Read(p []byte) (n int, err error)
}

type Writer interface {
    Write(p []byte) (n int, err error)
}

type ReadWriter interface {
    Reader
    Writer
}
```

所以结论：

```go
type C struct {
    A
    B
}
```

这叫结构体嵌入/组合，不是继承。它可以让 `A` 和 `B` 的方法被提升到 `C`，因此 `C` 可能自动满足某些接口，但这仍然不是接口组合。接口组合只发生在 `interface` 定义里。

#### 结构体嵌入时的冲突解决方法

Go 结构体嵌入发生字段或方法冲突时，核心规则是：Go 不会自动帮你选一个，冲突的提升字段/方法不能直接访问，必须显式指定来源。

例如：

```go
type A struct {
	ID int
}

type B struct {
	ID int
}

type C struct {
	A
	B
}

func main() {
	c := C{}

	// c.ID      // 编译错误：ambiguous selector c.ID
	c.A.ID = 1 // 明确访问 A 的 ID
	c.B.ID = 2 // 明确访问 B 的 ID
}
```

常见处理方式有几种。

**1. 显式指定嵌入字段**

适合你确实需要同时嵌入两个类型：

```go
c.A.ID
c.B.ID
```

这是最直接的解决办法。

**2. 外层结构体自己定义字段或方法**

外层字段会屏蔽嵌入字段的提升：

```go
type C struct {
	A
	B
	ID int
}

func main() {
	c := C{}
	c.ID = 10   // 使用 C.ID
	c.A.ID = 1  // 仍然可以访问 A.ID
	c.B.ID = 2
}
```

方法也一样：

```go
type A struct{}

func (A) Name() string {
	return "A"
}

type B struct{}

func (B) Name() string {
	return "B"
}

type C struct {
	A
	B
}

func (C) Name() string {
	return "C"
}
```

这时 `c.Name()` 调用的是 `C.Name()`。

**3. 不用匿名嵌入，改成命名字段**

如果两个类型职责相近，容易冲突，通常命名字段更清晰：

```go
type C struct {
	Primary   A
	Secondary B
}

func main() {
	c := C{}
	c.Primary.ID = 1
	c.Secondary.ID = 2
}
```

这样不会发生字段提升，也就不会有歧义。

**4. 用转发方法明确语义**

如果你希望外部只看到一个统一方法，可以在外层自己定义：

```go
type C struct {
	A
	B
}

func (c C) Name() string {
	return c.A.Name()
}
```

这比让调用方猜 `A.Name()` 还是 `B.Name()` 更好。

还要注意一个规则：如果冲突字段在不同嵌入深度，浅层优先；如果在相同深度，就会歧义。

```go
type A struct {
	ID int
}

type B struct {
	A
}

type C struct {
	A
	B
}

func main() {
	c := C{}
	c.ID = 1   // 使用 C.A.ID，因为它更浅
	c.B.ID = 2 // 访问 B.A.ID
}
```

实践建议：如果只是复用实现，并且字段/方法不会混淆，可以用嵌入；如果两个嵌入类型有重叠语义，优先用命名字段或者在外层显式封装方法。Go 的嵌入更像“组合 + 自动提升”，不是继承。

### struct{} struct{}{}

在 Go 里可以把它们分成“类型”和“值”来理解：

- `struct{}`：一个结构体类型，且这个结构体没有任何字段。
- `struct{}{}`：一个 `struct{}` 类型的值，也就是空结构体的字面量。

写法上有两个 `{}`，含义不同：

```go
struct{}{}
```

拆开看是：

```go
struct{}  // 类型：空结构体类型
{}        // 值字面量：创建一个该类型的值
```

类似于：

```go
type Empty struct{}

var a Empty   // a 是 Empty 类型的零值
b := Empty{}  // b 是 Empty 类型的字面量值
```

而 `struct{}{}` 只是没有给这个空结构体起名字：

```go
var a struct{}     // 声明一个空结构体变量
b := struct{}{}    // 创建一个空结构体值
```

`struct{}` 最大的特点是：它不包含字段，通常不占用额外存储空间。

```go
fmt.Println(unsafe.Sizeof(struct{}{})) // 0
```

常见用途有两个。

第一，用来表示集合的值类型：

```go
seen := map[string]struct{}{}

seen["alice"] = struct{}{}

if _, ok := seen["alice"]; ok {
    fmt.Println("alice exists")
}
```

这里我们只关心 key 是否存在，不关心 value 是什么。用 `struct{}` 比 `bool` 更表达“无值，仅占位”的语义。

第二，用来做信号通道：

```go
done := make(chan struct{})

go func() {
    // do something
    close(done)
}()

<-done
```

`chan struct{}` 表示通道里传递的不是数据，而是一个事件或信号。

注意：`struct{}` 本身是类型，不是值，所以不能这样写：

```go
x := struct{} // 错误
```

必须写成：

```go
x := struct{}{} // 正确
```

一句话总结：`struct{}` 是“空结构体类型”，`struct{}{}` 是“这个类型的一个空值”。

### array slice，类型都是 []T

> 定义数组，数组的大小不可变

```go
func main() {
	var a [2]string
	a[0] = "Hello"
	a[1] = "World"
	fmt.Println(a[0], a[1])
	fmt.Println(a)

	primes := [6]int{2, 3, 5, 7, 11, 13}
	fmt.Println(primes)
}
```

> slice 比 array 更常用，[ ) 模式
> slice只是array的引用，对slice的修改就是array的修改，一个array可以有多个slice，互相之间能看到修改

```go
func main() {
	primes := [6]int{2, 3, 5, 7, 11, 13}

	var s []int = primes[1:4]
	fmt.Println(s)
}
```

> slice 字面量，底层其实是创建了一个array，然后这个slice引用array

```go
func main() {
	q := []int{2, 3, 5, 7, 11, 13}
	fmt.Println(q)

	r := []bool{true, false, true, true, false, true}
	fmt.Println(r)

	s := []struct {
		i int
		b bool
	}{
		{2, true},
		{3, false},
		{5, true},
		{7, true},
		{11, false},
		{13, true},
	}
	fmt.Println(s)
}
```

> slice 之上可以再有一个 slice

```go
func main() {
	s := []int{2, 3, 5, 7, 11, 13}

	s0 := s[1:4] // [3 5 7]
	fmt.Println(s0)

	s0 = s0[:2] // [3 5]
	fmt.Println(s0)

	s1 := s[1:] // [3 5 7 11 13]
	fmt.Println(s1)
	
	s2 := s[:] // [2 3 5 7 11 13]
	fmt.Println(s2)
}
```

> slice 自己切自己还能“变大”，是因为 s[:0] 只是把长度清零，没有丢掉底层数组；只要不超过 cap，后面可以通过 s[:n] 把长度重新扩回来。
> len：当前可见长度，当前有多少元素
> cap：cap(slice) 表示：从这个 slice 当前起点开始，最多还能看到/使用到底层数组的多少个元素。
> cap：也不完全等于“底层数组总长度”，因为 slice 可能不是从底层数组第一个元素开始的
> cap：也可以理解为，当前这个 slice 在不换底层数组的情况下，最多可以增长到多少长度。

```go
func main() {
	s := []int{2, 3, 5, 7, 11, 13}
	printSlice(s) // len=6 cap=6 [2 3 5 7 11 13]

	// Slice the slice to give it zero length.
	s = s[:0]
	printSlice(s) // len=0 cap=6 []

	// Extend its length.
	s = s[:4]
	printSlice(s) // len=4 cap=6 [2 3 5 7]

	// Drop its first two values.
	s = s[2:]
	printSlice(s) // len=2 cap=4 [5 7]
}

func printSlice(s []int) {
	fmt.Printf("len=%d cap=%d %v\n", len(s), cap(s), s)
}
```

> 针对 cap 和 len，更具体地说，slice 可以近似理解为：

```go
type SliceHeader struct {
	ptr *T // 指向底层数组中的某个元素
	len int
	cap int
}
```

> 空 slice

```go
func main() {
	var s []int
	fmt.Println(s, len(s), cap(s)) // [] 0 0
	if s == nil {
		fmt.Println("nil!") // nil!
	}
}
```

> 内置函数 make 来创建 slice，这是创建动态长度arary的方式

```go
func main() {
	a := make([]int, 5)
	printSlice("a", a) // a len=5 cap=5 [0 0 0 0 0]

	b := make([]int, 0, 5)
	printSlice("b", b) // b len=0 cap=5 []

	c := b[:2]
	printSlice("c", c) // c len=2 cap=5 [0 0]

	d := c[2:5]
	printSlice("d", d) // d len=3 cap=3 [0 0 0]
}

func printSlice(s string, x []int) {
	fmt.Printf("%s len=%d cap=%d %v\n",
		s, len(x), cap(x), x)
}

// slice 被拉长之后，是用0填充的
b := make([]int, 0, 5) // len(b)=0, cap(b)=5
b = b[:cap(b)] // len(b)=5, cap(b)=5
b = b[1:]      // len(b)=4, cap(b)=4
```

> 二维 slice

```go
func main() {
	// Create a tic-tac-toe board.
	board := [][]string{
		[]string{"_", "_", "_"},
		[]string{"_", "_", "_"},
		[]string{"_", "_", "_"},
	}

	// The players take turns.
	board[0][0] = "X"
	board[2][2] = "O"
	board[1][2] = "X"
	board[1][0] = "O"
	board[0][2] = "X"

	for i := 0; i < len(board); i++ {
		fmt.Printf("%s\n", strings.Join(board[i], " "))
	}
}
```

> array slice 的默认值

```go
var a [N]int // 元素默认是 0
var s []int // slice 是 nil，没有元素
make([]int, N) //slice 有 N 个元素，每个默认是 0
```

> append
> append 会把新值拷贝进目标切片的底层数组；如果容量够，就原地追加；如果容量不够，就分配新数组、拷贝旧元素、再追加新元素。
> 一定要接收返回值，因为 append 返回的切片可能仍然指向旧数组，也可能已经指向新数组
> slice 在 append 的时候，cap增长是不确定的，cap 是底层数组容量，只需要容纳 len，扩容策略由 runtime 决定

```go
func main() {
	var s []int
	printSlice(s) // len=0 cap=0 [] 

	// append works on nil slices.
	s = append(s, 0)
	printSlice(s) // len=1 cap=1 [0]

	// The slice grows as needed.
	s = append(s, 1)
	printSlice(s) // len=2 cap=2 [0 1]

	// We can add more than one element at a time.
	s = append(s, 2, 3, 4)
	printSlice(s) // len=5 cap=6 [0 1 2 3 4]
}

func printSlice(s []int) {
	fmt.Printf("len=%d cap=%d %v\n", len(s), cap(s), s)
}
```

> Go 中 nil slice 和 empty slice 的区别

nil slice 和 empty slice 都满足 len == 0，但它们不是同一个概念；只是 Go 让它们在大多数使用场景下表现得很接近。严格来说，Go 的数组不能为 nil，能为 nil 的是 slice、map、chan、func、interface、pointer

关键点：Go 里要先区分“数组 array”和“切片 slice”。你说的“长度为空”和“为 nil”的关系，通常发生在 slice 上，不是 array 上。

**Java 数组**

Java 里的数组是对象，变量保存的是引用：

```java
int[] a = null;        // 没有数组对象
int[] b = new int[0];  // 有数组对象，只是长度为 0
```

区别很明确：

```java
a.length; // NullPointerException
b.length; // 0
```

所以 Java 中：

- `null`：没有数组对象
- `length == 0`：有数组对象，但里面没有元素

**Go 数组**

Go 的数组是值类型，长度是类型的一部分：

```go
var a [3]int
var b [0]int
```

这里：

```go
len(a) // 3
len(b) // 0
```

但数组本身不能是 `nil`：

```go
var a [3]int
// a == nil // 编译错误
```

只有“数组指针”可以是 nil：

```go
var p *[3]int = nil
```

所以严格说，Go 的 array 和 Java array 不太像。

**Go 切片**

Go 中更接近 Java 数组引用语义的是 slice：

```go
var s1 []int        // nil slice
s2 := []int{}       // empty but non-nil slice
s3 := make([]int, 0)
```

它们的长度都是 0：

```go
len(s1) // 0
len(s2) // 0
len(s3) // 0
```

但它们不完全一样：

```go
s1 == nil // true
s2 == nil // false
s3 == nil // false
```

可以这样理解 slice 的内部结构：

```go
type slice struct {
    ptr *T
    len int
    cap int
}
```

`nil slice` 大概是：

```go
ptr = nil
len = 0
cap = 0
```

空 slice 大概是：

```go
ptr = 某个非 nil 地址
len = 0
cap = 0 或更多
```

所以 Go 中：

- `nil slice`：没有底层数组
- `empty slice`：有 slice 值，但当前没有元素
- `len(s) == 0`：只说明没有元素，不说明是不是 nil

**为什么感觉 Go 里它们像一个概念？**

因为大多数日常操作对 nil slice 和 empty slice 的行为一样：

```go
var s []int

len(s)      // 0
cap(s)      // 0
range s     // 不执行
append(s, 1) // 可以正常 append
```

所以很多 Go 代码只关心“有没有元素”，直接写：

```go
if len(s) == 0 {
    // 没有元素
}
```

而不是：

```go
if s == nil {
    // ...
}
```

**但它们不是完全等价**

几个常见差异：

```go
var a []int = nil
b := []int{}

a == nil // true
b == nil // false
```

JSON 编码也不同：

```go
json.Marshal(a) // null
json.Marshal(b) // []
```

`reflect.DeepEqual` 也会认为它们不同：

```go
reflect.DeepEqual([]int(nil), []int{}) // false
```

**实践建议**

一般规则：

```go
if len(s) == 0 {
    // 判断“没有元素”
}
```

只有当你真的关心“是否未初始化 / 是否缺失 / JSON 输出 null 还是 []”时，才判断：

```go
if s == nil {
    // 判断“是否为 nil slice”
}
```

所以一句话总结：

Go 中 `nil slice` 和 `empty slice` 都满足 `len == 0`，但它们不是同一个概念；只是 Go 让它们在大多数使用场景下表现得很接近。严格来说，Go 的数组不能为 nil，能为 nil 的是 slice、map、chan、func、interface、pointer。

> for range slice
> 返回 index + 拷贝的值

```go
var pow = []int{1, 2, 4, 8, 16, 32, 64, 128}

func main() {
	for i, v := range pow {
		fmt.Printf("index[%d] = %d\n", i, v) // index[0] = 1
	}
	for i := range pow {
		fmt.Printf("index[%d]\n", i) // index[0]
	}
}
```

> slice 中拷贝值和下标的值，是不同的
> 存储 struct 还是 *struct，要看是否要修改同一个对象

[]Struct 的优点是元素连续存储，缓存友好，GC 压力小，代码也更简单。

```go
// 修改元素时要注意用下标
  for i := range users {
      users[i].Name = "changed"
  }

// 不要这样改
  for _, u := range users {
      u.Name = "changed" // 改的是副本
  }
```

> range 可省略值

```go
func main() {
	pow := make([]int, 10)
	for i := range pow {
		pow[i] = 1 << uint(i) // == 2**i
	}
	for _, value := range pow {
		fmt.Printf("%d\n", value)
	}
	for i, _ := range pow {
		fmt.Printf("%d\n", i)
	}
}
```

> 类型是否相同的判断原则

对，理解正确。

在 Go 里：

```go
[]int
```

这个 slice 类型只由“元素类型”决定，长度不是类型的一部分。

所以这两个 slice 类型相同：

```go
var a []int = []int{1, 2, 3}
var b []int = []int{1, 2, 3, 4, 5}
```

`a` 和 `b` 都是：

```go
[]int
```

长度只是运行时属性，可以变：

```go
fmt.Println(len(a)) // 3
fmt.Println(len(b)) // 5
```

但 array 不一样。

```go
[3]int
[5]int
```

这是两个不同类型，因为数组长度是类型的一部分。

所以：

```go
var a [3]int = [3]int{1, 2, 3}
var b [5]int = [5]int{1, 2, 3, 4, 5}

a = b // 编译错误
```

错误原因类似：

```text
cannot use b as [3]int value
```

也就是说：

```go
[3]int != [5]int
```

可以这么记：

```text
slice: []T       类型只看 T
array: [N]T      类型同时看 N 和 T
```

再比如：

```go
[]int
[]int
```

同一个类型。

```go
[3]int
[3]int
```

同一个类型。

```go
[3]int
[4]int
```

不同类型。

```go
[3]int
[3]string
```

不同类型。

这也是为什么 Go 里实际业务代码更常用 slice，而不是 array。因为 array 的长度固定且参与类型，灵活性比较低。

array 常用于：

```go
var sha256Hash [32]byte
var uuid [16]byte
```

这种长度有明确语义的场景。

slice 更常用于：

```go
users := []User{}
scores := []int{1, 2, 3}
names := []string{"Alice", "Bob"}
```

这种长度经常变化的列表。

#### slice 常见操作

Go 中 `slice` 最常见的操作主要有这些：

```go
package main

import (
	"fmt"
	"slices"
)

func main() {
	// 1. 创建 slice
	var a []int              // nil slice
	b := []int{1, 2, 3}      // 字面量
	c := make([]int, 3, 10)  // len=3, cap=10

	fmt.Println(a, b, c)

	// 2. 获取长度和容量
	fmt.Println(len(b)) // 3
	fmt.Println(cap(b)) // 通常为 3

	// 3. 访问和修改元素
	b[0] = 100
	fmt.Println(b[0])

	// 4. 遍历
	for i, v := range b {
		fmt.Println(i, v)
	}

	// 5. 追加元素
	b = append(b, 4)
	b = append(b, 5, 6)
	fmt.Println(b)

	// 6. 截取
	x := b[1:3] // 左闭右开
	fmt.Println(x)

	// 7. 复制
	dst := make([]int, len(b))
	copy(dst, b)
	fmt.Println(dst)

	// Go 1.21+ 也可以：
	cloned := slices.Clone(b)
	fmt.Println(cloned)

	// 8. 删除元素
	i := 2
	b = append(b[:i], b[i+1:]...)
	fmt.Println(b)

	// Go 1.21+：
    // 意思是：删除 b[1:2] 这一段元素。
    // 注意它的范围是左闭右开：
    // b[start:end]
	b = slices.Delete(b, 1, 2)

	// 9. 插入元素
	b = slices.Insert(b, 1, 999)
	fmt.Println(b)

	// 10. 判断是否包含
	fmt.Println(slices.Contains(b, 999))

	// 11. 查找下标
	fmt.Println(slices.Index(b, 999))

	// 12. 排序
	slices.Sort(b)
	fmt.Println(b)

	// 13. 反转
	slices.Reverse(b)
	fmt.Println(b)

	// 14. 清空但保留底层数组
	b = b[:0]
	fmt.Println(b, len(b), cap(b))

	// 15. 释放引用，方便 GC 回收
	b = nil
}
```

几个常用写法单独列一下：

```go
// 追加
s = append(s, x)

// 合并两个 slice
s = append(s, other...)

// 删除第 i 个元素
s = append(s[:i], s[i+1:]...)

// 清空 slice，但保留容量
s = s[:0]

// 截取
sub := s[start:end]

// 拷贝
dst := make([]T, len(src))
copy(dst, src)

// Go 1.21+
dst := slices.Clone(src)
```

需要注意的一点是：`slice` 本身不是数组，它是对底层数组的一段引用。多个 slice 可能共享同一个底层数组，所以修改一个 slice，有时会影响另一个 slice：

```go
a := []int{1, 2, 3, 4}
b := a[1:3]

b[0] = 99

fmt.Println(a) // [1 99 3 4]
fmt.Println(b) // [99 3]
```

如果想避免共享底层数组，可以用 `copy` 或 `slices.Clone`。

> 增加、删除

这两句用的是标准库 `slices` 包，Go 1.21+ 可用。

```go
b = slices.Delete(b, 1, 2)
```

意思是：删除 `b[1:2]` 这一段元素。

注意它的范围是左闭右开：

```go
b[start:end]
```

所以：

```go
slices.Delete(b, 1, 2)
```

删除的是下标 `1` 的元素，不包含下标 `2`。

例子：

```go
b := []int{10, 20, 30, 40}

b = slices.Delete(b, 1, 2)

fmt.Println(b) // [10 30 40]
```

如果写成：

```go
b = slices.Delete(b, 1, 3)
```

删除的是 `b[1]` 和 `b[2]`：

```go
b := []int{10, 20, 30, 40}

b = slices.Delete(b, 1, 3)

fmt.Println(b) // [10 40]
```

另一句：

```go
b = slices.Insert(b, 1, 999)
```

意思是：在下标 `1` 的位置插入 `999`。

也就是插入到原来的 `b[1]` 前面。

例子：

```go
b := []int{10, 20, 30}

b = slices.Insert(b, 1, 999)

fmt.Println(b) // [10 999 20 30]
```

如果插入多个元素：

```go
b := []int{10, 20, 30}

b = slices.Insert(b, 1, 888, 999)

fmt.Println(b) // [10 888 999 20 30]
```

也可以在末尾插入：

```go
b := []int{10, 20, 30}

b = slices.Insert(b, len(b), 999)

fmt.Println(b) // [10 20 30 999]
```

但不能越界：

```go
b = slices.Insert(b, 10, 999) // panic
```

总结一下：

```go
b = slices.Delete(b, 1, 2)
```

删除区间 `[1, 2)`，也就是删除下标 `1`。

```go
b = slices.Insert(b, 1, 999)
```

在下标 `1` 前插入 `999`。

### map

> 初始化 map

```go
m = make(map[string]Vertex)

// 直接用字面量
m := map[string]Vertex{
	"Bell Labs": {40.68433, -74.39967},
	"Bell Labs": {40.68433, -74.39967},
}

var m = map[string]Vertex{
	"Bell Labs": Vertex{
		40.68433, -74.39967,
	},
	"Google": Vertex{
		37.42202, -122.08408,
	},
}
```

```go
type Vertex struct {
	Lat, Long float64
}

var m map[string]Vertex // nil，不能 add key

func main() {
	m = make(map[string]Vertex)
	m["Bell Labs"] = Vertex{
		40.68433, -74.39967,
	}
	fmt.Println(m["Bell Labs"])
}
```

> 理解语法方式：可以理解成：map indexed by string, containing Vertex

```go
map[string]Vertex
```

Go 很多类型声明都是“类型结构 + 元素类型”的风格：

[]Vertex              // slice of Vertex
[10]Vertex            // array of 10 Vertex
map[string]Vertex     // map from string to Vertex
chan Vertex           // channel of Vertex

> map 的value可以包含nil，前提是value type可以为nil

map 的 value 可以是 nil，前提是 value 类型本身支持 nil；读取不存在的 key 也可能得到 nil，所以需要用 value, ok := m[key] 来判断 key 是否真的存在。

> map 本身也可能是 nil：

```go
var m map[string]int

fmt.Println(m == nil) // true
fmt.Println(m["x"])   // 0，读 nil map 可以
m["x"] = 1            // panic：assignment to entry in nil map
```

> map中的遍历，顺序是不保证的

```go
  func main() {
  	hosts := map[string]IPAddr{
  		"loopback":  {127, 0, 0, 1},
  		"googleDNS": {8, 8, 8, 8},
  	}
  	for name, ip := range hosts {
  		fmt.Printf("%v: %v\n", name, ip)
  	}
  }
```

> map 中的增删改查

```go
func main() {
	m := make(map[string]int)

	m["Answer"] = 42
	fmt.Println("The value:", m["Answer"]) // The value: 42

	m["Answer"] = 48
	fmt.Println("The value:", m["Answer"]) // The value: 48

	delete(m, "Answer")
	fmt.Println("The value:", m["Answer"]) // The value: 0

    // If key is in m, ok is true. If not, ok is false.
    // If key is not in the map, then elem is the zero value for the map's element type.
	v, ok := m["Answer"]
	fmt.Println("The value:", v, "Present?", ok) // The value: 0 Present? false
}
```

#### map 常见操作

Go 中 `map` 是键值对集合，常见操作主要有这些：

**1. 声明和初始化**

```go
// 只声明，m 是 nil map，不能直接写入
var m map[string]int

// 使用 make 初始化
m = make(map[string]int)

// 使用字面量初始化
scores := map[string]int{
    "Alice": 90,
    "Bob":   85,
}
```

注意：`nil map` 可以读取，但不能写入。

```go
var m map[string]int

fmt.Println(m["x"]) // 0，可以读
m["x"] = 1          // panic: assignment to entry in nil map
```

**2. 新增或更新元素**

```go
scores := make(map[string]int)

scores["Alice"] = 90 // 新增
scores["Alice"] = 95 // 更新
```

**3. 读取元素**

```go
score := scores["Alice"]
fmt.Println(score)
```

如果 key 不存在，会返回 value 类型的零值：

```go
scores := map[string]int{}

fmt.Println(scores["Unknown"]) // 0
```

**4. 判断 key 是否存在**

```go
score, ok := scores["Alice"]
if ok {
    fmt.Println("存在:", score)
} else {
    fmt.Println("不存在")
}
```

这是 Go 里读取 map 最常用的写法之一。

**5. 删除元素**

```go
delete(scores, "Alice")
```

删除不存在的 key 不会报错。

```go
delete(scores, "Unknown") // 安全
```

**6. 获取长度**

```go
fmt.Println(len(scores))
```

**7. 遍历 map**

```go
for name, score := range scores {
    fmt.Println(name, score)
}
```

只遍历 key：

```go
for name := range scores {
    fmt.Println(name)
}
```

只遍历 value：

```go
for _, score := range scores {
    fmt.Println(score)
}
```

注意：Go 中 map 的遍历顺序是不保证固定的。

**8. 清空 map**

Go 1.21+ 可以用 `clear`：

```go
clear(scores)
```

旧写法是逐个删除：

```go
for k := range scores {
    delete(scores, k)
}
```

**9. map 的 key 类型限制**

map 的 key 必须是可比较类型，比如：

```go
map[string]int
map[int]string
map[bool]string
map[struct{ ID int }]string
```

不能用 slice、map、function 作为 key：

```go
// invalid map key type []int
// map[[]int]string
```

**10. 嵌套 map**

```go
users := map[string]map[string]int{
    "Alice": {
        "math":    90,
        "english": 95,
    },
}

fmt.Println(users["Alice"]["math"])
```

动态写入嵌套 map 时，要先初始化内层 map：

```go
users := make(map[string]map[string]int)

users["Alice"] = make(map[string]int)
users["Alice"]["math"] = 90
```

**11. map 是引用类型**

```go
a := map[string]int{"x": 1}
b := a

b["x"] = 100

fmt.Println(a["x"]) // 100
```

`b := a` 不会复制底层数据，两个变量指向同一个 map。

**12. 并发读写要注意**

普通 map 不是并发安全的。多个 goroutine 同时读写 map 可能 panic：

```go
fatal error: concurrent map writes
```

并发场景可以使用：

```go
sync.Mutex
sync.RWMutex
sync.Map
```

常用操作总结：

```go
m := make(map[string]int)

m["a"] = 1              // 新增/更新
v := m["a"]             // 读取
v, ok := m["a"]         // 判断是否存在
delete(m, "a")          // 删除
n := len(m)             // 长度
for k, v := range m {}  // 遍历
clear(m)                // 清空，Go 1.21+
```

#### Go 里可以写: m["hello"]++

在 Go 里可以写：

```go
m["hello"]++
```

但这不是因为 `m["hello"]` 返回了一个可直接修改的引用，而是因为 Go 对 map index 表达式在赋值场景里做了特殊支持。

可以把它理解成编译器帮你展开成类似这样：

```go
v := m["hello"] // 读出当前值，key 不存在则是 int 零值 0
v++
m["hello"] = v // 写回 map
```

所以它能生效。

但这件事有几个关键点。

**Go 的 map 取值通常是值拷贝**

```go
m := map[string]int{
    "hello": 1,
}

x := m["hello"]
x++

fmt.Println(x)          // 2
fmt.Println(m["hello"]) // 1
```

这里 `x := m["hello"]` 是把 map 里的 `int` 值拷贝出来。修改 `x` 不会影响 map。

而：

```go
m["hello"]++
```

是一个特殊的自增语句，等价于“读出来、加一、写回去”。

**为什么 Go 不直接返回引用？**

因为 Go 的 map 底层会扩容、搬迁 bucket、重新组织存储位置。如果允许你拿到某个 map 元素的地址，比如：

```go
p := &m["hello"] // Go 不允许
```

那么之后 map 扩容时，这个地址可能失效，带来悬垂指针之类的问题。

所以 Go 规定：map 的元素不是 addressable 的，也就是不能取地址，不能当成稳定内存位置使用。

因此下面这些不行：

```go
p := &m["hello"] // 不允许

type User struct {
    Age int
}

users := map[string]User{
    "a": {Age: 10},
}

users["a"].Age++ // 不允许
```

最后这个不允许，是因为 `users["a"]` 取出来的是一个 `User` 的副本，不能直接修改副本里的字段再自动写回。

正确写法是：

```go
u := users["a"]
u.Age++
users["a"] = u
```

或者把 value 存成指针：

```go
users := map[string]*User{
    "a": {Age: 10},
}

users["a"].Age++ // 可以，修改的是指针指向的对象
```

这里 `users["a"]` 返回的是指针的拷贝，但指针指向的对象还是同一个。

总结一下：

Go 里的 `m["hello"]++` 可以生效，但不要理解成“拿到了 map value 的引用”。更准确地说，它是 Go 语言规范允许的一种特殊赋值形式：读取 map 中的值，计算新值，再写回 map。

普通读取：

```go
x := m["hello"]
```

是值拷贝。

特殊写法：

```go
m["hello"]++
m["hello"] += 1
m["hello"] = 123
```

会修改 map。

### 函数 function

> function 也是值，可以作为参数和返回值

```go
func compute(fn func(float64, float64) float64) float64 {
	return fn(3, 4)
}

func main() {
	hypot := func(x, y float64) float64 {
		return math.Sqrt(x*x + y*y)
	}
	fmt.Println(hypot(5, 12)) // 13

	fmt.Println(compute(hypot)) // 5
	fmt.Println(compute(math.Pow)) // 81
}
```

> 函数闭包
> Go 函数可以是闭包。闭包是指函数值引用其外部变量。函数可以访问并赋值给被引用的变量；从这个意义上讲，函数“绑定”到了这些变量上。

```go
func adder() func(int) int {
	sum := 0
	return func(x int) int {
		sum += x
		return sum
	}
}

func main() {
	pos, neg := adder(), adder()
	for i := 0; i < 10; i++ {
		fmt.Println(
			pos(i),
			neg(-2*i),
		)
	}
}
```

> 在 Go 里不会自动只取第一个返回值。数量必须匹配，否则编译报错

在 Go 里不会自动只取第一个返回值。数量必须匹配，否则编译报错。

比如：

```go
func f() (int, error) {
    return 1, nil
}

x := f()
```

会报错，类似：

```text
assignment mismatch: 1 variable but f returns 2 values
```

正确写法是接收两个值：

```go
x, err := f()
```

如果你不关心第二个值，用空白标识符 `_` 丢掉：

```go
x, _ := f()
```

如果只关心错误：

```go
_, err := f()
```

所以结论是：函数返回两个值时，赋值时左边也要有两个接收位置；Go 不会默认只接受第一个返回值。

### interface

> interface 的零值是 nil，但如果 interface 里面装了一个“类型明确但值为 nil”的东西，它就不是 nil 了

```go
var x any
fmt.Println(x == nil) // true

var p *int = nil
var x any = p
fmt.Println(p == nil) // true
fmt.Println(x == nil) // false
```

因为 interface 实际上包含两部分：
动态类型
动态值

上面的 x 是：

动态类型: *int
动态值: nil

所以 x 本身不是 nil。

> 接口类型定义为一组方法签名。

接口类型的值可以包含任何实现了这些方法的值。

```go
type Abser interface {
	Abs() float64
}

func main() {
	var a Abser
	f := MyFloat(-math.Sqrt2)
	v := Vertex{3, 4}

	a = f  // a MyFloat implements Abser
	a = &v // a *Vertex implements Abser

	// In the following line, v is a Vertex (not *Vertex)
	// and does NOT implement Abser.
    // `Vertex`（值类型）没有实现 `Abser` 接口，因为 `Abs` 方法仅在 `*Vertex`（指针类型）上定义
	// a = v

	fmt.Println(a.Abs())
}

type MyFloat float64

func (f MyFloat) Abs() float64 {
	if f < 0 {
		return float64(-f)
	}
	return float64(f)
}

type Vertex struct {
	X, Y float64
}

func (v *Vertex) Abs() float64 {
	return math.Sqrt(v.X*v.X + v.Y*v.Y)
}
```

> 接口是隐式实现的。

类型通过实现接口的方法来实现该接口。无需显式声明意图，也无需使用“implements”关键字。

隐式接口将接口的定义与其实现解耦，因此实现可以出现在任何包中而无需预先配置。

接口在使用的地方呈现出来，而不是实现的时候呈现出来

```go
type I interface {
	M()
}

type T struct {
	S string
}

// This method means type T implements the interface I,
// but we don't need to explicitly declare that it does so.
func (t T) M() {
	fmt.Println(t.S)
}

func main() {
	var i I = T{"hello"}
	i.M()
}
```

> 接口值

接口值本质上可以看作是一个包含值和具体类型的元组：(值, 类型)

接口值保存着特定底层具体类型的值。

调用接口值的方法，实际上是在其底层类型上执行同名方法。

```go
type I interface {
	M()
}

type T struct {
	S string
}

func (t *T) M() {
	fmt.Println(t.S)
}

type F float64

func (f F) M() {
	fmt.Println(f)
}

func main() {
	var i I

	i = &T{"Hello"}
	describe(i) // (&{Hello}, *main.T)
	i.M()

	i = F(math.Pi)
	describe(i) // (3.141592653589793, main.F)
	i.M()
}

func describe(i I) {
	fmt.Printf("(%v, %T)\n", i, i)
}
```

> 接口值及其底层值为 nil 的情况

如果接口内部的具体值为 nil，则该方法将被接收方为 nil 的情况调用。

在某些语言中，这会触发空指针异常，但在 Go 语言中，通常会编写能够优雅地处理接收方为 nil 的情况的方法（如本例中的方法 M）。 -- 我认为这是go不是纯OOP的佐证，只是假装面向对象

请注意，包含 nil 具体值的接口值本身不为 nil。

```go
type I interface {
	M()
}

type T struct {
	S string
}

func (t *T) M() {
	if t == nil {
		fmt.Println("<nil>")
		return
	}
	fmt.Println(t.S)
}

func main() {
	var i I

	var t *T
	i = t
	describe(i) // (<nil>, *main.T)
	i.M()

	i = &T{"hello"}
	describe(i) // (&{hello}, *main.T)
	i.M()
}

func describe(i I) {
	fmt.Printf("(%v, %T)\n", i, i)
}
```

> 在go中，这么写是好的实践还是坏的实践？ if t == nil 

这不是绝对的好或坏，取决于 `nil` 对这个类型是不是一个有意义的状态。

这类写法在 Go 里是合法的：

```go
var t *T
t.M()
```

只要 `M` 里不解引用 `t`，就不会 panic。所以：

```go
func (t *T) M() {
	if t == nil {
		fmt.Println("<nil>")
		return
	}
	fmt.Println(t.S)
}
```

本身没有问题。

更准确的判断是：

- 如果 `nil` 是这个类型的有效状态，这是好实践。
  例如链表节点、树节点、可选对象、调试输出、`String()` 方法等。`nil` receiver 有明确语义，方法能自然处理它。

- 如果只是为了“防御性地避免 panic”，通常不是好实践。
  因为它可能掩盖调用方的 bug。调用方本不该传 `nil`，结果方法静默返回或打印 `<nil>`，问题反而更难定位。

- 如果 `nil` 对这个类型没有业务意义，最好不要让方法接受它。
  可以直接让 panic 暴露 bug，或者在更靠近输入边界的地方显式检查并返回 error。

- 如果决定支持 `nil` receiver，应该把行为当成 API 契约。
  也就是说文档或注释里要说明：`(*T)(nil).M()` 是被支持的，并说明它会做什么。

对于你这个例子，如果 `M` 的作用是打印、格式化、调试展示，那么这样写挺合理：

```go
func (t *T) String() string {
	if t == nil {
		return "<nil>"
	}
	return t.S
}
```

但如果 `M` 是正常业务逻辑，比如保存、更新、计算、发送请求之类，通常不建议在方法内部随手吞掉 `nil`。那种情况下更好的选择通常是：

```go
func (t *T) M() error {
	if t == nil {
		return errors.New("nil *T")
	}

	// normal logic
	return nil
}
```

或者干脆不检查，让错误调用尽早 panic。

简短结论：
如果 `nil receiver` 是你有意设计出来的语义，这是好实践；如果只是到处加 `if t == nil` 来兜底，那通常是坏味道。

> 空接口值

空接口值既不包含值，也不包含具体类型。

对空接口调用方法会导致运行时错误，因为接口元组内没有类型信息来指示要调用哪个具体方法。

```go
type I interface {
	M()
}

func main() {
	var i I
	describe(i) // (<nil>, <nil>)
	i.M() // panic: runtime error
}

func describe(i I) {
	fmt.Printf("(%v, %T)\n", i, i)
}
```

> 空接口

不指定任何方法的接口类型称为空接口：

interface{}

空接口可以包含任何类型的值。（每种类型至少实现零个方法。）

空接口用于处理未知类型的值。例如，`fmt.Print` 可以接受任意数量的 `interface{}` 类型的参数。 -- 太像 java 中的 Object 基类了

```go
func main() {
	var i interface{}
	describe(i) // (<nil>, <nil>)

	i = 42
	describe(i) // (42, int)

	i = "hello"
	describe(i) // (hello, string)
}

func describe(i interface{}) {
	fmt.Printf("(%v, %T)\n", i, i)
}
```

> 在 Go 里，函数参数如果想接收“任意类型”，常见有两种写法

在 Go 里，函数参数如果想接收“任意类型”，常见有两种写法。

**1. 用 `any` / `interface{}`**

Go 1.18 之后推荐写 `any`：

```go
func PrintValue(v any) {
    fmt.Println(v)
}
```

`any` 本质上就是：

```go
type any = interface{}
```

所以这两种写法等价：

```go
func PrintValue(v any) {}

func PrintValue(v interface{}) {}
```

调用时可以传任意类型：

```go
PrintValue(123)
PrintValue("hello")
PrintValue(true)
PrintValue([]int{1, 2, 3})
```

如果需要根据真实类型处理，可以用 type switch：

```go
func Handle(v any) {
    switch x := v.(type) {
    case int:
        fmt.Println("int:", x)
    case string:
        fmt.Println("string:", x)
    case bool:
        fmt.Println("bool:", x)
    default:
        fmt.Println("unknown:", x)
    }
}
```

**2. 用泛型**

如果你希望函数接收任意类型，同时保留这个类型信息，可以用泛型：

```go
func Identity[T any](v T) T {
    return v
}
```

调用：

```go
a := Identity(123)      // a 是 int
b := Identity("hello")  // b 是 string
```

简单区分：

```go
func F(v any) {}
```

适合：日志、打印、JSON 编码、通用容器、运行时判断类型。

```go
func F[T any](v T) T {}
```

适合：想让编译器保留具体类型，或者返回值类型和参数类型有关。

所以如果只是“参数可以是任意类型”，直接写：

```go
func MyFunc(v any) {
    // ...
}
```

> 类型断言

类型断言允许访问接口值的底层具体值。

t := i.(T)

此语句断言接口值 i 包含具体类型 T，并将底层 T 值赋给变量 t。

如果 i 不包含 T，则该语句会触发 panic。

要测试接口值是否包含特定类型，类型断言可以返回两个值：底层值和一个布尔值，该布尔值报告断言是否成功。

t, ok := i.(T)

如果 i 包含 T，则 t 将是底层值，并且 ok 为 true。

否则，ok 为 false，t 将是类型 T 的零值，并且不会发生 panic。

请注意此语法与从映射中读取的语法之间的相似之处。

```go
func main() {
	var i interface{} = "hello"

	s := i.(string)
	fmt.Println(s) // hello

	s, ok := i.(string)
	fmt.Println(s, ok) // hello true

	f, ok := i.(float64)
	fmt.Println(f, ok) // 0 false

	// f = i.(float64) // panic: interface conversion: interface {} is string, not float64
	// fmt.Println(f)
}
```

> t := i.(T) 给t的是复制，还是引用？

` t := i.(T)` 在 Go 语义上是“复制值”，不是引用绑定。

它做了两步：

```go
t := i.(T)
```

等价于：

1. 从接口值 `i` 里做类型断言，取出动态值，要求它的动态类型是 `T`
2. 把这个值赋给变量 `t`

赋值在 Go 里会复制值。不过要看 `T` 本身是什么类型：

```go
type S struct {
	N int
}

s := S{N: 1}
var i any = s

t := i.(S)
t.N = 2

fmt.Println(s.N) // 1
```

这里 `T` 是结构体 `S`，所以 `t` 是结构体副本，改 `t.N` 不会影响 `s.N`。

但如果 `T` 是指针：

```go
s := &S{N: 1}
var i any = s

t := i.(*S)
t.N = 2

fmt.Println(s.N) // 2
```

这里复制的是指针值，`t` 和 `s` 指向同一个对象，所以修改会影响原对象。

同理：

- `T` 是 `int`、`struct`、`array`：复制整个值
- `T` 是 `*Struct`：复制指针，底层对象共享
- `T` 是 `slice`：复制 slice header，底层数组共享
- `T` 是 `map`：复制 map handle，底层哈希表共享
- `T` 是 `chan`、`func`：复制句柄/函数值
- `T` 是包含指针、slice、map 字段的 struct：struct 本身复制，但字段指向的底层数据可能共享

所以最准确的说法是：

`i.(T)` 取出接口里的动态值，`t :=` 对这个值做一次普通赋值复制；如果这个值本身是引用语义/指针语义的类型，那么复制后仍然共享底层数据。

> Type switch

Type switch 是一种允许连续进行多个类型断言的结构。

类型开关类似于常规的 switch 语句，但类型开关中的 case 指定的是类型（而不是值），并且这些值会与给定接口值所持有的值的类型进行比较。

switch v := i.(type) {

case T:

// 此处 v 的类型为 T

case S:

// 此处 v 的类型为 S

default:

// 没有匹配项；此处 v 的类型与 i 相同

}

类型开关中的声明语法与类型断言 i.(T) 相同，只是将具体的类型 T 替换为关键字 type。

此 switch 语句测试接口值 i 是否持有类型为 T 或 S 的值。在 T 和 S 两种情况下，变量 v 的类型分别为 T 和 S，并且持有 i 所持有的值。在默认情况（没有匹配项）中，变量 v 的类型和值与 i 相同。

```go
func do(i interface{}) {
	switch v := i.(type) {
	case int:
		fmt.Printf("Twice %v is %v\n", v, v*2) // Twice 21 is 42
	case string:
		fmt.Printf("%q is %v bytes long\n", v, len(v)) // "hello" is 5 bytes long
	default:
		fmt.Printf("I don't know about type %T!\n", v) // I don't know about type bool!
	}
}

func main() {
	do(21)
	do("hello")
	do(true)
}
```

#### Stringer 字符串类型

最常用的接口之一是 fmt 包定义的 Stringer 接口。

type Stringer interface {

String() string

}
Stringer 是一种可以将自身描述为字符串的类型。fmt 包（以及许多其他包）会查找此接口来打印值。

```go
type Person struct {
	Name string
	Age  int
}

// 值接收者，Person 和 *Person 都实现 fmt.Stringer。
func (p Person) String() string {
	return fmt.Sprintf("%v (%v years)", p.Name, p.Age)
}

type Person2 struct {
	Name string
	Age  int
}

// 指针接收者，只有 *Person2 实现 fmt.Stringer，Person2 本身没有实现。
func (p *Person2) String() string {
	return fmt.Sprintf("%v (%v years)", p.Name, p.Age)
}

func main() {
	a := Person{"Arthur Dent", 42}
	z := Person{"Zaphod Beeblebrox", 9001}
	fmt.Println(a, z) // Arthur Dent (42 years) Zaphod Beeblebrox (9001 years)
	fmt.Println(&a, &z) // Arthur Dent (42 years) Zaphod Beeblebrox (9001 years)
	
	a2 := Person2{"Arthur Dent", 42}
	z2 := Person2{"Zaphod Beeblebrox", 9001}
	fmt.Println(a2, z2) // {Arthur Dent 42} {Zaphod Beeblebrox 9001}
	fmt.Println(&a2, &z2) // Arthur Dent (42 years) Zaphod Beeblebrox (9001 years)
}
```

#### reader

> Readers

io 包定义了 io.Reader 接口，它表示数据流的读取端。

Go 标准库包含此接口的许多实现，包括文件、网络连接、压缩器、密码等。

io.Reader 接口有一个 Read 方法：

func (T) Read(b []byte) (n int, err error)

Read 方法使用数据填充给定的字节切片，并返回填充的字节数和一个错误值。当数据流结束时，它会返回 io.EOF 错误。

示例代码创建了一个 strings.Reader 对象，并每次读取其输出 8 个字节。

```go
import (
	"fmt"
	"io"
	"strings"
)

func main() {
	r := strings.NewReader("Hello, Reader!")

	b := make([]byte, 8)
	for {
		n, err := r.Read(b)
		fmt.Printf("n = %v err = %v b = %v\n", n, err, b)
		fmt.Printf("b[:n] = %q\n", b[:n])
		if err == io.EOF {
			break
		}
	}
}
```

#### images 图像

`image` 包定义了 `Image` 接口：

package image

type Image interface {
    `ColorModel() color.Model
    `Bounds() Rectangle
    `At(x, y int) color.Color
}

注意：`Bounds` 方法的返回值 `Rectangle` 实际上是 `image.Rectangle` 类型，因为该声明位于 `image` 包内部。

`color.Color` 和 `color.Model` 类型也是接口，但我们将忽略这一点，直接使用预定义的实现 `color.RGBA` 和 `color.RGBAModel`。这些接口和类型由 `image/color` 包定义。

```go
import (
	"fmt"
	"image"
)

func main() {
	m := image.NewRGBA(image.Rect(0, 0, 100, 100))
	fmt.Println(m.Bounds())
	fmt.Println(m.At(0, 0).RGBA())
}
```

#### error

> 这在 error 里也很常见：虽然里面的指针是 nil，但 error interface 已经有了动态类型 *MyError

```go
type MyError struct{}

func (e *MyError) Error() string {
    return "error"
}

func f() error {
    var e *MyError = nil
    return e
}

err := f()
fmt.Println(err == nil) // false
```

> Errors

Go 程序使用错误值来表示错误状态。

错误类型是一个内置接口，类似于 fmt.Stringer：

type error interface {
    Error() string
}

（与 fmt.Stringer 一样，fmt 包在打印值时会查找错误接口。）

函数通常会返回一个错误值，调用代码应该通过检查错误值是否为 nil 来处理错误。

i, err := strconv.Atoi("42")
if err != nil {
    fmt.Printf("无法转换数字：%v\n", err)
    return
}

fmt.Println("转换后的整数：", i)

nil 错误表示成功；非 nil 错误表示失败。

```go
import (
	"fmt"
	"time"
)

type MyError struct {
	When time.Time
	What string
}

func (e *MyError) Error() string {
	return fmt.Sprintf("at %v, %s",
		e.When, e.What)
}

func run() error {
	return &MyError{
		time.Now(),
		"it didn't work",
	}
}

func main() {
	if err := run(); err != nil {
		fmt.Println(err)
	}
}
```

> 创建error

func handler() error {
    err := service()
    if errors.Is(err, ErrNotFound) {
        return fmt.Errorf("resource missing: %w", err)
    }
    return err
}

#### 接口嵌入和组合

Go 里没有传统继承，接口主要靠“隐式实现 + 嵌入组合”来表达能力集合。

**接口嵌入**

接口可以把另一个接口直接写进自己的定义里：

```go
type Reader interface {
	Read(p []byte) (n int, err error)
}

type Writer interface {
	Write(p []byte) (n int, err error)
}

type ReadWriter interface {
	Reader
	Writer
}
```

`ReadWriter` 等价于：

```go
type ReadWriter interface {
	Read(p []byte) (n int, err error)
	Write(p []byte) (n int, err error)
}
```

也就是说：接口嵌入会把被嵌入接口的方法集合合并进来。

标准库里就有类似写法：

```go
type ReadWriter interface {
	Reader
	Writer
}

type ReadWriteCloser interface {
	Reader
	Writer
	Closer
}
```

**接口组合**

接口组合的核心思想是：把小接口拼成大接口。

```go
type Reader interface {
	Read([]byte) (int, error)
}

type Closer interface {
	Close() error
}

type ReadCloser interface {
	Reader
	Closer
}
```

一个类型只要实现了 `Read` 和 `Close`，就自动实现了 `ReadCloser`：

```go
type File struct{}

func (File) Read(p []byte) (int, error) {
	return 0, nil
}

func (File) Close() error {
	return nil
}

var rc ReadCloser = File{}
```

不需要显式声明：

```go
// Go 不需要这样写，也没有这种语法：
// type File implements ReadCloser
```

**重复方法**

如果嵌入的接口里有相同方法，签名一致可以：

```go
type A interface {
	Foo() string
}

type B interface {
	Foo() string
}

type C interface {
	A
	B
}
```

但签名不一致不行：

```go
type A interface {
	Foo() string
}

type B interface {
	Foo() int
}

type C interface {
	A
	B // 编译错误：Foo 方法签名冲突
}
```

**常见设计方式**

Go 鼓励定义小接口，然后按需组合：

```go
type Saver interface {
	Save() error
}

type Loader interface {
	Load() error
}

type Repository interface {
	Saver
	Loader
}
```

调用方也经常只依赖自己需要的最小能力：

```go
func Process(r io.Reader) error {
	// 这里只需要读能力，不关心它是不是文件、网络连接、buffer
	return nil
}
```

如果后面需要读写能力，再组合：

```go
func CopyAndFlush(rw interface {
	io.Reader
	io.Writer
	Flush() error
}) error {
	return nil
}
```

一句话总结：Go 的接口嵌入就是把接口的方法集合并起来；接口组合就是用这种机制把多个小能力拼成更大的能力集合。

### 零值、nil

> new vs make

```go
// new 创建这个类型的零值，然后返回指针
p := new(int)
fmt.Println("*p") // 0

// make 创建并初始化这个类型的内部结构
```

> Go 的核心概念是“零值”，不是“空值”

- 零值是类型没有初始化时的默认值。
- nil 是 pointer、slice、map、chan、func、interface 的零值。
- "" 是 string 的零值。
- 0 是数字类型的零值。
- false 是 bool 的零值。
- struct 的零值是每个字段的零值。
- 空 slice/map 不一定是零值，nil slice/map 才是零值。
- Go 鼓励设计“零值可用”的类型。

> go语言中是故意没有加入null的概念吗？而是使用零值的概念？

是的，但要更精确地说：

Go 没有 `null` 这个关键字，也没有“所有类型都可以为空”的统一 null 概念。Go 有的是：

1. **零值 zero value**
2. **`nil`，但只适用于一部分引用/指针类类型**

**3. Go 的核心设计是零值**

Go 里变量声明后，即使没有显式初始化，也一定有一个合法默认值：

```go
var i int        // 0
var s string     // ""
var b bool       // false
var st MyStruct  // 字段都是零值
```

这个设计是故意的。Go 希望很多类型的零值就是可用状态，比如：

```go
var buf bytes.Buffer
buf.WriteString("hello")
```

不需要构造函数，也不需要手动初始化。

**1. Go 不是没有“空”，而是叫 `nil`**

以下类型的零值是 `nil`：

```go
var p *int        // nil
var s []int       // nil
var m map[string]int // nil
var ch chan int   // nil
var f func()      // nil
var i interface{} // nil
```

所以 Go 不是完全没有 null-like 概念，而是没有一个叫 `null` 的通用值。

```go
var p *int
if p == nil {
    fmt.Println("p is nil")
}
```

**1. 但普通值类型不能是 nil**

比如这些是不允许的：

```go
var x int = nil       // 编译错误
var s string = nil    // 编译错误
var b bool = nil      // 编译错误
```

这和 Java、JavaScript、Python 之类的语言不同。Go 里 `int` 就一定是一个整数，默认是 `0`，不会是 null。

**1. Go 的思路是：少用“可能为空”的值**

如果一个值确实可能不存在，Go 通常用几种方式表达：

用第二个返回值表示是否存在

```go
v, ok := m["key"]
if !ok {
    // 不存在
}
```

用指针表示可选值

```go
type User struct {
    Name  string
    Email *string // 可能没有 email
}
```

用 error 表示失败

```go
user, err := FindUser(id)
if err != nil {
    return err
}
```

**1. 一个重要坑：interface 的 nil**

Go 里 `interface` 和 `nil` 有一个经典陷阱：

```go
var p *MyType = nil
var i interface{} = p

fmt.Println(i == nil) // false
```

因为接口值内部包含两部分：动态类型和值。

这里 `i` 的动态类型是 `*MyType`，值是 `nil`，所以整个 interface 不是 nil。

**总结**

可以这么理解：

Go 是故意没有设计一个“所有类型都能取的 null 值”。

它用：

- **零值**处理默认初始化
- **`nil`**处理指针、slice、map、channel、func、interface 等引用类类型
- **`value, ok` / `value, err` / 指针**表达“值不存在”或“操作失败”

所以你说的方向基本对：Go 更强调零值，而不是把 null 作为普遍机制。

### 复合类型的复制和引用

在 Go 里，`array`、`slice`、`map` 都是语言内建的类型构造方式，但它们通常不叫“基础类型”。

更准确地说：

```text
基础类型 / basic types:
bool, string, int, float64, complex64 等

复合类型 / composite types:
array, slice, map, struct, pointer, function, interface, channel
```

所以：

```go
int
string
float64
bool
```

这些更像“基础类型”。

而：

```go
[3]int
[]int
map[string]int
struct { Name string }
```

这些是“复合类型”，由其他类型组合出来。

区别大概是这样：

```go
var a [3]int
```

`[3]int` 是数组类型。长度是类型的一部分，所以 `[3]int` 和 `[4]int` 是不同类型。

```go
var s []int
```

`[]int` 是 slice 类型。它像一个动态视图，内部指向某个底层数组，并记录长度和容量。

```go
var m map[string]int
```

`map[string]int` 是 map 类型。它是哈希表风格的键值映射。

它们都是 Go 语言直接支持的，不需要像 Java 那样通过标准库类来表达：

```java
int[] nums;
List<Integer> nums;
Map<String, Integer> m;
```

Go 里是语言语法：

```go
[3]int
[]int
map[string]int
```

但三者行为也不一样：

```go
array: 值类型，赋值会复制整个数组
slice: 引用底层数组的描述符，赋值不会复制元素
map: 引用型结构，赋值不会复制整个哈希表
```

例子：

```go
a := [3]int{1, 2, 3}
b := a
b[0] = 100

fmt.Println(a) // [1 2 3]
fmt.Println(b) // [100 2 3]
```

数组赋值会复制。

```go
s1 := []int{1, 2, 3}
s2 := s1
s2[0] = 100

fmt.Println(s1) // [100 2 3]
fmt.Println(s2) // [100 2 3]
```

slice 共享底层数组。

```go
m1 := map[string]int{"a": 1}
m2 := m1
m2["a"] = 100

fmt.Println(m1) // map[a:100]
fmt.Println(m2) // map[a:100]
```

map 赋值后也指向同一份底层数据。

所以一句话总结：

```text
array、slice、map 是 Go 的内建复合类型，不是基础类型。
```

其中 `array` 更接近普通值，`slice` 和 `map` 更接近“引用某个底层数据结构的句柄”。

## 方法 method

> Go 语言没有类。但是，你可以在类型上定义方法。

方法是一个带有特殊接收器参数的函数。
接收器出现在其自身的参数列表中，位于 `func` 关键字和方法名之间。
在这个例子中，`Abs` 方法有一个名为 `v` 的接收器，类型为 `Vertex`。

```go
type Vertex struct {
	X, Y float64
}

func (v Vertex) Abs() float64 {
	return math.Sqrt(v.X*v.X + v.Y*v.Y)
}

func main() {
	v := Vertex{3, 4}
	fmt.Println(v.Abs())
}
```

> 记住：方法本质上就是一个带有接收参数的函数。以下是用普通函数编写的 `Abs` 函数，功能完全相同。

```go
type Vertex struct {
	X, Y float64
}

func Abs(v Vertex) float64 {
	return math.Sqrt(v.X*v.X + v.Y*v.Y)
}

func main() {
	v := Vertex{3, 4}
	fmt.Println(Abs(v))
}
```

> 也可以在非结构体类型上声明方法。

在这个例子中，我们看到一个数值类型 `MyFloat` 及其 `Abs` 方法。
你只能声明一个接收者类型与该方法定义在同一 package 中的方法。你不能声明一个接收者类型定义在其他包中的方法（包括内置类型，例如 `int`）。

```go
type MyFloat float64

func (f MyFloat) Abs() float64 {
	if f < 0 {
		return float64(-f)
	}
	return float64(f)
}

func main() {
	f := MyFloat(-math.Sqrt2)
	fmt.Println(f.Abs())
}
```

> 指针接收者 Pointer receivers

你可以声明带有指针接收器的方法。

这意味着接收器类型具有字面语法 *T，其中 T 为某种类型。（此外，T 本身不能是指针，例如 *int。）

例如，此处的 Scale 方法定义在 *Vertex 上。

带有指针接收器的方法可以修改接收器指向的值（如 Scale 方法在此处所做的那样）。由于方法通常需要修改其接收器，因此指针接收器比值接收器更常见。

对于值接收器，Scale 方法操作的是原始 Vertex 值的副本。（这与其他任何函数参数的行为相同。）Scale 方法必须具有指针接收器才能更改在 main 函数中声明的 Vertex 值。

```go
type Vertex struct {
	X, Y float64
}

func (v Vertex) Abs() float64 {
	return math.Sqrt(v.X*v.X + v.Y*v.Y)
}

func (v *Vertex) Scale(f float64) {
	v.X = v.X * f
	v.Y = v.Y * f
}

func main() {
	v := Vertex{3, 4}
	v.Scale(10)
	fmt.Println(v.Abs())
}
```

> 带有指针参数的函数必须接受指针作为参数；而带有指针接收器的方法在被调用时，可以接受值或指针作为接收器

比较前面两个程序，您可能会注意到，带有指针参数的函数必须接受指针作为参数：

var v Vertex
ScaleFunc(v, 5) // 编译错误！
ScaleFunc(&v, 5) // 正常

而带有指针接收器的方法在被调用时，可以接受值或指针作为接收器：

var v Vertex
v.Scale(5) // 正常
p := &v
p.Scale(10) // 正常

对于语句 v.Scale(5)，即使 v 是一个值而不是指针，也会自动调用带有指针接收器的方法。也就是说，为了方便起见，Go 将语句 v.Scale(5) 解释为 (&v).Scale(5)，因为 Scale 方法有一个指针接收器。

```go
type Vertex struct {
	X, Y float64
}

func (v *Vertex) Scale(f float64) {
	v.X = v.X * f
	v.Y = v.Y * f
}

func ScaleFunc(v *Vertex, f float64) {
	v.X = v.X * f
	v.Y = v.Y * f
}

func main() {
	v := Vertex{3, 4}
	v.Scale(2)
	ScaleFunc(&v, 10)

	p := &Vertex{4, 3}
	p.Scale(3)
	ScaleFunc(p, 8)

	fmt.Println(v, p)
}
```

> 反过来也一样。

接受值参数的函数必须接受特定类型的值：

var v Vertex
fmt.Println(AbsFunc(v)) // OK
fmt.Println(AbsFunc(&v)) // 编译错误！

而接受值接收器的方法在调用时可以接受值或指针作为接收器：

var v Vertex
fmt.Println(v.Abs()) // OK
p := &v
fmt.Println(p.Abs()) // OK

在这种情况下，方法调用 p.Abs() 会被解释为 (*p).Abs()。

```go
type Vertex struct {
	X, Y float64
}

func (v Vertex) Abs() float64 {
	return math.Sqrt(v.X*v.X + v.Y*v.Y)
}

func AbsFunc(v Vertex) float64 {
	return math.Sqrt(v.X*v.X + v.Y*v.Y)
}

func main() {
	v := Vertex{3, 4}
	fmt.Println(v.Abs())
	fmt.Println(AbsFunc(v))

	p := &Vertex{4, 3}
	fmt.Println(p.Abs())
	fmt.Println(AbsFunc(*p))
}
```

> 使用指针接收器有两个原因：

首先，方法可以修改其接收器指向的值。

其次，可以避免每次方法调用时都复制该值。例如，如果接收器是一个大型结构体，这样做会更高效。

在本例中，Scale 和 Abs 都是接收器类型为 *Vertex 的方法，即使 Abs 方法不需要修改其接收器。

一般来说，给定类型的所有方法都应该使用值接收器或指针接收器，而不能混合使用两者。（我们将在接下来的几页中解释原因。）

```go
type Vertex struct {
	X, Y float64
}

func (v *Vertex) Scale(f float64) {
	v.X = v.X * f
	v.Y = v.Y * f
}

func (v *Vertex) Abs() float64 {
	return math.Sqrt(v.X*v.X + v.Y*v.Y)
}

func main() {
	v := &Vertex{3, 4}
	fmt.Printf("Before scaling: %+v, Abs: %v\n", v, v.Abs())
	v.Scale(5)
	fmt.Printf("After scaling: %+v, Abs: %v\n", v, v.Abs())
}
```


## 流程控制

### for 循环

for ;; {

}

for ; i< 10; {

}

for {

}

### if else

if a = 2; i < 10 {

}

if else

### switch

> 不用加 break，自动会加

> Switch cases evaluate cases from top to bottom, stopping when a case succeeds.

(For example,

switch i {
case 0:
case f():
}
does not call f if i==0.)

switch os := runtime.GOOS; os {
case "darwin":
	fmt.Println("macOS.")
case "linux":
	fmt.Println("Linux.")
	
default:
	// freebsd, openbsd,
	// plan9, windows...
	fmt.Printf("%s.\n", os)
}

### defer

> 参数会立刻计算出来，但是函数到最后才执行

func main() {
	defer fmt.Println("world")

	fmt.Println("hello")
}

> 是个stack，先进后出，所以先打印9

func main() {
	fmt.Println("counting")

	for i := 0; i < 10; i++ {
		defer fmt.Println(i)
	}

	fmt.Println("done")
}

## 字符串

### 速记

strings.Contains      // 是否包含
strings.Split         // 分割
strings.Join          // 拼接
strings.ReplaceAll    // 替换
strings.TrimSpace     // 去空格
strings.ToLower       // 转小写
strings.ToUpper       // 转大写
strconv.Atoi          // string -> int
strconv.Itoa          // int -> string
[]byte(s)             // string -> []byte
string(bytes)         // []byte -> string
[]rune(s)             // 按 Unicode 字符处理
fmt.Sprintf           // 格式化字符串
strings.Builder       // 高效拼接
regexp                // 正则处理

### fmt：格式化字符串

> 打印

fmt.Printf()
fmt.Println()

> 拼接

result := fmt.Sprint("我的名字是", name, "，今年", age, "岁。")
fmt.Sprint(...)：直接拼接，参数间无空格
fmt.Sprintln(...)：拼接时，参数间默认加空格，末尾自动换行
fmt.Sprintf(format, ...)：按指定的格式化规则（如 %d、%s）拼接字符串


> 格式化字符串

```go
name := "Tom"
age := 18

s := fmt.Sprintf("name=%s, age=%d", name, age)
// "name=Tom, age=18"

// 常见格式：
%s // 字符串
%d // 整数
%f // 浮点数
%v // 默认格式
%+v // 结构体带字段名
%#v // Go 语法格式
```

### strings：字符串查找、切割、拼接、替换、大小写、去空格

> 判断包含、前缀、后缀

```go
s := "hello world"

strings.Contains(s, "world")     // true
strings.HasPrefix(s, "hello")    // true
strings.HasSuffix(s, "world")    // true
```

> 分割和拼接

```go
s := "a,b,c"

parts := strings.Split(s, ",")
// []string{"a", "b", "c"}

joined := strings.Join(parts, "-")
// "a-b-c"
```

> 替换字符串

```go
s := "hello go go"

r1 := strings.Replace(s, "go", "rust", 1)
// "hello rust go"

r2 := strings.ReplaceAll(s, "go", "rust")
// "hello rust rust"
```

> 去除空格或指定字符

```go
s := "  hello  "

strings.TrimSpace(s)        // "hello"
strings.Trim(s, " ")        // "hello"
strings.TrimPrefix(s, "  ") // "hello  "
strings.TrimSuffix(s, "  ") // "  hello"
```

> 大小写转换

```go
 s := "Hello Go"

strings.ToLower(s) // "hello go"
strings.ToUpper(s) // "HELLO GO"
```

> 查找位置

```go
s := "hello world"

strings.Index(s, "world") // 6
strings.Index(s, "go")    // -1
```

> 高效拼接字符串

```go
// 少量拼接可以直接用 +：

s := "hello" + " " + "go"

// 循环中大量拼接，推荐 strings.Builder：

var b strings.Builder

b.WriteString("hello")
b.WriteString(" ")
b.WriteString("go")

s := b.String()
// "hello go"
```

> 判断空字符串

```go

s := ""

if s == "" {
    // empty
}

// 如果想忽略空格：

if strings.TrimSpace(s) == "" {
    // empty or only spaces
}
```

> 比较

strings.EqualFold(x, y)
strings.ToLower(x) == strings.ToLower(y)

### strconv：字符串和数字、布尔值之间转换

> 用 fmt.Sprint。

  s := fmt.Sprint(123)      // "123"
  s = fmt.Sprint(3.14)      // "3.14"
  s = fmt.Sprint(uint64(9)) // "9"

> Unicode 码点转成字符

string(123)
把 123 当作 Unicode 码点转成字符

> strconv.Itoa   // int 转 string

strconv.Itoa(10)
Itoa 才是 integer to ASCII/string 的意思，作用是把 int 转成字符串

> 字符串和数字转换

```go
import "strconv"

i, err := strconv.Atoi("123")
// i = 123

s := strconv.Itoa(123)
// s = "123"


// 更通用的数字转换：
n, err := strconv.ParseInt("123", 10, 64)
s := strconv.FormatInt(123, 10)

f, err := strconv.ParseFloat("3.14", 64)
sf := strconv.FormatFloat(3.14, 'f', 2, 64)
// "3.14"

b, err := strconv.ParseBool("true")
sb := strconv.FormatBool(true)
// "true"
```

### unicode/utf8 / []rune：处理中文、emoji 等 Unicode 字符

> 字符串和字节切片转换

```go
s := "hello"

b := []byte(s)
// []byte{104, 101, 108, 108, 111}

s2 := string(b)
// "hello"

// 这在读写文件、网络数据、加密哈希时很常见。
```

> 字符串和 rune 转换

Go 的字符串底层是字节序列，通常是 UTF-8 编码。

```go
s := "你好"

len(s) // 6，因为 len 统计的是字节数

runes := []rune(s)
len(runes) // 2，因为 rune 表示 Unicode 字符

// 遍历字符串时，推荐：
for i, r := range "你好abc" {
    fmt.Println(i, r, string(r))
}

// 这里的 i 是字节下标，r 是 rune。
```

### regexp：正则匹配和替换

> 正则匹配和替换

```go
import "regexp"

re := regexp.MustCompile(`\d+`) // [0-9] 出现一次或多次

re.MatchString("abc123") // true。MatchString 不要求整个字符串都是数字，只要字符串里有一部分匹配就返回 true

result := re.ReplaceAllString("abc123def456", "#") // 把字符串里所有匹配 \d+ 的部分替换成 "#"
// "abc#def#"
```

### bytes.Buffer

var buf bytes.Buffer
buf.WriteString("hello")
fmt.Println(buf.String()) // hello

## == 比较

### 对于结构体的 ==，是值相等，还是地址相等？

Go 里结构体用 `==` 比较时，默认是值相等，不是地址相等。

例如：

```go
type User struct {
    ID   int
    Name string
}

a := User{ID: 1, Name: "Tom"}
b := User{ID: 1, Name: "Tom"}

fmt.Println(a == b) // true
```

虽然 `a` 和 `b` 是两个不同变量，但字段值一样，所以结果是 `true`。

如果你比较的是指针，那就是比较地址：

```go
a := &User{ID: 1, Name: "Tom"}
b := &User{ID: 1, Name: "Tom"}

fmt.Println(a == b) // false，不同地址
fmt.Println(*a == *b) // true，解引用后比较值
```

不过有一个重要限制：结构体的所有字段都必须是可比较的，结构体本身才能用 `==`。

可以比较：

```go
type User struct {
    ID   int
    Name string
}
```

不能比较：

```go
type User struct {
    ID   int
    Tags []string
}

a := User{ID: 1, Tags: []string{"go"}}
b := User{ID: 1, Tags: []string{"go"}}

fmt.Println(a == b) // 编译错误
```

因为 `slice`、`map`、`func` 不能直接用 `==` 比较。

总结：

```go
struct == struct     // 字段逐个比较，值相等
*struct == *struct   // 指针地址比较
*ptr1 == *ptr2       // 解引用后，字段值比较
```

如果结构体里有 slice/map，通常用：

```go
reflect.DeepEqual(a, b)
```

或者在新版本 Go 里对常见类型用 `slices.Equal`、`maps.Equal` 等。

### reflect.DeepEqual(a, b) slices.Equal maps.Equal

`reflect.DeepEqual` 是“通用深度比较”；`slices.Equal`、`maps.Equal` 是“类型明确时的专用比较”。一般优先用 `slices.Equal` / `maps.Equal`，只有类型复杂、未知或测试里临时比较时才用 `reflect.DeepEqual`。

官方文档：[`reflect.DeepEqual`](https://pkg.go.dev/reflect#DeepEqual)、[`slices.Equal`](https://pkg.go.dev/slices#Equal)、[`maps.Equal`](https://pkg.go.dev/maps#Equal)。

**1. reflect.DeepEqual(a, b)**

用法：

```go
package main

import (
    "fmt"
    "reflect"
)

func main() {
    a := []int{1, 2, 3}
    b := []int{1, 2, 3}

    fmt.Println(reflect.DeepEqual(a, b)) // true
}
```

它的特点是：可以比较很多 `==` 不能直接比较的东西，比如 `slice`、`map`、包含 `slice` 的结构体。

```go
type User struct {
    ID   int
    Tags []string
}

a := User{ID: 1, Tags: []string{"go", "java"}}
b := User{ID: 1, Tags: []string{"go", "java"}}

fmt.Println(reflect.DeepEqual(a, b)) // true
```

底层比较的实际内容大概是：

```go
reflect.DeepEqual(a, b)
```

要求：

```go
a 和 b 的动态类型必须完全相同
```

然后递归比较内部内容：

```go
int/string/bool/channel 等：用 ==
array：逐个元素深度比较
struct：逐个字段深度比较，包括未导出字段
slice：长度相同，并且元素逐个深度比较
map：长度相同，key 对应，value 深度比较
pointer：地址相同，或者指向的值深度比较
interface：里面装的具体值深度比较
func：只有两者都是 nil 才相等
```

几个容易踩坑的点：

```go
var a []int = nil
b := []int{}

fmt.Println(reflect.DeepEqual(a, b)) // false
```

`DeepEqual` 认为 `nil slice` 和空 slice 不相等。

```go
x := []int{1, 2}
y := []int{1, 2}

fmt.Println(reflect.DeepEqual(x, y)) // true
```

不同底层数组也没关系，只看内容。

```go
type User struct {
    ID int
}

a := User{ID: 1}
b := &User{ID: 1}

fmt.Println(reflect.DeepEqual(a, b)) // false，类型不同：User vs *User
```

还有 `NaN`：

```go
n := math.NaN()

fmt.Println(n == n)                  // false
fmt.Println(reflect.DeepEqual(n, n)) // false
```

`DeepEqual` 不是“语义相等”，更像“按 Go 规则递归比较”。

**2. slices.Equal(a, b)**

用法：

```go
package main

import (
    "fmt"
    "slices"
)

func main() {
    a := []int{1, 2, 3}
    b := []int{1, 2, 3}
    c := []int{1, 2, 4}

    fmt.Println(slices.Equal(a, b)) // true
    fmt.Println(slices.Equal(a, c)) // false
}
```

函数签名大概是：

```go
func Equal[S ~[]E, E comparable](s1, s2 S) bool
```

重点是 `E comparable`，也就是说元素类型必须能用 `==` 比较。

可以：

```go
slices.Equal([]int{1, 2}, []int{1, 2})
slices.Equal([]string{"a"}, []string{"a"})
```

不可以：

```go
slices.Equal([][]int{{1}}, [][]int{{1}}) // 编译错误
```

因为 `[]int` 本身不能用 `==` 比较。

底层比较的实际内容：

```go
len(a) == len(b)
a[0] == b[0]
a[1] == b[1]
...
```

它按索引顺序比较，遇到第一个不相等就返回 `false`。

注意这里和 `reflect.DeepEqual` 不同：

```go
var a []int = nil
b := []int{}

fmt.Println(slices.Equal(a, b)) // true
```

`slices.Equal` 认为 `nil slice` 和空 slice 相等，因为它只看长度和元素。

如果元素不是 comparable，或者你想自定义比较逻辑，用 `slices.EqualFunc`：

```go
a := []string{"Go", "Java"}
b := []string{"go", "java"}

ok := slices.EqualFunc(a, b, func(x, y string) bool {
    return strings.EqualFold(x, y)
})

fmt.Println(ok) // true
```

也可以用来比较结构体里的部分字段：

```go
type User struct {
    ID   int
    Name string
}

a := []User{{ID: 1, Name: "Tom"}}
b := []User{{ID: 1, Name: "Jerry"}}

ok := slices.EqualFunc(a, b, func(x, y User) bool {
    return x.ID == y.ID
})

fmt.Println(ok) // true
```

**3. maps.Equal(a, b)**

用法：

```go
package main

import (
    "fmt"
    "maps"
)

func main() {
    a := map[string]int{"go": 1, "java": 2}
    b := map[string]int{"java": 2, "go": 1}

    fmt.Println(maps.Equal(a, b)) // true
}
```

map 本身不能直接用 `==` 比较：

```go
a := map[string]int{"go": 1}
b := map[string]int{"go": 1}

fmt.Println(a == b) // 编译错误
```

所以用：

```go
maps.Equal(a, b)
```

函数签名大概是：

```go
func Equal[M1, M2 ~map[K]V, K, V comparable](m1 M1, m2 M2) bool
```

要求：

```go
key 类型必须 comparable
value 类型也必须 comparable
```

底层比较的实际内容：

```go
len(m1) == len(m2)
每个 key 都存在于另一个 map 中
对应 value 用 == 比较
```

map 顺序不重要：

```go
a := map[string]int{"a": 1, "b": 2}
b := map[string]int{"b": 2, "a": 1}

fmt.Println(maps.Equal(a, b)) // true
```

`nil map` 和空 map：

```go
var a map[string]int = nil
b := map[string]int{}

fmt.Println(maps.Equal(a, b)) // true
```

因为它们都没有任何 key/value pair。

如果 value 不是 comparable，比如 value 是 slice，就不能用 `maps.Equal`：

```go
a := map[string][]int{"x": {1, 2}}
b := map[string][]int{"x": {1, 2}}

fmt.Println(maps.Equal(a, b)) // 编译错误
```

这时用 `maps.EqualFunc`：

```go
a := map[string][]int{
    "x": {1, 2},
}
b := map[string][]int{
    "x": {1, 2},
}

ok := maps.EqualFunc(a, b, func(x, y []int) bool {
    return slices.Equal(x, y)
})

fmt.Println(ok) // true
```

注意：`maps.EqualFunc` 只自定义 value 的比较，key 仍然按 Go 的 map key 规则比较。

**三者区别总结**

```go
reflect.DeepEqual(a, b)
```

适合：

```go
测试代码
临时比较复杂结构
类型未知的 interface{} 数据
包含 slice/map 的结构体
```

缺点：

```go
运行时反射，性能较差
类型必须完全一致
nil slice != empty slice
语义有时不符合业务预期
```

```go
slices.Equal(a, b)
```

适合：

```go
比较两个 slice
元素可以用 == 比较
希望 nil slice 和空 slice 视为相等
```

底层就是：

```go
长度相同 + 每个元素 ==
```

```go
maps.Equal(a, b)
```

适合：

```go
比较两个 map
value 可以用 == 比较
希望 nil map 和空 map 视为相等
```

底层就是：

```go
key/value pair 集合相同 + value ==
```

实战建议：

```go
// slice
slices.Equal(a, b)

// map
maps.Equal(a, b)

// slice/map 元素需要自定义比较
slices.EqualFunc(a, b, eq)
maps.EqualFunc(a, b, eq)

// 复杂结构体、测试场景、懒得逐层写
reflect.DeepEqual(a, b)
```

如果是业务代码里判断“两个对象是否相同”，我更建议自己写 `Equal` 方法，因为业务相等经常不是字段完全相等：

```go
func (u User) Equal(other User) bool {
    return u.ID == other.ID
}
```

## 拷贝

### 值拷贝，会把struct中嵌套的struct也拷贝吗？

会。

在 Go 里，`struct` 是值类型。对一个 `struct` 做赋值、函数传参、函数返回时，会拷贝整个结构体的值。结构体里嵌套的结构体字段也会一起被拷贝。

例如：

```go
type Inner struct {
	N int
}

type Outer struct {
	I Inner
}

a := Outer{
	I: Inner{N: 1},
}

b := a
b.I.N = 2

fmt.Println(a.I.N) // 1
fmt.Println(b.I.N) // 2
```

这里 `b := a` 会把 `Outer` 拷贝一份，其中的 `Inner` 也被拷贝了，所以修改 `b.I.N` 不会影响 `a.I.N`。

但要注意：这不是“递归深拷贝所有底层数据”。如果结构体字段里有指针、slice、map、channel、func、interface 等引用型内容，拷贝的是这些引用本身，底层数据仍然可能共享。

例如：

```go
type Inner struct {
	Nums []int
}

type Outer struct {
	I Inner
}

a := Outer{
	I: Inner{Nums: []int{1, 2, 3}},
}

b := a
b.I.Nums[0] = 99

fmt.Println(a.I.Nums) // [99 2 3]
fmt.Println(b.I.Nums) // [99 2 3]
```

这里 `Inner` 被拷贝了，但 `Nums` 是 slice，拷贝的是 slice header，底层数组还是同一个。

总结：

- `struct` 字段是普通值，比如 `int`、`string`、数组、嵌套 `struct`：会被拷贝。
- 字段是 `pointer`、`slice`、`map`、`channel` 等：引用值会被拷贝，但指向的底层数据不会自动深拷贝。
- 所以 Go 的结构体赋值通常可以理解为“字段级值拷贝”，不是完整意义上的深拷贝。

## T 泛型

> 泛型函数，Type parameters 类型参数，

Go 函数可以使用类型参数来处理多种类型。函数的类型参数位于方括号内，在函数参数之前。

`func Index[T compatible](s []T, x T) int`

此声明表示 `s` 是满足内置约束 `comparable` 的任意类型 `T` 的切片。`x` 也是相同类型的值。

`comparable` 是一个有用的约束，它允许对 `T` 类型的值使用 `==` 和 `!=` 运算符。在本例中，我们使用它来将一个值与切片中的所有元素进行比较，直到找到匹配项。此 `Index` 函数适用于任何支持比较的类型。

```go
// Index returns the index of x in s, or -1 if not found.
func Index[T comparable](s []T, x T) int {
	for i, v := range s {
		// v and x are type T, which has the comparable
		// constraint, so we can use == here.
		if v == x {
			return i
		}
	}
	return -1
}

func main() {
	// Index works on a slice of ints
	si := []int{10, 20, 15, -10}
	fmt.Println(Index(si, 15)) // 2

	// Index also works on a slice of strings
	ss := []string{"foo", "bar", "baz"}
	fmt.Println(Index(ss, "hello")) // -1
}
```

> 泛型类型

除了泛型函数，Go 还支持泛型类型。类型可以使用类型参数进行参数化，这对于实现泛型数据结构非常有用。

以下示例演示了一个简单的单链表类型声明，该链表可以存储任何类型的值。

```go
// List represents a singly-linked list that holds
// values of any type.
type List[T any] struct {
	next *List[T]
	val  T
}

func main() {
}
```

> Go 里预声明的泛型约束基本就两个

Go 里预声明的泛型约束基本就两个：

```go
any
comparable
```

含义分别是：

```go
func F[T any](v T) {}
```

`any` 等价于：

```go
interface{}
```

表示任意类型。

```go
func F[T comparable](v T) {}
```

`comparable` 表示可以用 `==`、`!=` 比较的类型，比如：

```go
int
string
bool
pointer
channel
array of comparable elements
struct with comparable fields
```

不能用于：

```go
slice
map
func
struct containing slice/map/func
```

除此之外，Go 语言本身没有内置 `Integer`、`Float`、`Ordered` 这类预声明约束。

不过标准库里从 Go 1.21 开始有：

```go
cmp.Ordered
```

可以约束可排序类型：

```go
import "cmp"

func Min[T cmp.Ordered](a, b T) T {
	if a < b {
		return a
	}
	return b
}
```

`cmp.Ordered` 包括：

```go
integer types
floating-point types
string
```

总结：

```go
any          // 预声明，任意类型
comparable   // 预声明，可 == != 比较
cmp.Ordered  // 标准库约束，可 < <= > >= 排序，不是内置关键字
```

## 枚举

> 如何构建复杂枚举

1. `iota` 来自希腊字母 `iota`，英语里也有 “a tiny amount” 的意思。Go 里把它作为 `const` 声明中的递增计数器。

`iota` 的发音

常见英语发音是：

```text
/aiˈoʊtə/
```

近似读作：

```text
eye-OH-tuh
```

中文可以粗略记成：

```text
艾-欧-塔
```

你可以把它直接理解成：

```go
iota = 当前 const 块里的行号计数器，从 0 开始
```

例如：

```go
const (
    A = iota // 0
    B        // 1
    C        // 2
)
```

注意和 `strconv.Itoa` 区分：

```go
iota          // Go const 枚举计数器
strconv.Itoa // int to ASCII/string，把 int 转字符串
```

1. 每个枚举有多个字段，Go 里通常用“枚举值 + 元数据表”

Go 没有 Java 那种 enum class：

```java
enum Status {
    PENDING(1, "pending", "等待中")
}
```

Go 里更常见写法是：先定义枚举值，再用 `map` 或 `switch` 补充 `name`、`desc` 等信息。

例如：

```go
type Status int

const (
    StatusUnknown Status = iota
    StatusPending
    StatusRunning
    StatusDone
    StatusFailed
)

type StatusInfo struct {
    Code int
    Name string
    Desc string
}

var statusInfoMap = map[Status]StatusInfo{
    StatusUnknown: {0, "unknown", "未知状态"},
    StatusPending: {1, "pending", "等待中"},
    StatusRunning: {2, "running", "运行中"},
    StatusDone:    {3, "done", "已完成"},
    StatusFailed:  {4, "failed", "失败"},
}

func (s Status) Info() StatusInfo {
    if info, ok := statusInfoMap[s]; ok {
        return info
    }
    return statusInfoMap[StatusUnknown]
}

func (s Status) Code() int {
    return s.Info().Code
}

func (s Status) Name() string {
    return s.Info().Name
}

func (s Status) Desc() string {
    return s.Info().Desc
}
```

使用：

```go
status := StatusRunning

fmt.Println(status.Code()) // 2
fmt.Println(status.Name()) // running
fmt.Println(status.Desc()) // 运行中
```

如果 `code` 本身就是枚举值，可以更简单：

```go
type Status int

const (
    StatusUnknown Status = 0
    StatusPending Status = 1
    StatusRunning Status = 2
    StatusDone    Status = 3
    StatusFailed  Status = 4
)

func (s Status) Code() int {
    return int(s)
}
```

然后只维护 `name` 和 `desc`：

```go
type StatusInfo struct {
    Name string
    Desc string
}

var statusInfoMap = map[Status]StatusInfo{
    StatusUnknown: {"unknown", "未知状态"},
    StatusPending: {"pending", "等待中"},
    StatusRunning: {"running", "运行中"},
    StatusDone:    {"done", "已完成"},
    StatusFailed:  {"failed", "失败"},
}
```

如果你想更像 Java enum，也可以用 struct：

```go
type Status struct {
    Code int
    Name string
    Desc string
}

var (
    StatusPending = Status{1, "pending", "等待中"}
    StatusRunning = Status{2, "running", "运行中"}
    StatusDone    = Status{3, "done", "已完成"}
)
```

但这种方式有个缺点：它不是 `const`，而是变量，类型安全和不可变性都弱一些。

所以 Go 里更推荐：

```go
type Status int
const (...) // 定义枚举值
var map[...] // 补充元数据
```

这是最常见、最 Go 风格的写法。

## 并发

### goroutine

goroutine 是由 Go 运行时管理的轻量级线程。

go f(x, y, z)

启动一个新的 goroutine 运行

f(x, y, z)

f、x、y 和 z 的求值在当前 goroutine 中进行，而 f 的执行在新 goroutine 中进行。

goroutine 运行在相同的地址空间中，因此对共享内存的访问必须同步。sync 包提供了一些有用的原语，不过在 Go 中你通常用不到它们，因为还有其他原语可用

```go
func say(s string) {
	for i := 0; i < 5; i++ {
		time.Sleep(100 * time.Millisecond)
		fmt.Println(s)
	}
}

func main() {
	go say("world")
	say("hello")
}
```

### Channels

Channels 是一种类型化的管道，您可以使用通道运算符 `<-` 发送和接收值。

`ch <- v` // 将 v 发送到通道 ch。

`v := <-ch` // 从通道 ch 接收值，并且

// 将值赋给 v。

（数据沿箭头方向流动。）

与 map slice 类似，通道必须在使用前创建：

`ch := make(chan int)`

默认情况下，发送和接收操作会阻塞，直到另一端准备就绪。这使得 goroutine 无需显式锁或条件变量即可同步。

示例代码对切片中的数字求和，并将工作分配给两个 goroutine。一旦两个 goroutine 都完成了计算，它就会计算最终结果。

```go
func sum(s []int, c chan int) {
	sum := 0
	for _, v := range s {
		sum += v
	}
	c <- sum // send sum to c
}

func main() {
	s := []int{7, 2, 8, -9, 4, 0}

	c := make(chan int)
	go sum(s[:len(s)/2], c)
	go sum(s[len(s)/2:], c)
	x, y := <-c, <-c // receive from c

	fmt.Println(x, y, x+y)
}
```

解析：

`x, y := <-c, <-c` 这一行会从同一个 channel `c` 里接收两次。

这里 `c := make(chan int)` 创建的是无缓冲 channel，所以：

- `c <- sum` 会阻塞，直到有 goroutine 从 `c` 接收
- `<-c` 会阻塞，直到有 goroutine 向 `c` 发送

执行到这一行时：

```go
x, y := <-c, <-c
```

可以理解成近似这样：

```go
x = <-c
y = <-c
```

但注意实际赋值发生在右侧两个接收都完成之后；接收操作本身按从左到右执行。

流程是：

1. `main` 在第一个 `<-c` 等待。
2. 两个 `sum` goroutine 谁先算完并执行 `c <- sum`，谁就把值发给第一个 `<-c`。
3. 第一个值接收完成，成为 `x`。
4. `main` 继续执行第二个 `<-c`。
5. 等待另一个 `sum` goroutine 发送结果，接收后成为 `y`。

两个子切片分别是：

```go
s[:len(s)/2]   // 7, 2, 8      => 17
s[len(s)/2:]   // -9, 4, 0     => -5
```

所以输出可能是：

```go
17 -5 12
```

也可能是：

```go
-5 17 12
```

因为两个 goroutine 的完成顺序不确定。

关键点：`x, y := <-c, <-c` 会等待两次，直到从 `c` 中成功收到两个值。由于正好有两个 goroutine 各发送一次，所以不会死锁。


> Buffered Channels

通道可以进行缓冲。要初始化一个缓冲通道，请将缓冲区长度作为第二个参数传递给 `make` 函数：

`ch := make(chan int, 100)`

```go
func main() {
	ch := make(chan int, 2)
	ch <- 1
	fmt.Println("sent 1")
	ch <- 2
	fmt.Println("sent 2")
	ch <- 3 // deadlock!，因为没有接收，而buffer满了放不进去
	fmt.Println("sent 3")
	fmt.Println(<-ch)
	fmt.Println(<-ch)
}
```

> 用一个 channel 做“完成信号”

这段 Go 代码是在用一个 channel 做“完成信号”：

```go
done := make(chan struct{})

go func() {
    // do something
    close(done)
}()

<-done
```

含义是：主 goroutine 等待另一个 goroutine 执行完。

逐行看：

```go
done := make(chan struct{})
```

创建一个 channel，类型是 `struct{}`。

这里不用 `chan bool`，而是用 `chan struct{}`，因为这个 channel 不需要传递具体数据，只表示“某件事发生了”。`struct{}` 是空结构体，不占用额外存储空间，很适合作为纯信号。

```go
go func() {
    // do something
    close(done)
}()
```

启动一个新的 goroutine 执行任务。

任务完成后调用：

```go
close(done)
```

关闭 channel。关闭 channel 的一个重要效果是：所有正在等待从这个 channel 接收数据的 goroutine 都会被唤醒。

```go
<-done
```

当前 goroutine 阻塞在这里，直到 `done` 被关闭。

因为 `done` 没有发送任何值，所以这里接收的不是数据，而是等待“关闭信号”。

等价地，可以理解成：

```go
wait until background work is done
```

一个更完整的例子：

```go
package main

import (
    "fmt"
    "time"
)

func main() {
    done := make(chan struct{})

    go func() {
        fmt.Println("working...")
        time.Sleep(time.Second)
        fmt.Println("done")
        close(done)
    }()

    <-done
    fmt.Println("main exits")
}
```

输出大概是：

```text
working...
done
main exits
```

注意一点：`close(done)` 只能调用一次。多个 goroutine 同时关闭同一个 channel 会 panic。这个模式适合“一个 goroutine 完成后通知其他 goroutine”的场景。

> Range and Close

发送方可以关闭通道，表明不再发送任何值。接收方可以通过在接收表达式中设置第二个参数来测试通道是否已关闭：`v, ok := <-ch`

如果没有更多值要接收，并且通道已关闭，则 `ok` 为 false。

`for i := range c` 循环会重复从通道接收值，直到通道关闭。

注意：只有发送方才能关闭通道，接收方绝不能关闭。在已关闭的通道上发送数据会导致 panic。

另需注意：通道与文件不同；通常不需要关闭它们。只有当需要告知接收方没有更多值要接收时才需要关闭通道，例如终止范围循环。

```go
func fibonacci(n int, c chan int) {
	x, y := 0, 1
	for i := 0; i < n; i++ {
		c <- x
		x, y = y, x+y
	}
	close(c)
}

func main() {
	c := make(chan int, 10)
	go fibonacci(cap(c), c)
	for i := range c {
		fmt.Println(i)
	}
}
```

### Select

选择语句允许 goroutine 等待多个通信操作完成。

选择语句会阻塞，直到其中一个 case 可以执行，然后才会执行该 case。如果有多个 case 准备就绪，它会随机选择一个执行。

```go
func fibonacci(c, quit chan int) {
	x, y := 0, 1
	for {
		select {
		case c <- x:
			x, y = y, x+y
		case <-quit:
			fmt.Println("quit")
			return
		}
	}
}

func main() {
	c := make(chan int)
	quit := make(chan int)
	go func() {
		for i := 0; i < 10; i++ {
			fmt.Println(<-c)
		}
		quit <- 0
	}()
	fibonacci(c, quit)
}
```

> Default Selection

如果 select 语句中没有其他 case 准备就绪，则会执行默认 case。

使用默认 case 可以尝试发送或接收数据而不会阻塞：

select {
case i := <-c:
    // 使用 i
default:
    // 从 c 接收数据会阻塞
}

```go
func main() {
	start := time.Now()
	tick := time.Tick(100 * time.Millisecond)
	boom := time.After(500 * time.Millisecond)
	elapsed := func() time.Duration {
		return time.Since(start).Round(time.Millisecond)
	}
	for {
		select {
		case <-tick:
			fmt.Printf("[%6s] tick.\n", elapsed())
		case <-boom:
			fmt.Printf("[%6s] BOOM!\n", elapsed())
			return
		default:
			fmt.Printf("[%6s]     .\n", elapsed())
			time.Sleep(50 * time.Millisecond)
		}
	}
}
```

### sync.Mutex

我们已经了解了通道（channel）如何有效地促进 goroutine 之间的通信。

但如果我们不需要通信呢？如果我们只是想确保同一时间只有一个 goroutine 可以访问同一个变量，以避免冲突呢？

这种概念称为互斥，提供互斥的数据结构的通用名称是 mutex。

Go 标准库通过 sync.Mutex 及其两个方法实现了互斥：

Lock

Unlock

我们可以通过在代码块周围调用 Lock 和 Unlock 来定义一个互斥执行的代码块，如 Inc 方法所示。

我们还可以使用 defer 来确保互斥锁会被解锁，如 Value 方法所示。

```go
// SafeCounter is safe to use concurrently.
type SafeCounter struct {
	mu sync.Mutex
	v  map[string]int
}

// Inc increments the counter for the given key.
func (c *SafeCounter) Inc(key string) {
	c.mu.Lock()
	// Lock so only one goroutine at a time can access the map c.v.
	c.v[key]++
	c.mu.Unlock()
}

// Value returns the current value of the counter for the given key.
func (c *SafeCounter) Value(key string) int {
	c.mu.Lock()
	// Lock so only one goroutine at a time can access the map c.v.
	defer c.mu.Unlock()
	return c.v[key]
}

func main() {
	c := SafeCounter{v: make(map[string]int)}
	for i := 0; i < 1000; i++ {
		go c.Inc("somekey")
	}

	time.Sleep(time.Second)
	fmt.Println(c.Value("somekey"))
}
```

## 工具

### 时间：标准库 time 包

Go 里时间主要靠标准库 time 包，常见操作基本围绕 time.Time、time.Duration、格式化、解析、时区、定时器这几类

> 获取当前时间

```go
now := time.Now()

fmt.Println(now)           // 当前本地时间
fmt.Println(now.UTC())     // UTC 时间
fmt.Println(now.Unix())    // 秒级时间戳
fmt.Println(now.UnixMilli()) // 毫秒级时间戳
fmt.Println(now.UnixNano())  // 纳秒级时间戳
```

> 创建指定时间

```go
t := time.Date(
    2026, time.May, 24,
    15, 30, 0, 0,
    time.Local,
)
```

> 指定时区

```go
loc, err := time.LoadLocation("Asia/Shanghai")
if err != nil {
    panic(err)
}

t := time.Date(2026, 5, 24, 15, 30, 0, 0, loc)
```

> 格式化时间

Go 的时间格式化比较特殊，不是 YYYY-MM-DD，而是固定参考时间： "2006-01-02 15:04:05" -- 只能是这个时间不能改

```go
now := time.Now()

fmt.Println(now.Format("2006-01-02"))
fmt.Println(now.Format("2006-01-02 15:04:05"))
fmt.Println(now.Format("15:04:05"))
fmt.Println(now.Format(time.RFC3339))

// 常用格式：
const DateLayout = "2006-01-02"
const DateTimeLayout = "2006-01-02 15:04:05"
const CompactLayout = "20060102150405"
```

> 解析字符串为时间

```go
t, err := time.Parse("2006-01-02 15:04:05", "2026-05-24 15:30:00")
if err != nil {
    panic(err)
}

// 注意：time.Parse 默认按 UTC 解析。
// 如果要按本地或指定时区解析，用 ParseInLocation：

loc, _ := time.LoadLocation("Asia/Shanghai")

t, err := time.ParseInLocation(
    "2006-01-02 15:04:05",
    "2026-05-24 15:30:00",
    loc,
)
```

> 时间加减

```go
now := time.Now()

tomorrow := now.Add(24 * time.Hour)
yesterday := now.Add(-24 * time.Hour)

after10Min := now.Add(10 * time.Minute)
before30Sec := now.Add(-30 * time.Second)

按年月日加减：

nextMonth := now.AddDate(0, 1, 0)
nextYear := now.AddDate(1, 0, 0)
sevenDaysLater := now.AddDate(0, 0, 7)
```

> 时间差

```go
start := time.Now()

// do something

cost := time.Since(start)
fmt.Println(cost)
fmt.Println(cost.Milliseconds())
fmt.Println(cost.Seconds())
```

> 两个时间相减

```go
d := t2.Sub(t1)
fmt.Println(d.Hours())
```

> 计算距离未来某时间还有多久

```go
deadline := time.Now().Add(10 * time.Minute)
remaining := time.Until(deadline)
```

> 比较时间

```go
if t1.Before(t2) {
    fmt.Println("t1 更早")
}

if t1.After(t2) {
    fmt.Println("t1 更晚")
}

if t1.Equal(t2) {
    fmt.Println("两个时间相同")
}

// 不要直接用 == 比较业务时间，通常用 Equal 更合适。
```

> 获取年月日时分秒

```go
now := time.Now()

year := now.Year()
month := now.Month()
day := now.Day()

hour := now.Hour()
minute := now.Minute()
second := now.Second()

weekday := now.Weekday()

// 示例：
fmt.Println(year, int(month), day)
fmt.Println(hour, minute, second)
fmt.Println(weekday.String())
```

> 时间戳转时间

```go
t1 := time.Unix(1716535800, 0)              // 秒
t2 := time.UnixMilli(1716535800000)         // 毫秒
t3 := time.UnixMicro(1716535800000000)      // 微秒
```

> 转成本地时间或指定时区

```go
local := t1.Local()
utc := t1.UTC()

loc, _ := time.LoadLocation("Asia/Shanghai")
shanghai := t1.In(loc)
```

> Duration 常见用法

```go
d := 2*time.Hour + 30*time.Minute

fmt.Println(d.Hours())        // 2.5
fmt.Println(d.Minutes())      // 150
fmt.Println(d.Seconds())      // 9000
fmt.Println(d.Milliseconds()) // 9000000

// 解析 duration 字符串：
d, err := time.ParseDuration("1h30m")
if err != nil {
    panic(err)
}

fmt.Println(d)

// 支持类似：
"300ms"
"1.5h"
"2h45m"
"10s"
```

> Sleep 暂停

```go
time.Sleep(2 * time.Second)
```

> 定时器 Timer

```go
// 一次性触发：
timer := time.NewTimer(3 * time.Second)

<-timer.C
fmt.Println("3 秒后执行")

// 停止 timer：
timer := time.NewTimer(10 * time.Second)

if !timer.Stop() {
    <-timer.C
}

// 简单写法：
<-time.After(3 * time.Second)
fmt.Println("3 秒后执行")

// 不过在循环里大量使用 time.After 不太推荐，优先用 time.NewTimer 复用或显式控制。
```

> 周期任务 Ticker

```go
ticker := time.NewTicker(1 * time.Second)
defer ticker.Stop()

for t := range ticker.C {
    fmt.Println("tick:", t)
}

// 带退出控制：
ticker := time.NewTicker(1 * time.Second)
defer ticker.Stop()

done := time.After(5 * time.Second)

for {
    select {
    case t := <-ticker.C:
        fmt.Println("tick:", t)
    case <-done:
        fmt.Println("done")
        return
    }
}
```

> 时间取整

```go
now := time.Now()

fmt.Println(now.Round(time.Hour))    // 四舍五入到小时
fmt.Println(now.Truncate(time.Hour)) // 截断到小时

// 比如把时间归零到当天零点：

now := time.Now()

startOfDay := time.Date(
    now.Year(), now.Month(), now.Day(),
    0, 0, 0, 0,
    now.Location(),
)

// 常见坑

- Go 的格式化模板必须用 2006-01-02 15:04:05，不是 yyyy-MM-dd HH:mm:ss。
- time.Parse 默认用 UTC，业务里常用 time.ParseInLocation。
- time.Duration 本质是纳秒，表达长时间时要小心溢出。
- 时间比较优先用 Before、After、Equal。
- 循环中避免频繁 time.After，更推荐 Timer 或 Ticker。
- JSON 里的 time.Time 默认一般会编码成 RFC3339 格式，例如 "2026-05-24T15:30:00+08:00"。

// 一个常见业务例子：

package main

import (
    "fmt"
    "time"
)

func main() {
    loc, _ := time.LoadLocation("Asia/Shanghai")

    t, err := time.ParseInLocation(
        "2006-01-02 15:04:05",
        "2026-05-24 15:30:00",
        loc,
    )
    if err != nil {
        panic(err)
    }

    fmt.Println("原始时间:", t)
    fmt.Println("日期:", t.Format("2006-01-02"))
    fmt.Println("时间戳:", t.Unix())
    fmt.Println("一天后:", t.AddDate(0, 0, 1))
    fmt.Println("是否早于现在:", t.Before(time.Now()))
}
```

### 数值计算

rand.Intn(10)

## GC

### 逃逸分析

> v 虽然是函数里的局部变量，但 return &v 在 Go 中是合法且安全的

v的生命周期在函数里面，函数返回了，v的地址，也就是&v，还能生效吗？
func newValue() *int {
    v := 100
    return &v
}

答案：可以生效。

在 Go 里，局部变量不一定分配在栈上。编译器会做逃逸分析：如果发现 `v` 的地址被返回到函数外部使用，`v` 就会逃逸，通常会被分配到堆上，所以函数返回后 `&v` 仍然是有效的。

你的代码是安全的：

```go
func newValue() *int {
	v := 100
	return &v
}
```

调用：

```go
p := newValue()
fmt.Println(*p) // 100
```

不会出现 C/C++ 里那种“返回局部变量地址导致悬垂指针”的问题。

可以这样理解：

```go
func newValue() *int {
	v := 100 // 编译器发现 &v 要被返回
	return &v // v 逃逸到堆上
}
```

Go 的核心保证是：只要还有可达引用指向这个值，它就不会被回收。等以后没有任何变量再引用它了，垃圾回收器才可能回收。

你也可以用下面命令观察逃逸分析：

```bash
go build -gcflags="-m" main.go
```

通常会看到类似信息：

```text
moved to heap: v
```

所以结论是：`v` 虽然是函数里的局部变量，但 `return &v` 在 Go 中是合法且安全的。

