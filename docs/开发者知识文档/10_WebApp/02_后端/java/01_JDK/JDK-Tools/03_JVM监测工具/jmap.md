# jmap

## 网页

- [jvm 性能调优工具之 jmap](https://www.jianshu.com/p/a4ad53179df3)
- [HPROF: A Heap/CPU Profiling Tool](https://docs.oracle.com/javase/7/docs/technotes/samples/hprof.html)


## 常用命令

```bash
查看各个jvm区域的内存
jmap -heap $pid

生成hprof
jmap -dump:format=b,file=heap.phrof $pid

查看各个类的内存占用，会触发full gc
jmap -histo $pid

```

## 分析hprof文件中的类的序列化内容

### 相关链接

- [github heap-lib](https://github.com/aragozin/heaplib)
- [OQL - object query language](http://cr.openjdk.java.net/~sundar/8022483/webrev.01/raw_files/new/src/share/classes/com/sun/tools/hat/resources/oqlhelp.html#map)


### 第一步，写OQL

#### OQL1

```javascript
function print(it) {
    var text = '---\n';
    var i=0,len=it.rowFromServer.byteBuffer.length;
    for (; i<1000; i++) {
        text += it.rowFromServer.byteBuffer[i] + ','; 
    }
    text += '---\n';
    return text;
}

map(
    filter(heap.objects('com.mysql.jdbc.BufferRow'), 'it.rowFromServer.byteBuffer.length > 5000000'), 
    print
)
```


#### OQL2

```javascript
function print(it) {
    return it.conf.toString();
}

map(
    heap.objects('com.bytedance.dorado.common.domain.instance.Instance', 
    'it.conf.length() > 10000'), 
    print
)
```


### 第二步，使用工具分析hprof，生成文件

```bash
java -jar heap-cli-0.3-SNAPSHOT.jar exec --noindex -d xxx.hprof -f sc.oql > out

java -jar heap-cli-0.3-SNAPSHOT.jar exec --noindex -d xxx.hprof -e "select map(heap.objects('com.xxx.Class1', 'it.conf.length() > 10000'), 'it.conf.toString()')"
```


### 第三步，使用python分析产出文件

```python
out = [9,53,54,51,...]
out = [x if x > 0 else 256 + x for x in out]
print(bytes(out).decode('utf-8','ignore'))

```