

## 官网

https://www.consul.io/





## docker起consul

https://hub.docker.com/_/consul

https://learn.hashicorp.com/consul/day-0/containers-guide



```bash



docker run \
    -p 8500:8500 \
    -p 8600:8600/udp \
    -v /Users/wangrollin/Downloads/consul.data:/consul/data \
    --name=badger \
    consul agent -server -ui -node=server-1 -bootstrap-expect=1 -client=0.0.0.0


docker exec badger consul kv put redis/config/min 1
docker exec badger consul kv put redis/config/max 2
docker exec badger consul kv get redis/config/max



```





## 官网快速上手指南

### Install Consul

```bash
brew install consul

```



### Run the Consul Agent

```bash
# run Consul in development mode, which isn't secure or scalable

# Server and Client Agents
# In production you would run each Consul agent in either in server or client mode
# at least one server mode is done, responsible for maintaining Consul's state
# 不推荐 single-server production deployments.
# In order to make sure that Consul's state is preserved even if a server fails, you should always run either three or five servers in production. 奇数个server最好，性能和高可用
# Never run Consul in -dev mode in production.

# Starting the Agent
consul agent -dev
consul agent -dev -node machine

# Datacenter Members
# 查询 client
consul members
consul members -detailed
# 查询 server 更准确
curl localhost:8500/v1/catalog/nodes

# In addition to the HTTP API, you can use the DNS interface to discover the nodes. The DNS interface will send your query to the Consul servers unless you've enabled caching. To perform DNS lookups you have to point to the Consul agent's DNS server, which runs on port 8600 by default. The format of the DNS entries (such as Judiths-MBP.node.consul) will be covered in more detail later.
dig @127.0.0.1 -p 8600 wangrollin_mbp.node.consul

# Stopping the Agent
# 优雅的关闭
consul leave
# Forcibly killing the agent process indicates to other agents in the Consul datacenter that the node failed instead of left. When a node fails, its health is marked as critical, but it is not removed from the catalog. Consul will automatically try to reconnect to a failed node, assuming that it may be unavailable because of a network partition, and that it may be coming back.

```



### Register a Service and Health Check - Service Discovery

```bash
# One of the major use cases for Consul is service discovery. Consul provides a DNS interface
# register a service and health check ，by providing Consul with a configuration file
# use Consul discover its location using the DNS interface and HTTP API.

# Defining a Service
# You can register services either by providing a service definition, which is the most common way to register services, or by making a call to the HTTP API. Here we will use a service definition.
# a common convention on Unix systems is to name the directory something like /etc/consul.d (the .d suffix implies "this directory contains a set of configuration files").
mkdir ./consul.d

echo '{"service":
  {"name": "web",
   "tags": ["rails"],
   "port": 80
  }
}' > ./consul.d/web.json

# Security Warning: Enabling script checks in some configurations may introduce a remote execution vulnerability which is known to be targeted by malware. In production we strongly recommend -enable-local-script-checks instead.
consul agent -dev -enable-script-checks -config-dir=./consul.d
consul agent -dev -enable-local-script-checks -config-dir=./consul.d

# In a multi-agent Consul datacenter, each service would register with its local Consul client, and the clients would forward the registration to the Consul servers, which maintain the service catalog.

# Querying Services
# Once the agent adds the service to Consul's service catalog you can query it using either the DNS interface or HTTP API.

# DNS Interface
# The DNS name for a service registered with Consul is NAME.service.consul
# By default, all DNS names are in the consul namespace
# Query the DNS interface (which Consul runs by default on port 8600) for the registered service.
dig @127.0.0.1 -p 8600 web.service.consul

;; ANSWER SECTION:
web.service.consul. 0   IN  A   127.0.0.1

;; ADDITIONAL SECTION:
web.service.consul. 0   IN  TXT "consul-network-segment="

# As you can see, an A record was returned containing the IP address where the service was registered. A records can only hold IP addresses.

# Tip: Since we started consul with a minimal configuration, the A record will return local host (127.0.0.1). Set the Consul agent -advertise argument or the address field in the service definition if you want to advertise an IP address that is meaningful to other nodes in the datacenter.

# as a SRV record.
dig @127.0.0.1 -p 8600 web.service.consul SRV

;; ANSWER SECTION:
web.service.consul. 0   IN  SRV 1 1 80 Judiths-MBP.lan.node.dc1.consul.

;; ADDITIONAL SECTION:
Judiths-MBP.lan.node.dc1.consul. 0 IN   A   127.0.0.1
Judiths-MBP.lan.node.dc1.consul. 0 IN   TXT "consul-network-segment="

# Finally, you can also use the DNS interface to filter services by tags. The format for tag-based service queries is TAG.NAME.service.consul.
dig @127.0.0.1 -p 8600 rails.web.service.consul

# HTTP API
curl http://localhost:8500/v1/catalog/service/web

# The HTTP API lists all nodes hosting a given service.
# Filter your HTTP API query to look for only healthy instances. DNS does automatically under the hood.
curl 'http://localhost:8500/v1/health/service/web?passing'

# Updating Services
# You can update service definitions without any downtime by changing the service definition file and sending a SIGHUP to the agent or running consul reload. Alternatively, you can use the HTTP API to add, remove, and modify services dynamically.
echo '{"service":
  {"name": "web",
    "tags": ["rails"],
    "port": 80,
    "check": {
      "args": ["curl", "localhost"],
      "interval": "10s"
    }
  }
}' > ./consul.d/web.json

# Script based health checks run as the same user that started the Consul process.
# If the command exits with an exit code >= 2, then the check will fail and Consul will consider the service unhealthy. An exit code of 1 will be considered as warning state.

consul reload

```



