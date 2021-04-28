
## 最佳实践

> 类型

- slice
- channel
- interface

> 并发

- CSP
- context
- web服务端模型

> 性能分析

- profile
- GC & GCDebug
- trace

```bash
export GODEBUG=gctrace=1
export GOGC=100 # 当内存分配到了上次gc后内存的1+100%，也就是2倍的时候，触发gc
```

> 高效代码

sync.Pool

> 资料

- 《The Go Programming Language》
- github.com/golang/go/wiki
- golang.org

