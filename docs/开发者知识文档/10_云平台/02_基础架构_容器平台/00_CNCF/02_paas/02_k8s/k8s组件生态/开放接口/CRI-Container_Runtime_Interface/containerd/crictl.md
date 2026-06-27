
crictl vs nerdctl：crictl 只能查看/调试 K8s 管理的容器，nerdctl 能操作 containerd 中所有容器（包括非 K8s 的）。日常排障 crictl 够用

```bash
which crictl
crictl --version
```
