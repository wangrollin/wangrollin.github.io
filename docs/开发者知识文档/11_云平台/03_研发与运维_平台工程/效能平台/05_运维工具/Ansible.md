
- [官网](https://www.ansible.com/)
- [github](https://github.com/ansible/ansible)
- [Ansible 入门介绍](https://lotabout.me/2020/Ansible-Introduction/)
- [RedHat Ansible 基础知识入门](https://www.redhat.com/zh/topics/automation/learning-ansible-tutorial)
- [RedHat 什么是 Ansible Playbook？](https://www.redhat.com/zh/topics/automation/what-is-an-ansible-playbook)

ansible tower -- ui 工具

## 创建软链接

ansible nodes -m file -a "src=/path/to/source/file dest=/path/to/destination/link state=link force=yes"

## 执行 shell 命令

ansible k8s_cluster -m shell -a "mkdir -p /opt/tiger/flink_deploy/deploy"
