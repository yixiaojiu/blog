# Ubuntu Server 踩坑记录

安装设备：Redmi Book Pro 14 2022

1. 红米笔记本的 BIOS 页面有密码，应该是之前安装系统的时候被强制设置了一次（逆天设计）。

2. 安装完成重启后一直无法进入系统，原因是在等待网络链接（逆天设计），需要等待超时

3. 安装时，记得在 network configuration 时连接 wifi，不然后面连接网络贼麻烦。

参考设置：

```txt
Subnet: 192.168.31.0/24 它与字网掩码：255.255.255.0含义相同
Address: 192.168.31.100 设置一个字网的 IP
Gateway: 192.168.31.1  路由器的 IP 地址
Name Servers: 114.114.114.114,8.8.8.8 域名服务器
```

4. clash：[clash-for-linux-install](https://github.com/nelvko/clash-for-linux-install?tab=readme-ov-file) 有 webui。安装后的 command 是 clash

5. docker 安装。官方的方法太慢了，挂 clash 也没用。使用教程里的一键安装脚本 [Docker — 从入门到实践](https://yeasy.gitbook.io/docker_practice/install/ubuntu)

6. 拉取 docker 镜像，在镜像前加上加速的地址。 [DockerHub 国内加速镜像列表](https://github.com/dongyubin/DockerHub)

```sh
docker pull docker.1ms.run/xhofe/alist
```

7. 给 docker pull 添加本地代理 [关于docker pull使用网络代理的配置](https://www.feiyiblog.com/2021/01/13/%E5%85%B3%E4%BA%8Edocker-pull%E4%BD%BF%E7%94%A8%E7%BD%91%E7%BB%9C%E4%BB%A3%E7%90%86%E9%97%AE%E9%A2%98/)

```sh
mkdir /etc/systemd/system/docker.service.d
vim /etc/systemd/system/docker.service.d/proxy.conf

# proxy.conf
[Service]
Environment="HTTP_PROXY=http://127.0.0.1:7890"
Environment="HTTPS_PROXY=http://127.0.0.1:7890"
Environment="NO_PROXY=localhost,127.0.0.1"
Environment="ALL_PROXY=socks5://127.0.0.1:7890"
```

使用本地代理，拉镜像的速度就起飞了。

8. qbittorrent 一直显示下载错误，可能是因为下载的目录没有权限，把下载目录的所属用户改成当前登陆的用户和用户组。

```sh
sudo chown -R yixiaojiu:yixiaojiu qbittorrent
```
