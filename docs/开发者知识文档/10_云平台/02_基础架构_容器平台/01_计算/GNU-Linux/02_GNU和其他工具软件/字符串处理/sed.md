
- [（sed命令）linux替换目录下所有文件中的某字符串](https://blog.csdn.net/smilefxx/article/details/84061606)

```bash
sed -i "s/aaa/bbb/g" `grep aaa -rl /modules`
```

sed -i "s/leapkeeper_url_prefix/wrlwrlwrl/g" `grep leapkeeper_url_prefix -rl templates/*.html`

echo '1,2,3' | sed 's/,/\n/g'

删除第三行
sed -i '3d' a.txt

删除前三行
sed -i '1,3d' a.txt

cat a.txt | sed '3d'

## mac 上面的坑 ''

sed -i '' "s/CHANGEME_IMAGE_VERSION/${IMAGE_VERSION}/g" bin/upload.sh
