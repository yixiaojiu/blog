---
date: 2026-05-16
img: https://esa-img.544521.xyz/i/pc/img72.webp
---

# AI陪伴长期记忆工具与经验分享

> 本文以 AI 陪伴的应用场景来介绍一下我了解的 Agent Memory 工具，以及一些我的个人经验分享

<!--truncate-->

## 工具介绍

### Letta

前身为 MemGPT，[https://docs.letta.com/letta-code](https://docs.letta.com/letta-code/)

将 LLM 的固定上下文类比成计算机的内存，把外部的向量数据库类比成磁盘，Letta 作为一个中间件扮演内存管理器，负责在"内存"与"磁盘"之间交换 prompt。

没怎么用过，不清楚效果

### Mem0

[https://mem0.ai](https://mem0.ai) 采用图数据库保存实体关系，使用向量数据库保存记忆内容与实体描述。可以自动更新旧的记忆，还有新鲜度机制，可以让记忆随时间流逝而衰减，适合 AI 陪伴的场景。

**个人经验**

- mem0有商业化版本，可以开箱即用，也有开源版本。我尝试部署过 Nodejs 的版本，会踩坑，部署成本高。

### Graphiti

[https://help.getzep.com/graphiti/getting-started/welcome](https://help.getzep.com/graphiti/getting-started/welcome)

整体与 Mem0 类似，都是采用了图数据库+向量数据。不同点就是，Graphiti 提出了双时态模型，解决之前的 Memory 工具无法区分“过去事实“与“当前事实“的问题，例如：用户在三个月前说“我喜欢红色“，昨天说“我改喜欢蓝色了“，Graphiti 可以记住过去喜欢红色的事实。

**个人经验**

1. Graphiti 有商业化版本，可以开箱即用，开源版本部署方便，也可以开箱即用。
2. **Graphiti 的开发调试成本高**。

长期记忆工具需要关注两个问题：一个是怎么存，另一个是怎么查。

Graphiti 存储时会让 LLM 根据输入的记忆内容，提取出图数据库的节点和边。这里需要调试 LLM 提取用的 prompt，范围太宽就是什么都存，范围太窄又什么都不存，而且存储的内容质量也可能不高。

关于记忆搜索的问题，Graphiti 会根据一些策略把搜索到的节点和边、以及记忆事实都返回给你，自由度很高，但是你要使用哪些内容，需要你有一个决策的成本，这也需要调试。

3. 因为双时态模型的原因 Graphiti，不会清楚任何旧的记忆，存储的数据量会随着时间的推移越来越大。

### MemU

[https://memu.pro](https://memu.pro)

![memu structure](https://memu.pro/static/docs/structure.png)

基于文件系统的记忆架构，并且是层级化存储的。记忆分类会变成真实的文档文件，模型查询时不只依赖 embedding search，也可以直接读取这些记忆文件，通过「Memory Category Files → Memory Items → Raw Resources」这几层关系往回追溯信息。

**个人经验**

我没有用过 MemU，不清楚实际落地的效果怎么样，但是我自己使用文件系统实现过长期记忆，目前遇到的问题就是 AI 大部分还是新增记忆，很少会删减过时的记忆内容，而且存在记忆错误的情况。

## 总结

图数据库、使用文件作为记忆、以及层级化存储逐渐成为主流方案，但是在 AI 陪伴这个方向，长期记忆这个需求一直没有被很好的解决，当下的工具都存在或多或少的问题，期望未来能有更好的架构可以测底解决长期记忆的问题。
