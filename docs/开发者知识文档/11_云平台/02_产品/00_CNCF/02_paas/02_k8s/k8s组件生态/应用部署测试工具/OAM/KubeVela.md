
## 网页

- [官网](https://kubevela.io/)
- [官网 doc](https://kubevela.io/docs/)
- [github](https://github.com/kubevela/kubevela)

OAM
CUE

## 安装 vela

- helm
- vela cli

## vela 组件

### vela cli

- brew install kubevela # on local
- vela install # to the k8s cluster

vela ls
vela up -f deploy.yaml

vela components

vela port-forword demo
vela exec demo
vela logs demo
vela status demo
vela status demo --endpoint

vela workflow resume demo

vela def get gateway
vela def edit gateway
vela def apply gateway.cue
vela def init my-app -t component --desc "xx" --template-yaml ./my-app.yaml -o my-app.cue
vela def init demo -t trait
vela def init demo -t component

### velad

kubectl apply -f xxx.yaml
kubectl delete -f xxx.yaml
使用到了 k8s CRD，自动编译成 k8s yaml，并且 apply


## addon

### vela ux

vela addon enable velaux
vela port-forward addon-velaux -n vela-system

## 机制

流程
- kubectl apply app-oam-type1.yaml
- CRD controller
- cue template 渲染 with yaml values -> cue file
- 编译 cue file -> 特定的 infra 文件（k8s yaml）

app-oam-type1.yaml 是 k8s 的
cue file 是**跨平台**的
app.yaml 是 k8s 的
