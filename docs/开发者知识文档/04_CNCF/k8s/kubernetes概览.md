k8s gitbook

https://feisky.gitbooks.io/kubernetes/content/





安装Helm

 

$ curl https://raw.githubusercontent.com/kubernetes/helm/master/scripts/get > get_helm.sh

$ chmod 700 get_helm.sh

$ ./get_helm.sh

 

 

Helm手写Chart

 

https://mp.weixin.qq.com/s?__biz=MzI3MTI2NzkxMA==&mid=2247486154&idx=1&sn=becd5dd0fadfe0b6072f5dfdc6fdf786&chksm=eac52be3ddb2a2f555b8b1028db97aa3e92d0a4880b56f361e4b11cd252771147c44c08c8913&mpshare=1&scene=23&srcid=0809XT1uzvaUqkaWiouHAUv4%23rd



## tips

### CNCF 官方大使张磊：Kubernetes 是一个“数据库”  从数据的角度看k8s

https://my.oschina.net/u/3874284/blog/4286585



## kubectl 实用命令

```bash
# 可以这样临时切换kubectl的指向
export KUBECONFIG=/Users/wangrollin/code_base/wb2c-helm/k8s/bigdata/config


kubectl scale --replicas=0 -n wechat deployment/acl-content-service && \
kubectl scale --replicas=0 -n wechat deployment/acl-configuration-service && \
kubectl scale --replicas=0 -n wechat deployment/acl-eureka-service && \
kubectl scale --replicas=0 -n wechat deployment/acl-service-gateway && \
kubectl scale --replicas=0 -n wechat deployment/acl-wechat-api-service && \
kubectl scale --replicas=0 -n wechat deployment/acl-wechat-auth-service && \
kubectl scale --replicas=0 -n wechat deployment/acl-wechat-countly-service && \
kubectl scale --replicas=0 -n wechat deployment/acl-wechat-miniapp-service && \
kubectl scale --replicas=0 -n wechat deployment/acl-wechat-miniapp-session-service

```



## k8s yaml

```yaml
env:
- name: MY_POD_NAME
  valueFrom:
    fieldRef:
      fieldPath: metadata.name
- name: MY_POD_NAMESPACE
  valueFrom:
    fieldRef:
      fieldPath: metadata.namespace
- name: MY_POD_IP
  valueFrom:
    fieldRef:
      fieldPath: status.podIP
- name: REFERENCE_EXAMPLE
  value: "$(MY_NODE_NAME)"
```



## Orphaned pod found - but volume paths are still present on disk

```bash
docker logs -f --tail 500 kubelet

sudo -i
cd /var/lib/kubelet/pods/
rm -rf xxx
```



## k8s临时学习小组：Learning Kubernetes

**1. Containerization with Kubernetes**

- Other implementations

    docker swarm, rancher, mesos, k8s

**2. Kubernetes: The Terminology**

- Architecture of a Kubernetes cluster

    pod是k8s的最小操作单元

    

- Basic building blocks: Nodes and pods

    一个pod有一个独立的ip

    不要直接用pod，pod不会自我修复重启

    状态集合：

    ​	pending

    ​	running

    ​	succeeded

    ​	failed

    ​	crashLoopBackOff

    

- Deployments, jobs, and services

    deployment = pod * replicaSet 有状态，会被维护

    service

    ​	internal ip：cluster ip

    ​	external：nodePort

    ​	loadbalancer：

    job：里面的pod都结束了，exit code =0，就算succeed

    cronjob：定时跑

    DaemonSet：1个node有一个pod

    

- Labels, selectors, and namespaces

- Kubelet and kube proxy

    Kubelet：k8s node agent，只管理由api server创建的容器

**3. Kubernetes 101: Hello World**

- Getting up and running: Mac install

- Getting up and running: Windows install

- Running a first Hello World application

    kubectl run hw --image=wangrollin/helloworld -- port=80

    回显：deployment "hw" created

    kubectl expose deployment hw --type=NodePort

    回显：service "hw" exposed

    minikube service hw

    

- Breaking down the Hello World application

    kubectl get all

    kubectl get deploy/hw -o yaml

    

- Scaling the Hello World application

    kubectl scale --replicas=3 deploy/helloworld

    

**4. Making it Production Ready**

