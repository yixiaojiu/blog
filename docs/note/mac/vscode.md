# Mac 下的 VS Code

## 快捷键

- `control + r` 打开最近的文件夹或文件，`enter` 替换当前 Window，`command + enter` 打开新的 Window
- ``control + ` `` 转换终端的显示
- `command + w` 关闭当前 tab
- `command + shfit + w` 关闭当前 Window
- `command + i` 触发代码提升
- `ctrl + -` 回退 F12 跳转，`ctrl + shfit + -` 前进 F12 跳转
- `shfit + command + ]` focus 下一个终端，`shfit + command + [` foucs 上一个终端
- `command + K + 数字` 折叠代码

### 快捷键配置

打开控制面板，找到 `Preference: Open Keyboard Shortcuts(JSON)`

```json
[
  {
    "key": "ctrl+t",
    "command": "workbench.action.terminal.kill",
    "when": "terminalFocus"
  },
  {
    "key": "a",
    "command": "explorer.newFile",
    "when": "filesExplorerFocus && !inputFocus"
  },
  {
    "key": "shift+a",
    "command": "explorer.newFolder",
    "when": "filesExplorerFocus && !inputFocus"
  },
  {
    "key": "cmd+k cmd+k",
    "command": "workbench.action.togglePanel"
  },
  {
    "key": "cmd+j",
    "command": "-workbench.action.togglePanel"
  },
  {
    "key": "cmd+r",
    "command": "workbench.action.openRecent"
  },
  {
    "key": "ctrl+r",
    "command": "-workbench.action.openRecent"
  }
]
```

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

### Cursor

```sh
defaults write "$(osascript -e 'id of app "Cursor"')" ApplePressAndHoldEnabled -bool false
```

## terminal 字体

使用 powerlevel10k 后，在 `font-family` 中新增 `MesloLGS NF` 字体

## space 按键无法连按

mac 输入法的问题

[VSCodeVim issue2108](https://github.com/VSCodeVim/Vim/issues/2108)

## rust-analyzer 报错 "Request textDocument/formatting failed"

原因：rustfmt 命令行工具没有安装

[github issue](https://github.com/rust-lang/rust-analyzer/issues/5036)

## code 命令失效

原因是 VS Code 不在系统的应用程序目录夹下，可能在下载目录下，需要将其移动到应用程序目录下，然后在 VS Code 中 `Command + Shift + P` 搜索 code，安装 code 命令

## git history graph

这个模块比较吃资源，可能会照成 VS Code 卡死

在设置中搜索 `show history graph`

## 烦人的声音

在设置中搜 Accessibility Support，然后关掉
