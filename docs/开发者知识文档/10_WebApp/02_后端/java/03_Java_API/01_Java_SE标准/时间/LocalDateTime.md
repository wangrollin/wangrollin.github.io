

## 格式化 yyyy-MM-dd HH:mm:ss

```java
       LocalDateTime dateTime = LocalDateTime.of(2027, 1, 2, 11, 11, 11);

        // 定义日期时间格式
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

        // 格式化 LocalDateTime 对象为字符串
        String formattedDateTime = dateTime.format(formatter);

        LocalDateTime.now()
            .format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));

```
