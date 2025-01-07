
- [官网](https://dolphinscheduler.apache.org/)
- [github](https://github.com/apache/dolphinscheduler)


## bugfix

DolphinScheduler配置Kerberos,过期重启解决问题
https://blog.csdn.net/qq_18453581/article/details/132298018


## 日期参数定义

- [参数定义](https://blog.csdn.net/github_37130188/article/details/114333766)


1.支持代码中自定义变量名,声明方式:${变量名}。可以是引用"系统参数"或指定"常量"。

2.我们定义这种基准变量为[...]格式的,[yyyMMddHHmmss]是可以任意分解组合的,比
如:$[yyyyMMdd],$[HHmmss],$[yyyy-MM-dd]等

3.也可以使用以下格式:

后N年:$[add_months(yyyMMdd,12*N)]
前N年:$[add_months(yyyMMdd,-12*N)]
后N月:$[add_months(yyyyMMdd,N)]
前N月:$[add_months(yyyMMdd,-N)]

后N周:$[yyyMMdd+7*N]
前N周:$[yyyMMdd-7*N]

后N天:$[yyyMMdd+N]
前N天:$[yyyMMdd-N]

后N小时:$[HHmmss+N/24]
前N小时:$[HHmmss-N/24]
后N分钟:$[HHmmss+N/24/60]
前N分钟:$[HHmmss-N/24/60]