- Add, change, and delete labels

    查：kubectl get pods --show-labels

    增改：kubectl label po/helloworld app=helloworldapp --overwrite

    删：kubectl label po/helloworld app-

    

- Working with labels

    search

    kubectl get pods --selector env=production

    kubectl get pods --selector env=production,dev-lead=rollin

    kubectl get pods -l env!=production,dev-lead=rollin

    kubectl get pods -l 'release-version in (1.0,2.0)'

    kubectl get pods -l 'release-version notin (1.0,2.0)'

    kubectl delete pods -l dev-lead=rollin

    

- Application health checks

    kubectl describe pod/helloworld

    

- Handling application upgrades

    kubectl create -f helloworld.yaml --record

    kubectl set image deploy/helloworld containerName=wangrollin/helloworld:bule

    kubectl get rs

    回显：两个rs，一个是记录的但是没有用，一个是在使用的

    kubectl rollout history deploy/helloworld

    kubectl rollout undo deploy/helloworld

    kubectl rollout undo deploy/helloworld --to-revision=2

    

- Basic troubleshooting techniques

    看envents

    kubectl describe deploy helloworld

    kubectl describe pod/helloworld

    看log

    kubectl logs podname

    执行命令

    kubectl exec -it podname /bin/bash

    kubectl exec -it podname -c containerName /bin/bash

    

**5. Kubernetes 201**

- Running a more complicated example

- The Kubernetes dashboard

    minikube addons list

    minikube dashboard

    minikube addons enable heapster

    

- Dealing with configuration data

    kubectl create configmap logger --from-literal=log_level=debug

    kubectl get configmaps

    kubectl get configmap/logger -o yaml

    

- Dealing with application secrets

    kubectl create secret generic apikey --from-literal=api_key=1234567

    apikey created

    kubectl get secrets

    kubectl get secret apikey

    kubectl get secret apikey -o yaml

    回显中data的值是base64编码后的格式

    

- Running jobs in Kubernetes

    kubectl get pods --show-all 可以把已完成的job也列出来

    kubectl get cronjobs

    kubectl edit cronjobs/helloCron 把suspend 设置成true，就是停止了cronjob，改成false就继续了

    

- Running stateful set applications

    daemonSet: 每个节点都会有一个pod

    kubectl get daemonsets

    可以在daemon的yaml中设置nodeselector选择部署在哪里

    kubectl get statefulsets

    

**6. Advanced Topics**

- Production Kubernetes deployments

    用kubeadm来安装k8s

    kops：在aws上安装k8s集群

    

- Detailed look at namespaces

    namespace是虚拟k8s集群

    kubectl get namespaces

    kubectl create ns xxx

    kubectl delete ns xxx

    

- Monitoring and logging

    cAdvisor：自动收集nodes上的容器，并监视它们的cpu ram等等

    heapster：

    prometheus：

    grafana：上面三个都能连过来

    kibana elasticsearch fluentd

    

- Authentication and authorization

    四种认证方式

    client certs: --client-ca-file=FILENAME

    static token files(static password file): --token-auth-file=FILE_WITH_TOKENS

    openid connect: 

    webhook mode: 

    

    三种授权方式：

    ABAC: attribute-based access control

    RBAC: role-based access control

    webhook: 

    

**Conclusion**

- Next steps

    kubecon

    dockercon





## k8s临时学习小组：Kubernetes: Cloud Native Ecosystem



**Introduction**

- Welcome

    CNCF、kubernetes meetups、kubeCon、

- What you need to know

**1. Cloud Native Computing Foundation (CNCF)**

- What is the CNCF?

- First look at the CNCF landscape

    白色的代表开源、灰色的代表闭源

    大图标代表是CNCF的项目

    核心：kubernetes、coreDns、grpc、linkerd、envoy

**2. Management and Orchestration**

- Building and deploying cloud native apps

    gRPC：google的，稳定、快速

- Service discovery and coordination

    coreDns：eureka

- Managing cloud native services

    linkerd、envoy

**3. Networking and Runtime**

- Container networking

    cni：calico、flannel

- Container storage and runtime projects

    Rook、ceph、GlusterFS

**4. Application Observability, Analysis, and Security**

- Cloud native monitoring with Prometheus

    Prometheus、grafana

- Logging with Fluentd

    kibana、elasticsearch、Fluentd

- Application tracing

    Debug：Jaeger、openTracing、zipkin

