# ゆいじゅ 创生计划

## 畅想（画饼）

- 可以接收多个消息平台
- 像人一样，同一时间只能做一件事，只能处理一条消息。
  - 构建一个消息中心，接收来自不同平台的消息，LLM 统一处理
- 有自己的行为，可以自行决定一天的行程安排，可以作为聊天的上下文
  - 在做一些比较专注的事情时，可能不会回复消息（比如睡觉、学习）
- 有情绪系统

-

## 模型微调

参考 [沐雪系列模型评测标准](https://bot.snowy.moe/about/evaluate)，微调模型，关键是创建数据集

**思路** 先找开源数据集训练，了解一下模型微调，再基于开源数据集调整

微调工具：llama factory

数据集[知乎](https://zhuanlan.zhihu.com/p/1934983798233231689)

长期记忆：[mem0](https://mem0.ai/) [阿里云一站式AI Agent长记忆方案](https://help.aliyun.com/zh/polardb/polardb-for-postgresql/ai-agent-long-memory-solution)

开发框架：[voltagent.dev](https://voltagent.dev/)

## 代码实现

- 多用户消息：使用 `<>` 标识用户名，`<{user_name}> {message}`

### 多段回复

为了营造出与人对话的真实感，需要让模型多段回复

实现思路：

1. 编写一个策略去分句
2. 通过 Prompt 让模型在需要分句的地方输出一个特殊的标记
3. 再加一个 LLM 节点专门对消息进行拆分

### Live2d 驱动

- [b站 Vtube Studio的口型驱动](https://www.bilibili.com/video/BV1vs4y1k71M)
- [live2d web SDK 封装](https://nolebase.ayaka.io/zh-CN/%E7%AC%94%E8%AE%B0/%F0%9F%9B%A0%EF%B8%8F%20%E5%BC%80%E5%8F%91/%E9%80%9A%E8%BF%87%20Pixi.js%20%E6%B8%B2%E6%9F%93%E5%99%A8%E9%9B%86%E6%88%90%20Live2D%20%E6%A8%A1%E5%9E%8B%E5%88%B0%20Vue%20%E5%BA%94%E7%94%A8%E4%B8%AD.html)
