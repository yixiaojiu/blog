# ssh

## 基本使用

```bash
ssh 用户名@IP地址

# 示例
ssh root@192.168.2.1
```

## 免密登录

### 配置别名快速登录：ssh-config

- ssh 安装目录 `/etc/ssh/ssh_config`
- 用户目录 `~/.ssh/config`

```
Host yixiaojiu
  HostName 192.168.2.1
  User root
```

此时使用别名即可直接登录

```bash
ssh yixiaojiu
```

### 免密登录：public-key 与 ssh-copy-id

把本地的`~/.ssh/id_rsa.pub`复制到远程服务器中

> 如果本地没用`~/.ssh/id_rsa.pub`, 用`ssh-keygen`生成

或者

```bash
cat ~/.ssh/id_rsa.pub | ssh 用户名@IP地址 "cat >> ~/.ssh/authorized_keys"
```

## 配置多个 ssh key

当有多个 ssh key 连接不同的主机时，需要配置 `~/.ssh/config` 文件

[掘金](https://juejin.cn/post/7085718883079815176)
