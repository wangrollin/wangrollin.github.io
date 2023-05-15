
# OCI - Open Container Initiative 一个开源的共同维护的容器技术标准

docker和其他主要参与者共同发起的标准

## OCI 标准

- OCI image specification -- image-spec
  - image manifest
  - image configuration
  - filesystem serializations
- OCI distribution specification -- distribution-spec
- OCI runtime specification -- runtime-spec

## 网页

- [官网](https://opencontainers.org/)
- [github](https://github.com/opencontainers)




image format 演变路线
- container images layers
- **docker image format**
- open containers initiative -- OCI
- **OCI image specification**

docker image format 和 OCI image specification 相似度99%，被各种容器引擎和registry兼容

cli/api//daemon runtime/image registry是有标准控制的。docker cli、docker rest api 没有开源标准，也不遵循 OCI
Dockershim translates CRI requests to Docker REST based requests （in k8s）。Docker 和 Mirantis 共同决定继续以 cri-dockerd 的形式支持 dockershim 代码。也就是说之前 dockershim 由 k8s 维护，现在由 docker 维护

