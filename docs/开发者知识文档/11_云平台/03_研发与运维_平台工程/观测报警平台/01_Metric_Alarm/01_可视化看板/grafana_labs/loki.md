

# loki

## 网页

- [官网](https://grafana.com/oss/loki/)
- [官网 doc](https://grafana.com/docs/loki/latest/?pg=oss-loki&plcmt=quick-links)
- [github](https://github.com/grafana/loki)


Loki is like Prometheus, but for logs

## 配置

### 配置日志保存时间

```bash
kubectl edit cm loki -n loki
# 修改table_manager下的retention_period与ingester下的query_store_max_look_back_period

kubectl rollout restart sts ingester -n loki
kubectl rollout restart sts querier -n loki
```


## LogQL

## logcli
