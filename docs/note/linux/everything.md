# 杂货箱

## 管道符

`<command1> | <commmand2> | <commmand3>` 第一个命令的标准输出作为第二个命令的标准输入，第二个命令的标准输出作为第三个命令的标准输入

## 常用工具

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

### ffmpeg

```shell
# 压缩成宽度为 640 像素，并使用 80% 的质量进行压缩
ffmpeg -i input.jpg -vf scale=640:-1 -quality 80 output.jpg
```

### docker

```shell
docker stats <container_name>

docker run -dit --name <name> -p 3941:3941 <image>

# 列出所有正在运行的容器
docker ps

# 列出所有容器
docker ps -a

# 查看镜像
docker image ls

# 以交互式的方式进入容器
docker exec -it <name> bash

# 构建镜像
# 例如： docker build -t kimika-server-ts:latest .
docker build -t <name:tag> .
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
# 更改文件大小
truncate -s 20MB <file>
# 连接 wifi
nmcli dev wifi connect 'Redmi Note 10 Pro' password "12345678"
# 时间同步，需要 root 权限
ntpdate cn.pool.ntp.org
```

## 命令行快捷键

> 参考[Linux 命令行编辑快捷键](https://gist.github.com/zhulianhua/befb8f61db8c72b4763d)

- Ctrl+a 光标回到命令行首
- Ctrl+e 光标回到命令行尾

## ssh

### 配置别名

修改 `~/.ssh/config` 文件

```
Host alias
  HostName [Ip address]
  User root
```

## ubuntu 初始化

### 更换镜像源

```sh
# 备份原始文件
sudo cp /etc/apt/sources.list /etc/apt/sources.list.b
# 修改文件权限
sudo chmod 777 /etc/apt/sources.list
# 用 vim 打开文件
sudo vim /etc/apt/sources.list
```

删除源文件，复制以下内容

```txt
deb http://mirrors.aliyun.com/ubuntu/ focal main restricted universe multiverse

deb-src http://mirrors.aliyun.com/ubuntu/ focal main restricted universe multiverse

deb http://mirrors.aliyun.com/ubuntu/ focal-security main restricted universe multiverse

deb-src http://mirrors.aliyun.com/ubuntu/ focal-security main restricted universe multiverse

deb http://mirrors.aliyun.com/ubuntu/ focal-updates main restricted universe multiverse

deb-src http://mirrors.aliyun.com/ubuntu/ focal-updates main restricted universe multiverse

deb http://mirrors.aliyun.com/ubuntu/ focal-proposed main restricted universe multiverse

deb-src http://mirrors.aliyun.com/ubuntu/ focal-proposed main restricted universe multiverse

deb http://mirrors.aliyun.com/ubuntu/ focal-backports main restricted universe multiverse

deb-src http://mirrors.aliyun.com/ubuntu/ focal-backports main restricted universe multiverse

```

更新

```sh
sudo apt update
sudo apt upgrade
```

## ubuntu 无法 root 登录

Ubuntu 系统的默认用户名是 ubuntu，并在安装过程中默认不设置 root 帐户和密码。您如有需要，可在设置中开启允许 root 用户登录。具体操作步骤如下：

1. 使用 ubuntu 帐户登录轻量应用服务器。
2. 执行以下命令，设置 root 密码。

```bash
sudo passwd root
```

3. 输入 root 的密码，按 **Enter**。
4. 重复输入 root 的密码，按 **Enter**。

返回如下信息，即表示 root 密码设置成功。

```bash
passwd: password updated successfully
```

5. 执行以下命令，打开 `sshd_config` 配置文件。

```bash
sudo vi /etc/ssh/sshd_config
```

6. 按 **i** 切换至编辑模式，找到 `#Authentication`，将 `PermitRootLogin` 参数修改为 `yes`。如果 `PermitRootLogin` 参数被注释，请去掉首行的注释符号（`#`)
7. 找到 `#Authentication`，将 `PasswordAuthentication` 参数修改为 yes。

> 若 `sshd_config` 配置文件中无此配置项，则添加 `PasswordAuthentication yes` 项即可。

8. 按 **Esc**，输入 **:wq**，保存文件并返回。
9. 执行以下命令，重启 ssh 服务

```bash
sudo service ssh restart
```

## 使用数字设置文件权限

4 、2 和 1 表示读 r、写 w、执行权限 x

- rwx = 4 + 2 + 1 = 7
- rw- = 4 + 2 = 6
- r-x = 4 + 1 = 5

```shell
chmod <ugo> <file>
```

ugo 表示 拥有者、群组、其他组

```shell
# 为所有组添加执行权限
chmod +x <file>
```

## Shebang

可执行文件的程序加载器声明

[维基百科](https://zh.wikipedia.org/wiki/Shebang)

## ANSI 转义序列 与 CSI 序列

[计算机知识：ANSI转义序列以及输出颜色字符详解](https://www.cnblogs.com/xiaoqiangink/p/12718524.html)

## 终端

- `PS1 变量`：当前的命令提示符设置
- `!!`：上一条命令
