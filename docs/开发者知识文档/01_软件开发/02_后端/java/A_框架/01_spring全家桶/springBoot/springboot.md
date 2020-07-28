
## Micrometer

https://www.ibm.com/developerworks/cn/java/j-using-micrometer-to-record-java-metric/index.html

https://github.com/acroquest/micrometer-kibana-dashboard


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
