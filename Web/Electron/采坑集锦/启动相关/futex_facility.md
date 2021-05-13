# The futex facility returned an unexpected error code

## 产生场景

当一切步骤按照[笔记：基于Vue的Electron开发](../../项目配置/基于Vue/README.md)配置后，启动的时候报如下错误：

``` shell
The futex facility returned an unexpected error code
```

最终从 `GitHub` 上翻 `issue` 找到相关解决方案，[issue地址](https://github.com/electron/electron/issues/24211)

## 解决方案

将启动参数加上 `DISPLAY=:0` ，修改 `package.json` 文件，如下所示：

``` json
{
  "scripts": {
    "start": "cross-env DISPLAY=:0 vue-cli-service electron:serve"
  }
}
```

接下来通过 `$ yarn start` 命令即可正常启动
