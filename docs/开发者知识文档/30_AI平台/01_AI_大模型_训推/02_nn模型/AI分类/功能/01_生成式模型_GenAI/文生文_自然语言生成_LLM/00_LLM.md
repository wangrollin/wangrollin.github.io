

## 预测下一个单词

每一个 output token 都有权重，比如 every 49%, day 21%, everyday 7%

提示：I try to learn something new
补全：every day

LLM 输入 token 并输出 token 作为输出


## 一些笔记

Large Language Models / LLMs / 大规模语言模型

    - 所谓语言模型(LM)，就是找一个概率分布，去描述所有语言现象
      - 自回归
        - 比如GPT，从上文猜下面的词，文字接龙
      - MLM
        - 比如BERT，从上下文猜被遮住的词，完形填空


  - 技术演进
    - BOW
      - 词袋模型，上古时期的NLP
    - word2vec
      - 静态词向量
    - ElMo
      - 动态词向量
    - RNN
      - 序列到序列
    - LSTM
      - 缓解记忆遗忘问题
    - Transformer
      - 自注意力机制
    - GPT系列
      - 基于Transformer，单向自回归
    - BERT
      - 基于Transformer，双向MLM
    - Prompt工程
      - 如何调教LLM
    - RLHF
      - Human Teaching很关键
    - 多模态
      - 融合多种类型内容，GPT-4已经有相当能力，但是不透露技术细节，可以看看最近微软的Kosmos模型论文