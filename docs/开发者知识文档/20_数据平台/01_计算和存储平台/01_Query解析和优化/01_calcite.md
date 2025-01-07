
独立于存储和计算的查询SQL优化引擎

## 网页

- [官网](https://calcite.apache.org/)
- [官网 doc](https://calcite.apache.org/docs/)
- [githun example code](https://github.com/zabetak/calcite/tree/demo-january-2021/core/src/test/java/org/apache/calcite/examples)


## 相关几个教程和demo

- [自己的 github calcite-practice](https://github.com/wangrollin/calcite-practice)

- [Calcite中的javaCC词法分析](https://www.bilibili.com/video/BV1ogiAeJEwH/?spm_id_from=333.999.0.0&vd_source=0535864f990f4f894f12ab9c48a8d710)
- [javaCC语法分析(一)](https://www.bilibili.com/video/BV1griwe3EYv/?spm_id_from=333.999.0.0&vd_source=0535864f990f4f894f12ab9c48a8d710)
- [javaCC语法分析(二)](https://www.bilibili.com/video/BV1JpiwepE7Z/?spm_id_from=333.999.0.0&vd_source=0535864f990f4f894f12ab9c48a8d710)
- [Calcite扩展SQL语法一](https://www.bilibili.com/video/BV1X5iAe2EXW/?spm_id_from=333.788&vd_source=0535864f990f4f894f12ab9c48a8d710)
- [Calcite扩展SQL语法二](https://www.bilibili.com/video/BV1V5iAemEt6/?spm_id_from=333.788&vd_source=0535864f990f4f894f12ab9c48a8d710)



## 改写 SQL，支持一个 SQL 跑在多个引擎上

## 虚拟列，来解决大MAP/大JSON 的问题

列级别的虚拟试图，在查询时展开

## SQL define function，SDF，解决频繁变化的 case when

## 扩展 SQL 支持自定义语法

## 解析 SQL

## 自动优化 sql，更快更好的执行

第一代：基于规则的优化器 rule based optimizer RBO

第二低：基于代价的优化器 cost based optimizer，CBO
cbo两大框架，都不错：
- system-R style
- volcano/cascade style -- calcite

cost 计算五元组：cpu io network memory row-count