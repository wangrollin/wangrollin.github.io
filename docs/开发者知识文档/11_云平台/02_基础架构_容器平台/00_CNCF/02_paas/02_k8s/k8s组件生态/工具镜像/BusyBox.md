
## 不退出的 busybox

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: busybox
  labels:
    app: busybox
spec:
  containers:
  - name: busybox
    image: busybox
    command: ["/bin/sh", "-ec", "while :; do echo '.'; sleep 5 ; done"]
```

docker run -d -it busybox /bin/bash
docker exec -it <容器ID或名称> bash