- Security projects

    image、key的安全

    vault、notory、TUF、clair、aqusec prodict suite

**Conclusion**

- The CNCF today and tomorrow

    k8s slack





## k8s临时学习小组：Kubernetes for Java Developers

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





## k8s临时学习小组：Learning Azure Kubernetes Service (AKS)

**Introduction**

- Manage Kubernetes infrastructure with AKS（Azure Kubernetes Service）

    azure command line （az）

- What you should know

**1. Kubernetes on Azure**

- Deployment models

    大多数k8s服务商都把master和worker节点分开了，master由服务商维护，我们只需要关心worke就行了

- Create the Azure Container Registry

    创建资源组：az group create --name myResourceGroup --location southeastasia

    创建自己的registry：az acr create --resource-group myResourceGroup --name akscoursew --sku Basic

    登陆azure container registry（acr）：az acr login --name akscoursew

- Push a container to the registry

    查看拥有的registry：az acr list --resource-group myResourceGroup --query "[].{acrLoginServer:loginServer}" --output tsv

    回显：akscoursew.azurecr.io

    查看registry里的镜像：az acr repository list --name akscoursew --output tsv

    回显：busybox

    查看具体的版本号：az acr repository show-tags --name akscoursew --repository busybox --output tsv

- Verify container registry image

    docker rmi <registry/image:version>

- Establish AKS specific credentials

    Azure Active Directory (ad) service principal (sp) role-based-access (rbac)

    创建一个基于角色的访问：az ad sp create-for-rbac --skip-assignment

    回显：

    {
      "appId": "appId",
      "displayName": "azure-cli-2020-02-12-09-14-41",
      "name": "http://azure-cli-2020-02-12-09-14-41",
      "password": "password",
      "tenant": "tenant"
    }

    查看acr的id：az acr show --resource-group myResourceGroup --name akscoursew --query "id" --output tsv

    回显：/subscriptions/411f0d5a-1bb8-4caf-a050-defc0ebff6c2/resourceGroups/myResourceGroup/providers/Microsoft.ContainerRegistry/registries/akscoursew

    让service principal能链接上acr：az role assignment create --assignee <appId> --scope <acrId> --role Reader

    az role assignment create --assignee d7529f08-f46b-4e3e-8c19-527e19cbf128 --scope /subscriptions/411f0d5a-1bb8-4caf-a050-defc0ebff6c2/resourceGroups/myResourceGroup/providers/Microsoft.ContainerRegistry/registries/akscoursew --role Reader

    回显：

    {
      "canDelegate": null,
      "id": "/subscriptions/411f0d5a-1bb8-4caf-a050-defc0ebff6c2/resourceGroups/myResourceGroup/providers/Microsoft.ContainerRegistry/registries/akscoursew/providers/Microsoft.Authorization/roleAssignments/4a71dec3-17f7-4161-aa8e-ca02e651e209",
      "name": "4a71dec3-17f7-4161-aa8e-ca02e651e209",
      "principalId": "4aa69f18-82ac-473a-95d9-4cfc88ce6384",
      "principalType": "ServicePrincipal",
      "resourceGroup": "myResourceGroup",
      "roleDefinitionId": "/subscriptions/411f0d5a-1bb8-4caf-a050-defc0ebff6c2/providers/Microsoft.Authorization/roleDefinitions/acdd72a7-3385-48ef-bd42-f606fba81ae7",
      "scope": "/subscriptions/411f0d5a-1bb8-4caf-a050-defc0ebff6c2/resourceGroups/myResourceGroup/providers/Microsoft.ContainerRegistry/registries/akscoursew",
      "type": "Microsoft.Authorization/roleAssignments"
    }

