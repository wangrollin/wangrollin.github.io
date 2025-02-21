

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
