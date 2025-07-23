# Mac 的使用

## Mac 快捷键

- `command + 空格` 聚焦搜索
- `command + back` 删除文件
- `ctrl + command + f` 切换当前软件的全屏状态
- `command + shfit + g` 访达搜索目录

## 将 mac 终端的语言设置成英文

- 在 `~/.zshrc` 中添加 `export LANG=en_US.UTF-8`
- `source ~/.zshrc`

## 复制与粘贴命令

`pbcopy` `pbpaste`

## 独有命令

### open

可以使用系统默认应用打开文件或 url

## 软件打不开

有一部分原因是没有苹果的认证，跑一下命令

```sh
sudo xattr -d com.apple.quarantine /Applications/demo.app
```
