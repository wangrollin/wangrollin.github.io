
## 网站

- [为什么mysql innodb索引是B+树数据结构](https://blog.csdn.net/xuehuagongzi000/article/details/78985844)
- [mysql InnoDB数据存储引擎 的B+树索引原理](https://www.huaweicloud.com/articles/6856b2ffc571c3d52b0465e1c68acc77.html)
- [MySQL的InnoDB索引原理详解](https://kyle.ai/blog/6439.html)
- [InnoDB B+树索引](https://jimmy2angel.github.io/2019/04/09/InnoDB-B-%E6%A0%91%E7%B4%A2%E5%BC%95/)
- [搞懂MySQL InnoDB B+树索引](https://www.cnblogs.com/GrimMjx/p/10540263.html)
- [浅析MySQL InnoDB中的B+树索引](https://juejin.cn/post/6844903760423026702)
- [为什么 MySQL 使用 B+ 树](https://draveness.me/whys-the-design-mysql-b-plus-tree/)
- [InnoDB中一棵B+树能存多少行数据？](https://cloud.tencent.com/developer/article/1443681)
- [搞懂Mysql InnoDB B+树索引](https://developer.aliyun.com/article/693859)


## 事务引擎机制

### 事务引擎常用机制

### InnoDB 隔离级别实现方式

#### SQL92 隔离级别

- 读未提交
- 读已提交 RC （使用最多的）
- 可重复读 RR （InnoDB 默认的）
- 可序列化


#### InnoDB 隔离级别

实现方式 MVCC


#### InnoDB RR 写偏斜

### InnoDB 锁机制

#### InnoDB 锁类型

- Mutex
- Latch
- Lock


#### InnoDB Lock锁模式和类型

##### Lock表锁

- LOCK_IS：意向共享锁
- LOCK_IX：意向排他锁
- LOCK_S：共享锁
- LOCK_X：排他锁
- LOCK_AUTO_INC：自增锁

