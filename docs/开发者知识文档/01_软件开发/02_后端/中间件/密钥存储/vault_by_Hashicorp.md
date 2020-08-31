



## 官网

https://www.vaultproject.io/


## github项目

[vault-kubernetes-authenticator](https://github.com/sethvargo/vault-kubernetes-authenticator)


## 使用docker 搭建vault

默认启动dev server



The container exposes two optional `VOLUME`s:

- `/vault/logs`, to use for writing persistent audit logs. By default nothing is written here; the `file` audit backend must be enabled with a path under this directory.
- `/vault/file`, to use for writing persistent storage data when using the`file` data storage plugin. By default nothing is written here (a `dev` server uses an in-memory data store); the `file` data storage backend must be enabled in Vault's configuration before the container is started.



/vault/config 或者 环境变量VAULT_LOCAL_CONFIG

The container will attempt to lock memory to prevent sensitive values from being swapped to disk and as a result must have `--cap-add=IPC_LOCK`



Running Vault for Development

```bash
docker run --cap-add=IPC_LOCK -d --name=dev-vault vault
docker run --cap-add=IPC_LOCK -e 'VAULT_DEV_ROOT_TOKEN_ID=myroot' -e 'VAULT_DEV_LISTEN_ADDRESS=0.0.0.0:1234' vault
```



Running Vault in server mode

```bash
docker run --cap-add=IPC_LOCK -e 'VAULT_LOCAL_CONFIG={"backend": {"file": {"path": "/vault/file"}}, "default_lease_ttl": "168h", "max_lease_ttl": "720h"}' -e 'VAULT_ADDR=http://127.0.0.1:8200' vault server -config=/vault/file/config.hcl

docker run --cap-add=IPC_LOCK -e 'VAULT_LOCAL_CONFIG={"backend": {"file": {"path": "/vault/file"}}, "default_lease_ttl": "168h", "max_lease_ttl": "720h"}' vault server

docker run --cap-add=IPC_LOCK vault server -config=/Users/wangrollin/Downloads/my-config.hcl


# 创建文件 config.hcl
storage "file" {
  path    = "/vault/file"
}
listener "tcp" {
 address     = "0.0.0.0:8200"
 tls_disable = 1
}

# 启动docker
docker run \
--volume /Users/wangrollin/Downloads/file:/vault/file \
--cap-add=IPC_LOCK \
-p 8200:8200 \
--env='VAULT_ADDR=http://127.0.0.1:8200' \
--env='VAULT_LOCAL_CONFIG={"backend": {"file": {"path": "/vault/file"}}, "default_lease_ttl": "168h", "max_lease_ttl": "720h"}' \
vault \
server \
-config=/vault/file/config.hcl

docker run \
--volume /Users/wangrollin/Downloads/file:/config \
--cap-add=IPC_LOCK \
-p 8200:8200 \
--env='VAULT_ADDR=http://127.0.0.1:8200' \
--env='VAULT_LOCAL_CONFIG={"backend": {"file": {"path": "/vault/file"}}, "default_lease_ttl": "168h", "max_lease_ttl": "720h"}' \
config.example.com/vault:0.0.3-SNAPSHOT

# 创建好文件 https
https-config.hcl

storage "file" {
  path    = "/vault/file"
}
listener "tcp" {
 address     = "0.0.0.0:8200"
 tls_cert_file = "/vault/file/example.com.pem"
 tls_key_file  = "/vault/file/example.com.key"
}

# 启动docker https

docker run \
--volume /Users/wangrollin/Downloads/file:/vault/file \
--cap-add=IPC_LOCK \
-p 8200:8200 \
--env='VAULT_ADDR=https://127.0.0.1:8200' \
--env='VAULT_LOCAL_CONFIG={"backend": {"file": {"path": "/vault/file"}}, "default_lease_ttl": "168h", "max_lease_ttl": "720h"}' \
vault \
server \
-config=/vault/file/https-config.hcl

# 进入镜像执行命令
docker ps
docker exec -it  /bin/sh

export VAULT_ADDR='http://127.0.0.1:8200'
export VAULT_DEV_ROOT_TOKEN_ID="s.ZRIurERaz2RDDkJQ8Ucm5FWn"

# 初始化
export VAULT_ADDR='http://127.0.0.1:8200' && \
vault status
vault operator init


# 初始化的 result
Unseal Key 1: LcUVrC8QmSGNSsbRy/4zyETUIIrwwxOcXQpk0l4sqL/R
Unseal Key 2: h8o1r4+PudTabUv71KOtxL/mVFctNA394lY56VPVQpJv
Unseal Key 3: 9cHPLc/JkIZQsYZiF3VCi4GDdWmrNUV5FKRjnL+0JRdi
Unseal Key 4: Cx1fOLpAmkUOXhp6zRUWQyN5NNhsJw4zmmuVLRgbYJ8F
Unseal Key 5: 7jQjbniyY0wYFZ/b77BBatQojbmHGhDuAqJw67nuxfxC

Initial Root Token: s.ZRIurERaz2RDDkJQ8Ucm5FWn


# unseal and login
export VAULT_ADDR='http://127.0.0.1:8200' && \
vault operator unseal aUoAFdLVoKwDwDshDeVEj7aUZIT+dmp1pZ+MHm2IvYhQ && \
vault operator unseal vGNBQeongbuwHtvM/pwYorLDnFgqTdLcAUqmALh4HA9T && \
vault operator unseal 8RkJDgU1NiN/LVY8VWcL1xdKxBUTZ8QkGLs49Mng35/B && \
vault login s.TcnegLeeMQRxK0bBibdNDrqD


# 一些操作
vault secrets list
vault secrets enable -path=secret kv

vault kv put secret/auth-service spring.datasource.password=xxx
vault kv get secret/auth-service
vault kv delete secret/auth-service

# ui
http://127.0.0.1:8200/ui

java -Djdk.tls.client.protocols=TLSv1.2 -jar 
```

## 演示专用

```bash

# 创建文件 config.hcl
storage "file" {
  path    = "/vault/file"
}
listener "tcp" {
 address     = "0.0.0.0:8200"
 tls_disable = 1
}

# 启动docker
docker run \
--volume /Users/wangrollin/Downloads/file:/vault/file \
--cap-add=IPC_LOCK \
-p 8200:8200 \
--env='VAULT_ADDR=http://127.0.0.1:8200' \
--env='VAULT_LOCAL_CONFIG={"backend": {"file": {"path": "/vault/file"}}, "default_lease_ttl": "168h", "max_lease_ttl": "720h"}' \
vault \
server \
-config=/vault/file/config.hcl

# 初始化
export VAULT_ADDR='http://127.0.0.1:8200' && \
vault status
vault operator init

export VAULT_ADDR='http://127.0.0.1:8200' && \
vault operator unseal m0Hf+En1DyWS9ErdOxWu6OMtcIXkf2HCHoha4j1RT1uA && \
vault operator unseal l38IWWh29Zs2Z/imyGPbWARLM/j8Jdf2EZxuaA9LUCMR && \
vault operator unseal 9Lh9CDUpiS77a7YGo5G+UfsVeyZXCe1hpi0EtRYbIhE6 && \
vault login s.VAXEv63OyN73pgYxC2UQX1Rm

# 一些操作
vault secrets list
vault secrets enable -path=secret kv

vault kv put secret/wechat-auth-service spring.datasource.password=test
vault kv get secret/wechat-auth-service
vault kv delete secret/wechat-auth-service

# ui
http://127.0.0.1:8200/ui

secret/application
secret/application/dev
secret/wechat-auth-service 
secret/wechat-auth-service/dev

export VAULT_ADDR='https://dev.example.com' && \
vault login s.tqEiYHAMLvLr9eE72WCIB9KB

export VAULT_ADDR='http://127.0.0.1:8200' && \
vault status && \
vault login s.tqEiYHAMLvLr9eE72WCIB9KB
```

## 快速上手

### install

```bash
# install
brew install vault
vault
vault -autocomplete-install
vault -version
```



### Deploy Vault

```bash
# Deploy Vault
# Configuring Vault: Vault is configured using HCL files

config.hcl

storage "consul" {
  address = "127.0.0.1:8500"
  path    = "vault/"
}
listener "tcp" {
 address     = "127.0.0.1:8200"
 tls_disable = 1
}

consul agent -dev

# Starting the Server
vault server -config=config.hcl

# Initializing the Vault
# This only happens once when the server is started against a new backend that has never been used with Vault before. When running in HA mode, this happens once per cluster, not per server.
vault operator init
# the unseal keys and the initial root token. This is the only time ever that all of this data is known by Vault, and also the only time that the unseal keys should ever be so close together.

# Seal/Unseal
# Every initialized Vault server starts in the sealed state. From the configuration, Vault can access the physical storage, but it can't read any of it because it doesn't know how to decrypt it. The process of teaching Vault how to decrypt the data is known as unsealing the Vault.
# Unsealing has to happen every time Vault starts. It can be done via the API and via the command line. To unseal the Vault, you must have the threshold number of unseal keys.

vault operator unseal
vault operator unseal
vault operator unseal
# Also notice that the unseal process is stateful. You can go to another computer, use vault operator unseal, and as long as it's pointing to the same server, that other computer can continue the unseal process. This is incredibly important to the design of the unseal process: multiple people with multiple keys are required to unseal the Vault. The Vault can be unsealed from multiple computers and the keys should never be together. A single malicious operator does not have enough keys to be malicious.

vault login s.KkNJYWF5g0pomcCLEmDdOVCW

vault operator seal

# When the Vault is sealed again, it clears all of its state (including the encryption key) from memory. The Vault is secure and locked down from access.
```



### Starting the Dev Server

```bash
# Starting the Dev Server
# The dev server is a built-in, pre-configured server that is not very secure but useful for playing with Vault locally
vault server -dev

# new session
export VAULT_ADDR='http://127.0.0.1:8200'
export VAULT_DEV_ROOT_TOKEN_ID="s.fM8JxyYwyeCoOJ86svbW8jNa"
# save Unseal Key: 5+a6Hr5ujpBcTPXfuh+3Zopg229SsfVRs9yd3IQ2S0w=

vault status
```



### CRUD

```bash
# CRUD
vault kv put secret/hello foo=world
vault kv put secret/hello foo=world excited=yes

vault kv get secret/hello
vault kv get -field=excited secret/hello
vault kv get -format=json secret/hello | jq -r .data.data.excited

vault kv delete secret/hello
```



### Secrets Engines

```bash
# Secrets Engines
# url用的最长匹配，代表加密引擎的路由；在dev模式下，vault默认开启Key/Value version2 secrets engine (kv-v2)，路径为secret/

# Enable a Secrets Engine；每个路径都是隔离的，如kv引擎的/path1不能和kv引擎的/path2交互；默认路径是密码引擎的名字
vault secrets enable -path=kv kv
vault secrets enable kv
vault secrets enable kv-v2

vault secrets list
vault kv put kv/hello target=world
vault kv get kv/hello
vault kv list kv/

# Disable a Secrets Engine （‘s path）
vault secrets disable kv/

# What is a Secrets Engine?
# vault就像一个虚拟文件系统，
```



### Dynamic Secrets

```bash
# Dynamic Secrets
# Enable the AWS secrets engine；the AWS secrets engine generates dynamic, on-demand AWS access credentials.
vault secrets enable -path=aws aws

# Configure the AWS secrets engine
vault write aws/config/root \
    access_key=access_key \
    secret_key=secret_key \
    region=us-east-1

# Create a role
# write to aws/roles/:name where :name is your unique name that describes the role (such as aws/roles/my-role):
vault write aws/roles/my-role \
        credential_type=iam_user \
        policy_document=-<<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "Stmt1426528957000",
      "Effect": "Allow",
      "Action": [
        "ec2:*"
      ],
      "Resource": [
        "*"
      ]
    }
  ]
}
EOF
# When I ask for a credential for "my-role", create it and attach the IAM policy { "Version": "2012..." }.

# Generate the secret；Each time you read from aws/creds/:name, Vault will connect to AWS and generate a new IAM user and key pair.
vault read aws/creds/my-role

# Revoke the secret；Vault will automatically revoke this credential after 768 hours
vault lease revoke aws/creds/my-role/0bce0782-32aa-25ec-f61d-c026ff22106
```



### Built-in Help

```bash
# Built-in Help
# Secrets Engines Overview
vault secrets enable -path=aws aws
vault path-help aws # 是path

# Path Help
vault path-help aws/creds/my-non-existent-role
```



### Authentication

```bash
# Authentication
# Vault has pluggable auth methods
# Authentication is the process by which user or machine-supplied information is verified and converted into a Vault token with matching policies attached
# "session token" is what we call the "Vault token".

# Tokens; Token authentication is enabled by default; cannot be disabled. 
# 当启动的时候，root token会自动生成
# By default, this will create a child token of your current token that inherits all the same policies.
# The "child" concept here is important: tokens always have a parent, and when that parent token is revoked, children can also be revoked all in one operation.
vault token create
vault login s.iyNUhq8Ov4hIAx6snw5mB2nL
vault token revoke s.V6T0DxxIg5FbBSre61y1WLgm
vault login $VAULT_DEV_ROOT_TOKEN_ID

# Auth Methods
# 能用第三方认证就用第三方认证 auth methods such as GitHub, LDAP, AppRole, etc.
# Just like secrets engines, auth methods default to their TYPE as the PATH, so the following commands are equivalent.
vault auth enable -path=github github
vault auth enable github

# secrets engines are enabled at the root router /
# auth methods are always prefixed with auth/ in their path： auth/github

# With the GitHub auth method enabled, we next tell it which organization users must be a part of.
vault write auth/github/config organization=hashicorp
# This command tells Vault to map any users who are members of the team "my-team" (in the hashicorp organization) to the policies "default" and "my-policy".
vault write auth/github/map/teams/my-team value=default,my-policy

# 查看开启的所有auth method
vault auth list

# use the vault auth help command with the PATH or TYPE of an auth method.
vault auth help github
vault auth help aws
vault auth help userpass
vault auth help token

# login
vault login -method=github

# logout
vault token revoke -mode path auth/github

# disable github auth method，This will also revoke any logins for that auth method.
vault auth disable github
```



### Policies

```bash
# Policies （authorization）

# There are some built-in policies that cannot be removed. For example, the root and default policies are required policies and cannot be deleted. The default policy provides a common set of permissions and is included on all tokens by default. The root policy gives a token super admin permissions,

# Policy Format

# Dev servers have version 2 of KV secrets engine mounted by default, so will
# need these paths to grant permissions:
path "secret/data/*" {
  capabilities = ["create", "update"]
}
path "secret/data/foo" {
  capabilities = ["read"]
}

# Policies default to deny, so any access to an unspecified path is not allowed.
vault policy fmt my-policy.hcl

# Writing the Policy
vault policy write my-policy my-policy.hcl

vault policy write my-policy -<<EOF
# Dev servers have version 2 of KV secrets engine mounted by default, so will
# need these paths to grant permissions:
path "secret/data/*" {
  capabilities = ["create", "update"]
}
path "secret/data/foo" {
  capabilities = ["read"]
}
EOF

# To see the list of policies
vault policy list

vault policy read my-policy

# Testing the Policy， map policy to token
vault secrets list
vault secrets enable -path=secret/ kv-v2
vault token create -policy=my-policy

# You also do not have access to sys according to the policy, so commands like vault policy list or vault secrets list will not work.

# Mapping Policies to Auth Methods
vault path-help auth/github
# For GitHub, the default team is the default policy set that everyone is assigned to no matter what team they're on.
vault write auth/github/map/teams/default value=my-policy
```



### Using the HTTP APIs with Authentication

```bash
# Using the HTTP APIs with Authentication
# if you started the Vault server in dev mode, you could validate the initialization status like this:
curl http://127.0.0.1:8200/v1/sys/init

# This will return a JSON response:
{
  "initialized": true
}

# Accessing Secrets via the REST APIs
config.hcl

backend "file" {
  path = "vault"
}
listener "tcp" {
  tls_disable = 1
}

vault server -config=config.hcl

curl \
    --request POST \
    --data '{"secret_shares": 1, "secret_threshold": 1}' \
    http://127.0.0.1:8200/v1/sys/init | jq
    
{
  "keys": [
    "ff27b63de46b77faabba1f4fa6ef44c948e4d6f2ea21f960d6aab0eb0f4e1391"
  ],
  "keys_base64": [
    "/ye2PeRrd/qruh9Ppu9EyUjk1vLqIflg1qqw6w9OE5E="
  ],
  "root_token": "s.Ga5jyNq6kNfRMVQk2LY1j9iu"
}


curl \
    --request POST \
    --data '{"key": "/ye2PeRrd/qruh9Ppu9EyUjk1vLqIflg1qqw6w9OE5E="}' \
    http://127.0.0.1:8200/v1/sys/unseal | jq

{
  "type": "shamir",
  "initialized": true,
  "sealed": false,
  "t": 1,
  "n": 1,
  "progress": 0,
  "nonce": "",
  "version": "1.3.2",
  "migration": false,
  "cluster_name": "vault-cluster-a90e2cd2",
  "cluster_id": "0bc4b0fa-f876-8069-8d45-e0daae74e90e",
  "recovery_seal": false,
  "storage_type": "file"
}

vault auth enable <auth_method_type>
# To see the cURL equivalent of the CLI command
vault auth enable -output-curl-string approle

# Enable the AppRole auth method
curl \
    --header "X-Vault-Token: $VAULT_TOKEN" \
    --request POST \
    --data '{"type": "approle"}' \
    http://127.0.0.1:8200/v1/sys/auth/approle


# create my-policy
curl \
    --header "X-Vault-Token: $VAULT_TOKEN" \
    --request PUT \
    --data '{"policy":"# Dev servers have version 2 of KV secrets engine mounted by default, so will\n# need these paths to grant permissions:\npath \"secret/data/*\" {\n  capabilities = [\"create\", \"update\"]\n}\n\npath \"secret/data/foo\" {\n  capabilities = [\"read\"]\n}\n"}' \
    http://127.0.0.1:8200/v1/sys/policies/acl/my-policy

# enable KV v2 secrets engine at secret/ using API.
curl \
    --header "X-Vault-Token: $VAULT_TOKEN" \
    --request POST \
    --data '{ "type":"kv-v2" }' \
    http://127.0.0.1:8200/v1/sys/mounts/secret
    
# the tokens issued under the AppRole my-role should be associated with my-policy.
curl \
    --header "X-Vault-Token: $VAULT_TOKEN" \
    --request POST \
    --data '{"policies": ["my-policy"]}' \
    http://127.0.0.1:8200/v1/auth/approle/role/my-role


# fetches the RoleID of the role named my-role
curl \
    --header "X-Vault-Token: $VAULT_TOKEN" \
     http://127.0.0.1:8200/v1/auth/approle/role/my-role/role-id | jq -r ".data"

{
  "role_id": "3c301960-8a02-d776-f025-c3443d513a18"
}

# creates a new SecretID under the my-role
curl \
    --header "X-Vault-Token: $VAULT_TOKEN" \
    --request POST \
    http://127.0.0.1:8200/v1/auth/approle/role/my-role/secret-id | jq -r ".data"

{
  "secret_id": "22d1e0d6-a70b-f91f-f918-a0ee8902666b",
  "secret_id_accessor": "726ab786-70d0-8cc4-e775-c0a75070e5e5"
}


# These two credentials can be supplied to the login endpoint to fetch a new Vault token.
curl --request POST \
       --data '{"role_id": "c3ec4eab-5477-c669-fca8-6a71fdf38c23", "secret_id": "fc2710e5-9536-3f4f-666d-fd5d8379b2b9"}' \
       http://127.0.0.1:8200/v1/auth/approle/login | jq -r ".auth"

{
  "client_token": "s.p5NB4dTlsPiUU94RA5IfbzXv",
  "accessor": "EQTlZwOD4yIFYWIg5YY6Xr29",
  "policies": [
    "default",
    "my-policy"
  ],
  "token_policies": [
    "default",
    "my-policy"
  ],
  "metadata": {
    "role_name": "my-role"
  },
  "lease_duration": 2764800,
  "renewable": true,
  "entity_id": "4526701d-b8fd-3c39-da93-9e17506ec894",
  "token_type": "service",
  "orphan": true
}

# kv put
curl \
    --header "X-Vault-Token: $VAULT_TOKEN" \
    --request POST \
    --data '{ "data": {"password": "my-long-password"} }' \
    http://127.0.0.1:8200/v1/secret/data/creds | jq -r ".data"

{
  "created_time": "2020-02-05T16:51:34.0887877Z",
  "deletion_time": "",
  "destroyed": false,
  "version": 1
}

```



### Web UI

```bash
# Web UI
# Dev servers
vault server -dev
http://127.0.0.1:8200/ui

# Non-Dev servers，The Vault UI is not activated by default.
# The UI runs on the same port as the Vault listener. As such, you must configure at least one listener stanza in order to access the UI.
ui = true
listener "tcp" {
  address = "10.0.1.35:8200"

  # If bound to localhost, the Vault UI is only
  # accessible from the local machine!
  # address = "127.0.0.1:8200"
}
storage "consul" {
  # ...
}

# Web UI Wizard


```

