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

## helm yaml

### 多行引用

```yaml
          command:
            - /bin/bash
          args:
            - -c
            - |
            {{- range .Values.global.args}}
                  {{ print . }}
            {{- end }}
```

## 常用命令

### 渲染template

helm template ins-name repo-name/chart-name

### 其他

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
helm install bitnami/mysql --generate-name --set myvalue=123
helm install my-mysql bitnami/mysql
helm install my-mysql bitnami/mysql --version 8.3.1
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

## helm 模版函数

### default

在 Helm 的模板中，以下情况被认为是没有值或未定义的：

1. 变量未在 `values.yaml` 文件中定义。
2. 变量在 `values.yaml` 文件中被设置为 `null`。
3. 变量在 `values.yaml` 文件中被设置为空字符串 `""`。
4. 变量在 `values.yaml` 文件中被设置为布尔值 `false`。
5. 变量在 `values.yaml` 文件中被注释掉或被删除。

对于上述情况，`default` 函数会将第一个参数作为默认值返回。

需要注意的是，如果将空字符串 `""` 作为显式值分配给变量，那么在模板中引用该变量时，它将被视为有值。只有在变量未定义或被设置为 `null` 时，才会被视为没有值或未定义。

总结起来，以下值被视为没有值或未定义：

- 变量未定义。
- 变量被设置为 `null`。
- 变量被设置为 `0`。
- 变量被设置为空字符串 `""`。
- 变量被设置为布尔值 `false`。
- 变量被注释掉或被删除。


如果 `false` 被传递给管道操作符 `|`，那么 `default` 函数将会返回默认值，而不是 `false`。

让我们以一个示例来说明：

```yaml
{{ false | default "default value" }}
```

在上述示例中，`false` 被传递给管道操作符 `|`，然后作为参数传递给 `default` 函数。由于 `false` 被视为没有值（即未定义），`default` 函数将返回其第一个参数作为默认值，即 `"default value"`。

因此，无论管道操作符的前一个表达式是什么，只要它被视为没有值或未定义，`default` 函数都会返回默认值。


## version 规格

必须三位版本号，不支持四位，只能a.b.c-xxx a.b.c+xxx

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