# 局域网传输

## 类似工具

- [piping-server](https://github.com/nwtgck/piping-server)

基于 HTTP 实现，只需启动一个 server，发送端与接收端都与 server 进行通信

使用不同的路径来区分一次发送与接收任务

以 `/hello` 路径为例，发送端携带数据请求 `/hello`，server 保持这次连接。接收端 请求 `/hello`，server 将发送端的数据流导入到接收端

- [localsend](https://github.com/localsend/localsend)

基于 HTTP 实现，发送端与接收端都启动一个 server

使用 UDP 多播向局域网声明自己的存在，局域网的其他设备通过 `/register` api 进行注册

发送端发送 `/prepare-upload`，告知自己想要发送的文件的 metadata，接收端回应是否想接收文件

发送端请求 `/upload`

## 原型

使用 gRPC 进行通信，利用双向数据流实现双向通信

首先 `share serve`，启动服务

`share send -s <server_uri> -f <path>` 连接服务发送文件，选择接收端

`share receive -s <server_uri> -f <path>` 连接服务，接收文件

如果执行 `share serve` 时不指定 `-s`，则会启动服务
