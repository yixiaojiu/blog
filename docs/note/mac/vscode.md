# Mac 下的 VS Code

## 快捷键

- `control + r` 打开最近的文件夹或文件，`enter` 替换当前 Window，`command + enter` 打开新的 Window
- `` control + `  `` 转换终端的显示
- `command + w` 关闭当前 tab
- `command + i` 触发代码提升

## vim 插件，长按 hjkl 键无法持续移动问题

[Stack Overflow](https://stackoverflow.com/questions/39972335/how-do-i-press-and-hold-a-key-and-have-it-repeat-in-vscode)

- 只让 VS Code 长按生效

运行以下命令，然后重启 VS Code

```shell
defaults write com.microsoft.VSCode ApplePressAndHoldEnabled -bool false
```

- 如果要恢复

```shell
defaults write com.microsoft.VSCode ApplePressAndHoldEnabled -bool true
```
