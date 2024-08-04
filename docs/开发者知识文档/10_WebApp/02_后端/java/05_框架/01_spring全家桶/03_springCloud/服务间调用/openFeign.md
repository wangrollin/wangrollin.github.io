

功能：以 声明式风格 使用eureka、ribbon、hystrix



Feign provides the option of writing **Ribbon** load balanced REST clients for endpoints registered in **Eureka**, with fallback implementations controlled using **Hystrix**, using nothing more then an Java interfaces with some annotations.


- [k8s 中使用 openFeign](https://www.infvie.com/ops-notes/kubernetes-springcloud-feign-communication-between-services.html)



## openfeign

要注意，调用失败会抛出错误，记得处理

**使用方的app：**

@EnableFeignClients({"com.inovance.auto.bigdata.common.web.feignCients"})


**组件库：**

@Component
@FeignClient("bigdata-auth")
public interface AuthClient {

    @GetMapping(value = "/auth/v1/user/email", headers = {"Cookie", "access-token=${service.access.token}"})
    public String getUserEmail(@RequestParam(value = "account") @Size(min = 1, max = 32) String account);
}
