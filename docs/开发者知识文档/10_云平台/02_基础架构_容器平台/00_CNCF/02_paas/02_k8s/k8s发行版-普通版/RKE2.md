
# Rancher_Kubernetes_Engine

## 在线安装

https://docs.rke2.io/zh/install/quickstart#2-%E5%90%AF%E7%94%A8-rke2-server-%E6%9C%8D%E5%8A%A1

```bash
sudo su -
curl -sfL https://rancher-mirror.rancher.cn/rke2/install.sh | INSTALL_RKE2_MIRROR=cn sh -
systemctl enable rke2-server.service
systemctl start rke2-server.service
```

## 离线安装

- [rke2 离线安装](https://docs.rke2.io/zh/install/airgap)

- [安装包](https://github.com/rancher/rke2/releases)


**放置离线包**
mkdir -p /var/lib/rancher/rke2/agent/images/

rke2-images-canal.linux-amd64.tar.zst
rke2-images-core.linux-amd64.tar.zst
sha256sum-amd64.txt

**安装 rke2 命令**
rke2.linux-amd64.tar.gz

mv rke2 /usr/local/bin/
chmod +x /usr/local/bin/rke2
echo "export PATH=$PATH:/usr/local/bin">> ~/.bashrc
source ~/.bashrc

**install.sh**
curl -sfL https://get.rke2.io --output install.sh


## 修改 rke2 ingress 默认端口的方法

kubectl edit daemonset rke2-ingress-nginx-controller -n kube-system
执行命令后在文件中找到hostPort: 80改为12345即可

