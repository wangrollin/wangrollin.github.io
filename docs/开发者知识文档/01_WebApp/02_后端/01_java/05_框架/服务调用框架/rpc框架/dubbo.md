
- [官网](https://dubbo.apache.org/zh/)
- [github](https://github.com/apache/dubbo)
- [高并发服务优化篇：从RPC预热转发看服务端性能调优](https://mp.weixin.qq.com/s/x1vjHTjywsIftRaYgp0RQQ)

## dubbo admin

 4. 访问

  浏览器打开 http://localhost:38080，默认账号密码 root / root。

  ---
  Docker 方式（更简单）

  docker run -d \
    -p 38080:38080 \
    -e admin.registry.address=nacos://宿主机IP:2181 \
    apache/dubbo-admin

  启动后就能在 Web UI 的「服务测试」页面直接调试 Dubbo 接口了。
