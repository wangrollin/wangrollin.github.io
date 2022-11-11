## 核心概念

https://www.liquibase.org/get_started/lb-first-steps.html

https://blog.csdn.net/NathanniuBee/article/details/90079840

官方示例：https://github.com/spring-projects/spring-boot/tree/v1.5.6.RELEASE/spring-boot-samples/spring-boot-sample-liquibase

changelogs

​	changeSets



tracking tables

​	databasechangelog

​	databasechangeloglock



## 为已有的数据库生成初始changelog，提前创建好目录，无文件

```bash
liquibase --classpath=/Users/wangrollin/.m2/repository/mysql/mysql-connector-java/8.0.19/mysql-connector-java-8.0.19.jar \
      --changeLogFile=initdb.mysql.sql \
      --url="jdbc:mysql://example.com:3306/dbname?useUnicode=true&characterEncoding=utf-8&useSSL=false&serverTimezone=GMT%2B8" \
      --username=root \
      --password=xxx \
      generateChangeLog
```



## 为已有的数据库标注changelog为已执行

为已有的数据库生成初始changelog

【坑】changeLogFile、author、id 共同确定一个changeSet

```bash
liquibase --classpath=/Users/wangrollin/.m2/repository/mysql/mysql-connector-java/8.0.19/mysql-connector-java-8.0.19.jar \
      --changeLogFile=db/changelog/ddl/initdb.mysql.sql \
      --url="jdbc:mysql://example.com:3306/dbname?useUnicode=true&characterEncoding=utf-8&useSSL=false&serverTimezone=GMT%2B8" \
      --username=root \
      --password=xxx \
      changelogSync
      
liquibase --classpath=/Users/wangrollin/.m2/repository/mysql/mysql-connector-java/8.0.19/mysql-connector-java-8.0.19.jar \
      --changeLogFile=db/changelog/ddl/initdb.mysql.sql \
      --url="jdbc:mysql://example.com:3306/scrm?useUnicode=true&characterEncoding=utf-8&useSSL=false&serverTimezone=GMT%2B8" \
      --username=root \
      --password=xxx \
      changelogSync
      

liquibase --classpath=/Users/wangrollin/.m2/repository/mysql/mysql-connector-java/8.0.19/mysql-connector-java-8.0.19.jar \
      --changeLogFile=db/changelog/ddl/initdb.mysql.sql \
      --url="jdbc:mysql://example.com:3306/scrm-back?useUnicode=true&characterEncoding=utf-8&useSSL=false&serverTimezone=GMT%2B8" \
      --username=root \
      --password=xxx \
      changelogSync
      
---
      
liquibase --classpath=/Users/wangrollin/.m2/repository/mysql/mysql-connector-java/8.0.19/mysql-connector-java-8.0.19.jar \
      --changeLogFile=db/changelog/dml/initdbdata.mysql.sql \
      --url="jdbc:mysql://example.com:3306/dbname?useUnicode=true&characterEncoding=utf-8&useSSL=false&serverTimezone=GMT%2B8" \
      --username=root \
      --password=xxx \
      changelogSync
      
liquibase --classpath=/Users/wangrollin/.m2/repository/mysql/mysql-connector-java/8.0.19/mysql-connector-java-8.0.19.jar \
      --changeLogFile=db/changelog/dml/initdbdata.mysql.sql \
      --url="jdbc:mysql://example.com:3306/scrm?useUnicode=true&characterEncoding=utf-8&useSSL=false&serverTimezone=GMT%2B8" \
      --username=root \
      --password=xxx \
      changelogSync
      
liquibase --classpath=/Users/wangrollin/.m2/repository/mysql/mysql-connector-java/8.0.19/mysql-connector-java-8.0.19.jar \
      --changeLogFile=db/changelog/dml/initdbdata.mysql.sql \
      --url="jdbc:mysql://example.com:3306/scrm-back?useUnicode=true&characterEncoding=utf-8&useSSL=false&serverTimezone=GMT%2B8" \
      --username=root \
      --password=xxx \
      changelogSync

---

liquibase --classpath=/Users/wangrollin/.m2/repository/mysql/mysql-connector-java/8.0.19/mysql-connector-java-8.0.19.jar \
      --changeLogFile=db/changelog/ddl/initdb.mysql.sql \
      --url="jdbc:mysql://example.com:3306/mini_session_dev?useUnicode=true&characterEncoding=utf-8&useSSL=false&serverTimezone=GMT%2B8" \
      --username=root \
      --password=xxx \
      generateChangeLog
      
      
liquibase --classpath=/Users/wangrollin/.m2/repository/mysql/mysql-connector-java/8.0.19/mysql-connector-java-8.0.19.jar \
      --changeLogFile=db/changelog/ddl/initdb.mysql.sql \
      --url="jdbc:mysql://example.com:3306/mini_session_dev?useUnicode=true&characterEncoding=utf-8&useSSL=false&serverTimezone=GMT%2B8" \
      --username=root \
      --password=xxx \
      changelogSync
      
      
liquibase --classpath=/Users/wangrollin/.m2/repository/mysql/mysql-connector-java/8.0.19/mysql-connector-java-8.0.19.jar \
      --changeLogFile=db/changelog/ddl/initdb.mysql.sql \
      --url="jdbc:mysql://example.com:3306/mini_session_qa?useUnicode=true&characterEncoding=utf-8&useSSL=false&serverTimezone=GMT%2B8" \
      --username=root \
      --password=xxx \
      changelogSync
```

