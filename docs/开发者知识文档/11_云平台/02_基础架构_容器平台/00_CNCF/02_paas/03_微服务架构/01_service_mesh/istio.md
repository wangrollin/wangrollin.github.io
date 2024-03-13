

2017年，google IBM Lyft 宣布Istio诞生。它以Envoy作为数据面。


## pod

- 业务逻辑
- sidecar proxy
  - 通信配置
  - 安全机制
  - 重试机制
  - 打点
  - 链路跟踪

## 机制

control plane 会自动注入 sidecar，不需要业务配置

### 配置

配置 istio 不需要关注 deploy yaml，配置是单独的
-  可以使用 k8s yaml 来配置 istio，因为使用了 crd

关键配置
- virtual service yaml
  - 如何路由流量到目的地
- destination rule yaml
  - 到了目的地之后怎么做

生效流程
- 创建 crd
- istiod 把抽象规则转换成 envoy 的具体配置
- 传送具体配置给 envoy

### 控制面 control plane

istiod

包含组件
- Pilot
  - 配置
  - 服务注册和发现
- Citadel
  - 认证
- Galley
  - 配置

功能
- 配置
- 发现
- 认证

### 数据面 data plane

使用了 envoy 作为 sidecar proxy


## 核心特性

### traffic splitting / 灰度部署

灰度控制，10%流量到新的服务上面

### 服务注册和发现

会自动注册服务

### 安全

Citadel 会作为 ca，为服务见通信创建 tls

### 打点 & 链路跟踪

自动从 envoy 收集数据，和 promethus 联合起来，提供开箱即用的效果

### istio ingress gateway

nginx ingress controller 的替代品


## problem set

- 通信
  - 微服务之间需要通信
- 安全
  - 内部通讯是不安全的协议
  - 任何服务可以访问任何服务