# shade

## 网站

- [官网](https://maven.apache.org/plugins/maven-shade-plugin/)
- [github]()
- [blog：解决 jar 包冲突的神器：maven-shade-plugin](https://www.playpi.org/2019120101.html)


## 解决的问题

服务在运行时依赖两个库 a、b，这两个库依赖了 c 库的不同版本，即运行时需要两个 c 版本都被加载进来服务才能正常运行。

生效阶段是 package。

不适合 shade 直接依赖的包，适合依赖的依赖。