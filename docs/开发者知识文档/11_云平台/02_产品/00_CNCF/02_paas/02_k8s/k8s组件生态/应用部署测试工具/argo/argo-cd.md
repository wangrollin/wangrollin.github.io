

gitops cd tool for k8s
很多工具都可以实现 gitops，argoCD 帮助实现 gitops

## 网页

- [官网](https://argoproj.github.io/cd/)
- [官网 doc](https://argo-cd.readthedocs.io/en/stable/)
- [github]()

## 主要站位

kubectl apply 时机

## 竞品

flux
jenkinsX

## 优点、特性

- 高效：多集群支持，多应用支持
- 安全：密钥保管
- 权限管理：通过git的push MR权限控制，而不用再加一层 k8s role user。甚至不需要为开发人员、jenkins等提供 k8s 访问权限
- 可视化部署过程
- argoCD 部署在k8s内部，所以不是push to k8s，而是 pull from git
- argoCD 是 k8s 扩展，jenkins 也能部署在 k8s 内部，但是不是 k8s 扩展
  - 使用的 k8s 机制
    - 使用 etcd 存储数据
    - 使用 k8s controller 进行监控，对比实际和期望的状态
    - 使用 CRD 扩展 k8s api
  - 好处：
    - 实时更新app状态
- git repo（期望状态） -- argo CD -- k8s cluster（实时状态）
- 确保git作为唯一正确，如果直接修改cluster，可以配置不同行为
  - 自动重新sync git到cluster
  - 发告警
- git commit作为唯一变更接口
- 变更有版本管控，可以轻松回滚
- 变更有历史
- 更好的团队配合
- 一个git repo，很多k8s集群


一个 argo_app.yaml 里配置一个 git repo 和一个 k8s cluster

## 高级特性

### 用一个 argoCD 部署 app 到其他 k8s 集群

- 只需要维护一个 argoCD 实例
- 可以同步到多个 k8s cluster

### 实现 dev、qa、prod 环境逐个升级

每个k8s cluster里都有一个argoCD

方案1:使用多个 git branch

方案2:使用 overlays git 目录结构
- overlays
  - dev
    - chart.yaml
  - qa
    - chart.yaml
  - prod
    - chart.yaml


## 机制

### pull git

3min 拉取一次 git

### push to argoCD

git webhook

## 支持的 config 文件类型

- k8s yaml
- helm charts
- kustomize

## 最佳实践

git repo拆成2个
- app code
- app config code -- gitops repo

## setup

- 部署 argoCD
- config git repo to sync by CRD
- pull and apply

kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml

admin
pwd:
kubectl get secret argocd-initial-admin-secret -nargocd -o yaml
echo xxx | base64 --decode