- Launch an AKS cluster

    不知道在干啥：az extension add --name aks-preview

    

    创建aks：

    az aks create \
        --resource-group myResourceGroup \
        --name myAKSCluster \
        --node-count 1 \
        --max-pods 20 \
        --kubernetes-version 1.12.4 \
        --generate-ssh-keys \
        --enable-vmss \
        --enable-cluster-autoscaler \
        --min-count 1 \
        --max-count 3 \
        --service-principal <appId> --client-secret <password> 

    az aks create \
        --resource-group myResourceGroup \
        --name myAKSCluster \
        --node-count 1 \
        --max-pods 30 \
        --kubernetes-version 1.14.8 \
        --generate-ssh-keys \
        --enable-vmss \
        --enable-cluster-autoscaler \
        --min-count 1 \
        --max-count 3 \
        --service-principal d7529f08-f4xxxxxxxxxxxx527e19cbf128 --client-secret feb46a8xxxxxxxxxxxea-5ab5052d535a 

    

    az aks create \
    --resource-group myResourceGroup \
    --name myAKSCluster2 \
    --node-count 1 \
    --max-pods 50 \
    --kubernetes-version 1.17.0 \
    --generate-ssh-keys \
    --enable-vmss \
    --enable-cluster-autoscaler \
    --min-count 1 \
    --max-count 3 \
    --service-principal d7529fxxxxxxxxxx9-527e19cbf128 --client-secret feb46a8f-xxxxxxxxxxxb5052d535a

    两种密钥：用户的，管理员的

    查看当前地区支持的k8s版本：az aks get-versions -l southeastasia

    

    报错：Subscription 411f0d5a-1bb8-4caf-a050-defc0ebff6c2 is not registered with NRP

    解决方法：https://stackoverflow.com/questions/59815802/unable-to-create-aks-cluster-on-azure

    you have to go into All services -> Subscriptions -> Resource providers

    And get this registered.  Microsoft.Kubernetes Registered

    

    报错：TunnelDNSReconciler retry failed: tunnel IP is not specified

    解决方法：没找到，就此中断练习

    

    安装kubectl：az aks install-cli

    查看aks密钥：az aks get-credentials --resource-group myResourceGroup --name myAKSCluster2 --admin

    会把密钥放到kubectl能找到的地方，所以kubectl自动就连上了

    kubectl get nodes

    kubectl version

**2. Scaling AKS Workers**

- Selecting worker sizing

    --node-osdisk-size
    Size in GB of the OS disk for each node in the node pool. Minimum 30 GB.

    --node-vm-size
    Size of Virtual Machines to create as Kubernetes nodes.
    default value: Standard_DS2_v2

    Get a list of sizes with the az vm command:
    查看某一个地区的vm型号列表：az vm list-sizes -l eastus

    --max-pods
    Maximum number of PODs to schedule to a node

    

- Deploy a simple app

    az acr list --resource-group myResourceGroup --query "[].{acrLoginServer:loginServer}" --output tsv

    kubectl apply -f busybox.yml

    kubectl get svc hostname -w

    

- Scaling pods and nodes

    kubectl scale --replicas=5 deployment/hostname-v1
    kubectl get pods

    kubectl autoscale deployment hostname-v1 --cpu-percent=50 --min=3 --max=10

    kubectl get hpa
    kubectl get pods

    az aks scale --resource-group myResourceGroup --name myAKSCluster --node-count 3

    kubectl delete hpa hostname-v1
    kubectl scale --replicas=25 deployment/hostname-v1

    kubectl get pods -o wide -w

    

- Set up nodes

    az aks update --disable-cluster-autoscaler --resource-group myResourceGroup --name myAKSCluster
    az aks scale --resource-group myResourceGroup --name myAKSCluster --node-count 2

    kubectl get nodes 

    kubectl label node <new_node_name> anykey=anyvalue

    

    spec:
      nodeSelector:
        anykey: anyvalue

    

    kubectl apply -f hostname-anykey.yml

    kubectl apply -f hostname.yml
    kubectl scale deploy hostname-v1 --replicas=5

    kubectl get pods -o wide | awk '{print $1 " " $7}'

    

- Using labels to select pools

**3. AKS Storage and Networks**

- AKS storage overview

    In AKS, two initial StorageClasses are created:

    default - Uses Azure Standard storage to create a Managed Disk. The reclaim policy indicates that the underlying Azure Disk is deleted when the pod that used it is deleted.

    managed-premium - Uses Azure Premium storage to create Managed Disk. The reclaim policy again indicates that the underlying Azure Disk is deleted when the pod that used it is deleted.

    Additional storage classes can be create with kubectl.

    Lets create a managed premium storage class details that will retain the persistent volume after pod deletion:

    kind: StorageClass
    apiVersion: storage.k8s.io/v1
    metadata:
      name: managed-premium-retain
    provisioner: kubernetes.io/azure-disk
    reclaimPolicy: Retain
    parameters:
      storageaccounttype: Premium_LRS
      kind: Managed

    

