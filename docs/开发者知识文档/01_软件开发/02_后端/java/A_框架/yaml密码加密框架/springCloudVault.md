



## 官网

https://www.vaultproject.io/

https://spring.io/guides/gs/vault-config/

https://spring.io/projects/spring-vault

https://cloud.spring.io/spring-cloud-static/spring-cloud-vault/1.1.2.RELEASE/single/spring-cloud-vault.html





## 上手操作

添加starter

```xml
        <!-- Vault Starter -->
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-vault-config</artifactId>
        </dependency>
```



然后配置vault server的信息，在启动的时候会自动vault server寻找app name path下的所有key value

```yaml
spring:
  application:
    name: wechat-auth-service
  cloud:
    vault:
      generic:
        application-name: wechat-auth-service # 默认的secret/wechat-auth-service
      uri: https://example.com:8200
      token: xxxxxxxxxxxxxxxxxxxxxx
      
      
[secret/wcp-service/springp-profile-active] 
[secret/wcp-service]
[secret/application/springp-profile-active]
[secret/application]

# avoid openjdk ssl issue
-Djdk.tls.client.protocols=TLSv1.2
```



修复wcp，acl，loyalty的vault健康检查超时导致k8s重启pod问题

```yaml
management:
  health:
    vault:
      enabled: false
```



在vault里存放相关信息

```bash
vault kv put secret/wechat-auth-service spring.datasource.password=xxx
```

