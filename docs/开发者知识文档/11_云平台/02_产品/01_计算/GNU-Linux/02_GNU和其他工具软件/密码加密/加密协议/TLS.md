
# Transport Layer Security

ssl是前辈，tls是现在主流，tls是基于tcp的上层协议

tls 1.0 1.1

tls 比 ssl 更新

## ssl/tls 历史

废弃
- ssl 2.0
- ssl 3.0
- tls 1.0
- tls 1.1

在用
- tls 1.2
- tls 1.3


## 使用方

- https = http + tls
- smtps = smtp + tls
- ftps = ftp + tls

ssh 没有使用 tls，而是使用了自己的加密协议

## tls 作用

- 认证 非对称加密
- 加密传输数据 对称加密
- 数据完整性

## tls 工作流程

### 总览

- 握手协议 -- 认证、key交换
  - 协商 tls协议版本 -- tls 1.2 1.3
  - 协商 AEAD 密码套件（含相关数据的认证加密）（cipher suites）
    - 对称加密算法
      - `AES-256-GCM`
      - `CHACHA20`
    - MAC算法（密码学的hash算法）
      - `GMAC`
      - `POLY1305`
  - 无需协商 Hash算法
    - `HMAC-SHA256`
  - 协商 非对称密钥交换算法 key exchange, trapdoor 一个方向容易，一个方向难
    - `Diffie-Hellman Ephemeral -- DHE`
    - `Elliptic Curve Diffie-Hellman Ephemeral -- ECDHE` -- 使用更短的key也能达到同样的安全等级，但更容易被量子计算攻击
    - `Supersingular isogeny Diffie-Hellman (SIDH)` -- 抵抗量子计算攻击
    - `RSA` -- tls 1.3 中删除了，没有向前兼容保密
  - 无需协商 密钥派生算法
    - `HMAC-based key derivation function （基于HMAC的密钥派生算法）（in tls 1.3）(HKDF)`
  - 发送两种密钥交换算法的 public key
    - DHE 生成的
    - ECDHE 生成的
  - 协商 非对称数字签名
    - `RSA with Probabilistic Signature Scheme (RSA-PSS)`
    - `Elliptic-Curve Digital Signature Algorithm (ECDSA)`
    - `Edwards-Curve Digital Signature Algorithm (EdDSA)`
  - 协商吗？ 非对称加密系统
    - `RSA with Optimal Asymmetric Encryption Padding (RSA-OAEP)`
    - `RSA with Public Key Cryptography Standard #1 (RSA-PKCS1-v2.2)`
    - `ElGamal Encryption`
  - 通过非对称加密做认证，公钥私钥签名验证算法+CA
  - 为对称加密的 共享的 secrect key（sk）-- key exchange -- 如果是非对称加密直接简单传递公钥即可
- 传输协议 -- 对称批量加密
  - 使用sk加密信息
  - 传输加密的信息
  - 验证信息没有被篡改
  - 使用sk解密信息

notes，为什么要使用两种加密方式
- 对称加密不能用来做认证，也就没法共享sk
- 非对称加密太慢了，没法用来快速加解密传输的数据，慢100-10000倍

### 握手协议 流程

#### key exchange -- 如何共享sk的同时防止泄漏

通过非对称加密算法（公钥加密算法）来实现
- Diffie-Hellman Ephemeral -- DHE
- Elliptic Curve Diffie-Hellman Ephemeral -- ECDHE

非对称加密算法（private key1） = public key1
非对称加密算法（private key2） = public key2

raw sk = 非对称加密算法（public key1，private key2）= 非对称加密算法（public key2，private key1）

密钥派生算法（raw sk）= sk -- 产生固定要求长度的 key
- HMAC-based 密钥派生算法 （in tls 1.3）

#### key derivation function （密钥派生算法）（KDF）

KDF算法
输入
- input key material -- IKM（就是 raw key）
- key length -- 想要的key长度，比如 128-bit
- hash算法 -- HMAC-SHA256
- info（可选）-- contenxt、app-specific
- salt（可选）
输出
- 指定长度的key（sk）

#### 临时key，完全向前保密（坚持计算攻击）