- Creating storage classes

    ReadWriteOnce指的是pvc只能和一个pod建立联系

    

- Storage: Persistent claims

    获取aks的名字：az aks show --resource-group myResourceGroup --name myAKSCluster2 --query nodeResourceGroup -o tsv

    创建一个storage account，来使用file style，从而可以ReadWriteMany：az storage account create -n myaksstorageaccount -g MC_myResourceGroup_myAKSCluster_eastus -l eastus --sku Standard_LRS

    

    Create the storage class:
    kubectl apply -f file_sc.yml

    And the Cluster Role and Role Binding (RBAC parameters):
    kubectl apply -f files_pvc_roles.yml

    Finally, we can create a shared PVC:
    kubectl apply -f file_pvc.yml

    Lastly, we can see that the file was created:
    kubectl get pvc azurefile

    And if we attach the PVC to a pod as we did previously, we can attach more than one POD to the same file resource:

    kubectl apply -f hostname_files.yml

    And we can now write into, and read from the two pods to see that the both mount the same filesystem:

    kubectl exec -it $(kubectl get pod -l app=hostname-file -o jsonpath='{.items[0].metadata.name}') -- sh -c 'hostname > /www/hostname; cat /www/hostname'
    kubectl exec -it $(kubectl get pod -l app=hostname-file -o jsonpath='{.items[1].metadata.name}') -- sh -c 'cat /www/hostname'



- Shared volumes

- Create resource for shared volume

- Challenge: Lost volumes

- Solution: Find and remove PVs

    有些Persistent Volumes有数据残留，怎么处理？

    Persistent Volumes and Persistent Volume Claims are resources that can be discovered in our Kubernetes enviornment:

    kubectl get pvc
    kubectl get pv

    We should also clean up any PODs that have PVCs (and therefore PVs) associated with them:

    kubectl get deployments
    kubectl get pods

    We can then delete unwanted resources:

    kubectl delete deployment <deploymentName>

    kubectl delete pvc <pvcName>

    kubectl delete pv <pvName>

    And for good measure we should see if we have any services that are no longer needed as well:

    kubectl get service
    kubectl delete svc <serviceName>

    

- Networking and AKS

- Load balancing and Ingress: Setup

    There are multiple ways to implement Ingress in an Azure cluster, but we can make use
    of an extension that also includes a DNS service extension.

    Firstly, let's add the add-on Ingress controller and DNS service:

    az aks enable-addons --resource-group myResourceGroup --name myAKSCluster --addons http_application_routing

    

    Then we can check to see what the root of our applications DNS will be:

    $ az aks show --resource-group myResourceGroup --name myAKSCluster --query addonProfiles.httpApplicationRouting.config.HTTPApplicationRoutingZoneName -o table

    

    When we create an ingress and assoicate it with our application service, we will add the ingress name to this dns domain to get our DNS 'pointer' back to our application.  e.g. if we create an ingress called hostname, then our new pointer will be:

    hostname.{DNS_root}

    

- Load balancing and Ingress: Part 2

    As ingress tries to match resoruces, and our DNS controller (part of the Azure ingress extension) will automatically add its cluster specific domain, we will need to add the DNS name to our
    ingress controller definition.  change the <CLUSTER_SPECIFIC_DNS_ZONE> to the zone discovered
    in the previous section with:
    az aks show --resource-group myResourceGroup --name myAKSCluster --query addonProfiles.httpApplicationRouting.config.HTTPApplicationRoutingZoneName -o table

    or if you stored the name from the previous chapter:
    cat ../dns_root.txt

    In the file the line is:
      - host: hostname.<CLUSTER_SPECIFIC_DNS_ZONE>
      - 

    Then apply the ingress to our environment:
    kubectl apply -f hostname_ingress.yml

    

    and then we can test for dns update (which may take a few minutes):

    while [ 1 ] ; do
    curl http://hostname.<CLUSTER_SPECIFIC_DNS_ZONE>
    sleep 30
    done

    

    Or paste the URL into your browser, and refresh every minute or so until the DNS resource has propogated through the internet.

    

**4. Managing AKS Deployments**

