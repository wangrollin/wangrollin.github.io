# JSON Web Token (JWT)

## 网站

[官网](https://jwt.io/)


## 本质

本质上解决了一个，服务器有个令牌，丢给client，client再扔回来，能够判断这个令牌是否被篡改

因为token是放在header里面的，所以Cross-Origin Resource Sharing (CORS)也没有关系，因为不使用cookie

放在令牌里的信息，虽然别人不能篡改，但是确实可见的，所以不要放敏感信息

```
Authorization: Bearer <token>
```
