
## 网页

发音 [ˈkɜːrbərəs]

- [官网](http://web.mit.edu/kerberos/www/index.html)
- [用通用的语言介绍下 Kerberos 协议](https://www.zhihu.com/question/22177404)
- [维基百科](https://zh.wikipedia.org/wiki/Kerberos)
- [Kerberos 原理](https://juejin.cn/post/6844903955416219661)
- [Kerberos原理--经典对话](https://mp.weixin.qq.com/s?__biz=MzU3MTc1NzU0Mg==&mid=2247483805&idx=1&sn=63a8910486a5dcbba011323269e7e190&scene=19#wechat_redirect)
- [Kerberos学习（一）](https://blog.51cto.com/slaytanic/2102931)
- [Kerberos学习（二）](https://blog.51cto.com/slaytanic/2103097)
- [Kerberos学习（三）](https://blog.51cto.com/slaytanic/2110967)

- [JAAS Authorization](https://docs.oracle.com/javase/8/docs/technotes/guides/security/jgss/tutorials/AcnAndAzn.html)
- [GSS-API 介绍](https://docs.oracle.com/cd/E19253-01/819-7056/overview-19/index.html)
- [Permissions in the JDK](https://docs.oracle.com/en/java/javase/15/security/permissions-jdk1.html#GUID-1E8E213A-D7F2-49F1-A2F0-EFB3397A8C95)

- [大数据SRE的总结（10）－－ kerberos in hadoop & 分布式程序认证设计](https://zhuanlan.zhihu.com/p/34556597)


https://blog.csdn.net/wenwen360360/article/details/78913347


## 安装

https://www.cnblogs.com/shuai-shuai-yang/p/15457176.html

客户端
yum install -y krb5-devel krb5-workstation


## 命令

kinit -kt keytab_path principal
kinit -kt xxx-keytab hdfs@BIGDATA.COM

klist
klist -ek hdfs.keytab