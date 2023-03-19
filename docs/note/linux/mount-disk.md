# 挂载磁盘

> 参考[Linux 磁盘操作](https://blog.csdn.net/LXWalaz1s1s/article/details/115841831)

## df 命令

检查文件系统的磁盘空间占用情况。可以利用该命令来获取硬盘被占用了多少空间，目前还剩下多少空间等信息。

```
-a ：列出所有的文件系统，包括系统特有的 /proc 等文件系统；
-k ：以 KBytes 的容量显示各文件系统；
-m ：以 MBytes 的容量显示各文件系统；
-h ：以人们较易阅读的 GBytes, MBytes, KBytes 等格式自行显示；
-H ：以 M=1000K 取代 M=1024K 的进位方式；
-T ：显示文件系统类型, 连同该 partition 的 filesystem 名称 (例如 ext3) 也列出；
-i ：不用硬盘容量，而以 inode 的数量来显示
```

使用示例

```bash
$ df -TH

Filesystem     Type      Size  Used Avail Use% Mounted on
dev            devtmpfs  4.1G     0  4.1G   0% /dev
run            tmpfs     4.2G  1.1M  4.2G   1% /run
/dev/sdb2      ext4       22G  2.8G   18G  14% /
tmpfs          tmpfs     4.2G     0  4.2G   0% /dev/shm
tmpfs          tmpfs     4.2G     0  4.2G   0% /tmp
/dev/sda1      ext4      492G  2.2M  467G   1% /home
tmpfs          tmpfs     822M     0  822M   0% /run/user/0
```

## MBR（Master Boot Record）分区演示

以新添加磁盘 `/dev/sda` 为例

1. 查看当前磁盘分区情况

```bash
lsblk
```

2. 对新增磁盘进行分区，创建一个主分区

```bash
fdisk /dev/sda
```

3. 格式化分区

```bash
mkfs.ext4 /dev/sda1
```

4. 磁盘挂载

```bash
mount /dev/sda1 /home
# 查看是否挂载成功
df -h
```

5. 永久挂载

```bash
# 获取 UUID
blkid /dev/sda1

vim /etc/fstab
# 将 UUID=[UUID] /home ext4 defaults 0 0 插入到文件中

mount -a
```
