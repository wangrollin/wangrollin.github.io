
# logback

## config from spring boot application.yaml

命令改变 logback.xml -> logback-spring.xml

```xml
<springProperty scope="context" name="log_dir" source="my.log_dir"/>
<property name="LOG_FILE" value="${log_dir}"/>
```
