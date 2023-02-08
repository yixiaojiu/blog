# vscode

## 使用

### 在项目中配置推荐插件

```json
// .vscode/extensions.json
{
  "recommendations": ["stylelint.vscode-stylelint"]
}
```

## 踩坑

### tsx snippets 不生效

[stack overflow](https://stackoverflow.com/questions/51608965/vscode-user-snippet-doesnt-works-inside-jsx)

[vscode github issue](https://github.com/Microsoft/vscode/issues/62521)

仍未解决

```json
{
  "log to console": {
    "prefix": "log",
    "scope": "typescript,typescriptreact,javascript,javascriptreact",
    "body": ["console.log($0)"],
    "description": "console log"
  }
}
```
