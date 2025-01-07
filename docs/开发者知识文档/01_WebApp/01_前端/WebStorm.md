
## 配置

继承IDEA的配置

> For new project:

- Coding assistance for Node.js
- Node路径：会自动获取系统node路径
- npm路径：手动配置，示例：/usr/local/lib/node_modules/npm
- Editor > code style > javascript > punctuation > use semicolon **always**
- Editor > code style > typescript > punctuation > semicolon **always**
- Language & Frameworks > javascript > libraries > download
  - express
  - jquery (or npm i @types/jquery)
  - socket.io

- vue indents: 4
- Editor > Code Style > JavaScript > Use file extension > Always

> 插件

- Run Configuration For Typescript


## tips

> 在webstorm里直接运行ts，而不需要手动编译ts，然后在js里运行

插件Run Configuration For Typescript
npm install -D typescript
npm install -D ts-node