# git

> 参考 [git book](https://git-scm.com/book/zh/v2)

## 基础

### 文件三种状态

- **已修改(modified)**: 已修改表示修改了文件，但还没保存到数据库中
- **已暂存(staged)**: 已暂存表示对一个已修改文件的当前版本做了标记，使之包含在下次提交的快照中
- **已提交(committed)**: 已提交表示数据已经安全地保存在本地数据库中

### gitignore

- 可以使用标准的 glob 模式(shell 所使用的简化了的正则表达式)匹配，它会递归地应用在整个工作区中
- 匹配模式可以以 `/` 开头防止递归，例如：`/TODO` 只忽略当前目录下的 TODO 文件，而不忽略 subdir/TODO
- 匹配模式可以以 `/` 结尾指定目录
- `**` 表示匹配任意中间目录

### diff

查看尚未暂存的文件更新了哪些部分，比较的是工作目录中当前文件和暂存区域快照之间的差异，也就是修改之后还没有暂存起来的变化内容。

未跟踪的文件不会参与比较，也就是说新添加的文件不参与比较

```bash
git diff --staged
```

查看已暂存文件与最后一次提交的文件差异

### 移除文件

在工作目录中删除文件，如果只是简单地从目录中删除，删除文件的操作未暂存，再运行`git rm file` 记录此次移除文件的操作，下次提交时文件就不再纳入版本管理

```bash
git rm --cached file
```

使用场景，忘记把文件添加进`.gitignore`，把文件从暂存区中删除，但仍然保留在工作目录中

### 撤销操作

- 重新提交

有时候我们提交完了才发现漏掉了几个文件没有添加，或者提交信息写错了。

```bash
git commit --amend -m "message"
```

- 取消暂存的文件

```bash
git restore --staged <file>
```

- 撤销对文件的修改

将文件还原成上次提交时的样子

```bash
git checkout -- <file>
```

### 常用命令

```bash
# 配置用户信息
git config --global user.name ""
git config --global user.email ""

# 状态简览: 以简洁的方式查看更改
git status -s

# 将所作的更改的 diff 输出呈现在编辑器中
git commit -v
# 跳过git add 步骤
git commit -a

# 列出配置
git config --list

# 查看历史提交
git log
# 简略统计修改信息
git log --stat
# 展示最近n次
git log -n
# 将每个提交放在一行展示
git log --pretty=oneline
```

## 远程仓库
