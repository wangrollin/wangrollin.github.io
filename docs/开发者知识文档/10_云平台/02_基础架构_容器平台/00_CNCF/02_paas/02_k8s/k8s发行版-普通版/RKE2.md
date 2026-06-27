
# Rancher_Kubernetes_Engine

## 在线安装

https://docs.rancher.cn/docs/rke2/install/quickstart/index.html

```bash
sudo su -
curl -sfL https://rancher-mirror.rancher.cn/rke2/install.sh | INSTALL_RKE2_MIRROR=cn sh -
systemctl enable rke2-server.service
systemctl start rke2-server.service
systemctl status rke2-server.service
journalctl -u rke2-server -f

# containerd 改源
vim /etc/rancher/rke2/registries.yaml

mirrors:
  docker.io:
    endpoint:
      - "https://docker.m.daocloud.io"

systemctl restart rke2-server.service
systemctl status rke2-server.service
journalctl -u rke2-server -f
```

**查看日志**
journalctl -u rke2-server -f

**bin目录在这里**
/var/lib/rancher/rke2/bin/
echo 'export PATH="$PATH:/var/lib/rancher/rke2/bin"' >> ~/.bashrc

**配置kubeconfig**
sudo chmod 644 /etc/rancher/rke2/rke2.yaml
echo 'export KUBECONFIG=/etc/rancher/rke2/rke2.yaml' >> ~/.bashrc

**防火墙放行 6443**
sudo firewall-cmd --add-port=6443/tcp --permanent
sudo firewall-cmd --reload

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

## 常见问题

### etcd

⏺ etcd 在 RKE2 中的角色

  一句话回答

  etcd 是 Kubernetes 的唯一数据库，存储整个集群的所有状态。

  存了什么

  etcd 里的数据 ≈ 你用 kubectl 能看到的一切

  - 所有 Pod、Deployment、Service、ConfigMap、Secret 的定义
  - 节点信息、RBAC 权限规则
  - 调度决策、Lease（领导选举）
  - 自定义资源（CRD 数据）

#### etcd 的 IP 选择逻辑

  RKE2 中的默认行为

  RKE2 启动时，如果你没有指定 node-ip，它会使用 Go 的 net.InterfaceAddrs() 获取**第一个非回环地址（non-loopback）**的 IP，这个选择：

  - 取决于网卡的枚举顺序（通常是 eth0 / ens3 等编号最小的）
  - 不可预测，尤其在多网卡、重启后网卡顺序可能变化的环境下

  明确指定 IP

  在 /etc/rancher/rke2/config.yaml 中：

```yaml
# 指定 etcd 和节点通信使用的 IP
node-ip: "10.0.1.100"

# 如果需要双栈（IPv4 + IPv6）：
node-ip: "10.0.1.100,fd00::100"
```

  在运行 RKE2 安装脚本之前，先创建好配置文件：

```bash
# 1. 创建配置目录
mkdir -p /etc/rancher/rke2

# 2. root权限
sudo su -

# 3. 写入配置（替换为你的实际 IP）
cat > /etc/rancher/rke2/config.yaml <<EOF
node-ip: "10.0.1.100"
tls-san:
  - "10.0.1.100"
  - "my-server.example.com"
EOF
```

