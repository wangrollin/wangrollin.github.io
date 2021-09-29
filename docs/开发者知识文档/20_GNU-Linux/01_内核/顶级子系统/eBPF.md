
# extended Berkeley Packet Filter

## 简介

2014 年 6 月，eBPF 扩展到用户空间，这也成为了 BPF 技术的转折点。 正如 Alexei 在提交补丁的注释中写到：“这个补丁展示了 eBPF 的潜力”。当前，eBPF 不再局限于网络栈，已经成为内核顶级的子系统。eBPF 程序架构强调安全性和稳定性，看上去更像内核模块，但与内核模块不同，eBPF 程序不需要重新编译内核，并且可以确保 eBPF 程序运行完成，而不会造成系统的崩溃。

内核观测技术


## 前身：网络数据包过滤技术

Berkeley Packet Filter

经典 BPF，缩写 cBPF（classic BPF），cBPF 现在已经基本废弃


## 网页

- [官网](https://ebpf.io/zh-cn/)
- [eBPF 概念和基本原理](https://blog.fleeto.us/post/what-is-ebpf/)
- [eBPF 技术简介](https://cloudnative.to/blog/bpf-intro/)

