

## 网页

- [SpringBoot 是如何通过jar包启动的](https://mp.weixin.qq.com/s/7Ur8AfI81covPlyIl0dTCw)
- [Spring Boot 的全局异常处理](https://mp.weixin.qq.com/s/nRsxgjVzXUwjgGtZnSU8Sw)
- [Spring Boot 2.x基础教程：配置元数据的应用](https://mp.weixin.qq.com/s?__biz=Mzg2MDYzODI5Nw==&mid=2247495866&idx=2&sn=4099a662bddc76b27635040bc19bad53&chksm=ce21ed8cf956649a9f67b809e82a1a17efb381617c9a04d054a208828da94221e7ea6dc9167e&scene=21#wechat_redirect)

- 数据源
  - [Spring Boot 2.x基础教程：JdbcTemplate的多数据源配置](https://mp.weixin.qq.com/s?__biz=MzAxODcyNjEzNQ==&mid=2247494466&idx=2&sn=9e623cd5e625b2e1e903652654c4613d&chksm=9bd346daaca4cfccfcc37b92b842cb08d0975a3e21f680be64fecaa08c44bccedfd792b7ff65&scene=21#wechat_redirect)
  - [Spring Boot 2.x基础教程：Spring Data JPA的多数据源配置](https://mp.weixin.qq.com/s?__biz=MzAxODcyNjEzNQ==&mid=2247494726&idx=2&sn=e725d8e80a53557d2e6062a1c3ca6ae8&chksm=9bd341deaca4c8c8745e80764d1827851e89a10b14b0ec364c9faedbb226dd104611e59666b6&scene=21#wechat_redirect)
  - [Spring Boot 2.x基础教程：MyBatis的多数据源配置](https://mp.weixin.qq.com/s?__biz=MzAxODcyNjEzNQ==&mid=2247494975&idx=2&sn=0a259e33a34cd6be27365104b47067d3&chksm=9bd340a7aca4c9b1bf594f3d15b8eb929a0bb596f86e7930d1da92958d49e173ec1a6081fe6b&scene=21#wechat_redirect)

- 事务
  - [Spring Boot 2.x基础教程：事务管理入门](https://mp.weixin.qq.com/s?__biz=MzAxODcyNjEzNQ==&mid=2247496086&idx=2&sn=b18454461110a98e5afa3f0c2f1594c9&chksm=9bd35c0eaca4d518002d0a7d3055a21d5bef10c4973ca132b81f49ee51744de0aae065377b7e&scene=21#wechat_redirect)
  - [Spring Boot中如何使用JTA实现分布式事务](https://mp.weixin.qq.com/s/XLLG24soZS2DKCUPc2iIJQ)





## tips

> Spring Boot 解决跨域问题

- [Spring Boot 解决跨域问题的 3 种方案](https://mp.weixin.qq.com/s/F3qf4cFxpkPWu3XpBaLvVw)


## Spring Boot: how to use multiple yml files

https://stackoverflow.com/questions/23134869/spring-boot-how-to-use-multiple-yml-files

```bash
$ cat src/main/resources/application.yml:
spring:
  profiles:
    include: >
      profile1,
      profile2,
      ...
      profileN

$ ls -lah src/main/resources/config:
drwxr-xr-x  4 mak  staff   136B Apr 16 23:58 .
drwxr-xr-x  6 mak  staff   204B Apr 17 01:54 ..
-rw-r--r--  1 mak  staff    60B Apr 16 23:58 application-profile1.yml
-rw-r--r--  1 mak  staff    62B Apr 16 23:16 application-profile2.yml
...
-rw-r--r--  1 mak  staff    50B Apr 16 23:16 application-profileN.yml
```
