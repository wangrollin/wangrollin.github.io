
从k8s容器编排的视角定义标准

Container Runtime实现了CRI gRPC Server，包括RuntimeService和ImageService。该gRPC Server需要监听本地的Unix socket，而kubelet则作为gRPC Client运行。

CRI中定义了容器和镜像的服务的接口，基于gRPC。