黑客根据公开信息长时间坚持计算出来了sk

perfect forward secrecy，完全向前保密
每个session都使用不同的private key来计算sk


### 传输协议流程

#### 对称加密概念

沟通tls协议 -- 保证协议一致
选择加密算法组 -- 保证算法一致
数据/sk/加密算法=加密数据 -- 加密数据/sk/解密算法=数据 -- 组合起来能够进行加解密

##### 认证对称加密（位翻转攻击）

背景：bit-flipping attack -- 

加密算法 AES-256-GCM or CHACHA20
- 输入
  - 数据
  - sk
  - Nonce 随机数，初始化的向量 IV
- 输出
  - 加密的数据

MAC算法 GMAC or POLY1305（密码学的hash算法）（MAC：message authentication code）
- 输入
  - 加密的数据
  - sk
  - Nonce 随机数，初始化的向量 IV
  - 相关数据（tls 1.3）（非加密，双方都知晓的信息）
    - 地址
    - 端口
    - 协议版本
    - 序列号
- 输出
  - MAC：message authentication code

组合
- 输入
  - 加密的数据
  - MAC：message authentication code
- 输出
  - 最终加密的数据

notes
- 加密算法和MAC算法是一一对应的配合使用关系
- 把MAC称之为认证标签
- tls 1.3 的加密流程叫做 AEAD（含相关数据的认证加密）(Authenticated Encryption with Associated Data)

##### 认证对称解密

组合
- 输入
  - 最终加密的数据
- 输出
  - 加密的数据
  - MAC：message authentication code

MAC算法 GMAC or POLY1305（密码学的hash算法）（MAC：message authentication code）（这个流程和加密的流程的mac算法是一致的）
- 输入
  - 加密的数据
  - sk
  - Nonce 随机数，初始化的向量 IV
  - 相关数据（tls 1.3）（非加密，双方都知晓的信息）
    - 地址
    - 端口
    - 协议版本
    - 序列号
- 输出
  - MAC：message authentication code

对比传过来的MAC和自己计算出来的MAC

加密算法 AES-256-GCM or CHACHA20
- 输入
  - 加密的数据
  - sk
  - Nonce 随机数，初始化的向量 IV
- 输出
  - 数据

#### 非对称加密概念

- 不需要密钥交换，直接使用公钥 -- 任何人都可以在不握手的情况下直接发送加密信息给对方
- 公钥和私钥的关系是trapdoor原理，一个方向简单一个方向难
- 基本逻辑
  - 使用公钥加密的可以使用私钥解密
  - 使用私钥签名的可以使用公钥验证

##### 数字认证（中间人偷换公钥）

###### 证书加密和解密原理

主要是为了确认：对方拥有私钥

加密过程
- 用hash算法处理数据data的到hash data
- 用私钥加密数据hash data得到signature
- data + signature

验证过程
- data 哈希得到 hash data
- signature 使用公钥解密得到 hash data
- 两个hash data一样即可

###### CA 机构

防止拿到黑客的公钥去加密数据发出去，黑客可以解密出数据

机构证书，CA Certificate Authority
- 名字、组织、email
- 公钥

信任CA非常重要，认证链
- 自签名 -> root CA
- root CA 签署 -> 中间CA
- 中间CA 签署 -> 最终证书

os和浏览器存储一系列的证书

###### CA 证书申请

- 创建 certificate signing request CSR
  - 名字、组织、email
  - 公钥
- 使用私钥签署CSR
- CA 验证身份和签名
- CA使用私钥签署证书

##### 交换公钥

- 发送证书 -- 包含公钥
- 使用CA公钥验证证书
- 使用up-CA公钥验证CA证书
- 使用root-CA公钥验证up-CA证书

##### 非对称认证加密

输入
- 数据
- 对方的公钥
输出
- 加密的数据

##### 非对称认证解密

输入
- 加密的数据
- 自己的私钥
输出
- 数据


## 命令行

```bash
openssl version

# 探测tls版本
openssl s_client -connect localhost:443 -tls1_2
```

## key exchange

- DH
- ECDH
- DHE
- ECDHE
- PSK

## 数据加密

- AES

## xxx

- HMAC


