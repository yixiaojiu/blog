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
