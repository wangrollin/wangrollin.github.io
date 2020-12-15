
## 官网

- [官网](https://godotengine.org/)
- [文档](https://docs.godotengine.org/en/stable/)


## 理解

Godot的的编辑器可以导入工程，或者新建工程，里面有很多例子可以下载。

Godot的**scene**和**node**是最重要的概念，node可以组成树，一个scene只能有一个root node与之对应。树可以实例化，并绑定到其他的node里，就像class里面的field一样。script可以操控各种属性和行为。node可以发出signal，其他node来监听，做出相应的反应。使用编辑器只能生成静态的node，使用脚本可以动态生成node，并动态挂载和卸载。

音乐是node，图片是node，外形是node，材质是node，等等。

游戏引擎就是一个游戏框架，将游戏通用的部分抽象出来，把能力通过api暴露出来，开发者只需要关注游戏逻辑本身。就像大学时期写的QQ堂，所有的东西都在自己写。
