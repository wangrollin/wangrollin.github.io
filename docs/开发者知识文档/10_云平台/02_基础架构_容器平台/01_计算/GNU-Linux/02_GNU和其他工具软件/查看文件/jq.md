
https://stedolan.github.io/jq/

json 格式化工具

```bash
jq -r '.data.engines.emr[] | select(.clusterType == "StarRocks") | "    \(.id): \"\(.externalEngineId)\""'

```