
sudo yum install podman

命令兼容 docker

由 red hat 开发，

- [redhat podman 官方文档](https://www.redhat.com/zh/topics/containers/what-is-podmanr)


Podman Desktop，适合本地开发
https://www.redhat.com/zh/topics/containers/what-is-podman-desktop

https://podman.io/

https://github.com/containers/podman


podman 项目对标的是docker命令的代替，官方说明是A tool for managing OCI containers and pods
 buildah项目实现的是dockerfile的脚本化执行，官方说明是A tool that facilitates building OCI images
skopeo 项目负责处理镜像相关的工作，比如检查、复制、签名，官方说明是Work with remote images registries - retrieving information, images, signing content


在Centos 8中，已经不适用docker作为默认的容器化工具，替代品也就是使用podman、buildah、skopeo。

