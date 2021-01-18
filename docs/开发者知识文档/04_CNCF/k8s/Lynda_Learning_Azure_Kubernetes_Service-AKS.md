
## Learning Azure Kubernetes Service (AKS)

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
