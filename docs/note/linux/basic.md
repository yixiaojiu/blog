# Linux 基础

## 管道符

`<command1> | <commmand2> | <commmand3>` 第一个命令的输出作为第二个命令的输入，第二个命令的输出作为第三个命令的输出

## 常用命令

### sftp

传输文件

[linux ssh、sftp、scp 命令远程传输文件](https://www.linuxprobe.com/ssh-sftp-scp.html)

### screen

```bash
screen -ls  查看当前会话
screen -r name  恢复指定name的会话
screen -S name  创建一个会话并命名为name
screen -R [pid/Name] -X quit 删除一个会话
screen -d name 处理There is no screen to be resumed matching
```

`ctrl`+ `a`+`d` 退出当前会话，也可以用于断开 ssh 连接

### yum

```bash
yum install 包名 -y   安装包
yum update -y        更新所有包
yum update 包名 -y    更新指定包
yum remove 包名       卸载包
```

### pm2

```bash
pm2 ls   查看列表
pm2 start app.js --name [name] --watch 启动应用并监视
pm2 stop [name] 停止
pm2 restart [name] 重启
pm2 delete [name] 删除
```

### 其他

```shell
# 删除一个`file1`文件
rm -f <file>
# 删除`dir1`目录
rmdir <dir>
# 删除`dir1`目录，同时删除其内容
rm -rf <dir>
# 重命名或移动一个目录
mv <orign> <target>
# 释放一个包
tar -xvf archive.tar
# 查看PATH，并格式化输出
echo $PATH | tr : '\n'
```

### docker

```shell
docker stats <container_name>

# 列出所有容器
docker container ls -a

# 列出所有正在运行的容器
docker ps
```
