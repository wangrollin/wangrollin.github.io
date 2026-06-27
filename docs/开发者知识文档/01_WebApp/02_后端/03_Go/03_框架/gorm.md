
## 常见用法

### 查一条 - first, take, last

```go
var model User

// 按主键升序取第一条，查不到会返回 gorm.ErrRecordNotFound
err := db.WithContext(ctx).First(&model, "id = ?", id).Error

// 不指定排序，取一条
err := db.WithContext(ctx).Take(&model, "id = ?", id).Error

// 按主键倒序取最后一条
err := db.WithContext(ctx).Last(&model).Error

// First、Take、Last 都会加 LIMIT 1。区别主要是排序语义不同：First 默认按主键升序，Last 默认按主键降序，Take 不强调顺序。
```

### 查多条 - find

```go
var models []User

err := db.WithContext(ctx).
    Where("status = ?", "active").
    Find(&models).Error

// 查多条一般用 Find(&slice)。如果结果为空，通常 Error 仍是 nil，只是 models 是空切片或长度为 0。
```

### 按条件查询

```go
// 精确匹配
var models []User

db.WithContext(ctx).Where("username = ?", username).Find(&models)

// 多条件 AND
db.WithContext(ctx).
    Where("status = ?", status).
    Where("age >= ?", minAge).
    Find(&models)

// OR 条件
db.WithContext(ctx).
    Where("status = ?", "active").
    Or("role = ?", "admin").
    Find(&models)

// IN 查询
db.WithContext(ctx).
    Where("id IN ?", []uint{1, 2, 3}).
    Find(&models)
```

### 用 struct 或 map 查询

```go
// struct 查询：零值字段通常不会参与条件，例如 0、""、false
db.WithContext(ctx).Where(&User{Name: "Tom"}).Find(&models)

// map 查询：可以明确表达零值
db.WithContext(ctx).Where(map[string]any{
    "age":    0,
    "status": "active",
}).Find(&models)

// 注意：Where(&Struct{}) 会忽略零值字段，这个点很容易踩坑。如果需要查询 age = 0、enabled = false 这类条件，用 map 或显式 SQL 条件更清楚。
```

### 指定字段

```go
type UserSummary struct {
    ID   uint
    Name string
}

var users []UserSummary

err := db.WithContext(ctx).
    Model(&User{}).
    Select("id", "name").
    Where("status = ?", "active").
    Scan(&users).Error

// 如果不是完整实体，通常用 Select + Scan 到专门的结果结构体里。
```

### 排序、分页、限制数量

```go
var models []User

err := db.WithContext(ctx).
    Where("status = ?", "active").
    Order("created_at DESC").
    Limit(pageSize).
    Offset((pageNum - 1) * pageSize).
    Find(&models).Error

// 常见分页就是 Limit + Offset。如果还需要总数，一般再查一次 Count。

var total int64

err := db.WithContext(ctx).
    Model(&User{}).
    Where("status = ?", "active").
    Count(&total).Error
```

### 查询某个字段列表

```go
var names []string

err := db.WithContext(ctx).
    Model(&User{}).
    Where("status = ?", "active").
    Pluck("name", &names).Error

// Pluck 适合只取单列，比如 ID 列表、名称列表。
```

### 关联查询：Preload

```go
var users []User

err := db.WithContext(ctx).
    Preload("Orders").
    Where("status = ?", "active").
    Find(&users).Error

// Preload 是预加载关联数据，通常会额外发 SQL 查询关联表。适合实体有关联字段，比如 User 里有 Orders []Order。
```

### Join 查询

```go
type UserOrderRow struct {
    UserID    uint
    UserName  string
    OrderID   uint
    OrderCode string
}

var rows []UserOrderRow

err := db.WithContext(ctx).
    Table("users").
    Select("users.id AS user_id, users.name AS user_name, orders.id AS order_id, orders.code AS order_code").
    Joins("JOIN orders ON orders.user_id = users.id").
    Where("users.status = ?", "active").
    Scan(&rows).Error

// 复杂列表页、报表、跨表筛选时，Joins + Select + Scan 往往比硬塞进实体关联更清晰。
```

### 原生 SQL

```go
var rows []UserOrderRow

err := db.WithContext(ctx).
    Raw(`
        SELECT users.id AS user_id, users.name AS user_name, orders.id AS order_id
        FROM users
        JOIN orders ON orders.user_id = users.id
        WHERE users.status = ?
    `, "active").
    Scan(&rows).Error

// 当 ORM 链式表达变得绕、SQL 语义更清楚时，可以用 Raw + Scan。
```

### 错误处理

```go
var model User

err := db.WithContext(ctx).First(&model, "id = ?", id).Error
if errors.Is(err, gorm.ErrRecordNotFound) {
    return nil, nil
}
if err != nil {
    return nil, err
}

return &model, nil


// 一个比较常用的 repository 查询模板是：
func (repository *GormUserRepository) GetByID(ctx context.Context, id uint) (*UserModel, error) {

    var model UserModel

    err := repository.db.WithContext(ctx).
        First(&model, "id = ?", id).
        Error
    if errors.Is(err, gorm.ErrRecordNotFound) {
        return nil, nil
    }
    if err != nil {
        return nil, err
    }

    return &model, nil
}
```
