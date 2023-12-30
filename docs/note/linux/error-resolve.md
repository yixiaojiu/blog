# 踩坑

## ls 无颜色高亮

添加到 `.zshrc` 或 `.bashrc` 中

```bash
if [ -x /usr/bin/dircolors ]; then
    test -r ~/.dircolors && eval "$(dircolors -b ~/.dircolors)" || eval "$(dircolors -b)"
    alias ls='ls --color=auto'
    alias dir='dir --color=auto'
    alias vdir='vdir --color=auto'

    alias grep='grep --color=auto'
    alias fgrep='fgrep --color=auto'
    alias egrep='egrep --color=auto'
fi
```

## nvm 版本切换问题

用 nvm 切换 node 版本时，只对当前 shell 生效

[github issue2797](https://github.com/nvm-sh/nvm/issues/2797)

## zsh 历史记录丢失

创建 `.zsh_history` 文件，在 `.zshrc` 中添加

```sh
HISTFILE=/home/yixiaojiu/.zsh_history
HISTSIZE=10000000
SAVEHIST=10000000
setopt appendhistorysetopt INC_APPEND_HISTORY
setopt SHARE_HISTORY
```
