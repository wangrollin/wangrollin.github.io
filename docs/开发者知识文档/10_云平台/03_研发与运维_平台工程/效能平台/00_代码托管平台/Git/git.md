
a d
## monorepo

- [5 分钟搞懂 Monorepo](https://xie.infoq.cn/article/4f870ba6a7c8e0fd825295c92)
- [Advantages of monorepos](https://danluu.com/monorepo/)


## git log

- [commitizen github](https://github.com/commitizen/cz-cli)


## git hooks

- [husky github](https://github.com/typicode/husky)

## 常用命令

### 拿到当前分支

git rev-parse --abbrev-ref HEAD
git branch --show-current

### git clone 单commit

git clone -b test/v2.1.3 --single-branch --depth 1 https://wrapper.git
固定住分支和深度，减少拉取的文件大小

### git clone 带密码

git clone https://${cnb 账号}:${CNB_TOKEN}@cnb.cool/原始 repo.git

## 拿到当前用户

git config user.name

## 拿到当前 commit hash

git rev-parse HEAD
git rev-parse --verify HEAD

git rev-parse --short HEAD

## 查看分支

```bash
# 查看远程分支
git branch -r

```

## 拉取新分支

```bash
# 从当前分支切出来一个 new_branch
git checkout -b new_branch

# 从远程分支切出来本地分支
git checkout branch
```

## 修改分支名

git branch -m <原始分支名> <新的分支名>
git push origin --delete <原始分支名>
git push origin <新的分支名>

如果你没有将原始分支推送到远程仓库，只需推送重命名后的分支即可：

## 删除分支

git branch -d bname

## 推送tag

git push --tag

```bash
git tag
git show <tagname>

git tag -a v1.0 -m "Version 1.0"
git tag v1.0
git push origin v1.0

git tag -d <tagname>
git push origin :refs/tags/<tagname>
```

## 修改远程分支

git remote -v

git remote set-url origin https://xxxxxxx

git remote -v

## 迁移代码仓库从 平台A 到 平台B

参考文档 https://www.wolai.com/yingjie/2EeM2SohjWC6juwgPDAfSW

**仅克隆并同步代码**

```bash
# git clone 仓库
git clone --mirror https://e.coding.net/g-qnja0142/webgoat-allinone/webgoat-coding.git

# 进入克隆后的仓库
cd <新仓库本地目录>

# 添加新仓库的远程地址
git remote remove origin
git remote add origin http://119.45.237.50/demo/webgoat-coding.git

# 推送到新仓库，使用 --mirror 选项确保所有分支和引用都被推送
git push --mirror origin
```

**同步迁移 LFS 对象**

```bash
# 在当前 Git 仓库中安装和配置 Git LFS（Large File Storage）的客户端钩子（Hooks）
git lfs install
# 克隆完整仓库镜像
git clone --mirror https://X.X.X.X/webgoat-allinone/webgoat-coding.git
# 克隆之后，拉取所有 lfs
git lfs fetch --all

# 添加新仓库的远程地址
git remote remove origin
git remote add origin http://119.45.237.50/demo/webgoat-coding.git
# 推送 Git 对象
git lfs push --all origin
# 推送到新仓库，使用 --mirror 选项确保所有分支和引用都被推送
git push --mirror origin

```