- AKS and K8s RBAC

    Programatic access of our Kubernetes environment often requires access control from _within_ the Kubernetes services themselves, and this access is often accomplished by a service account resource.

    In this example we'll install the Helm application management environment, which requires a local client (helm), and which will leverage our local credentials to install a management application into Kubernetes.  The helm client does not, however, create the required cluster level roles and role bindings or service account to establish proper communications with the kubernetes enviornment, so we'll do that.

    First we need helm installed as a client on our workstation, and then we can install RBACresources and the Kubernetes service side component in our AKS system.  Get the helm binary for your enviornment here:

    MacOSX:
    https://storage.googleapis.com/kubernetes-helm/helm-v2.11.0-darwin-amd64.tar.gz

    Linux:
    https://storage.googleapis.com/kubernetes-helm/helm-v2.11.0-linux-amd64.tar.gz

    Windows:
    https://storage.googleapis.com/kubernetes-helm/helm-v2.11.0-windows-amd64.zip

    Or use a package manager like brew on OSX.

    Then we can install the RBAC configuration for tiller so that it has the appropriate access, and lastly we can initialze our helm system:

    kubectl create -f helm-rbac.yaml
    helm init --service-account=tiller

    

- Using Azure Monitor with AKS

    You can create a new default workspace by enabling the add-on for our cluster:

    az aks enable-addons -a monitoring -n myAKSCluster -g myResourceGroup

    

    Once installed, we should be able to see that the monitoring agent has been installed in the kube-system namespace:
    kubectl get ds omsagent --namespace=kube-system

    

    To view output, we need to use the Azure web portal:

    In the resource pane at the far left (it may be collapsed, in which case expand it), select the "All Services" panel, and search for Kubernetes.

    Select the Kubernetes services, and then select your test cluster (myAKSCluster if you used the same name in the course).

    Then select Monitoring, and we can sort through log and monitoring data from nodes to individual contaiers. Note it may take up to 15 minutes for data collection to be displayed as the services may need to synchronize first.

    

- K8s native: Prometheus

    To add metrics to our Kubernetes enviornment, we'll use Helm to install Prometheus.

    Note: we've installed helm as a part of a previous chapter.

    helm install --name promaks --set server.persistentVolume.storageClass=default stable/prometheus

    

    Once Prometheus is installed, and once it completes it's launch process (which may take a few minutes), we can locally expose the Prometheus UI to look at some of the captured metircs.  We'll do this by forwarding the UI's port to our local machine as the UI application doesn't have any access control defined.

    kubectl --namespace default port-forward $(kubectl get pods --namespace default -l "app=prometheus,component=server" -o jsonpath="{.items[0].metadata.name}") 9090 &

    

    Once the portforward is working, we can point a web browser at:

    http://localhost:9090

    look to see what metrics are being gathered.

    container_cpu_usage_seconds_total

    And we can also generate a little load if we'd like:

    kubectl apply -f hostname.yml
    kubectl apply -f curl.yml
    kubectl exec -it $(kubectl get pod -l app=curl -o jsonpath={.items..metadata.name}) -- \
    sh -c 'while [[ true ]]; do curl -o - http://hostname/version/ ; done'

    

**Conclusion**

- Next steps





## k8s临时学习小组：Kubernetes: Microservices

**Introduction**

- Welcome
- What you should know
- Exercise files

**1. Introduction to Microservices**

- Microservices 101
- Benefits of a microservices architecture
- Common microservices patterns

**2. Microservices Using the Kubernetes Paradigm**

- Microservices patterns in Kubernetes
- Microservices building blocks
- Deployment patterns
- Runtime patterns

**3. Example K8s Microservices Application**

- From monolith to microservice

- Microservice deployment to Kubernetes

    Deploying our application to Kubernetes

    We're ready to deploy our application to Kubernetes, but let's take a look at our assets.

    Goals:
    1. View our sample application and containers
    2. Take a look at our deployment file 
    3. Take a look at our alternate deployment file
    4. Deploy our application into kubernetes and verify we can see our API's working.

    Goal 1
    View the sample application here: 

    Goal 2
    To view the deployment file, take a look at wishlist-deployment.yaml

    Goal 3
    To see another way to run the microservices, take a look at wishlist-deployment-alernate.yaml

    Goal 4
    To run the microservice described in goal #1, from the current directory, run:

    `kubectl create -f wishlist-deployment.yaml`

    To verify that the deployment is online:
    `kubectl get deployments`

    To verify that the replica sets are running:
    `kubectl get rs`

    To verify that the pods are running:
    `kubectl get pods`

    To see the services:
    `kubectl get services`

    To interact with your API's in the minikube environment:
    `minikube service wishlist-service`

    

