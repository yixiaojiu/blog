- 把 b 站的回到顶部按钮偷过来 https://space.bilibili.com/412686493/dynamic
- [参考这个](https://github.com/kuizuo/blog/blob/main/src/pages/friends/index.tsx) 实现友链
- hover 链接预览内容。实现思路：无头浏览器渲染链接并截图。

## 文档加密插件

思路：

- 提供 CLI 工具用于加密与解密文档，在 commit 之前对文档进行加密，需要修改与打包时进行解密
- 使用对称加密算法进行加解密，密钥放到环境变量中
- 提供组件包裹文档，在页面中输入密码才能访问文档，对密钥进行 hash 处理，在密码比对时与 hash 值进行比较
- 尝试提供工具，自动使用组件包裹文档
- 提供配置项，配置需要加密的文档路径或目录

## 重写 UI

参考

- [https://blog.tangbao.ltd](https://blog.tangbao.ltd) 抄一下底部波浪
- [https://www.liveout.cn](https://www.liveout.cn)
- [https://lin66.site](https://lin66.site) 抄一下首页
- [StarKnightt/prasendev](https://github.com/StarKnightt/prasendev) 看着抄
- [https://innei.in](https://innei.in) 看着抄。可以抄抄首页的颜色

colors [https://materialui.co/colors](https://materialui.co/colors)

[参考](https://kuizuo.cn/docs/docusaurus-guides)

[HairyHeadWaves.vue](https://github.com/hairyf/valaxy-theme-hairy/blob/main/theme/components/parts/HairyHeadWaves.vue) 波浪实现参考

[bikari.top/home](https://bikari.top/home) 博客页参考

## 组件拆分

拆成组件库的时候不写依赖，方便用户直接copy代码

## BangDream 信息展示

邦邦机器人仓库 https://github.com/Yamamoto-2/tsugu-bangdream-bot 代码位置

id: 1007734059

抓包页面 https://bestdori.com/tool/playersearch/cn/1007734059

### 请求

https://bestdori.com/api/player/cn/1007734059?mode=2 玩家信息

https://bestdori.com/api/degrees/all.3.json degrees 信息

### 字段解析

bandRankMap 乐队等级
userProfileDegreeMap 两个牌子
userMusicClearInfoMap 乐曲完成情况
userCharacterRankMap 乐队成员等级

<!-- mainDeckUserSituations 卡组信息 -->

### 代码解析

backend/src/view/playerDetail.ts 图片绘制的入口

backend/src/components/list/difficultyDetail.ts DifficultyDetailInList 歌曲完成情况的计算函数，没有图片，难度是绘制出来的

乐队的图片 https://bestdori.com/assets/jp/band/logo/045_rip/logoL.png 045_rip 中的 045 是乐队 id 前面补0 满足长度为 3

乐队成员的图片 https://bestdori.com/res/icon/chara_icon_1.png `chara_icon_${id}.png`

## 关于页面

介绍自己

## QQ 音乐听歌状态

可以实时显示正在听歌的歌词，研究一下 QQ 音乐的开放平台

## Steam 游戏库

[Steam OpenAPI](https://partner.steamgames.com/doc/webapi_overview)

[游戏库 API](https://partner.steamgames.com/doc/webapi/IPlayerService#GetOwnedGames)

[玩家信息 API](https://partner.steamgames.com/doc/webapi/ISteamUser#GetPlayerSummaries)
