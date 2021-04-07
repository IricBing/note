# Registry Config

## 前言

尽管我们使用 `nrm` ， `yrm` 等换源工具将 `registry` 指向了 `taobao` 镜像源，但是在下载一些二进制包的时候还是会遇到网络问题。

解决办法是：在项目的**根目录**配置 `.npmrc` （使用npm） 或 `.yarnrc` （使用yarn） 文件，指定二进制包地址。

## .npmrc 文件完整版配置

``` conf
home="https://npm.taobao.org"
registry="https://registry.npm.taobao.org/"

#前台相关
sass_binary_site="https://npm.taobao.org/mirrors/node-sass/"
canvas_binary_host_mirror="https://npm.taobao.org/mirrors/node-canvas-prebuilt/"
phantomjs_cdnurl="https://npm.taobao.org/dist/phantomjs/"
electron_mirror="https://npm.taobao.org/mirrors/electron/"
sqlite3_binary_host_mirror="http://npm.taobao.org/mirrors/"
profiler_binary_host_mirror="https://npm.taobao.org/mirrors/node-inspector/"
chromedriver_cdnurl="http://npm.taobao.org/mirrors/chromedriver/"
operadriver_cdnurl="http://npm.taobao.org/mirrors/operadriver/"
electron_builder_binaries_mirror="http://npm.taobao.org/mirrors/electron-builder-binaries/"

#后台相关
grpc_node_binary_host_mirror="https://npm.taobao.org/mirrors/"
node_sqlite3_binary_host_mirror="http://npm.taobao.org/mirrors/"
nodejieba_binary_host_mirror="https://npm.taobao.org/mirrors/nodejieba"
```

## .yarnrc 文件完整版配置

``` conf
home "https://npm.taobao.org"
registry "https://registry.npm.taobao.org/"
disturl "https://npm.taobao.org/dist"

#前台相关
sass_binary_site "https://npm.taobao.org/mirrors/node-sass/"
canvas_binary_host_mirror "https://npm.taobao.org/mirrors/node-canvas-prebuilt/"
phantomjs_cdnurl "https://npm.taobao.org/dist/phantomjs/"
electron_mirror "https://npm.taobao.org/mirrors/electron/"
sqlite3_binary_host_mirror "http://npm.taobao.org/mirrors/"
profiler_binary_host_mirror "https://npm.taobao.org/mirrors/node-inspector/"
chromedriver_cdnurl "http://npm.taobao.org/mirrors/chromedriver/"
operadriver_cdnurl "http://npm.taobao.org/mirrors/operadriver/"
electron_builder_binaries_mirror "http://npm.taobao.org/mirrors/electron-builder-binaries/"

#后台相关
grpc_node_binary_host_mirror "https://npm.taobao.org/mirrors/"
node_sqlite3_binary_host_mirror "http://npm.taobao.org/mirrors/"
nodejieba_binary_host_mirror "https://npm.taobao.org/mirrors/nodejieba"
```

## 附件

[.npmrc 文件](assets/files/.npmrc)

[.yarnrc 文件](assets/files/.yarnrc)
