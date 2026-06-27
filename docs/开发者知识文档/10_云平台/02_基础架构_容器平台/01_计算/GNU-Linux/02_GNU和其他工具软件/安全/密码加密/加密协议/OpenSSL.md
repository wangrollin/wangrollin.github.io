
# secure sockets layer

ssl 3.0 -- 不安全的

openssl version

ssl/tls 证书

## key exchange

KEA

## 数据加密

不安全的
- DES
- RC4

## xxx

不安全的
- MAC

## Q&A

### 如何在 rockylinux上安装 openssl，这个起到了什么作用？

⏺ Rocky Linux 上安装 OpenSSL

  安装命令：

  # 安装 OpenSSL 库和命令行工具
  sudo dnf install openssl openssl-devel

  # 验证安装
  openssl version

  - openssl — 提供命令行工具和运行时库
  - openssl-devel — 提供头文件和开发库（编译依赖 OpenSSL 的软件时需要）

  OpenSSL 的作用：

  1. TLS/SSL 加密 — 为 HTTPS、SSH、邮件等网络通信提供加密支持
  2. 证书管理 — 生成、签发、验证 X.509 证书（自签证书、CSR 等）
  3. 加密工具 — 提供哈希（SHA256）、对称加密（AES）、非对称加密（RSA/EC）等算法
  4. 底层依赖 — 大量软件（Nginx、Apache、Python、curl、Node.js 等）依赖它提供加密能力

