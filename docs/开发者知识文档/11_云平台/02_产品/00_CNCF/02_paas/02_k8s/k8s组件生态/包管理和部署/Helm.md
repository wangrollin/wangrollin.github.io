# Helm

## 网页

- [官网](https://helm.sh/)
- [官网 doc](https://helm.sh/docs/)
- [github](https://github.com/helm/helm)

## helm 源

### bitnami.com

```bash
$ helm repo add bitnami https://charts.bitnami.com/bitnami
$ helm search repo bitnami
$ helm install my-release bitnami/<chart>
```

## 插件

### helm-diff

### helm-s3

- [github](https://github.com/hypnoglow/helm-s3)

helm plugin install https://github.com/hypnoglow/helm-s3.git

## 常用命令

```bash
# 安装 Helm
brew install helm
or
$ curl https://raw.githubusercontent.com/kubernetes/helm/master/scripts/get > get_helm.sh
$ chmod 700 get_helm.sh
$ ./get_helm.sh

# 基本信息
helm version

# repo 命令
helm repo list
helm repo add dev https://example.com/dev-charts
helm repo update
helm repo remove

# 更新/查询 charts
helm search hub wordpress
helm search repo brigade
helm list
helm list --all # 成功的、失败的、删除的
helm ls
helm show chart bitnami/mysql
helm show all bitnami/mysql

# 配置 charts
helm show values bitnami/wordpress
$ echo '{mariadb.auth.database: user0db, mariadb.auth.username: user0}' > values.yaml
$ helm install -f values.yaml bitnami/wordpress --generate-name
--values (or -f): Specify a YAML file with overrides. This can be specified multiple times and the rightmost file will take precedence
--set: Specify overrides on the command line.
helm get values my-release
helm upgrade --reset-values # clear 配置

# 安装/卸载 charts
helm install bitnami/mysql --generate-name
helm install my-mysql bitnami/mysql
helm install foo path/to/foo
helm install foo foo-0.1.1.tgz
helm install foo https://example.com/charts/foo-1.2.3.tgz
helm install --debug --dry-run goodly-guppy ./mychart # 渲染模版但是不实际 install

helm status my-mysql
helm uninstall my-mysql

# 升级 charts
helm upgrade -f panda.yaml happy-panda bitnami/wordpress
helm get values happy-panda # 看配置是否生效
helm get manifest my-release

# 回滚 charts
helm rollback [RELEASE] [REVISION]
helm rollback happy-panda 1
helm history [RELEASE]

# 帮助信息
helm help
helm <command> --help
helm get -h
```

## 创建 Charts

- [官方文档 - Charts](https://helm.sh/docs/topics/charts/)

https://mp.weixin.qq.com/s?__biz=MzI3MTI2NzkxMA==&mid=2247486154&idx=1&sn=becd5dd0fadfe0b6072f5dfdc6fdf786&chksm=eac52be3ddb2a2f555b8b1028db97aa3e92d0a4880b56f361e4b11cd252771147c44c08c8913&mpshare=1&scene=23&srcid=0809XT1uzvaUqkaWiouHAUv4%23rd

```bash
# 创建 charts
helm create deis-workflow
helm lint
helm package deis-workflow

# 查看 charts
helm pull chartrepo/chartname

# 更新依赖，下载包到 charts 目录下
helm dependency update foochart
```

## helm docker 镜像

```bash
dtzar/helm-kubectl
lworf/xxx
```

## tips

### 防止某些资源在 helm uninstall的时候删掉

```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  annotations:
    "helm.sh/resource-policy": keep
```