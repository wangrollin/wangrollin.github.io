
## 网页

- [官网](https://go.dev/)
- [a tour of Go](https://go.dev/tour/list)
- [gobyexample](https://gobyexample-cn.github.io/)
- [煎鱼golang](https://eddycjy.com/)
- [最佳规范实践](https://google.github.io/styleguide/go/best-practices)

## 安装

```bash
brew install go
go version
```


## Q&A

### package main 不一定要存在

  如果这个 module 是一个可执行程序，才需要有 package main，并且里面要有：

  func main() {
  }

  应用程序 module：通常有 package main
  库 module：可以没有 package main


