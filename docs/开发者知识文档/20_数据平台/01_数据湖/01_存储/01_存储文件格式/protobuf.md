
## 网站

- [官网](https://protobuf.dev)


protobuf

protoc


### 下载下来之后

export LD_LIBRARY_PATH=/protobuf/lib
./protoc --version

### filedMask

  主要作用

  - 局部更新：在 Update / Patch API 中，避免整对象覆盖，只更新 mask 指定的字段。
  - 区分“没传”和“要清空”：proto3 里很多标量字段默认值和未设置不容易区分，FieldMask 可以表达“我就是要把这个字段改成空字符串/0/false”。
  - 避免误删新字段：老客户端更新资源时，如果没有 FieldMask，可能把它不知道的新字段覆盖掉；有 mask 就只改指定字段。
  - 响应裁剪：在某些 Get / List API 中也可以作为 read mask，只返回客户端需要的字段，减少 payload。
  - 嵌套字段选择：支持点号路径，比如 profile.display_name、config.retention_days。

