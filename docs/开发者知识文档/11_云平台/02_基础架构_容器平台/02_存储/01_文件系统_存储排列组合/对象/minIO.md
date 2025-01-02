
- [官网](https://min.io/)
- [中文官网](http://www.minio.org.cn/)
- [中文 doc](http://docs.minio.org.cn/docs/master/s3cmd-with-minio)
- [github](https://github.com/minio/minio)


## mc -- minIO client

- [官方文档](https://min.io/docs/minio/linux/reference/minio-mc.html)

mc alias set myminio http://minioserver.example.net:9000 ACCESS_KEY SECRET_KEY
mc admin info myminio

mc cp myminio/experiment/html.html /opt/dataops/wrl/
mc cp /opt/dataops/wrl/html2.html myminio/experiment/html.html

wget http://example.com:9000/experiment/html2.html


## minio java sdk

sdk demo https://blog.csdn.net/cn_ljr/article/details/128688157

