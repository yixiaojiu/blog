# 分布式

## 网关

微服务背景下，一个系统被拆分为多个服务，但是像安全认证，流量控制，日志，监控等功能是每个服务都需要的，没有网关的话，我们就需要在每个服务中单独实现，这使得我们做了很多重复的事情并且没有一个全局的视图来统一管理这些功能。

一般情况下，网关可以为我们提供请求转发、安全认证（身份/权限认证）、流量控制、负载均衡、降级熔断、日志、监控等功能。实际上，网关主要做了一件事情：请求过滤 。

## 分布式锁

多个服务共享同一个资源，需要互斥访问资源

使用 Redis 或者 ZooKeeper 实现分布式锁
