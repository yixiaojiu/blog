# MySql

## 开启远程连接

[MySQL8.0 设置远程访问权限](https://zhuanlan.zhihu.com/p/587097435)

## docker

```sh
# 创建容器
docker run --name <容器名称> -e MYSQL_ROOT_PASSWORD=<root用户密码> -d mysql:latest

# 进入容器
docker exec -it <容器名称> mysql -u root -p
```
