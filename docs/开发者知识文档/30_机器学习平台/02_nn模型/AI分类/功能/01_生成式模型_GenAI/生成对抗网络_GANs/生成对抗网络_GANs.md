# 生成对抗网络 GANs -- Generative-Adversarial Networks

随机变量生成

反转换法，拒绝采样法，梅特罗波利斯－黑斯廷斯算法

- 判别器
- 生成器：是一个神经网络负责对转换函数建模，如果训练好了，输入一个简单随机变量后其必须返回一个服从目标分布的随机变量


- [一文了解生成对抗网络](https://libertydream.github.io/2020/04/19/%E4%B8%80%E6%96%87%E4%BA%86%E8%A7%A3%E5%AF%B9%E6%8A%97%E7%94%9F%E6%88%90%E7%BD%91%E7%BB%9C/)


generator vs discriminator

给 generator 输出真实数据，generator 输出同样类型的仿真数据，discriminator 给出瑕疵的地方，重复这个过程，直到生成的仿真数据，discriminator 无法给出反馈。

目的是提升 generator 的能力

## 应用举例

- 生成视频
- 生成轮胎设计样式
- 风险交易识别