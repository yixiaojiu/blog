# vim 配置文件

文件位置 `~/.vimrc`

文件中不能包含注释

```
# 设置行号
set number
# 按下 Tab 键时，Vim 显示的空格数
set tabstop=2
# 映射延迟时间
set timeoutlen=300
# 语法高亮
syntax on

# 键位映射
inoremap jj <esc>
nnoremap H ^
nnoremap L g_
```
