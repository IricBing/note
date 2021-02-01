# `Ubuntu` 安装 `miniconda`

## Step1. 下载安装文件

清华源地址：https://mirrors.tuna.tsinghua.edu.cn/anaconda/miniconda/

官网地址：https://docs.conda.io/en/latest/miniconda.html

下载最新版即可。

``` shell
$ wget https://mirrors.tuna.tsinghua.edu.cn/anaconda/miniconda/Miniconda3-latest-Linux-x86_64.sh
```

## Step2. 安装

``` shell
$ sh ./Miniconda3-latest-Linux-x86_64.sh
```

## Step3. 环境配置——zsh

编辑 `~/.zshrc` 文件，将以下内容放到文件末尾:

``` shell
export PATH="$PATH:$HOME/miniconda3/bin"
```

重新加载

``` shell
$ source ~/.zshrc

$ conda -v  # 验证

$ conda init zsh # conda 初始化 zsh 支持
```

## Step3. 环境配置——bash

`miniconda` 默认采用 `bash` ，会在安装过程中将环境配置写入到 `~/.bashrc` 文件中，无需我们手动配置，直接加载即可。

``` shell
$ source ~/.bashrc

$ conda -v  # 验证
```

## Step4. 配置镜像源

`采坑提示：` 这里千万不要用清华的镜像源，因为它不更新了。。。使用中科大的

``` shell
$ conda config --add channels https://mirrors.ustc.edu.cn/anaconda/pkgs/free/
$ conda config --set show_channel_urls yes
```

之后就会生成 `~/.condarc` 文件

``` shell
$ cat ~/.condarc
channels:

  + https://mirrors.ustc.edu.cn/anaconda/pkgs/free/
  + defaults

show_channel_urls: true
```
