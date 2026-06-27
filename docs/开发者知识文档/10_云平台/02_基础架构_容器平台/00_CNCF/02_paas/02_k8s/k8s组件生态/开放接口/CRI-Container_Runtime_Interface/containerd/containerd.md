

## 网站

- [官网](https://containerd.io/)
- [github](https://containerd.io/)

## 命令工具 ctr

  简单记忆

  - ctr — 底层瑞士军刀，功能全但难用，一般只在调试 containerd 本身时用
  - crictl — K8s 运维专用，排查 Pod/容器问题时用（替代以前的 docker ps）
  - nerdctl — 想要 Docker 体验但不装 Docker 时用，日常开发首选

  在 RKE2 环境中，最常用的是 crictl（排查 K8s 问题）和 ctr（手动导入镜像等底层操作）。nerdctl 一般不预装，需额外安装。