- Alternate deployment YAML

    Alternate Universe!


    Goals:
    1. Take a look at our alternate deployment file
    
    Goal 1
    Take a look at our alternate deployment file


​    

- Adding context with configmaps

    Configmaps

    Configuration information should live outside of the application. How can we do this in Kubernetes?

    Goals
    1. Create a configmap that can be referenced by the application via env variables
    2. Create a configmap that can be referenced by the application via a volume mounted file


    Goal 1
    Create the deployment by running 
    `kubectl apply -f wishlist-deployment-configmap-simple.yaml`
    
    Exec into the auth container in the wishlist pod with a command like:
    `kubectl exec -it wishlist-<podid> -c auth bash`
    
    To look find your env variable run:
    `env | grep LOG_LEVEL`


    Goal 2
    Create the deployment by running 
    `kubectl apply -f wishlist-deployment-configmap-advanced.yaml`
    
    Exec into the auth container in the wishlist pod with a command like:
    `kubectl exec -it wishlist-<podid> -c auth bash`
    
    To look find your env variable run:
    `cat /var/lib/wishlist/log.properties`


​    

- Working with sensitive configuration

    Secrets!


    Goals
    1. Create a secret that can be referenced by the application via env variables
    2. Create a secret that can be referenced by the application via a volume mounted file


    Goal 1
    Create the deployment by running 
    `kubectl apply -f wishlist-deployment-secret.yaml`
    
    To look find your env variable run:
    `env | grep MYSQL_CONNECTION_STRING`


    Goal 2
    
    Create the deployment by running 
    `kubectl apply -f wishlist-deployment-secret.yaml`
    
    To look find your env variable run:
    `cat /etc/mysql/connection-string`


​    

