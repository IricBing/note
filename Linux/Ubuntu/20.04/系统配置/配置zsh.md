# Ubuntu 20.04 配置 zsh

使用zsh代替默认的bash能够很好的优化终端体验，oh-my-zsh支持很多非常好用的功能，例如： `自动补全` , `历史命令记录` , `特殊软件命令` 等等

## 安装zsh

``` shell
$ sudo apt install zsh
```

### 更改默认shell为zsh

``` shell
$ chsh -s /bin/zsh
```

`注意：` 需要输入密码

## 安装oh-my-zsh

[Github 地址](https://github.com/ohmyzsh/ohmyzsh)

### 方法一：自动化脚本安装

`注意：` 自动化脚本安装可能无法安装，因为软件的下载地址为（raw.githubusercontent.com），国内部分网络禁了这个域名。

* 通过 `curl` 安装

``` shell
$ sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

* 通过 `wget` 安装

``` shell
$ sh -c "$(wget -O- https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

* 通过 `fetch` 安装

``` shell
$ sh -c "$(fetch -o - https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

### 方法二： git手动安装

#### Step1. clone项目到本地

``` shell
$ git clone https://github.com/ohmyzsh/ohmyzsh.git ~/.oh-my-zsh
```

#### Step2. 拷贝 `.zshrc` 配置文件

``` shell
$ cp ~/.oh-my-zsh/templates/zshrc.zsh-template ~/.zshrc
```

#### Step3. 重启

``` shell
$ sudo reboot
```

#### Step4. 下载 `zsh-syntax-highlighting` 插件

``` shell
$ git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
```

#### Step5. 下载 `zsh-autosuggestions` 插件

``` shell
$ git clone git://github.com/zsh-users/zsh-autosuggestions $ZSH_CUSTOM/plugins/zsh-autosuggestions
```

#### Step6. 更改配置文件

``` shell
$ vim ~/.zshrc
```

使用 `af-magic` 主题

``` zsh
# Set name of the theme to load --- if set to "random", it will
# load a random theme each time oh-my-zsh is loaded, in which case,
# to know which specific one was loaded, run: echo $RANDOM_THEME
# See https://github.com/ohmyzsh/ohmyzsh/wiki/Themes
ZSH_THEME="af-magic"
```

增加插件

``` zsh
# Which plugins would you like to load?
# Standard plugins can be found in ~/.oh-my-zsh/plugins/*
# Custom plugins may be added to ~/.oh-my-zsh/custom/plugins/
# Example format: plugins=(rails git textmate ruby lighthouse)
# Add wisely, as too many plugins slow down shell startup.
plugins=(git zsh-syntax-highlighting zsh-autosuggestions)
```

#### Step7. 加载 `.zshrc` 文件

``` shell
$ source ~/.zshrc
```
