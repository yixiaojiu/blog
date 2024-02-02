# 虚拟环境

python 从 3.3 开始支持。

python 会创建一个目录，可以将安装的包放到这个目录下。激活虚拟环境会修改环境变量。

```bash
python -m venv <path>

source <path>/bin/activate
```

## Conda

类似 fnm 的版本管理工具，不需要指定目录，conda 会管理虚拟环境目录。

```bash
brew install miniconda

conda init zsh

source ~/.zshrc

# 关闭自动初始化 base 环境，每次会打印一个 (base) ，很烦
conda config --set auto_activate_base false

conda create --n <name> python=3.11

conda activate <name>
```
