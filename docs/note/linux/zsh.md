# zsh

## powerlevel10k

zsh 主题

[powerlevel10k](https://github.com/romkatv/powerlevel10k)

配置时记得关闭这个 [Instant prompt](https://github.com/romkatv/powerlevel10k#instant-prompt)

### 插件

以 zsh-autosuggestions 为例

1. 克隆仓库到一个文件夹下

```shell
git clone https://github.com/zsh-users/zsh-autosuggestions ~/.zsh/zsh-autosuggestions
```

2. 在 `.zshrc` 中新增

```shell
source ~/.zsh/zsh-autosuggestions/zsh-autosuggestions.zsh
```

### mac 下，vscode 终端字体显示错误

在使用 iTerm2 安装 powerlevel10k 时，会提示安装 `MesloLGS NF`字体，但是 vs code 终端并没有这个字体

在 `Editor: Font Family` 中新增这个字体即可

## oh-my-shell

[github](https://github.com/ohmyzsh/ohmyzsh)

可能会变，以官方文档为准

```bash
sh -c "$(wget -O- https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

- **更改 `.zshrc`配置**

```bash
vi .zshrc
```

- **主题**

```
kafeitu
```

- **安装第三方插件**

zsh-autosuggestions

```bash
1. 进入 ~/.oh-my-zsh/plugins
cd ~/.oh-my-zsh/plugins

2. 克隆插件的仓库
git clone 地址

3. 加入插件名到配置文件中
```

## starship

[starship](https://starship.rs/)，跨平台，支持多种 shell

## 常用插件

- zsh-autosuggestions
- zsh-syntax-highlighting

## TroubleShooting：

[not being able to see the suggestions](https://github.com/zsh-users/zsh-autosuggestions/issues/416#issuecomment-486516333) 解决 iTerm2 看不见提示
