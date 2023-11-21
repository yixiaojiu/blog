# archlinux 安装

## 安装

- [csdn](https://blog.csdn.net/weixin_44335269/article/details/115458834)

- [archlinux 简明教程](https://arch.icekylin.online/prologue.html)

- [双系统 bilibili](https://www.bilibili.com/video/BV1XY4y1f77S)

## Hyprland

[Hyprland 安装配置教程|缩放模糊|输入法](https://www.bilibili.com/video/BV1G14y1d7uK)

## os-prober 双系统

[archlinux wiki](https://wiki.archlinuxcn.org/wiki/GRUB#%E6%8E%A2%E6%B5%8B%E5%85%B6%E4%BB%96%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F)

在 chroot 环境中 os-prober 可能无法正常工作，重启进入系统后再重新生成 grub.cfg

```sh
grub-mkconfig -o /boot/grub/grub.cfg
```

[ArchLinux下Hyprland配置指北](https://www.bilibili.com/read/cv22707313)

## 格式化磁盘

```
mkfs -t ext4 /dev/sda
```

## i3wm

[ArchLinux 系统 i3wm 配置及体验记录](https://zocoxx.com/archlinux-i3wm.html)

## 网络

在同一个局域网下，开启clash允许局域网连接

设置环境变量 [Linux操作系统下的全局代理配置与实践](https://cloud.tencent.com/developer/article/2129796)

## GRUB引导双系统，恢复成 Windows 引导

[bilibili](https://www.bilibili.com/video/BV14f4y117yH)

视频较老，有些地方可能不对

1. 进入 archlinux live 环境，将 EFI 分区挂载到 `/mnt` 下
2. 进入 `/mnt` 目录下，除了 `EFI` 和 `System Volume Information` 目录，其他全部删除
3. 再进入 `/EFI` 目录，除了 `Boot` 和 `Microsoft` 目录，其他全部删除
4. 进入 BIOS 界面，将启动项改成 Windows
