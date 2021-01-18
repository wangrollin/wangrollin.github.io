## Kubernetes: Microservices

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
