

- [Jupyter](https://jupyter.org/)
- [Documentation](https://jupyter.org/documentation)

- jupyter
- notebook
- enterprise_gateway

https://www.infoq.cn/article/atotiv21qo6cup_iios7


## 解决的问题

机器学习和数据分析用得多。
主要特点是执行单元为 Cell ，并且执行环境是持久的（打开以后能存住变量），这样有时候做小调整不用整个程序重新跑一遍，而且立马能看到结果，较为灵活。

jupyter notebook 交互方便， 主要适合不断修改程序跑数据结果，展示图表也很方便，直接就在网页上出现了
做数据分析的人很喜欢这些。

这个玩意儿配合 jupyterhub 和 conda 很好用呀，实验室有不是计算机背景的同学，不用彻底的学习集群操作，很好上手，不同的 kernel 在不同的用户之间可以共享，一块合作的时候减少了很多麻烦。

主要适合用来“探索”，需要一步步试错，根据每一步的结果来调整后续思路和代码的场合，不是用来做工程的

可以理解为 Python 实现的网页版 Mathmatica ，提供类似 rstudio 或 matlab 的交互功能。

若是用 Python 实现画图功能，无须用 jupyter 。但调试时或可用于提升开发效率

Jupyter Notebook 最主要的用途是可交互式执行代码,进行数据分析和可视化,记录文档和报告。
融合了编程与文档, 很适合数据科学和科学计算领域。

做数据 exploration 用的。我最近需要 debug 一个 etl pipeline ，但是数据从 parquet 和 json 导入之后，进行了一些 join 之后就直接进 imply 了，所以我看不到中间过程，这时候笔记本就很方便。

机器学习的 sketchbook

Jupyter 能大幅降低试错的时间成本和提高使用体验

大部分公司和研究室 GPU 都是云端共享的, Jupyter 方便管理, 使用体验也好, 图片啥的也都能出. 相比于其他计算机学的分支, 很多搞数据科学的不是计算机出身, 比如来自物理系, 数学系, 一个打开网址就能直接开写的环境对他们或是初学者相当友好的.

数据科学工作中经常要进行微调, 从头跑也不是办法, 光数据导入可能就得几十分钟, 还得不停在 CPU 和 GPU 间拷贝, dateset 分割等等. 模型从确定结构到结束调试, 调个几百上千次是常态. Jupyter 背靠 ipython, 解决了这个问题.

真的调好了算法打算大规模训练或是分布式训练的时候其实还是使用各种其他的部署手段的.



