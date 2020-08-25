#!/usr/bin/env node

var fs = require('fs');
var path = require('path');

prefix = '* '
basePath = process.cwd()
pathList = [basePath + '/docs/开发者知识文档',
    basePath + '/docs/开发小组成员',
    basePath + '/docs/进展',
    basePath + '/docs/BigDemo项目文档']

function write_to_sidebar(path, indent, _sidebar_file) {

}

pathList.forEach(rootPath => console.log(rootPath))

fs.readdir(pathList[0]), file=>console.log(file);
