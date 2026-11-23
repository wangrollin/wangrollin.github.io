
## 介绍

foxglove 一开始是从 webviz 代码魔改得到的
2024.07 已经闭源，删除了官方 github 代码，删除了 docker hub 官方镜像

支持多模态数据的查看

## 网页

- [官网](https://foxglove.dev/)
- [官网 doc](https://docs.foxglove.dev/docs)
- [官网 视频教程](https://foxglove.dev/tutorials?topic=all)
- [ceo 闭源解释](https://www.reddit.com/r/robotics/comments/1bca4en/foxglove_studio_is_no_longer_open_source/?rdt=50584)
- [github](https://github.com/foxglove/studio?tab=readme-ov-file)
- [github 三方保留的代码](https://github.com/AD-EYE/foxglove-opensource)

## 组件

foxglove studio
mcap

## 第三方的 docker 镜像

docker run --rm -p "8080:8080" --name foxglove husarion/foxglove:latest

http://localhost:8080/

- 覆盖默认 layout，位置在 /foxglove/default_layout.json
- 远程文件一键可视化，在url 后面加这个参数：http://foxglove.my-example.com/?ds=remote-file&ds.url=https://xxx/xxx/this-is-my-bag.bag
