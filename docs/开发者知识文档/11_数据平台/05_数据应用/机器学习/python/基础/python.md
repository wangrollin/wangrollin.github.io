
## 网站

- [doc](https://docs.python.org/)
- [官网](https://www.python.org/)


## tips



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


升级pip

​	python -m pip install --upgrade pip



pip install virtualenv



virtualenv myEnv

activate



在pyCharm的venv里，升级pip要用，否则会报错，pyCharm的bug

​	python -m pip install -U --force-reinstall pip



pip isntall tensorflow

pip install keras

