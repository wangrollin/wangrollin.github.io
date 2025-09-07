
conda 开始收费了，如果检测出在企业 IP 下，有法律风险

- [官网](https://conda-forge.org/)
- [github](https://github.com/conda-forge/miniforge)

## 安装

```bash
# 通过脚本安装
bash Miniforge3-MacOSX-arm64.sh

# 初始化脚本，执行一次即可
./miniforge3/bin/conda init zsh

# 可能没用了
# eval "$(/Users/wangrollin/miniforge3/bin/conda shell.zsh hook)"

# 选择是否默认开启 base 环境
conda config --set auto_activate_base false
conda config --set auto_activate_base true
```

## 使用

```bash

# 激活
conda deactivate
conda activate base

# 创建并激活
conda create -n env_name
conda activate env_name

conda create --name python2.7 python=2.7
conda create -c 'https://repo.continuum.io/pkgs/free/linux-aarch64' -n python2.7 python=2.7
conda activate python2.7

# 安装依赖
conda install --file requirements.txt
conda install --yes --file requirements.txt

# 查看 env list
conda info --envs
```
