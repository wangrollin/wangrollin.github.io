# 2FA, Time-based One-time Password TOTP algorithm

## 网页

- [双因素认证（2FA）教程](https://www.ruanyifeng.com/blog/2017/11/2fa-tutorial.html)

密码 + TOTP

## 常用 totp app

- google authenticator
  - wiki https://github.com/google/google-authenticator/wiki
- duo

## 流程

### server 生成 sk

time based
account: test@bytedance.com
sk: aaaaaaaaaaaaaaaa

Base32 string
16位英文字符

### 存储到 2fa app

#### uri格式

otpauth://totp/john.doe@email.com?secret=HXDMVJECJJWSRB3HWIZR4IFUGFTMXBOZ

otpauth://totp/org_name:john.doe@email.com?secret=HXDMVJECJJWSRB3HWIZR4IFUGFTMXBOZ&issuer=org_name&algorithm=SHA1&digits=6&period=30

默认参数
- algorithm=SHA1
- digits=6
- period=30

#### 生成二维码

pip install qr
qr "otpauth://totp/john.doe@email.com?secret=HXDMVJECJJWSRB3HWIZR4IFUGFTMXBOZ"


### 生成 QR url


### 验证 totp

AuthenticationProvider

check verification token

user.sk -> totp

```java
hash(sk，time) == 2fa code
or
new totp(sk).verify(token)
```


