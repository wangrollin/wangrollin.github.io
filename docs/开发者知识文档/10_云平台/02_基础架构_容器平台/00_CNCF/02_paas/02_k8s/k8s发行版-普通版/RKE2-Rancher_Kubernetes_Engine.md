
- [rke2 离线安装](https://docs.rke2.io/zh/install/airgap)

## 修改 rke2 ingress 默认端口的方法

kubectl edit daemonset rke2-ingress-nginx-controller -n kube-system
执行命令后在文件中找到hostPort: 80改为12345即可