

## 网站

- [官网](https://www.typescriptlang.org/)
- [github](https://github.com/Mircrosoft/TypeScript)


## 配置文件

tsconfig.json




## 命令行

```bash
npm install -g typescript

tsc app.ts # typescript compiler
tsc -w app.ts # 监视文件变化，随时recompile
```

## tips

> null 和 undefined 的区别

[stackoverflow -- What is the difference between null and undefined in JavaScript?](https://stackoverflow.com/questions/5076944/what-is-the-difference-between-null-and-undefined-in-javascript)

[阮一峰 -- undefined与null的区别](https://www.ruanyifeng.com/blog/2014/03/undefined-vs-null.html)

- null是一个表示"无"的对象，转为数值时为0；undefined是一个表示"无"的原始值，转为数值时为NaN。
- null表示"没有对象"，即该处不应该有值
- undefined表示"缺少值"，就是此处应该有一个值，但是还没有定义


