
## 网站

- [doc](https://docs.python.org/)
  - [The Python Tutorial](https://docs.python.org/3/tutorial/index.html)
  - [The Python Standard Library](https://docs.python.org/3/library/index.html)
  - [The Python Language Reference](https://docs.python.org/3/reference/index.html)
  - [Python HOWTOs](https://docs.python.org/3/howto/index.html)
- [官网](https://www.python.org/)
- [The import system - doc](https://docs.python.org/3/reference/import.html)


## 安装

export PATH=$PATH:/usr/local/opt/python-3.7.2/bin

apt install python

apt install python3 python3-distutils python-is-python3

## tips

### 打印 error

```python
logger.error(f"fail to xxx, error:\n {traceback.format_exc()}")
```

### 模块

__init__.py 文件的作用是将文件夹变为一个Python模块,Python 中的每个模块的包中，都有__init__.py 文件


### python pip 更换国内安装源（windows）

1.点击此电脑，在最上面的的文件夹窗口输入 ： %APPDATA%

2.按回车跳转到以下目录，新建pip文件夹

3.创建pip.ini文件

4.打开文件夹，输入以下内容，关闭即可（注意：源镜像可替换）

```
[global]
timeout = 6000
index-url = https://pypi.tuna.tsinghua.edu.cn/simple
trusted-host = pypi.tuna.tsinghua.edu.cn
```

5.国内源镜像有：

V2EX：http://pypi.v2ex.com/simple
豆瓣：http://pypi.douban.com/simple
中国科学技术大学：http://pypi.mirrors.ustc.edu.cn/simple
清华：https://pypi.tuna.tsinghua.edu.cn/simple




## 历史遗留

python 装executable 64amd 的

加path环境变量

pip install virtualenv

virtualenv myEnv

activate

在pyCharm的venv里，升级pip要用，否则会报错，pyCharm的bug

​python -m pip install -U --force-reinstall pip

pip isntall tensorflow

pip install keras