- Adding liveness probes

    Liveness Probes

    Goals: 
    1) Understand liveness probes in Kubernetes

    Goal 1
    Liveness Probes are often used in deployments with many containers. They help with startup and container running states (https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/#container-probes )

    To run our example:
    `kubectl apply -f wishlist-deployment-liveness.yaml`

    To see if our probes are running:
    `kubectl describe <pod_name>`

    

**4. Advanced Topics**

- Deployment with Helm

    Helm

    Goals:
    1. Understand what Helm is.
    2. Understand what Helm is with respect to our application
    2. Run the helm chart for our application


    Goal 1
    Helm (https://helm.sh) is a package manager for Kubernetes. Kubernetes is all about yaml files, and after a while, when your yaml files grow large, it becomes incredibly painful to debug issues.
    
    This is why people use Helm- to manage complexity in their yaml's. It also provides a way to easily update and rollback their kubernetes artifacts. And finally, it's also the most popular place to find user generated charts. Think of it like the maven or npm for Kubernetes
    
    Goal 2
    Take a look at the wishlist folder for our deployment and service converted to a helm chart.
    
    Goal 3
    
    I already have helm installed via the instructions at: https://docs.helm.sh/using_helm/#installing-helm
    
    For reference, I'm running: 
    ```
    helm version
    Client: &version.Version{SemVer:"v2.8.2", GitCommit:"a80231648a1473929271764b920a8e346f6de844", GitTreeState:"clean"}
    Server: &version.Version{SemVer:"v2.8.2", GitCommit:"a80231648a1473929271764b920a8e346f6de844", GitTreeState:"clean"}
    ```
    
    To see existing charts:
    `helm ls`
    
    To see the tiller components:
    `kubectl get deployments --all-namespaces`
    
    To run our helm chart:
    `helm install --generate-name -n wishlist-chart  -f values.yaml . `
    
     helm install --generate-name -n default  -f values.yaml . 
    
    helm install --name aName -n default  -f values.yaml . 


​    

- Service proxying with Envoy

    Playing with ingress controllers

    Goals:
    1. Understand what ingress/envoy is.
    2. See how envoy fits in...
    3. How it can be implemented with Contour and envoy

    Goals 1
    What is it?
    Services are of 3 types: ClusterIP, NodePort and Loadbalancers. ClusterIP and NodePort are used for applications internal to your infrastructure. For applications that you'd want to expose externally, you'd use a loadbalancer service. This is great, but for every endpoint, you'd end up using another loadbalancer resource from your cloud provider, and costs you a bit more.

    Ingress allows you you to route requests to services based on the request host or path, centralizing a number of services into a single entrypoint. So think of it as the central point for 1 entrypoint for multiple requests, where loadbalancer is a 1 entrypoint for a specific host or path.

    Ingress information: https://kubernetes.io/docs/concepts/services-networking/ingress/#what-is-ingress

    Goals 2
    Envoy is a simple service proxy that proxies traffic from one source to another. The goal of envoy is to make networking and observability of your applications more visible.

    When all service traffic flow through an Envoy mesh, you can visualize problem areas via consistent observability, tune overall performance or add features like rate limiting in a single spot.

    Link: https://www.envoyproxy.io/

    It's also common to see it used an ingress controller either by itself, or using another package that extends it- like Heptio Contour (https://github.com/heptio/contour). We'll use contour for our example.

    Goals 3

    First, we need to add Contour to our cluster. I'm going to follow the docs (https://github.com/heptio/contour#add-contour-to-your-cluster), and install Contour with:

    `kubectl apply -f https://j.hept.io/contour-deployment-rbac`

    Then, I'll deploy my application:
    `kubectl apply -f wishlist-contour.yaml`

    To check the status:
    `kubectl get ing`

    To get the contour ingress URL, I can run:
    `minikube service -n heptio-contour contour --url`

    You can hit the host:port/wishlist URL to see the wishlist API's working.

    

- Metrics with Prometheus

    Prometheus

    Goals:
    1. Deploy Prometheus
    2. See it running!
    3. View Kubernetes stats
    4. View node information
    5. View application metrics

    Prometheus + Kubernetes demo

    Step 1: Deploy
    Helm is the easiest way to do this. Check out `https://github.com/kubernetes/charts/tree/master/stable/prometheus`.

    We can run `helm install stable/prometheus` to get the stock prometheus server.

    In this case, we will run: `helm install stable/prometheus --name prom-demo -f values.yaml` to use our custom yaml.

    Step 2: See it running
    Running `minikube service prom-demo-prometheus-server` will bring up the browser with prometheus server running.

    Step 3: Check out Kubernetes stats
    Check out `count(kube_pod_container_status_running)` to see our all our pods running.

    Step 4: Check out node information

    The node exporter gives you node relative information as well like CPU/disk usage etc.

    Run `count(node_cpu{mode="system", instance="192.168.99.100:9100"})` will return the cpu count which should match the number of CPU's in `kubectl describe nodes`

    Step 5: App metrics

    1. Run the app: `kubectl apply -f wishlist.yaml`

    2. Visit the app after it's deployed: `minikube service wishlist-service`

    3. You'll see the  `/metrics` endpoint with go stats

    4. Visit the `/products` endpoint 5 times.

    5. You'll see a new "product_calls" metric in the dashboard

        

- Logging with Fluentd

    Logging from your application

    Goals
    1. Start up EFK stack in minikube
    2. Run your application and see the logs in Kibana

    Goal 1
    We can start up the EFK (Elastic-Fluentd-Kibana) stack in minikube. Installing these components is a little bit of work, but minikube gives it to us as an addon.

    `minikube addons enable efk`

    Note, this will take a while, and you probably want to use minikube in a high memory mode.

    Once it's up and running, visit and configure Kibana by going to the URL by typing:

    `minikube addons open efk`

    Goal 2
    Now let's deploy our application by running

    `kubectl apply -f wishlist-deployment.yaml`

    The app has some logs in it that we can look at in Kibana.

    

- Tracing issues with Jaeger

    First look at Jaeger

    Goals:
    1. Understand what Jaeger does
    2. See it running
    3. See data flowing in it for the hotrod application

    Goals 1
    What is Jaeger?

    Jaeger is a distributed tracing analyzer that was released by Uber. It is compatible with the opentracing standard and both opentracing and Jaeger are CNCF projects. If you're new to the space, think of Jaeger as an opensource New Relic

    https://github.com/jaegertracing/jaeger-kubernetes

    Once deployed, startup Jaeger with `minikube service jaeger-query`

    Goals 2
    See it in action!

    We can install Jaeger from the github site for their kubernetes project: https://github.com/jaegertracing/jaeger-kubernetes

    Goals 3
    Let's deploy our sample application with the command:
    `kubectl apply -f jaeger-example.yaml`

    

**Conclusion**

- Next steps

