

## flink sink for jdbc



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





## flink sink for hbase



```xml
<dependency>
    <groupId>org.apache.flink</groupId>
    <artifactId>flink-hbase_${scala.binary.version}</artifactId>
    <version>${flink.version}</version>
</dependency>
<dependency>
    <groupId>org.apache.hadoop</groupId>
    <artifactId>hadoop-client</artifactId>
    <version>2.7.1</version>
</dependency>
```



```java
package com.example.wechat.apievent;

import com.esotericsoftware.minlog.Log;
import org.apache.flink.configuration.Configuration;
import org.apache.flink.streaming.api.functions.sink.RichSinkFunction;
import org.apache.hadoop.hbase.HBaseConfiguration;
import org.apache.hadoop.hbase.HColumnDescriptor;
import org.apache.hadoop.hbase.HTableDescriptor;
import org.apache.hadoop.hbase.TableName;
import org.apache.hadoop.hbase.client.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

public class ApiEventHBaseSink extends RichSinkFunction<Map<String, String>> {

    private static final Logger LOG = LoggerFactory.getLogger(ApiEventHBaseSink.class);
    private static final long FLUSH_PERIOD = 5000;
    private static final String COLUMN_FAMILY = "csv";
    private static final String COLUMN = "column1";

    private static volatile long lastFlushTime = System.currentTimeMillis();
    private static org.apache.hadoop.conf.Configuration configuration;
    private static Connection connection = null;
    private static Admin hBaseAdmin = null;
    private static Map<String, BufferedMutator> mutatorMap = new HashMap<>();

    @Override
    public void open(Configuration parameters) throws Exception {

        configuration = HBaseConfiguration.create();
        configuration.set("hbase.master", "example.com:60000");
        configuration.set("hbase.zookeeper.quorum", "example.com");
        configuration.set("hbase.zookeeper.property.clientPort", "2181");

        try {
            connection = ConnectionFactory.createConnection(configuration);
            hBaseAdmin = connection.getAdmin();
        } catch (IOException e) {
            LOG.error(e.getMessage());
        }

        System.out.println("connection hBaseAdmin init ok.");

    }

    @Override
    public void close() throws IOException {

        mutatorMap.values().forEach(mutator -> {

            try {
                if (mutator != null) {
                    mutator.close();
                }
            } catch (IOException e) {
                LOG.error(e.getMessage());
            }
        });

        if (connection != null) {
            connection.close();
        }

        if (hBaseAdmin != null) {
            hBaseAdmin.close();
        }
        System.out.println("connection hBaseAdmin close ok.");


    }

    @Override
    public void invoke(Map<String, String> map, Context context) throws Exception {

        map.entrySet().stream().forEach(entry -> {

            String tableName = entry.getKey();

            String rowKey = UUID.randomUUID().toString();
            String value = entry.getValue();

            Put put = new Put(rowKey.getBytes());
            put.addColumn(COLUMN_FAMILY.getBytes(), COLUMN.getBytes(), value.getBytes());

            try {

                if (!hBaseAdmin.tableExists(TableName.valueOf(tableName))) {
                    createHBaseTable(tableName);
                }
                if (!mutatorMap.containsKey(tableName)) {
                    BufferedMutatorParams params = new BufferedMutatorParams(TableName.valueOf(tableName));
                    params.writeBufferSize(2 * 1024 * 1024);
                    mutatorMap.put(tableName, connection.getBufferedMutator(params));
                }
                mutatorMap.get(tableName).mutate(put);

            } catch (IOException e) {

                e.printStackTrace();
            }
        });

        flushDataIfPossible();
        System.out.println("invoke ok");

    }

    private static void flushDataIfPossible() {

        if (System.currentTimeMillis() > lastFlushTime + FLUSH_PERIOD) {

            lastFlushTime = System.currentTimeMillis();
            mutatorMap.values().forEach(mutator -> {
                try {

                    if (mutator != null) {
                        mutator.flush();
                        System.out.println(mutator.getName() + " flush ok.");
                    }
                } catch (IOException e) {

                    Log.error(e.getMessage());
                }
            });
        }
    }

    private synchronized static void createHBaseTable(String tableName) throws IOException {

        if (!hBaseAdmin.tableExists(TableName.valueOf(tableName))) {

            HTableDescriptor table = new HTableDescriptor(TableName.valueOf(tableName));
            HColumnDescriptor family = new HColumnDescriptor(COLUMN_FAMILY.getBytes());
            table.addFamily(family);
            hBaseAdmin.createTable(table);
            System.out.println(tableName + " create ok.");
        }
    }
}

```
