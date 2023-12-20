from kubernetes.client import V1PodList
from kubernetes.stream import stream
from kubernetes.utils import parse_quantity

### 初始化的坑

```python
    config.load_kube_config(kubeconfig_path)
    c = Configuration()
    c.assert_hostname = False
    Configuration.set_default(c)
```

### 在pod里执行命令

```python
    exec_command = [
        '/bin/sh',
        '-c',
        'cat /README.md']
    resp = stream(core_api_instance.connect_get_namespaced_pod_exec, "pod_name", 'namespace',
                  command=exec_command,
                  stderr=True, stdin=False,
                  stdout=True, tty=False)
    print("Response:\n" + resp)
```