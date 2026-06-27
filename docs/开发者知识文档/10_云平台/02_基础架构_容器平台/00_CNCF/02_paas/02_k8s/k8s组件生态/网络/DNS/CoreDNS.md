
## Q&A

### k8s coreDNS的作用是什么？用来解决什么问题的？底层原理是什么样子的？

⏺ Kubernetes CoreDNS

  作用

  CoreDNS 是 Kubernetes 集群内置的 DNS 服务器，负责服务发现——让 Pod 能通过名字（而非
  IP）找到其他 Service。

  解决什么问题

  Kubernetes 中 Pod 和 Service 的 IP 是动态分配的，随时可能变化。如果硬编码 IP：
  - Service 重建后 ClusterIP 变了，调用方全部失效
  - Pod 扩缩容后 IP 不可预测

  CoreDNS 提供稳定的 DNS 名称映射，例如：
  my-svc.my-namespace.svc.cluster.local  →  10.96.0.100 (ClusterIP)

  这样 Pod 内直接用 http://my-svc 或 http://my-svc.my-namespace 访问即可，无需关心 IP。

  底层原理

  1. 部署方式

  - 以 Deployment 形式运行在 kube-system 命名空间（通常 2 个副本）
  - 前面挂一个固定 ClusterIP 的 Service（一般是 10.96.0.10）

  2. 每个 Pod 怎么知道去问 CoreDNS

  kubelet 创建 Pod 时，自动把 /etc/resolv.conf 写成：
  nameserver 10.96.0.10       # CoreDNS 的 Service IP
  search default.svc.cluster.local svc.cluster.local cluster.local
  所以 Pod 内所有 DNS 查询默认都发给 CoreDNS。

  3. CoreDNS 怎么知道 Service 和 Pod 的映射

  - CoreDNS 通过 kubernetes 插件 watch kube-apiserver
  - 监听 Service、Endpoint、Pod 等资源的变化事件
  - 在内存中维护一张 DNS 记录表，实时更新

  4. 解析流程

  Pod 发起 DNS 查询 "my-svc.default.svc.cluster.local"
          │
          ▼
    CoreDNS 收到请求
          │
          ▼
    匹配 kubernetes 插件 → 查内存中的 Service 记录
          │
          ▼
    返回 ClusterIP（A 记录）给 Pod

  5. 支持的 DNS 记录类型

  ┌─────────┬─────────────────────────────────────────┬─────────────────────────────────┐
  │  类型   │                  格式                   │              示例               │
  ├─────────┼─────────────────────────────────────────┼─────────────────────────────────┤
  │ 普通    │ <svc>.<ns>.svc.cluster.local            │ A 记录 → ClusterIP              │
  │ Service │                                         │                                 │
  ├─────────┼─────────────────────────────────────────┼─────────────────────────────────┤
  │ Headles │                                         │                                 │
  │ s       │ 同上                                    │ A 记录 → 直接返回所有 Pod IP    │
  │ Service │                                         │                                 │
  ├─────────┼─────────────────────────────────────────┼─────────────────────────────────┤
  │ Pod     │ <pod-ip-dashed>.<ns>.pod.cluster.local  │ 10-244-1-5.default.pod.cluster. │
  │         │                                         │ local                           │
  ├─────────┼─────────────────────────────────────────┼─────────────────────────────────┤
  │ SRV     │ _<port>._<proto>.<svc>.<ns>.svc.cluster │ 返回端口+地址                   │
  │ 记录    │ .local                                  │                                 │
  └─────────┴─────────────────────────────────────────┴─────────────────────────────────┘

  6. 集群外域名

  CoreDNS 的 forward 插件 把非集群域名（如 google.com）转发给上游 DNS（通常是节点的
  /etc/resolv.conf 中配置的 DNS）。

  7. 配置

  通过 ConfigMap coredns（在 kube-system）管理，核心配置（Corefile）示例：
  .:53 {
      kubernetes cluster.local in-addr.arpa ip6.arpa {
          pods insecure
          fallthrough in-addr.arpa ip6.arpa
      }
      forward . /etc/resolv.conf
      cache 30
      loop
      reload
      loadbalance
  }

  一句话总结

  CoreDNS = 集群内的 DNS 服务器，watch apiserver 实时维护 Service→IP 映射，让 Pod
  用服务名就能互相访问，解决了动态 IP 环境下的服务发现问题。
