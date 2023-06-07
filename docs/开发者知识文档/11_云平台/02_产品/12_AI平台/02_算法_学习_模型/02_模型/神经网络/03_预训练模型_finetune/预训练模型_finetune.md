
      - 预训练阶段无需标注
        - 因为语言模型(LM)是一种天然的有标注训练任务，即“自监督”
      - 只有在Finetune阶段需要根据下游任务提供标注数据

pretraining： 有很多知识、能力，但是不好提取，next word prediction，天然跨语言，alignment
SFT model: supervied fine tune，训练模型怎么问答
RM model: reward modeling，告诉模型什么是好的模型
RL model:

基模型无法使用，alignment 到人类的对话方式，从而和神经网络对话

语言模型

next word prediction -> AGI，为什么下一个词预测的能力这么强

预测能力代表智能，因为预测需要强大的推理能力

具备世界知识常识，进行推理，不具备意识
