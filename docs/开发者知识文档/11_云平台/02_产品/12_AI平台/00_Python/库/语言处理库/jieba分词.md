# jieba分词

> pip3 install jieba



```python

import jieba

import wordcloud



# 分词

segs = jieba.cut("this is a string")

print("\\".join(segs))



# 计算词频

seg_list = jieba.lcut("this is a string")

word_frequency_map = {}

for word in seg_list:

	if len(word) <= 1:

		continue

	if word not in word_frequency_map:

		word_frequency_map[word] = 1

	else:

		word_frequency_map[word] += 1

word_frequency_set = set(word_frequency_map)

word_frequency_list = list(word_frequency_set)

word_frequency_list.sort(Reverse=True)

for frequency in word_frequency_list:

	for key in word_frequency_map:

		if word_frequency_map[key] == frequency:

			print(key + " : " + frequency)

# 词云图

wordcloud

```



