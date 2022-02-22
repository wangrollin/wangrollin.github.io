
- [（sed命令）linux替换目录下所有文件中的某字符串](https://blog.csdn.net/smilefxx/article/details/84061606)

```bash
sed -i "s/aaa/bbb/g" `grep aaa -rl /modules`
```

sed -i "s/leapkeeper_url_prefix/wrlwrlwrl/g" `grep leapkeeper_url_prefix -rl templates/*.html`