## Learning Kubernetes

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
