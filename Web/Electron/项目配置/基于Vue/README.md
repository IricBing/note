# 基于Vue的Electron项目

`Electron` 的核心思想就是将 `chromium` 内核和 `node.js` 组合到一起， `chromium` 负责渲染和显示网页， `node.js` 服务调用系统级 `api` 。那么我们使用 `Electron` 的时候，在编写页面时，就基本上可以按照网页开发的思路和流程来做。既然如此，纯手写原生 `html` ， `css` 这些就太浪费精力了，将前端三大框架集成进 `Electron` 是一个不错的想法。

本笔记记录将 `vue` 框架集成进 `Electron` 的方法。

## 谁更基础？

这个问题的出发点是：我们先建立一个 `vue` 项目，之后把 `Electron` 装进来还是先建立一个 `Electron` 项目，将 `vue` 装进来？

经过权衡，我对于 `vue` 项目更熟悉，所以选择以 `vue` 项目为基础，集成 `Electron` 。这有利于旧有项目改造。

## 技术方案

从 `Electron` 本身的生态出发，它和 `vue` 一毛钱关系都没有，周围的技术都是来做 `ipc` 通信和构建打包这些，至于网页用什么写，它是不关心的，只要浏览器能运行，它基本上就能运行了。这样看，是 `vue` 来抱 `Electron` 的大腿了。那继续去 `vue` 的生态来找，可以发现有三种方案。

* **方案一：** 直接安装`Electron`，并手动魔改项目代码
* **方案二：** 使用`electron-vue`，[项目地址](https://github.com/SimulatedGREG/electron-vue)
* **方案三：**使用`vue-cli-plugin-electron-builder`，[项目地址](https://github.com/nklayman/vue-cli-plugin-electron-builder)

方案一对于Electron的掌握要求很高，我这个初学者还是看大神秀吧，暂时放弃，后期可能选择这种方案。

方案二直接抛弃吧，太古老了，新项目没有必要自己给自己挖坑。

最终选择了方案三，这个方案比较新，但是还不够新，这篇文章的记录时间是2020-12-10， `vue-cli-plugin-electron-builder` 目前所支持的可选版本分别为：7.x，8.x和9.x。但是此时Electron的版本已经是11.x了。鉴于实力问题，先用这个方案填坑吧。[官网地址](https://nklayman.github.io/vue-cli-plugin-electron-builder/guide/#installation)

## 集成步骤

### Step1. 搞一个vue项目

这里就直接使用vue cli来生成一个模板项目，之后用vscode打开。

## Step2. 新建 .yarnrc 文件

这个文件作用就不讲了，主要是两个配置： `electron_mirror` 和 `electron_builder_binaries_mirror` ，具体内容请[参考笔记](../../../../NodeJS/NPM/registry_config.md)

## Step3. 集成 vue-cli-plugin-electron-builder

终端输入：

``` shell
$ vue add electron-builder
```

## Step4. 启动项目

终端输入：

``` shell
$ yarn electron:serve
```

`注意：` 这里有坑！！！！！！！！！！！！

经过血的教训的到的经验：通过 `cli` 生成的代码中 `src/background.js` 文件里有一行是下载 `Chrome` 的 `vue开发插件` 的，具体请看 `58行` ，这个 `await installExtension(VUEJS_DEVTOOLS)` 代码。由于我是在 `linux` 下开发的，运行命令后就卡主了（当然卡住了，请求了Google了。）然后等了1分钟也没反应，查阅文档也没找到问题，以为有bug。。。后面想可能是 `linux` 开发 `Electron` 太小众了，毕竟 `Electron` 要打包的，而打包基本都是 `Windows` 或者 `Mac` ， `linux` 版很多软件都不提供。然后我就切换到了 `Windows` 来执行，这时候也是这个问题，启动后卡主。但是， `Windows` 的控制台终端抛出了提示：**网络连接不上，vue插件下载不下来！（大致是这个意思）**然后开启全局代理，正常启动了。回到 `linux` ，开启代理，同样成功了。**若没有代理，可注释掉这部分代码。**

问题代码：

``` javascript
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
    if (isDevelopment && !process.env.IS_TEST) {
        // Install Vue Devtools
        try {
            await installExtension(VUEJS_DEVTOOLS) // 这里导致的阻塞！！！
        } catch (e) {
            console.error('Vue Devtools failed to install:', e.toString())
        }
    }
    createWindow()
})
```

## Step5. 项目配置

`Electron` 现在默认在**渲染进程**中不允许调用 `node` 中的接口与服务，一般需要打开这个限制，还有一些需要 `rebuild` 的包需要单独声明（这里以 `serialport` 为例）

修改vue.config.js文件

``` javascript
module.exports = {
    publicPath: './',
    productionSourceMap: false,
    pluginOptions: {
        electronBuilder: {
            nodeIntegration: true, //允许渲染进程调用node接口与服务
            externals: ['serialport'] // 声明需要rebuild的扩展包
        }
    },
    ……
}
```

## 打包

在各自的目标平台下运行：

``` shell
$ yarn electron:build
```

即可在 `dist_electron` 文件夹下看到打包结果，跨平台打包探索中……
