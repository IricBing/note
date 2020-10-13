# Iot Management 项目代码部署流程

## Clone 代码到本地

``` shell
$ cd ~      #切换到用户主目录
$ mkdir code    #在主目录下创建code文件夹
$ cd code       # 切换到code文件件
$ git clone git@gitlab.lantsang.cn:dongzhenguo/iotmanagement.git    # 下载代码
```

## master项目部署
```shell
$ cd master     # 切换到master项目目录
$ cp .env.development .env  # 拷贝环境配置文件
$ vim .env      # 编辑配置文件，按需修改！！！！！！！！
$ pm2 start     # pm2 启动服务，注意：这里的启动参数来自于当前目录下的 ecosystem.config.js 文件！
```
