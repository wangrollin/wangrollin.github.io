
## 网页

- [官网](https://gomplate.ca/)
- [官网 doc](https://docs.gomplate.ca/)
- [github](https://github.com/hairyhenderson/gomplate)

gomplate -c CA=/home/minibase/dataleap-deploy/customized_values.yaml -f bbb.tpl -o bbb.out

{{ .CA.global.domain }}
