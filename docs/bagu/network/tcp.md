# TCP

> 内容来自 [小林 coding](https://xiaolincoding.com/network/3_tcp/tcp_interview.html)

## TCP 基本认识

TCP 是面向连接的、可靠的、基于字节流的传输层通信协议

![](https://cdn.xiaolincoding.com//mysql/other/format,png-20230309230534096.png)

TCP 四元组：源地址、源端口、目的地址、目的端口

**控制位：**

- `ACK`：该位为 1 时，「确认应答」的字段变为有效，TCP 规定除了最初建立连接时的 SYN 包之外该位必须设置为 1 。
- `RST`：该位为 1 时，表示 TCP 连接中出现异常必须强制断开连接。
- `SYN`：该位为 1 时，表示希望建立连接，并在其「序列号」的字段进行序列号初始值的设定。
- `FIN`：该位为 1 时，表示今后不会再有数据发送，希望断开连接。当通信结束希望断开连接时，通信双方的主机之间就可以相互交换 FIN 位为 1 的 TCP 段。

## 三次握手

![](https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost4/%E7%BD%91%E7%BB%9C/TCP%E4%B8%89%E6%AC%A1%E6%8F%A1%E6%89%8B.drawio.png)

第三次握手是可以携带数据的，前两次握手是不可以携带数据的

## 为什么是三次握手？

常见回答：因为三次握手才能保证双方具有接收和发送的能力

1. 三次握手才可以阻止重复历史连接的初始化（主要原因）

![](https://cdn.xiaolincoding.com//mysql/other/format,png-20230309230525514.png)

在两次握手的情况下，服务端没有中间状态给客户端来阻止历史连接，导致服务端可能建立一个历史连接，造成资源浪费。

![](https://cdn.xiaolincoding.com//mysql/other/fe898053d2e93abac950b1637645943f.png)

2. 三次握手才可以同步双方的初始序列号

**序列号的作用：**

- 接收方可以去除重复的数据；
- 接收方可以根据数据包的序列号按序接收；
- 可以标识发送出去的数据包中， 哪些是已经被对方收到的（通过 ACK 报文中的序列号知道）

3. 三次握手才可以避免资源浪费

## 为什么每次建立 TCP 连接时，初始化的序列号都要求不一样呢？

为了防止历史报文被下一个相同四元组的连接接收（主要方面）；

![](https://cdn.xiaolincoding.com/gh/xiaolincoder/network/tcp/isn%E7%9B%B8%E5%90%8C.png)

## 握手丢失会发生什么

- 第一次握手：客户端会触发超时重传，重传 SYN 报文，而且重传的 SYN 报文的序列号都是一样的。每次超时的时间是上一次的 2 倍
- 第二次握手：客户端和服务端都会重传
- 第三次握手：服务端重传 SYN-ACK 报文。ACK 报文是不会有重传的，当 ACK 丢失了，就由对方重传对应的报文

## 四次挥手

![](https://cdn.xiaolincoding.com//mysql/other/format,png-20230309230614791.png)

每个方向都需要一个 FIN 和一个 ACK，因此通常被称为四次挥手。

主动关闭连接的，才有 TIME_WAIT 状态。

## 为什么挥手需要四次？

- 关闭连接时，客户端向服务端发送 FIN 时，仅仅表示客户端不再发送数据了但是还能接收数据。
- 服务端收到客户端的 FIN 报文时，先回一个 ACK 应答报文，而服务端可能还有数据需要处理和发送，等服务端不再发送数据时，才发送 FIN 报文给客户端来表示同意现在关闭连接。

## 挥手丢失会发生什么

- 第一次挥手：客服端重传 FIN 报文，当超过最大重传次数时
- 第二次挥手：由于 ACK 报文是不会重传的，所以由客户端触发超时重传机制，重传 FIN 报文
- 第三次挥手：服务端超时重传 FIN 报文
- 第四次挥手：服务端超时重传 FIN 报文

## TCP 半连接队列和全连接队列

- 半连接队列，也称 SYN 队列；
- 全连接队列，也称 accept 队列；

## 重传机制

### 超时重传

`RTT` 是指数据发送时刻到接收到确认的时刻的差值，也就是包的往返时间。

超时重传时间用 `RTO` （Retransmission Timeout ）表示

估计往返时间，通常需要采样以下两个：

1. 需要 TCP 通过采样 RTT 的时间，然后进行加权平均，算出一个平滑 RTT 的值，而且这个值还是要不断变化的，因为网络状况不断地变化。
2. 除了采样 RTT，还要采样 RTT 的波动范围，这样就避免如果 RTT 有一个大的波动的话，很难被发现的情况。

如果超时重发的数据，再次超时的时候，又需要重传的时候，TCP 的策略是超时间隔加倍。两次超时，就说明网络环境差，不宜频繁反复发送。

### 快速重传

![Fast Retransmit](https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost2/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/TCP-%E5%8F%AF%E9%9D%A0%E7%89%B9%E6%80%A7/10.jpg?image_process=watermark,text_5YWs5LyX5Y-377ya5bCP5p6XY29kaW5n,type_ZnpsdHpoaw,x_10,y_10,g_se,size_20,color_0000CD,t_70,fill_0)

快速重传的工作方式是当收到三个相同的 ACK 报文时，会在超时重传之前，重传丢失的报文段。

**面临的问题：** 重传的时候，是重传一个，还是重传所有的报文。

### SACK 方法

为了解决不知道该重传哪些 TCP 报文

在 TCP 头部「选项」字段里加一个 SACK 的东西，它可以将已收到的数据的信息发送给「发送方」

![Selective Acknowledgment](https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost2/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/TCP-%E5%8F%AF%E9%9D%A0%E7%89%B9%E6%80%A7/11.jpg?image_process=watermark,text_5YWs5LyX5Y-377ya5bCP5p6XY29kaW5n,type_ZnpsdHpoaw,x_10,y_10,g_se,size_20,color_0000CD,t_70,fill_0)

### Duplicate SACK

Duplicate SACK 又称 D-SACK，其主要使用了 SACK 来告诉「发送方」有哪些数据被重复接收了。

## 滑动窗口

为了解决一问一答通信效率低下的问题

窗口大小：无需等待确认应答，而可以继续发送数据的最大值。

窗口的实现实际上是操作系统开辟的一个缓存空间，发送方主机在等到确认应答返回之前，必须在缓冲区中保留已发送的数据。如果按期收到确认应答，此时数据就可以从缓存区清除。

### 窗口大小由哪一方决定？

TCP 头里有一个字段叫 `Window`，也就是窗口大小。

窗口的大小是由接收方的窗口大小来决定

因为发送端需要根据接收端的处理能力来发送数据

### 发送方滑动窗口

![](https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost2/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/TCP-%E5%8F%AF%E9%9D%A0%E7%89%B9%E6%80%A7/19.jpg?image_process=watermark,text_5YWs5LyX5Y-377ya5bCP5p6XY29kaW5n,type_ZnpsdHpoaw,x_10,y_10,g_se,size_20,color_0000CD,t_70,fill_0)

- SND.WND：表示发送窗口的大小（大小是由接收方指定的）；
- SND.UNA（Send Unacknoleged）：是一个绝对指针，它指向的是已发送但未收到确认的第一个字节的序列号，也就是 #2 的第一个字节。
- SND.NXT：也是一个绝对指针，它指向未发送但可发送范围的第一个字节的序列号，也就是 #3 的第一个字节。

可用窗口大小 = SND.WND -（SND.NXT - SND.UNA）

### 接收方滑动窗口

![](https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost2/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/TCP-%E5%8F%AF%E9%9D%A0%E7%89%B9%E6%80%A7/20.jpg)

- RCV.WND：表示接收窗口的大小，它会通告给发送方。
- RCV.NXT：是一个指针，它指向期望从发送方发送来的下一个数据字节的序列号，也就是 #3 的第一个字节。

### 接收窗口和发送窗口的大小是相等的吗？

接收窗口的大小是约等于发送窗口的大小的。

## 流量控制

TCP 提供一种机制可以让「发送方」根据「接收方」的实际接收能力控制发送的数据量，这就是所谓的流量控制。

发送窗口和接收窗口中所存放的字节数，都是放在操作系统内存缓冲区中的，而操作系统的缓冲区，会被操作系统调整。

TCP 规定不允许同时减少缓存又收缩窗口的，因为会出现丢包情况，而是采用先收缩窗口，通知发送端，再减少缓存

### 窗口关闭

如果窗口大小为 0 时，就会阻止发送方给接收方传递数据，直到窗口变为非 0 为止，这就是窗口关闭。

当发生窗口关闭时，接收方处理完数据后，会向发送方通告一个窗口非 0 的 ACK 报文，如果这个通告窗口的 ACK 报文在网络中丢失了，就会造成死锁现象

**如何解决窗口关闭时，潜在的死锁现象**

TCP 连接一方收到对方的零窗口通知，就启动持续计时器。如果持续计时器超时，就会发送窗口探测 ( Window probe ) 报文。

- 如果接收窗口仍然为 0，那么收到这个报文的一方就会重新启动持续计时器；
- 如果接收窗口不是 0，那么死锁的局面就可以被打破了。

窗口探测的次数一般为 3 次，如果 3 次过后窗口还是 0 的话，就会 RST 报文来中断连接

### 糊涂窗口综合症

如果接收方腾出几个字节并告诉发送方现在有几个字节的窗口，而发送方会义无反顾地发送这几个字节，这就是糊涂窗口综合症。

糊涂窗口综合症的现象可以发生在发送方和接收方：

- 接收方可以通告一个小的窗口
- 而发送方可以发送小数据

**怎么让接收方不通告小窗口呢？**

> MSS 最大分段大小

当接收方的窗口大小 小于 min( MSS，缓存空间/2 ) 时，就会向发送方通告窗口为 0

**怎么让发送方避免发送小数据呢？**

使用 Nagle 算法，满足下面两个条件中的任意一个条件，才可以发送数据：

- 要等到窗口大小 >= MSS 并且 数据大小 >= MSS
- 收到之前发送数据的 ack 回包

## 拥塞控制

在网络出现拥堵时，如果继续发送大量数据包，可能会导致数据包时延、丢失等，拥塞控制的目的就是避免「发送方」的数据填满整个网络。

拥塞窗口 cwnd是发送方维护的一个的状态变量，它会根据网络的拥塞程度动态变化的。

由于引入拥塞窗口的的概念，则发送窗口的大小等于接收窗口与拥塞窗口的最小值

拥塞的判断方法是：「发送方」没有在规定时间内接收到 ACK 应答报文，也就是发生了超时重传，就会认为网络出现了拥塞。

### 慢启动

当发送方每收到一个 ACK，拥塞窗口 cwnd 的大小就会加 1

有一个叫慢启动门限 ssthresh （slow start threshold）状态变量：

- 当 `cwnd` < `ssthresh` 时，使用慢启动算法。
- 当 `cwnd` >= `ssthresh` 时，就会使用「拥塞避免算法」。

### 拥塞避免算法

每当收到一个 ACK 时，cwnd 增加 1/cwnd。

![](https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost2/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/TCP-%E5%8F%AF%E9%9D%A0%E7%89%B9%E6%80%A7/28.jpg?image_process=watermark,text_5YWs5LyX5Y-377ya5bCP5p6XY29kaW5n,type_ZnpsdHpoaw,x_10,y_10,g_se,size_20,color_0000CD,t_70,fill_0)

就这么一直增长着后，网络就会慢慢进入了拥塞的状况了，于是就会出现丢包现象，这时就需要对丢失的数据包进行重传，当触发了重传机制，也就进入了「拥塞发生算法」。

### 拥塞发生

当网络出现拥塞，也就是会发生数据包重传，重传机制主要有两种：

- 超时重传
  1. ssthresh 设为 cwnd/2
  2. cwnd 重置为初始值
- 快速重传
  1. cwnd = cwnd/2
  2. ssthresh = cwnd
  3. 进入快速恢复算法

### 快速恢复

快速恢复算法如下：

1. 拥塞窗口 cwnd = ssthresh + 3 （ 3 的意思是确认有 3 个数据包被收到了）
2. 重传丢失的数据包
3. 如果再收到重复的 ACK，那么 cwnd 增加 1
4. 如果收到新数据的 ACK 后，把 cwnd 设置为第一步中的 ssthresh 的值，原因是该 ACK 确认了新的数据，说明从 duplicated ACK 时的数据都已收到，该恢复过程已经结束，可以回到恢复之前的状态了，也即再次进入拥塞避免状态；

![](https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost4@main/%E7%BD%91%E7%BB%9C/%E6%8B%A5%E5%A1%9E%E5%8F%91%E7%94%9F-%E5%BF%AB%E9%80%9F%E9%87%8D%E4%BC%A0.drawio.png?image_process=watermark,text_5YWs5LyX5Y-377ya5bCP5p6XY29kaW5n,type_ZnpsdHpoaw,x_10,y_10,g_se,size_20,color_0000CD,t_70,fill_0)
