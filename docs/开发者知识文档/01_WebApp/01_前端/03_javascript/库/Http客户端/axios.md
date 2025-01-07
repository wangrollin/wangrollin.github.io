

Promise based HTTP client for the browser and node.js

[axios on github](https://github.com/axios/axios)

[axios on npm](https://www.npmjs.com/package/axios)

[axios 中文doc](http://axios-js.com/zh-cn/docs/index.html)

[关于vue使用axios post发送json数据跨域请求403的解决方法](https://blog.csdn.net/w770583069/article/details/81777892)

https://web.dev/cross-origin-resource-sharing/

https://segmentfault.com/q/1010000007665348

https://blog.csdn.net/LJJ1338/article/details/81812035


## 网页

- [官网](https://axios-http.com/)
- [官网 doc](https://axios-http.com/docs/intro)
- [github](https://github.com/axios/axios)

## axios interceptors

可以在请求的时候执行某些操作


## tips

### 强制使用 cookie

```js
// 一次
axios.post(API_SERVER + '/login', { email, password }, { withCredentials: true })

// 全局
const axios_instance = axios.create({
    withCredentials: true
})
```
