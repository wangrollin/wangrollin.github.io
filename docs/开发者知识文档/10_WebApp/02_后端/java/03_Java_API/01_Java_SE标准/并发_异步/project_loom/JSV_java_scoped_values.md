
- 在线程内部或者跨越线程分享value


## 网页

- [官网 doc](https://openjdk.org/jeps/446#Inheriting-scoped-values)
- [github]()
- 


## 概念

- 在子线程之间共享，自动向下传播
- 不可变的值 -- 安全高效，内存占用小，不需要复制
- 在scope 结束时删除，减少泄漏风险

vt 会减少 jtl 的泄漏风险，因为vt 是短命的，vt 结束时 jtl 会自动删除
但是由于 thread local 的复制继承方式在遇到 virtual thread的时候会被放大，所以需要一个新的配合 vt 的方式，也就是 JSV


