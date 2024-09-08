
- [图解大模型推理优化之KV Cache](https://mp.weixin.qq.com/s/7Fm8LbUN9jQ2HqxPbUU7UQ)

- [加快大模型推理，VLLM内部原理，KV Cache，PageAttention-哔哩哔哩](https://b23.tv/Zej9NQR)


## kv cache

W
Qw Kw Vw

Kw Vw 缓存起来，放置重复计算，使用空间换时间，耗费显存

根据 max output token size，提前分配好显存，用来做 kv cache

容易浪费显存空间


## page attention

就像内存管理一样，使用逻辑block、物理block、映射表，来提高显存的利用率


## sharing kv cache

如果前面的 token 是一样的，那么可以多个并行的推理使用相同的 kv cache，物理 block 可能有多个引用者


## ？flash attention

## ？beam search

## ？GQA

## ？MQA



