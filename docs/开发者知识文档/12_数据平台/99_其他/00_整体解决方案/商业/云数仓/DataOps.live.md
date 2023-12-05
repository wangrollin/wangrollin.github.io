
## 网页

- [dataops.live youtube](https://www.youtube.com/watch?v=1MSpCoJdEy4)

## dataops key

- gitlab pipeline
  - 用 gitlab 流水线插件形式执行很多大数据工具，比如 dbt、airflow、私有化环境、云厂商，都兼容
  - 用 gitlab 流水线来规范流程，必须从上到下执行
  - 插件都是docker中运行
- gitlab
  - sql 代码 gitlab 管理，从而实现并行开发sql脚本
  - 在代码中配置单元测试条件，而不是在单独的web app中去ui配置
  - sql 代码 MR，需要跑通过单元测试。单元测试有覆盖率
- env 管理
  - feature，自己的环境
  - dev，联调
  - qa，qa测试
  - prod，生产
- 快速复制
  - db table 复制。zero copy，拷贝了，但实际上没有变更，实际变更的时候再记录，这样拷贝超大db省时间、空间
  - pipeline 复制
- git 分支管理
  - feature
  - dev
  - qa
  - master
- config -> sql
  - 插件可以识别简单的yaml，来自己拼凑sql语句
