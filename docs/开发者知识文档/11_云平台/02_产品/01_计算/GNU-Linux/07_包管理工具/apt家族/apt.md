
给人用

apt是apt-get和apt-cache命令的子集，为包管理提供必要的命令
虽然apt-get不会被弃用，但作为普通用户，您应该更频繁地开始使用apt

sudo apt update
sudo apt search
sudo apt install xxx
sudo apt list
sudo apt list --upgradeable
sudo apt list –installed
sudo apt upgrade xxx


apt deb格式

## 国内源

### 清华
https://mirrors.tuna.tsinghua.edu.cn/

## apt source

cat /etc/apt/sources.list
ll /etc/apt/sources.list.d
cat /etc/apt/sources.list.d/private.list


## 命令

```bash
apt search xxx --names-only
```

## 查看安装路径

dpkg -S softwarename


## 安装 adoptium/Temurin

apt install gnupg -y
wget -qO - https://adoptopenjdk.jfrog.io/adoptopenjdk/api/gpg/key/public | apt-key add -
apt install software-properties-common -y
add-apt-repository --yes https://adoptopenjdk.jfrog.io/adoptopenjdk/deb/
apt update
apt install adoptopenjdk-8-hotspot-jre -y

RUN apt update \
  && apt install gnupg -y \
  && wget -qO - https://adoptopenjdk.jfrog.io/adoptopenjdk/api/gpg/key/public | apt-key add - \
  && apt install software-properties-common -y \
  && add-apt-repository --yes https://adoptopenjdk.jfrog.io/adoptopenjdk/deb/ \
  && apt update \
  && apt install adoptopenjdk-8-hotspot-jre -y


apt update
apt install -y wget apt-transport-https gnupg
wget -O - https://packages.adoptium.net/artifactory/api/gpg/key/public | apt-key add -
echo "deb https://packages.adoptium.net/artifactory/deb $(awk -F= '/^VERSION_CODENAME/{print$2}' /etc/os-release) main" | tee /etc/apt/sources.list.d/adoptium.list
apt update
apt install temurin-8-jre -y

RUN apt update \
  && apt install -y wget apt-transport-https gnupg \
  && wget -O - https://packages.adoptium.net/artifactory/api/gpg/key/public | apt-key add - \
  && echo "deb https://packages.adoptium.net/artifactory/deb $(awk -F= '/^VERSION_CODENAME/{print$2}' /etc/os-release) main" | tee /etc/apt/sources.list.d/adoptium.list \
  && apt update \
  && apt install temurin-8-jre -y


apt update
apt install -y wget apt-transport-https gnupg
wget -O - https://packages.adoptium.net/artifactory/api/gpg/key/public | tee /etc/apt/keyrings/adoptium.asc
echo "deb [signed-by=/etc/apt/keyrings/adoptium.asc] https://mirrors.tuna.tsinghua.edu.cn/Adoptium/deb $(awk -F= '/^VERSION_CODENAME/{print$2}' /etc/os-release) main" | tee /etc/apt/sources.list.d/adoptium.list
apt update
apt install temurin-8-jre -y

RUN apt update \
  && apt install -y wget apt-transport-https gnupg \
  && get -O - https://packages.adoptium.net/artifactory/api/gpg/key/public | tee /etc/apt/keyrings/adoptium.asc \
  && echo "deb [signed-by=/etc/apt/keyrings/adoptium.asc] https://mirrors.tuna.tsinghua.edu.cn/Adoptium/deb $(awk -F= '/^VERSION_CODENAME/{print$2}' /etc/os-release) main" | tee /etc/apt/sources.list.d/adoptium.list \
  && apt update \
  && apt install temurin-8-jre -y

RUN apt update \
  && apt install -y wget apt-transport-https gnupg \
  && wget -O - https://packages.adoptium.net/artifactory/api/gpg/key/public | apt-key add - \
  && echo "deb https://mirrors.tuna.tsinghua.edu.cn/Adoptium/deb $(awk -F= '/^VERSION_CODENAME/{print$2}' /etc/os-release) main" | tee /etc/apt/sources.list.d/adoptium.list \
  && apt update \
  && apt install temurin-8-jre -y

RUN apt update \
  && apt install nvidia-openjdk-8-jre -y