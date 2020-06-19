```bash
docker run --name myjenkins -p 8080:8080 -p 50000:50000 -v ~/jenkins_home:/var/jenkins_home jenkins
```



## jenkinsfile 书写指南

```groovy
// 如何把shell的结果保存成变量
sh "cd vault-consul && helm package ."
def helmChartName = sh(script: 'ls ./vault-consul | grep vault-consul', returnStdout: true).trim()
echo "${helmChartName}"

// 如何获取存储在jenkins中的凭证 node
    withCredentials([file(credentialsId: 'devK8sConfig', variable: 'devK8sConfig'),
                     file(credentialsId: 'qaK8sConfig', variable: 'qaK8sConfig')]){
        
    }

// 如何获取存储在jenkins中的凭证 pipeline
    environment {
        KUBE_CONFIG=credentials('bigdataKubeConfig')
    }
	echo "${KUBE_CONFIG}"
```