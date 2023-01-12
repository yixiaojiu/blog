# vim + vscode

## vim

- 进入`insert`模式的两种方式，`a`光标在后，`i`光变在前
- `v`进入选中模式
- `V`进入行选中模式
- `ctrl + [` `esc`退出`insert`模式**(改成`jj`)**
- `h`左、`j`下、`k`上、`l`右
- 回到行首
  - `0`回到最前面
  - `^`回到第一个不是 blank 字符的位置**(改为`H`)**
- 回到行尾
  - `$`回到最后面
  - `g_`回到最后一个不是 blank 字符的位置**(改为`L`)**
- `gg`跳到第一行
- `G`跳到最后一行
- `J`将两行合并成一行
- 插入
  - `A`在行尾输入
  - `I`在行首插入
  - `o`下一行插入
  - `O`上一行插入
  - `s`删除当前的字符并进入`insert`模式
  - `S`删除当前行并进入`insert`模式，与`cc`效果相同
- `yy`复制当前行
- `p`粘贴`yy`复制的行
- `dd`删除当前行
- 操作符
  - `d`删除
  - `c`删除并进入`insert`模式
  - `C`删除当前行光标后的所有字符并进入`insert`模式
  - `y`复制
- 基于单词/字串的移动
  - `w`向右移动到单词的开头
  - `e`向右移动到单词的结尾
  - `b`向左移动到单词的开头
  - `ge`向左移动到单词的结尾
  - 字串换成大写
- 当前行跳转
  - `f{char}`跳到下个{char}位置
  - `F{char}`跳到上个{char}位置
  - `;`重复上一次字符查找操作
  - `,`反向查找上次的查找命令
- `u`撤销
- `i` inner `a` around 例子：
  - `iw` 或 `aw` 选中单词
  - `i(` 或 `ib`，`a(` 或 `ab` 选中()内的内容，`a`包含()
  - `i{`或`ib`
  - `i"` `i'` `i<` `i[`
  - `it` tag 标签内的
- 折叠代码
  - `zc`折叠
  - `zo`展开
- `x`删除一个字符
- `r`替换字符，`R`不断替换当前字符
- `/`搜索，例如：`/log`搜索 log

  - `n`下一个匹配结果
  - `N`上一个匹配结果

- `*`，`#`进行当前单词的向后与向前匹配
- `:set hls`设置搜索高亮，`:set nohls`关闭搜索高亮

## vscode

- `ctrl + shift + e` 或 `ctrl + 0`切换资源管理器与编辑区
- `ctrl + 1`切换到编辑区光标处于编辑区
- `space`打开文件光标仍在资源管理器
- 资源管理器
  - 移动光标`j` `k`
  - 折叠文件夹`h`
  - 展开文件夹`enter` 或 `l`
  - 新建文件`a`
- 跳转定义
  - `f12` 或者`gd`跳转到文件
  - `ctrl + o`返回
- 查看函数的描述`gh`
- `gt`跳到下一个标签页，`gT`跳到上一个标签页
- `ctrl + \`分屏
- `gb`选中多个相同的单词
- `gu`大写转小写，`gU`小写转大写

## vim 插件

- vim-surround

  - `y s [motion] [desired]` Add desired surround around text defined by [motion]
  - `d s [existing]` Delete existing surround
  - `c s [existing] [desired]` Change existing surround to desired
  - `S [desired]` Surround when in visual modes (surrounds full selection)

  示例

  ```
  {
    embeddedLanguageFormatting: "off"
  }
  // v操作选中embeddedLanguageFormatting，S 加上"
  ```
