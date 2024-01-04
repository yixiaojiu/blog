# 客户端重定向

> 参考 [docusaurs plugin-client-redirect](https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-client-redirects)

在 SSG 项目打包时，每一个路由都会生成一个 html 文件，所以实现方法就是对每一个要重定向的路径都生成一个 html 文件

例如 `/foo` 重定向到 `/docs/note/bar`

假设打包的输出目录为 `/dist`，则生成一个 `/dist/foo.html` 的文件

```html
<!doctype html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="refresh" content="0; url=/docs/note/bar" />
    <link rel="canonical" href="/docs/note/bar" />
  </head>
  <script>
    window.location.href =
      '/docs/note/bar' + window.location.search + window.location.hash
  </script>
</html>
```

`<meta http-equiv="refresh" content="0; url=/docs/note/bar">` 是一个重定向指令。这里，content="0" 表示立即执行重定向，而 url=/docs/note/bar 指定了重定向的目标URL。

`<link rel="canonical" href="/docs/note/bar" />` 是一个链接元素，用于指定当前页面的规范版本。这有助于搜索引擎确定哪个URL是页面的主要版本。
