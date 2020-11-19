# sonar

docker启动一个sonarqube

```bash
docker run \
    --restart always  \
    --name sonar-postgres  \
    -p 5432:5432  \
    -v /srv/postgresql/data:/var/lib/postgresql/data  \
    -e POSTGRES_PASSWORD=xxx  \
    -d postgres:latest
    sonarqube

docker run --restart always -d --name sonarqube --link sonar-postgres:postgres \
    -p 9000:9000 -p 9092:9092 \
    -e SONARQUBE_JDBC_USERNAME=postgres \
    -e SONARQUBE_JDBC_PASSWORD=xxx \
    -e ES_JAVA_OPTS="-Xms512m -Xmx2048m" \
    -e SONARQUBE_JDBC_URL="jdbc:postgresql://postgres/postgres" \
    -v /srv/sonar/sonarqube_conf:/opt/sonarqube/conf \
    -v /srv/sonar/sonarqube_extensions:/opt/sonarqube/extensions \
    -v /srv/sonar/sonarqube_logs:/opt/sonarqube/logs \
    -v /srv/sonar/sonarqube_data:/opt/sonarqube/data \
    sonarqube


docker rm sonarqube
docker logs -f sonarqube
docker exec -i -t sonarqube /bin/bash

cd /opt/sonarqube/extensions/plugins
wget -c https://binaries.sonarsource.com/Distribution/sonar-java-plugin/sonar-java-plugin-5.6.0.15032.jar
wget -c https://binaries.sonarsource.com/Distribution/sonar-java-plugin/sonar-java-plugin-6.0.0.20538.jar

docker cp sonarqube:/opt/sonarqube/extensions/plugins/sonar-java-plugin-5.6.0.15032.jar /tmp
sudo cp /tmp/sonar-plugins-backup/* /srv/sonarqube/extensions/plugins/
```


本地执行sonar扫描有两种方式：

- mvn执行sonar插件，会上传报告到server，可在web查看
- 
```bash
mvn sonar:sonar \
    -Dsonar.projectKey=projectKey \
    -Dsonar.host.url=url \
    -Dsonar.login=loginkey
 
mvn sonar:sonar -P sonar
```

- 安装IDE插件sonarLint

这种方式不会上传报告，只会在本地显示结果


## tips

> 在java代码中屏蔽sonar检测

```java
@SuppressWarnings("all")
```