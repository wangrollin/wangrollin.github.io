
## 网站

- [官方 doc](https://flask-migrate.readthedocs.io/en/latest)
- [github](https://github.com/miguelgrinberg/flask-migrate)
- [在已有项目上添加 flask-migrate](https://blog.miguelgrinberg.com/post/how-to-add-flask-migrate-to-an-existing-project)

## tips

### 初始化

**第一次初始化**
```bash
create DATABASE `my_db`; /*!40100 DEFAULT CHARACTER SET utf8mb4 */;

# 在 leapkeeper_be 目录下执行
export FLASK_APP=src/main.py
flask db init --multidb
```

**后面每次更新就执行下面的命令**
```bash
# step 0: 在 leapkeeper_be 目录下执行
export FLASK_APP=src/main.py

# step 1: 对比代码和 db，生成 ddl 版本文件
flask db migrate 

# step 2: 到文件里手动处理 dorado 库的版本代码，如果需要可以 添加 dml

# step 3: 对 db 执行更新命令
flask db upgrade 
```

### 设置 file template，py 命名

修改文件 alembic.ini

file_template = %%(year)d%%(month).2d%%(day).2d_%%(hour).2d%%(minute).2d%%(second).2d_%%(rev)s_%%(slug)s
