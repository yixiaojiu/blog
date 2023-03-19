# 服务器相关

## QQ 机器人

**重置机器人**

`rm -f /root/xdd-plus/session.token`

**运行**

`./xdd`

**挂机**

`nohup ./xdd 1>/dev/null 2>&1 & #AMD64`

**重置登录次数**

`docker exec -it qinglong ql resetlet`

---

**vscode online 运行**

`bin/code-server --port 5000 --host 0.0.0.0 --auth password`

```bash
bin/code-server --port 5000 --host 0.0.0.0 --auth password    启动服务
~/.config/code-server/config.yaml      配置文件的位置
```

---

## screen

```bash
screen -ls  查看当前会话
screen -r name  恢复指定name的会话
screen -S name  创建一个会话并命名为name
screen -R [pid/Name] -X quit 删除一个会话
screen -d name 处理There is no screen to be resumed matching
```

`ctrl`+ `a`+`d` 退出当前会话

---

## yum

```bash
yum install 包名 -y   安装包
yum update -y        更新所有包
yum update 包名 -y    更新指定包
yum remove 包名       卸载包
```

## pm2

```bash
pm2 ls   查看列表
pm2 start app.js --name [name] --watch 启动应用并监视
pm2 stop [name] 停止
pm2 restart [name] 重启
pm2 delete [name] 删除
```

## Nginx

```bash
yum install nginx -y
nginx  								启动
nginx -s stop   			停止
ps -ef | grep nginx   查看进程
nginx -s reload				重载nginx配置文件
nginx -t							检查配置文件的语法问题，可以看到配置文件的位置
```

`/usr/sbin/nginx`nginx 可执行文件的位置

- 反向代理

```
location / {
  index index.html index.htm;
  proxy_pass http://127.0.0.1;
}
```

## 常用命令

```bash
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

```
sudo cp /etc/apt/sources.list /etc/apt/sources.list.b // 备份原始文件

sudo chmod 777 /etc/apt/sources.list  // 修改文件权限

sudo vi /etc/apt/sources.list // 用 vim 打开文件
```

删除源文件，复制以下内容

```
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

```
sudo apt update
sudo apt upgrade
```

### 下载 nvm

[nvm github 地址](https://github.com/nvm-sh/nvm#installing-and-updating)

[域名查 IP 的网站](https://tool.lu/ip/)

**更改 github 域名解析的 ip**

```bash
vi /etc/hosts
```

在末尾输入

```
185.199.108.133 raw.githubusercontent.com
```

```
更新一下.bashrc文件
source .bashrc
```

**配置镜像源**

```
vi .bashrc

粘贴
export NVM_NODEJS_ORG_MIRROR=http://npmmirror.com/mirrors/node
```

### MongoDB 的安装

[官方文档](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-ubuntu/)

### 安装 nginx

[教程](https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-20-04)

```
sudo apt update
sudo apt install nginx
```

### nginx 域名配置

**server 块**

```
server{
    listen 80;
    server_name yixiaojiu.al21.ga; #绑定域名
    index index.htm index.html index.php; #默认文件
    root /usr/share/nginx/html; #网站根目录
    include location.conf; #调用其他规则，也可去除
}
```

### 安装 git

```
sudo apt install git
```

### 生成 ssh key，关联 github

```
ssh-keygen -o
一路默认

查看公钥
cat /root/.ssh/id_rsa.pub
```

## MC 服务器的搭建

### 下载 server 文件

选择对应的版本，server 版本需要可游戏版本一样

[网址 1.12.2](https://mcversions.net/download/1.12.2)

### 搞 server 文件

1. 在 server.jar 同目录下创建`start.bat`

```
@echo off
java -Xms1024m -Xmx1100m -jar server.jar
```

双击运行

2. 修改 eual.txt 文件

```
#By changing the setting below to TRUE you are indicating your agreement to our EULA (https://account.mojang.com/documents/minecraft_eula).
#Fri Jun 17 22:58:51 CST 2022
eula=true
```

将`eula=true`改为`eula=false`

3. 再次双击`start.bat`文件运行
4. 写一个名为`start.sh`的 shell 文件

```bash
#!/bin/bash
java -Xms1024m -Xmx1100m -jar server.jar
```

5. 上传后修改`start.sh`权限

```bash
chmod +x start.sh
```

6. 用`screen`创建一个会话

7. 执行

```
sh ./start.sh
```

## zsh

**安装 zsh**

```bash
apt install zsh
```

**oh-my-shell**

[github](https://github.com/ohmyzsh/ohmyzsh)

可能会变，以官方文档为准

```bash
sh -c "$(wget -O- https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

**更改 `.zshrc`配置**

```bash
vi .zshrc
```

**主题**

```
kafeitu
```

**安装第三方插件**

zsh-autosuggestions

```bash
1. 进入 ~/.oh-my-zsh/plugins
cd ~/.oh-my-zsh/plugins

2. 克隆插件的仓库
git clone 地址

3. 加入插件名到配置文件中
```

## ubuntu 无法 root 登录

> 来源于腾讯云文档

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
