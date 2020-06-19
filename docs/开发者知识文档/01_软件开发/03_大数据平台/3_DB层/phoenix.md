

## 数据库加密 kerberos enable







## phoenix JDBC driver

#### fat driver

```xml
<dependency>
    <groupId>org.apache.phoenix</groupId>
    <artifactId>phoenix-core</artifactId>
    <version>5.0.0-HBase-2.0</version>
</dependency>

<dependency>
    <groupId>org.apache.hadoop</groupId>
    <artifactId>hadoop-common</artifactId>
    <version>2.8.4</version>
</dependency>
```



```java
package com.example.wechat.apievent;

import org.apache.flink.configuration.Configuration;
import org.apache.flink.streaming.api.functions.sink.RichSinkFunction;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import com.example.wechat.common.Constants;
import java.util.Map;

public class ApiEventPhoenixSink extends RichSinkFunction<Map<String, String>> {

    private Connection connection;

    private static final String insertIntoAccesslogSql = "UPSERT INTO wrl_accesslog VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    private PreparedStatement insertIntoAccesslogPreparedStatement;

    @Override
    public void open(Configuration parameters) throws Exception {
        
        String USERNAME = "";
        String PASSWORD = "";
        String DBURL = "jdbc:phoenix:example.com:2181";
        Class.forName("org.apache.phoenix.jdbc.PhoenixDriver");
        
        connection = DriverManager.getConnection(DBURL,USERNAME,PASSWORD);
        insertIntoAccesslogPreparedStatement = connection.prepareStatement(insertIntoAccesslogSql);
        super.open(parameters);
    }

    @Override
    public  void invoke(Map<String, String> data, Context context) throws Exception {

        try {

            data.entrySet().stream().forEach(entry -> {

                String tableName = entry.getKey();
                String[] columns = entry.getValue().split(Constants.VERTICAL);
                // data: 0-app_key, 1-openid, 2-timestamp, 3-pid, 4-title, 5-url,6-queryString,7-ip,8-referer,9-user-agent,10-load_date,11-event_id
                // columns: 1-url,2-openid,3-timestamp,4-APP_KEY,5-PID,6-TITLE,7-QUERYSTRING,8-IP,9-REFERER,10-USER_AGENT, 11-LOAD_DATE, 12-EVENT_ID

                switch (tableName.toLowerCase()) {
                    
                    case "accesslog":
                        try {
                            insertIntoAccesslogPreparedStatement.setString(1, columns[5]);
                            insertIntoAccesslogPreparedStatement.setString(2, columns[1]);
                            insertIntoAccesslogPreparedStatement.setString(3, columns[2]);
                            insertIntoAccesslogPreparedStatement.setString(4, columns[0]);
                            insertIntoAccesslogPreparedStatement.setString(5, columns[3]);
                            insertIntoAccesslogPreparedStatement.setString(6, columns[4]);
                            insertIntoAccesslogPreparedStatement.setString(7, columns[6]);
                            insertIntoAccesslogPreparedStatement.setString(8, columns[7]);
                            insertIntoAccesslogPreparedStatement.setString(9, columns[8]);
                            insertIntoAccesslogPreparedStatement.setString(10, columns[9]);
                            insertIntoAccesslogPreparedStatement.setString(11, columns[10]);
                            insertIntoAccesslogPreparedStatement.setString(12, columns[11]);
                            insertIntoAccesslogPreparedStatement.executeUpdate();
                        } catch (SQLException e) {
                            e.printStackTrace();
                        }
                        break;
                }
            });
            connection.commit();

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void close() throws Exception {
        if(insertIntoAccesslogPreparedStatement != null){
            insertIntoAccesslogPreparedStatement.close();
        }
        if(connection != null){
            connection.close();
        }
        super.close();
    }
}
```





#### thin driver

只能执行查询操作 (也可能是connection没有commit)

```bash
# 启动thin server
sudo ./queryserver.py start
```



```xml
<dependency>
    <groupId>org.apache.phoenix</groupId>
    <artifactId>phoenix-queryserver-client</artifactId>
    <version>5.0.0-HBase-2.0</version>
</dependency
```



