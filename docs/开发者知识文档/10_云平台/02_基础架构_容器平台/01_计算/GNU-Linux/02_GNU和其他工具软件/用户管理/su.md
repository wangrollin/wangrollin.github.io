
 su（英文全拼：switch user

变更帐号为 u1 并改变工作目录至 clsung 的家目录（home dir）

su - u1


## 切换到指定用户来执行命令，/etc/environment 多用户共享的

echo "ARTIFACT_TYPE=${ARTIFACT_TYPE}" >> /etc/environment

echo "start"
su - ros -c "cd /home/ros && python3 ci_build.py"
su ros -c "cd /home/ros && python3 ci_build.py"
echo "finish"
