## Kubernetes for Java Developers

**1. Introduction to Kubernetes**

- Why Kubernetes?
- Kubernetes workflow for Java developers
- Build and test application using Maven

**2. Packaging Our App Using Docker**

- Docker workflow

- Docker image and container

- Build a Docker image using a Dockerfile

    可以用两阶段的dockerfile，在第一个里编译，在第二个里面运行

- Work with a Docker container

- Build a Docker image using Jib

    jib可以把这个app分成多层（dependency，resource，class），这样有了变动docker build不必重新编译整个项目，也不用push整个项目到registry

    

    不需要写dockerfile

    自动push image to registry，需要设置一下registry地址、用户名、密码

    

- Minimal Docker image using custom JRE

    jlink是java9出来的一个工具，模块化取出需要的部分 500m 变成 160m

**3. Kubernetes Concepts and Getting Started**

- Kubernetes concepts and instantiation

- Kubernetes resources

- Kubernetes cluster concepts

    kubectl 和 master沟通，master控制worker

    etcd + master（api server，controller manager，scheduler，cloud controller，add-ons，dns）

    worker（kubelet，kube-proxy）

    

- Kubernetes clusters: Getting started

- Getting started with Minikube

    查看目前连接上的k8s：kubectl config get-contexts

    修改k8s操作对象：kubectl config use-context <k8s-name>

    

- Deploy using standalone manifests

- Deploy using standalone single manifest

    kubectl get svc,deplyment,pods

    kubectl delete deplyment/<name> svc/<name>

    

- Introduction to Helm charts

    Chart.yaml

    values.yaml

    templates

    ​	_helpers.tpl

    ​	service.yaml

    ​	deplyment.yaml

    ​	NOTES.txt

    

- Deploy using Helm charts

- Debug a deployment with IntelliJ

**4. Kubernetes Cluster on AWS**

- Introduction to Amazon EKS

- EKS deployment

    brew install weaveworks/tap/eksctl

    eksctl verison

    eksctl create cluster --name myk8s --nodes 4

    kubectl

    

- Migrate app to a cluster on AWS

**5. Service Mesh and Istio**

- Introduction to service mesh and Istio

    istio + envoy 控制面和数据面

    

- Install Istio on Amazon EKS

    下载istio，进入目录

    helm install --wait --name istio --namespace istio-system install/kubernetes/helm/istio

    

- Deploy application with two deployments

    kubectl lable namespace default istio-injection=enable

    kubectl apply -f $(istioctl kube-inject -f manifest.yaml)

    

- Create Istio resources

    gateway

    destinationRule

    virtualService

    kubectl get gateway,destinationRule,virtualService

    

- Traffic shifting using Istio

- Visualize mesh using Kiali

    kiali是istio的一部分，默认被关闭了

    进入istio chart目录

    helm template --name istio --namespace istio-system --set kiali.enabled=true install/kubernetes/helm/istio > $HOME/istio.yaml

    kubectl apply -f $HOME/istio.yaml

    

**6. Deployment Pipelines**

- Skaffold

    k8s的流水线，本地的

    helm delete <chart-name> -- purge

    brew install skaffold

    skaffold version

    skaffold.yaml build deploy

    skaffold dev 就会编译，build image，deploy

    退出skaffold，会删除已经部署的资源

    

- AWS CodePipeline

    创建k8s role

    修改aws auth config map

    获取github的密钥

    在aws web页面上设置codepipeline

    

**Conclusion**

- Next steps
