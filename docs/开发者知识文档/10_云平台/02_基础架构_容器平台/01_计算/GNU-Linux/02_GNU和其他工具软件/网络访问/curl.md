
## tips

### 查看公网 ip

```bash
curl cip.cc
curl ip.gs
```

### 参数

-i

打印 response headers

### 上传文件接口

curl -X POST -F "file=@/path/to/file" http://example.com/upload

### 拉下来 shell 并直接执行，且不保存在本地

这种方式不会下载脚本，每次都能拉到最新的，很适合更新

curl https://xxxx/test.sh | bash -s this-is-param

