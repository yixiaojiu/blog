# Archlinux 问题总集

## 使用

- `ctrl + shfit + c/v` 终端中复杂粘贴
- chrome 设置代理，在 hyprland 中设置快捷键打开 chrome `google-chrome-stable --proxy-server="127.0.0.1:7890"'`

## OBS 捕捉屏幕

参考教程：
[Screen sharing on Hyprland (Arch Linux)](https://gist.github.com/PowerBall253/2dea6ddf6974ba4e5d26c3139ffb7580#restart-your-session)

[obs-studio录屏从入门到精通（wayland）](https://www.bilibili.com/video/BV1sh4y1U7ug)

## pacman 升级报错

`pacman -Syu`

![Alt text](./images/pacman-pkg.png)

解决办法 [archlinux 论坛](https://bbs.archlinuxcn.org/viewtopic.php?id=4580)

```sh
sudo pacman -S archlinuxcn-keyring
```
