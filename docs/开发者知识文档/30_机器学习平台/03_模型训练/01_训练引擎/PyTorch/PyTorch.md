
# 网页

- [PyTorch官方教程中文版](https://www.pytorch123.com/)
- [PyTorch中文文档](https://pytorch-cn.readthedocs.io/zh/latest/)
- [深入浅出 pytorch](https://datawhalechina.github.io/thorough-pytorch/%E7%AC%AC%E4%BA%94%E7%AB%A0/5.1%20PyTorch%E6%A8%A1%E5%9E%8B%E5%AE%9A%E4%B9%89%E7%9A%84%E6%96%B9%E5%BC%8F.html)


## 网络可视化 netron

https://blog.csdn.net/Wenyuanbo/article/details/118937790
https://blog.csdn.net/Wenyuanbo/article/details/118736258
https://developer.aliyun.com/article/1467635

pip install netron
pip install onnx

## 安装环境

https://pytorch.org/get-started/locally/

pip install torch torchvision -i https://pypi.tuna.tsinghua.edu.cn/simple

## Q&A

### PyTorch 训练出来的模型本质上是：

  - 状态字典 (state_dict)：一组张量（权重矩阵），保存为 .pt / .pth 文件
  - 计算图：由 nn.Module 定义的前向传播逻辑（Python 代码）

  两者结合才能完成推理。


### 模型工程的难点，是不是都可以用pytorch这个训练框架来应对？

⏺ 不完全是。PyTorch 是一个强大的深度学习框架，但"模型工程"的难点远不止框架层面能解决的。大致可以分几个层次来看：

  PyTorch 能很好应对的：
  - 模型结构设计与实验（灵活的动态图机制）
  - 自定义损失函数、优化器
  - 快速原型验证
  - 单机/小规模训练调试

  PyTorch 生态能部分应对，但需要额外工具的：
  - 大规模分布式训练 → 需要 DeepSpeed、FSDP、Megatron-LM 等
  - 混合精度、显存优化 → PyTorch 有基础支持，但大模型场景往往需要更专业的方案
  - 实验管理与可复现性 → 需要 W&B、MLflow 等配合

  PyTorch 本身无法解决的核心难点：
  - 数据工程 — 数据清洗、去重、质量筛选、标注，这往往是最耗时的部分
  - 训练基础设施 — 集群管理、网络拓扑、故障恢复、任务调度（Kubernetes、Slurm 等）
  - 评估与对齐 — 如何定义和衡量模型质量，RLHF/DPO 的人工标注流程
  - 推理部署与优化 — 量化、蒸馏、vLLM/TensorRT-LLM 等服务化框架
  - 成本与资源规划 — GPU 选型、训练预算、scaling law 预估

  简单说：PyTorch 解决的是"怎么写模型、怎么跑训练"的问题，但模型工程的难点很大一部分在"训练什么数据、用多大规模、怎么评估、怎么上线"上。 框架只是工具链中的一环。

