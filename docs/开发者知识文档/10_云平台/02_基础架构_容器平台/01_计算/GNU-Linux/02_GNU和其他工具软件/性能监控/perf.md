

Linux 系统原生提供的性能分析工具，会返回 CPU 正在执行的函数名以及调用栈（stack）。


- [如何读懂火焰图？](https://www.ruanyifeng.com/blog/2017/09/flame-graph.html)

sudo perf record -F 99 -p 13204 -g -- sleep 30
sudo perf report -n --stdio
