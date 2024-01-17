

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

## 拉取新分支

git checkout -b bname origin/bname

## 删除分支

git branch -d bname

## 推送tag

git push --tag

```bash
git tag -a v1.0 -m "Version 1.0"
git tag v1.0
git push origin v1.0
```
