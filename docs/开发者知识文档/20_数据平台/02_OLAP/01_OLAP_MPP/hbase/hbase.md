
## HBase官方中文文档

http://abloz.com/hbase/book.html


## hbase开启用户名密码认证

https://www.ibm.com/support/knowledgecenter/en/SSPT3X_4.2.5/com.ibm.swg.im.infosphere.biginsights.admin.doc/doc/admin_iop_kerb_procedure.html


## hbase shell命令

HBase Basic Operations

   **1. Create a table**

   Create ‘table name’, ’column family name1’, ’column family name2’, ’column family name3’, ’column family name4’ ... 

  **2. use list to view the newly created table**

  **3. Add data**

​    put ‘table name’, ’row name’, ’column family name: column name’, ’value’;

  **4. View all information in the table**
P
​    scan ‘table name’

  **5. View a specific row in the table**

​     scan 'table name', 'row name'

  **6. View specific column families**

​     scan ‘table name’, {COLUMN => ’column family’} or scan ‘table name’, {COLUMN => ’column family: column name’}

  **7.Update the data (also the put command, which is equivalent to overwriting)**

​    put ‘table name’, ’row name’, ’column family name’.

**8.Get different versions**

   get 'testtable1','row-1',{COLUMN=>'colfam1:qual1',VERSIONS=>3} 



disable 'xxx'

drop 'xxx'

exists 'xxx'


## Hbase基础知识

https://www.cnblogs.com/ityouknow/p/7344001.html


## 读写Hbase的几种方式

#### java

https://www.cnblogs.com/swordfall/p/10301707.html


#### spark

https://www.cnblogs.com/swordfall/p/10517177.html


#### flink

https://www.cnblogs.com/swordfall/p/10527423.html

https://blog.csdn.net/u012447842/article/details/90203512
