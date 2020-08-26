#!/usr/bin/env node

let fs = require('fs');

let prefix = '* '

function write_to_sidebar(path, indent, sideBarFile) {

    fs.readdir(path, (err, files) => {

        files.sort(((fileName1, fileName2) => fileName1 < fileName2 ? -1 : 1));

        files.forEach(file => {

            if (!fs.statSync(path + '/' + file).isDirectory() && file.includes('.DS_Store')
                || !fs.statSync(path + '/' + file).isDirectory() && file === '_sidebar.md'
                || fs.statSync(path + '/' + file).isDirectory() && file.includes('.assets')) {
                return;
            }

            if (fs.statSync(path + '/' + file).isDirectory()) {
                let dirName = file;
                if (dirName.match(/\d*_.*!/g)) {
                    dirName = dirName.substr(dirName.indexOf('_') + 1, dirName.length)
                }
                fs.appendFileSync(sideBarFile, indent + prefix + '🗂' + dirName + '\n');
                write_to_sidebar(path + '/' + file, indent + '    ', sideBarFile);
            } else {
                file = file.replace('.md', '');
                if (file.match(/\d*_.*!/g)) {
                    file = file.substr(file.indexOf('_') + 1, file.length)
                }
                fs.appendFileSync(sideBarFile, indent + prefix + '[📝' + file + ']('
                    + (path + '/' + file).split('github.io')[1] + ')\n');
            }
        });
    });
}

function generateSideBar() {

    let basePath = process.cwd()
    let pathList = [basePath + '/docs/开发者知识文档',
        basePath + '/docs/开发小组成员',
        basePath + '/docs/进展',
        basePath + '/docs/BigDemo项目文档']

    pathList.forEach(path => {
        fs.open(path + '/_sidebar1.md',
            'w',
            '777',
            (err, fd) => write_to_sidebar(path, '', path + '/_sidebar1.md'));
    });
}

generateSideBar();