### Connect Services - Service Mesh

```bash
# In addition to providing IP addresses directly to services with the DNS interface or HTTP API, Consul can connect services to each other via sidecar proxies
# Consul's service mesh feature is called Consul Connect.

# Start a Connect-unaware Service
# socat 不支持TLS，所以可以用sidecar来加密
# Start the socat service and specify that it will listen for TCP connections on port 8181.
socat -v tcp-l:8181,fork exec:"/bin/cat"

nc 127.0.0.1 8181
hello
hello
testing 123
testing 123

# Register the Service and Proxy with Consul
echo '{
  "service": {
    "name": "socat",
    "port": 8181,
    "connect": { "sidecar_service": {} }
  }
}' > ./consul.d/socat.json

consul reload

# This empty configuration notifies Consul to register a sidecar proxy for this process on a dynamically allocated port.  It also creates reasonable defaults that Consul will use to configure the proxy once you start it via the CLI. Consul does not automatically start the proxy process for you. This is because Consul Connect allows you to chose the proxy you'd like to use.
# a L4 proxy

consul connect proxy
consul connect proxy -sidecar-for socat


consul connect proxy -service web -upstream socat:9191


# Register a Dependent Service and Proxy
echo '{"service": {
    "name": "web",
    "port": 8080,
    "connect": {
      "sidecar_service": {
        "proxy": {
          "upstreams": [{
             "destination_name": "socat",
             "local_bind_port": 9191
          }]
        }
      }
    }
  }
}' > ./consul.d/web.json

consul reload

nc 127.0.0.1 9191

consul connect proxy -sidecar-for web

nc 127.0.0.1 9191
hello
hello

# communication between each service and its sidecar proxy is unencrypted. In production, services should only accept only loopback connections. Any traffic in and out of the machine should travel through the proxies and therefore would always be encrypted.

# Control Communication with Intentions
# The connections above succeeded because in development mode, the ACL system (and therefore the default intention policy) is "allow all" by default.
consul intention create -deny web socat
回显：
Created: web => socat (deny)

# will fail.
nc 127.0.0.1 9191

consul intention delete web socat

nc 127.0.0.1 9191

# Note: Changing intentions does not affect existing connections with the current version of Consul. You must establish a new connection to see the effects of a changed intention.

```



### Add to Consul KV - Service Configuration

