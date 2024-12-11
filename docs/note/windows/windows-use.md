# Windows 的使用

## 快捷键

- `win + errowUp` 全屏，`win + ArrowDown` 退出全屏
- `win + d` 显示桌面
- `win + e` 资源管理器
- `win + i` 打开设置
- `win + q` 搜索

## 复制与粘贴命令

`Get-Clipboard` `clip`

## Winget

Winget 安装路径 `%LOCALAPPDATA%/Microsoft/WinGet/Packages/`

`%LOCALAPPDATA%/Microsoft/WinGet/Links/` 文件夹下有每个包的快捷键，这个路径会被添加到环境变量中

## SymLink

软链接，类似快捷方式，文件占用似乎更小

```shell
# 使用 cmd 打开，powershell 没有这个命令

mklink <目标绝对路径> <原始绝对路径>
```
