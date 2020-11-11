# Ubuntu 20.04 安装qq和微信

## wine方式

### 打开终端，输入

``` bash
$ wget -O- https://deepin-wine.i-m.dev/setup.sh | sh
```

### 安装qq和微信

``` bash
$ sudo apt install deepin.com.wechat
	
$ sudo apt install deepin.com.qq.im
```

## Docker方式—— 推荐

### 安装微信

[仓库地址](https://hub.docker.com/r/zixia/wechat)：https://hub.docker.com/r/zixia/wechat

**用法**

``` shell
$ curl -sL https://raw.githubusercontent.com/huan/docker-wechat/master/dochat.sh | bash
or
$ docker run \
    --name DoChat \
    --rm \
    -i \
    \
    -v "$HOME/DoChat/WeChat Files/":'/home/user/WeChat Files/' \
    -v "$HOME/DoChat/Applcation Data":'/home/user/.wine/drive_c/users/user/Application Data/' \
    -v /tmp/.X11-unix:/tmp/.X11-unix \
    \
    -e DISPLAY \
    \
    -e XMODIFIERS=@im=fcitx \
    -e GTK_IM_MODULE=fcitx \
    -e QT_IM_MODULE=fcitx \
    -e GID="$(id -g)" \
    -e UID="$(id -u)" \
    \
    --ipc=host \
    --privileged \
    \
    zixia/wechat
```
