
## Operator 模式

- [operatorhub](https://operatorhub.io/)
- [Introducing Operators: Putting Operational Knowledge into Software](https://web.archive.org/web/20170129131616/https://coreos.com/blog/introducing-operators.html)


## 解决的问题

- 有状态 app 的运维工作，不能简单的重启扩容，还有领域知识
- yaml hell，无法很好管理 yaml


## 关键概念

- custom resource -- CR<x> -- 代表了 x 的配置情况
- controller -- Operator<x> -- 负责实现配置的表述，始终为 true

Operator<x> 注册一个监听器到 k8s api
CR<x> 改变 -> k8s api 通知 Operator<x> -> Operator<x> 做动作


