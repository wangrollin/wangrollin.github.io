
- [官网](https://min.io/)
- [中文官网](http://www.minio.org.cn/)
- [中文 doc](http://docs.minio.org.cn/docs/master/s3cmd-with-minio)
- [github](https://github.com/minio/minio)


## mc -- minIO client

- [官方文档](https://min.io/docs/minio/linux/reference/minio-mc.html)

下载地址：https://dl.min.io/client/mc/release/linux-amd64/mc

mc alias set myminio http://minioserver.example.net:9000 ACCESS_KEY SECRET_KEY
mc admin info myminio

mc cp myminio/experiment/html.html /opt/dataops/wrl/
mc cp /opt/dataops/wrl/html2.html myminio/experiment/html.html

wget http://example.com:9000/experiment/html2.html


## minio java sdk

sdk demo https://blog.csdn.net/cn_ljr/article/details/128688157

## docker 运行

podman run -d \
   -p 9000:9000 \
   -p 9001:9001 \
   -v ~/minio/data:/data \
   -e "MINIO_ROOT_USER=datainfra" \
   -e "MINIO_ROOT_PASSWORD=datainfra" \
   quay.io/minio/minio server /data --console-address ":9001"
