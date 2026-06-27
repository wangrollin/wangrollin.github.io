

## toString 格式化 yyyy-MM-dd HH:mm:ss

```java
       LocalDateTime dateTime = LocalDateTime.of(2027, 1, 2, 11, 11, 11);

        // 定义日期时间格式
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

        // 格式化 LocalDateTime 对象为字符串
        String formattedDateTime = dateTime.format(formatter);

        LocalDateTime.now()
            .format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));

```

## from string

LocalDateTime.parse("2024-01-01 01:01:01", DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
LocalDateTime.parse("2024-01-01 01:01:01.100", DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss.SSS"));

## to epoch second

## to mil second

        LocalDateTime dateTime = LocalDateTime.now();
        Instant instant = dateTime.atZone(ZoneId.systemDefault()).toInstant();
        long epochSecond = instant.getEpochSecond();
 
        System.out.println("Epoch Seconds: " + epochSecond);