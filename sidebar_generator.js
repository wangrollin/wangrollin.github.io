#!/usr/bin/env node

let fs = require('fs');

let prefix = '* '

function write_to_sidebar(path, indent, sideBarFile) {

    let files = fs.readdirSync(path);
    files.sort(((fileName1, fileName2) => fileName1 < fileName2 ? -1 : 1));

    files.forEach(file => {

        if (!fs.statSync(path + '/' + file).isDirectory() && file.includes('.DS_Store')
            || !fs.statSync(path + '/' + file).isDirectory() && file === '_sidebar.md'
            || fs.statSync(path + '/' + file).isDirectory() && file.includes('.assets')) {
            return;
        }

        if (fs.statSync(path + '/' + file).isDirectory()) {
            let dirName = file;
            if (dirName.match(/^\d+_\.*/g)) {
                dirName = dirName.substr(dirName.indexOf('_') + 1, dirName.length)
            }
            fs.appendFileSync(sideBarFile, indent + prefix + '🗂' + dirName + '\n');
            write_to_sidebar(path + '/' + file, indent + '    ', sideBarFile);
        } else {
            let name_to_show = file.replace('.md', '');
            if (name_to_show.match(/^\d+_\.*/g)) {
                name_to_show = name_to_show.substr(file.indexOf('_') + 1, file.length)
            }
            fs.appendFileSync(sideBarFile, indent + prefix + '[📝' + name_to_show + ']('
                + (path + '/' + file).split('github.io')[1] + ')\n');
        }
    });
}

function generateSideBar() {

    let basePath = process.cwd()
    let pathList = [basePath + '/docs/开发者知识文档',
        basePath + '/docs/Tech_Inc',
        basePath + '/docs/关于作者']

    pathList.forEach(path => {
        fs.open(path + '/_sidebar.md',
            'w',
            '777',
            (err, fd) => write_to_sidebar(path, '', path + '/_sidebar.md'));
    });
}

generateSideBar();
