#!/usr/bin/env python3

import os
import re

prefix = '* '
base_path = os.getcwd()
path_list = (base_path + '/docs/开发者知识文档',
             base_path + '/docs/开发者知识文档',
             base_path + '/docs/开发者知识文档',
             base_path + '/docs/开发者知识文档')


def write_to_sidebar(root_path, indent, _sidebar_file):
    files = sorted(os.listdir(root_path))

    # 处理文件
    for file in files:

        # 不需要处理的文件
        if os.path.isfile(root_path + '/' + file) and 'DS_Store' in file \
                or os.path.isdir(root_path + '/' + file) and '.assets' in file \
                or os.path.isfile(root_path + '/' + file) and '_sidebar.md' == file:
            continue

        # 需要处理的文件
        if os.path.isdir(root_path + '/' + file):

            name_to_show = file

            if re.match('\\d*_.*', name_to_show):
                name_to_show = name_to_show[name_to_show.find('_') + 1:]

            _sidebar_file.writelines(indent + prefix + '🗂' + name_to_show + '\n')
            write_to_sidebar(root_path + '/' + file, indent + '    ', _sidebar_file)
        else:
            name_to_show = file.replace('.md', '')
            if re.match('\\d*_.*', name_to_show):
                name_to_show = name_to_show[name_to_show.find('_') + 1:]
            _sidebar_file.writelines(
                indent + prefix + '[📝' + name_to_show + '](' + (root_path + '/' + file).split('github.io')[1] + ')\n')


if __name__ == '__main__':
    for path in path_list:
        sidebar_file = open(path + '/_sidebar.md', 'w')
        write_to_sidebar(path, '', sidebar_file)