```bash
# In addition to providing service discovery, integrated health checking, and securing network traffic, Consul includes a key value store, which you can use to dynamically configure applications, coordinate services, manage leader election, or serve as a data backend for Vault,
# Consul key value store (Consul KV)
# Consul KV is enabled automatically on Consul agents
# There are two ways to interact with the Consul KV store: the HTTP API and the CLI.


# Add Data
consul kv put redis/config/minconns 1
consul kv put redis/config/maxconns 25

# Notice that with the key entered below ("redis/config/users/admin"), you set a flags value of 42. Keys support setting a 64-bit integer flag value that isn't used internally by Consul, but can be used by clients to add metadata to any KV pair.
consul kv put -flags=42 redis/config/users/admin abcd1234


# Query Data
consul kv get redis/config/minconns
# Consul retains some additional metadata about the key-value pair. Retrieve the some metadata (including the "flag" you set) using the -detailed command line flag.
consul kv get -detailed redis/config/users/admin

# List all the keys in the store using the recurse options. Results are returned in 字典序 order.
consul kv get -recurse

# Delete Data
consul kv delete redis/config/minconns

# Consul lets you interact with keys in a folder-like way. Although all the keys in the KV store are actually stored flat, Consul allows you to manipulate keys that share a certain prefix as a group, as if they were in folders or subfolders.
#Delete all the keys with the redis prefix using the recurse option.
consul kv delete -recurse redis

# Modify Existing Data
consul kv put foo bar
consul kv get foo 
consul kv put foo zip
consul kv get foo


consul kv put -cas -modify-index=27 foo bar

# will fail
consul kv put -cas -modify-index=123 foo bar

# Summary
# Consul can perform atomic key updates using a Check-And-Set (CAS) operation, and includes other sophisticated options for writing keys and values. You can explore these options on the help page for the consul kv put command.
consul kv put -h

```



### Explore the Consul UI

```bash
# If you were running Consul in production you would need to enable the UI in Consul's configuration file or using the -ui command line flag, but because your agent is running in development mode, the UI is automatically enabled.
consul agent -dev -ui

# Navigate to the UI
http://localhost:8500/ui

# View Services
# The landing page for the UI is the services page, which gives you a list of all registered services
# Try it: filter for sidecar services by typing sidecar in the search bar and pressing the enter key.


# View Nodes


# Manage the Key-Value Store


# Manage Access Control Lists
# Security Warning: The browser can store tokens that you add to the UI.


# Manage Intentions


# Adjust UI Settings

```



##### UI Task Table

| **Page**   | **Action**                   |
| :--------- | :--------------------------- |
| Services   | Read                         |
| Nodes      | Read                         |
| Key/Value  | Create, Read, Update, Delete |
| Intentions | Create, Read, Update, Delete |
| ACLs       | Create, Read, Update, Delete |



So far you have explored the core functionality of Consul, including service discovery, securing services with a mesh, and using the key value store. Continue to the next guide to learn how to set up a Consul datacenter by joining multiple Consul agents together.





### Create a Local Consul Datacenter

```bash
# When a new Consul agent starts, it doesn't know about other agents; it is essentially a datacenter with one member. Agents learn about each other in two ways. To add a new agent to an existing datacenter you give it the IP address of any other agent in the datacenter (either a client or a server),


# Set Up the Environment
# Consul is a distributed application that is designed to have one agent per machine. 
# Make a directory to store Vagrant's configuration for this guide.
mkdir consul-getting-started-join
cd consul-getting-started-join
touch Vagrantfile
https://github.com/hashicorp/consul/blob/master/demo/vagrant-cluster/Vagrantfile

consul agent \
  -server \
  -bootstrap-expect=1 \
  -node=agent-one \
  -bind=172.20.20.10 \
  -data-dir=/tmp/consul \
  -config-dir=/etc/consul.d

consul agent \
  -node=agent-two \
  -bind=172.20.20.11 \
  -enable-script-checks=true \
  -data-dir=/tmp/consul \
  -config-dir=/etc/consul.d


```



### Next Steps

```bash

```











