
## 介绍

安装 Python 2 >=2.7.9 或 Python 3 >=3.4 这些版本的 Python 会一并安装 pip


## 网站

- [PyPI](https://pypi.org/)

## 安装

### 通用方式

```bash
python -m ensurepip --upgrade
```



### pip2

wget https://bootstrap.pypa.io/pip/2.7/get-pip.py
sudo python2 get-pip.py

### pip3



apt install python3 python3-distutils -y
wget https://bootstrap.pypa.io/pip/get-pip.py
sudo python3 get-pip.py
rm /usr/local/bin/pip
cp /usr/local/bin/pip2 /usr/local/bin/pip

apt install -y python3-pip
python3 -m pip install --upgrade pip



## tips

### 离线安装 pip 包

pip download


### 包安装路径
```bash
python -m site
python -m site --user-site
python show [package-name]
```

### 包依赖树
```bash
pip isntall pipdeptree
pipdeptree -fl
```

## pip config

```bash
pip config list
pip config set global.index-url https://pypi.org/simple
pip config unset global.index-url

cat /root/.config/pip/pip.conf
```

## 常用命令

```bash
pip install -r requirements.txt
pip freeze > requirements.txt
pip3 freeze > requirements.txt
pip freeze | xargs pip uninstall -y
```

| 类别                 | conda                  | pip                            |
| ---------- | ---------------------- | ------------------------------ |
| 管理       | 二进制                 | wheel 或源码                   |
| 需要编译器 | no                     | yes                            |
| 语言       | any                    | Python                         |
| 虚拟环境   | 支持                   | 通过 virtualenv 或 venv 等支持 |
| 依赖性检查 | yes                    | 屏幕提示用户选择               |
| 包来源     | Anaconda repo 和 cloud | PyPi                           |


## problems

### Retrying (Retry(total=4, connect=None, read=None, redirect=None, status=None)) after connection broken by ‘SSLError(SSLCertVerificationError(1, ‘[SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: self signed certificate in certificate chain(_ssl.c:1076)’))’: /simple/lxml/

我在执行pip3 install package_name 的时候遇到了以上错误，搜了全网，以下方式亲测有效

执行 pip3 install --trusted-host pypi.org --trusted-host files.pythonhosted.org package_name

其中package_name是所需要下载的三方包

