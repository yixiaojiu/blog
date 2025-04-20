# 开发记录

随机图片 [docs.loliapi.com](https://docs.loliapi.com/api-shi-yong-wen-dang/sui-ji-er-ci-yuan-tu-pian/dian-nao-duan-sui-ji-tu-pian)

## Docusaurus 改造

1. 根目录新增 `navbar.ts`，将 navbar 的类型改为 `dropdown`，复用 `sidebar.ts` 中的定义，完善 narbar 的 items。以后更新 `sidebar.ts` 时需要更新 `navbar.ts`

2. 新增一个 doc frontmatter 用于控制是否显示最后更新时间

show_last_update: boolean

## docusaurus api

- `@docusaurus/router` 操作路由的，直接导入
- `import { useWindowSize } from '@docusaurus/theme-common'`
- `import { useDoc } from '@docusaurus/plugin-content-docs/client'` 暴露了 doc 的一些信息：metadata, frontMatter, contentTitle, toc
