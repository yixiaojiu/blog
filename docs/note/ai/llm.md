# LLM

## 本地部署

使用 [ollama](https://github.com/jmorganca/ollama)

模型页 [https://ollama.com/library](https://ollama.com/library)

Ollama 使用

```sh
# 在命令行交互式运行某个模型
ollama run <modal>
# 启用服务，用于提供 API 访问
export OLLAMA_HOST=0.0.0.0:11434
ollama run serve
```

[MaxKB：LLM 问答 Web 应用](https://github.com/1Panel-dev/MaxKB)

## AI Agent

LLM 充当 Agent 的大脑，可以对任务进行拆分，并通过工具（调用 API）获取模型权重中缺失的额外信息。

现有项目：AutoGPT

## Prompt 工程

[Prompt Engineering Guide](https://www.promptingguide.ai/zh)

## MCP

[modelcontextprotocol.io](https://modelcontextprotocol.io/introduction)

## 工具

- [llmstxt](https://llmstxt.org/)：如何让 LLM 更好地理解网站，类似 robot.txt
  - [llmstxthub](https://llmstxthub.com/)
- [poml](https://microsoft.github.io/poml/latest/)：编写结构化、可服用的 Prompt 工具

## LLama Factory 模型微调

[https://ai.mmh1.top/#/ai-tutorial](https://ai.mmh1.top/#/ai-tutorial)

### 训练参数

- 学习率： 每次更新时参数调整的幅度
- 训练轮数（Epochs）：太少学不会，太过过拟合
- 批量大小：每次更新模型参数时所使用的样本数量
- 梯度累积步数：累积多少步后进行参数更新
- LoRA 秩：
