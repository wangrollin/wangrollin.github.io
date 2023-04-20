
## 网站

[官网](https://docs.conda.io/en/latest/)


## 常用命令

```bash
# 创建并激活
conda create -n env_name
conda activate env_name
conda create --name python2.7 python=2.7

# 安装依赖
conda install --file requirements.txt

# 关闭自动激活
conda config --set auto_activate_base false

# 查看 env list
conda info --envs


./conda create -c 'https://repo.continuum.io/pkgs/free/linux-aarch64' -n python2.7 python=2.7
./conda info --envs
./conda activate python2.7
```