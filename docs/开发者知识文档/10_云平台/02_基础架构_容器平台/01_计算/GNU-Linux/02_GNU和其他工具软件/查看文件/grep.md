
```bash
cat log | grep has-this | grep -v has-no-this

```

### tips

#### 查看上下几行

```bash
grep -C 10 前后
grep -A 10 之后
grep -B 10 之前
```

grep -v -E 'a|b|c'


在b中存在，在a中不存在的行

```
grep -v -f a b
```