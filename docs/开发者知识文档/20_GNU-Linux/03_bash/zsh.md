## 自定义zshrc文件




```bash
echo "export JAVA_HOME=/usr/local/Cellar/openjdk@11/11.0.5+10" >> ~/.zshrc

echo "alias mylogin='source ~/mylogin'" >> ~/.zshrc;echo "ssh-copy-id \$1@\$2;echo \"alias \$3='ssh \$1@\$2'\" >> ~/.zshrc;source ~/.zshrc" > ~/mylogin;source ~/.zshrc




```





## oh-my-zsh