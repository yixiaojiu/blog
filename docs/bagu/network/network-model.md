# 网络模型

## OSI 七层模型

它把网络从逻辑上分为了 7 层

应用层、表示层、会话层、传输层、网络层、数据链路层、物理层

## TCP/IP 四层模型

图片与内容来源：[小林 coding](https://xiaolincoding.com/network/1_base/tcp_ip_model.html)

1. 应用层：应用层只需要专注于为用户提供应用功能，比如 HTTP，不用去关心数据是如何传输的
2. 传输层：为应用层提供网络支持的，有两个传输协议，分别是 TCP 和 UDP。在 TCP 协议中，每个分块称为一个 TCP 段，数据包超过 MSS 时，需要分段
3. 网络层：网络层最常使用的是 IP 协议，如果 IP 报文大小超过 MTU（以太网中一般为 1500 字节）就会再次进行分片

![](https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/%E9%94%AE%E5%85%A5%E7%BD%91%E5%9D%80%E8%BF%87%E7%A8%8B/12.jpg)

4. 网络接口层: 在 IP 头部的前面加上 MAC 头部

在应用层数据包叫 data 或 message，在 TCP 层我们称为 segment，在 IP 层我们叫 packet，在数据链路层称为 frame

![](https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost3@main/%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F/%E6%B5%AE%E7%82%B9/%E5%B0%81%E8%A3%85.png)

## 五层模型

应用层、运输层、网络层、数据链路层和物理层

五层协议只是 OSI 和 TCP/IP 的综合
