
- [github](https://github.com/ollama/ollama)
- [文档](https://github.com/ollama/ollama/blob/main/docs/README.md)
- [官网](https://ollama.com/)

## 开启多模型和并发处理

https://www.lvtao.net/tool/ollama-parallel-max-models.html

## 容器化部署

docker run -d -v ollama:/root/.ollama -p 11434:11434 --name ollama ollama/ollama

docker exec -it ollama ollama run llama3

## open webUI 部署

- [github](https://github.com/open-webui/open-webui)
- [文档](https://docs.openwebui.com/)
- [官网](https://openwebui.com/)

open webUI + ollama，一起一键部署

docker run -d -it \
    -p 3000:8080 \
    -v ollama:/root/.ollama \
    -v open-webui:/app/backend/data \
    --name open-webui \
    --restart always \
    ghcr.io/open-webui/open-webui:ollama


## ModelFile 模型离线导入

https://www.zhihu.com/tardis/zm/art/14743091642?source_id=1005


