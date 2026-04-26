# AGENTS.md instructions for /Users/yixiaojiu/Code/everything/blog

<INSTRUCTIONS>

## 项目概览

这是一个基于 Docusaurus 3 的个人静态知识站，主要用于记录学习笔记、博客文章、个人展示和知识分享。

站点语言以中文为主，默认 locale 为 `zh-CN`。线上站点配置在 `docusaurus.config.ts` 中，当前 URL 为 `https://note.yixiaojiu.top`。

## 技术栈

- Docusaurus 3.7
- React 19
- TypeScript
- MDX / Markdown
- Tailwind CSS 4 PostCSS 插件
- pnpm 10.6.5

## 目录说明

- `blog/`：博客文章内容，支持 Markdown / MDX，部分文章有同名资源目录。
- `docs/`：结构化文档内容，包含八股、笔记、摘抄、记录等长期维护内容。
- `src/pages/`：自定义页面入口。
- `src/theme/`：Docusaurus swizzle/custom theme 组件，包含导航、代码块、博客列表、404 页面等主题定制。
- `src/components/`：站点业务组件，例如 Bangumi、Pilgrimage、MaiMaiBest50、Loading、Button 等。
- `src/css/`：全局样式与 CSS 变量。
- `src/lib/`：少量 hooks、类型与通用工具。
- `src/svg/`：站点内使用的 SVG 图标资源。
- `static/`：Docusaurus 静态资源目录。
- `docusaurus.config.ts`：站点主配置，包含主题、插件、导航、搜索、站点元信息等。
- `sidebars.ts`：文档侧边栏配置。

## 内容与功能维护约定

- 内容类修改优先查看并修改 `blog/` 或 `docs/`。
- 文档侧边栏、分组、展示顺序相关修改优先查看 `sidebars.ts`。
- 站点配置、导航、搜索、sitemap、主题参数相关修改优先查看 `docusaurus.config.ts` 和 `navbar.ts`。
- UI 或 Docusaurus 主题覆盖相关修改优先查看 `src/theme/`。
- 可复用的站点业务组件优先放在 `src/components/`。
- 全局样式修改优先查看 `src/css/custom.css` 和 `src/css/define.css`。
- 不要引入项目中并不存在的配置项、运行约定或抽象概念。
- 实现代码时不用考虑项目如何启动。

## 协作规则

- 请使用中文回答。
- 在写代码前请先向我说明技术方案，需要我确认后再开始写代码。
- 需求不明确时不要自行做决定，请询问我。
- 修改代码时应尽量聚焦当前问题，避免顺手进行无关重构。

## 代码规范

- 优先写贴近业务流程、顺着执行路径就能读懂的代码。
- 避免为了抽象而抽象；不要把简单、短小、语义直白的逻辑拆成额外函数。
- 如果一个函数的逻辑一眼可以看懂，应优先内联到调用处，而不是提炼为工具函数。
- 尽量直接产出目标结果，减少不必要的中间数据结构和中间抽象层。
- 宁可保留少量、可接受的重复，也不要为了“通用性”牺牲可读性。
- 显式优于隐式。不要依赖未被明确约定的环境变量、默认约定或隐藏行为。
- 代码行为要可预测，关键路径和副作用应清晰可见。
- 日志要克制，只保留对排查问题真正有帮助的日志；避免高频、低价值的流水日志。
- 注释要解释目的、语义和关键约束，不要写机械重复代码表面的注释。
- 代码应优先服务于维护成本和阅读体验，而不是形式上的“优雅抽象”。

## 验证要求

写完代码后要执行 format、lint 与 TypeScript 类型检查。

当前项目没有在 `package.json` 中提供独立的 `lint` 或 `typecheck` script。需要验证时，优先使用这些显式命令：

- `pnpm exec prettier --write <changed files>`
- `pnpm exec eslint .`
- `pnpm exec tsc --noEmit`

涉及 Docusaurus 构建链路、站点配置、路由、MDX 内容或主题覆盖时，再执行：

- `pnpm build`

</INSTRUCTIONS>
