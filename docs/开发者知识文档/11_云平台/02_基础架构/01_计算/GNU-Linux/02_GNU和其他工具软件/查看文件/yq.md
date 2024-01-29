yaml query

```bash
# 查
yq eval '.customized_values' helmfile.yaml

# 删
yq eval 'del(.repositories)' helmfile.yaml -i

# 改
yq eval ".releases[0].chart = \"./dataleap\"" helmfile.yaml -i
yq e '.data[] |= if .name == "John" then .age = 100 else . end' <your_file.yaml> -i
yq eval 'select(.releases[].values[].global != null).releases[].values[].global.deployMode = "offline"' yourfile.yaml

# 选择数组中的某个
yq e '.data[] | select(.name == "John")' <your_file.yaml>
```