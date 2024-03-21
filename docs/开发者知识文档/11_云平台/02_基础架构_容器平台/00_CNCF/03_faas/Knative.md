
KNative是谷歌开源的 serverless 架构方案，旨在提供一套简单易用的 serverless 方案，把 serverless 标准化。

- [官网](https://knative.dev/docs/)
- [github](https://github.com/knative)

https://cloudnative.to/blog/knative-overview/

## 架构

route
activator
deploy-pod
autoscaler

## CRD

service
- route
- configuration

kubectl get ksvc knative-helloworld -oyaml


Service、Route、Configuration 和 Revision。Revision 是不变的并且只能经由 Configuration 改变而被创建。您可以分别单独创建 Configuration 和 Route，或者把它们组合在一起并定义为一个 Service。理解 Serving 组件的这些构建块是使用 Knative 的基础。您部署的应用均需要一个 Service 或者 Configuration 以在 Knative 中作为容器运行。
