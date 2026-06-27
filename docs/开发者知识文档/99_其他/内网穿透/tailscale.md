
## 常见网页

- [官网](https://tailscale.com/)
- [官网文档](https://tailscale.com/docs/install)
- [github](https://github.com/tailscale/tailscale)
- [群晖nas安装tailscale](https://zhuanlan.zhihu.com/p/616014772)

## 安装

https://tailscale.com/docs/install/linux

curl -fsSL https://tailscale.com/install.sh | sh
sudo tailscale up

## 检修

```bash
tailscale ping node1
tailscale ping --until-direct node1

# 检查是否是easy net，两端都是false，最好，都是true，就没戏 p2p
tailscale netcheck

重启 tailscale 的时候，会触发重新打洞p2p
```

```bash
# 先重启 tailscale
tailsacle disconnect & connect

# 重新打洞
tailscale ping --until-direct node1
```

## QA

### --until-direct 作用是什么

⏺ 这个命令的作用是 持续 ping 目标节点，直到建立直连（P2P）连接为止。

  具体行为：

  1. 先通过 Tailscale 的 DERP 中继服务器 发送 ping
  2. 同时尝试在两台机器之间打洞（NAT traversal），建立直接的点对点连接
  3. 一旦成功建立 直连，命令就会退出

  输出大致如下：

  pong from node1 (100.x.y.z) via DERP(tok) in 45ms
  pong from node1 (100.x.y.z) via DERP(tok) in 43ms
  pong from node1 (100.x.y.z) via 192.168.1.5:41641 in 2ms   # 直连成功，退出