```java

            Connection connection;
            PreparedStatement preparedStatement;
            // JDBC连接信息
            String USERNAME = "" ;
            String PASSWORD = "";

            String DBURL = "jdbc:phoenix:thin:url=http://example.com:8765;serialization=PROTOBUF";
            // 加载JDBC驱动
            Class.forName("org.apache.phoenix.queryserver.client.Driver");

            // 获取数据库连接
            connection = DriverManager.getConnection(DBURL,USERNAME,PASSWORD);

            String sql = "select * from wrl_accesslog";
            preparedStatement = connection.prepareStatement(sql);

            ResultSet rs = preparedStatement.executeQuery();
            System.out.println(rs.getMetaData().getColumnCount());

            connection.prepareStatement(sql);
            while(rs.next()) {
                System.out.println("yes");
            }

            if(preparedStatement != null){
                preparedStatement.close();
            }
            if(connection != null){
                connection.close();
            }
```











## 在ambari中hbase的config中打开phoenix开关





## 如何用DBeaver连接phoenix

主机：zookeeper地址    端口：zookeeper端口2181





## Querying HBase with Apache Phoenix in shell

##### set up apache Phoenix

```bash
在ambari里的hbase config里enable phoenix，restart hbase

# change to phoenix dir
cd /usr/hdp/current/phoenix-client/bin

# launch Phoenix shell，连上phoenix server
./sqlline.py localhost

```



##### query data in apache phoenix

```sql
# 查看已存在的table
!tables

!help

# create Phoenix version of sales table，虽然sales已经在hbase中存在了，但是phoenix不知道，所以需要建立逻辑连接，是view类型的，这样就不会碰到底层hbase存储的东西
create view "sales" (
"row" VARCHAR primary key,
"order"."orderID" VARCHAR,
"order"."orderDate" VARCHAR,
"order"."shipDate" VARCHAR,
"order"."shipMode" VARCHAR,
"order"."profit" VARCHAR,
"order"."quantity" VARCHAR,
"order"."sales" VARCHAR);

create view "accesslog" (
"row" VARCHAR primary key,
"csv"."column1" VARCHAR
);

# see 10 row
select * from "sales" limit 10;
select * from "accesslog" limit 10;

# select top 10 rows by highest profit
select * from "sales" order by "profit" desc limit 10;

# filter results
# identifiers are double quoted and values single quoted，属于表结构的用双引号，字符串用单引号
select * from "sales" WHERE "orderID"='CA-2011-100006' limit 10;

# change output format to see all fields
!outputformat vertical
select * from "sales" WHERE "orderID"='CA-2011-100006' limit 10;

# switch output back to normal
!outputformat table

# get distinct list of shipping modes
select distinct "shipMode" from "sales";

# get count of each ship modes
select "shipMode", count(1)
from "sales"
group by "shipMode"
order by count(1) desc;
```



##### create tables in apache phoenix

```sql
# truncate order date to month
select substr("orderDate",1,7) from "sales" limit 10;

# get count by month
select substr("orderDate",1,7) as mt, count(1) as orders
from "sales"
group by substr("orderDate",1,7)
order by mt
limit 15;

# create new table
create table "monthlyOrders" ( "mt" varchar primary key, "orders" integer );

# upsert data to new table
upsert into "monthlyOrders"
select substr("orderDate",1,7) as mt, count(1) as orders
from "sales"
group by substr("orderDate",1,7)
order by mt;
```





```sql

!help
!outputformat vertical
!outputformat table
!describe wrl_accesslog
create table IF NOT EXISTS wrl_accesslog (
    url VARCHAR,
    openid VARCHAR,
    timestamp VARCHAR,
    APP_KEY VARCHAR,
    PID VARCHAR,
    TITLE VARCHAR,
    QUERYSTRING VARCHAR,
    IP VARCHAR,
    REFERER VARCHAR,
    USER_AGENT VARCHAR,
    LOAD_DATE VARCHAR,
    EVENT_ID VARCHAR,
    CONSTRAINT my_pk PRIMARY KEY (url, openid, timestamp) 
);

!table


UPSERT INTO wrl_accesslog VALUES (
    'dev.example.com/ebiz-ui/index.html',
    'ok54Dwe1tSTzX6SbsQtKdWm8xBn0',
    '1585805626',
    'wx3a2bc33b69d42f16',
    '2000',
    'LOUIS VUITTON',
    '',
    '10.72.160.245',
    'https://example.com/ebiz-ui/index.html',
    'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1 wechatdevtools/1.02.1911180 MicroMessenger/7.0.4 Language/zh_CN webview/1585796377874306 webdebugger port/58787',
    '2020/04/02 13:33:44.363',
    'd5d35cb0-ad3c-4156-8c9a-bce46de3efcd'
);

select * from wrl_accesslog;


```



