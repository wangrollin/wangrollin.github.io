
⏺ Barman Cloud 是 pgBarman (PostgreSQL Backup and Recovery Manager) 项目的云端扩展工具集。

  核心功能：
  - 将 PostgreSQL 的备份和 WAL (Write-Ahead Log) 文件存储到云对象存储中
  - 支持从云端恢复数据库

  支持的云存储：
  - AWS S3（及兼容 S3 的存储，如 MinIO）
  - Azure Blob Storage
  - Google Cloud Storage

  主要命令行工具：
  - barman-cloud-backup — 执行基础备份并上传到云端
  - barman-cloud-backup-list — 列出云端的备份
  - barman-cloud-wal-archive — 归档 WAL 文件到云端
  - barman-cloud-wal-restore — 从云端恢复 WAL 文件
  - barman-cloud-restore — 从云端恢复完整备份
  - barman-cloud-backup-delete — 删除云端备份

  典型使用场景：
  - PostgreSQL 的异地灾备（offsite backup）
  - 配合 Kubernetes 中的 PostgreSQL operator（如 CloudNativePG）实现自动化备份
  - 无需部署独立的 Barman 服务器，直接从 PostgreSQL 节点备份到云端

  安装：
  pip install barman[cloud]

  简单来说，它让你可以直接把 PostgreSQL 备份推送到云存储，而不需要中间的 Barman 服务器，非常适合云原生和容器化的 PostgreSQL 部署。
