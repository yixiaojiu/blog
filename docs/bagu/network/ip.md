# IP

## 网段

`127.*.*.*` 本机回环地址

内网IP

- `10.*.*.*` 一般用于学校内网

- `172.16.*.*` - `172.32.*.*` 一般用于公司

- `192.168.*.*` 一般用于家里

## 网络位与主机位

例如 `192.168.198.1/24` 网络位是 `192.168.198` 主机位是 `1`，子网掩码是 `255.255.255.0`

子网掩码是为例区分哪些是网络位，哪些是主机位

## 路由器与交换机

|              |    路由器     |       交换机        |
| :----------: | :-----------: | :-----------------: |
|     OSI      |    网络层     |     数据链路层      |
| 数据传输地址 |    IP 地址    |      MAC 地址       |
|   使用范围   | 局域网/广域网 |       局域网        |
|   存储信息   |    路由表     | MAC地址与端口映射表 |