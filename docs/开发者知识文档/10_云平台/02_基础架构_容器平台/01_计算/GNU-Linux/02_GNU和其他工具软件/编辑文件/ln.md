
- [菜鸟 - Linux ln 命令](https://www.runoob.com/linux/linux-comm-ln.html)

硬链接(hard link)与软链接(symbolic link)

ln -sf /usr/local/bin/pip /usr/local/bin/pip2

f -- force

ln -s /usr/local/bin/pip /usr/local/bin/pip2

ln -s origin_file link

ln -sf /usr/local/Cellar/kubernetes-cli/1.29.0/bin/kubectl /usr/local/bin/kubectl
kubectl version --client


## 在Linux中，软链接（symbolic link）和硬链接（hard link）是两种创建文件链接的方式，它们具有一些区别。

1. 路径和文件类型：软链接是一个特殊的文件，它包含源文件的路径信息，类似于Windows系统中的快捷方式。软链接可以跨越文件系统，可以链接到目录或文件。而硬链接是一个指向实际文件数据的索引节点（inode），它与原始文件具有相同的路径和文件类型，硬链接只能在同一文件系统内创建。

2. 文件大小：软链接文件本身很小，只包含源文件的路径信息。而硬链接文件与原始文件共享相同的数据和大小。

3. 删除行为：如果删除原始文件，软链接将变为"断开链接"状态，但不会影响源文件的存在。而硬链接将保持原始文件的内容完整，只有在所有硬链接都被删除后，才会真正删除文件。

4. 修改行为：当修改原始文件时，所有的硬链接文件都会反映出这些修改，因为它们实际上引用的是相同的数据。而软链接是一个指向源文件的指针，所以即使修改了原始文件，软链接的内容仍然保持不变。

5. 跨文件系统：软链接可以链接到其他文件系统中的文件或目录，而硬链接只能在同一文件系统内创建。

总的来说，软链接提供了更大的灵活性，可以链接到不同文件系统中的文件或目录，并且即使原始文件被删除，软链接仍然存在。而硬链接更像是原始文件的一个副本，它们共享相同的数据和属性，并且只能在同一文件系统内创建。

