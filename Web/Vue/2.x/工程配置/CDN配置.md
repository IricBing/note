# Vue 2.x 项目cdn配置

## 需求

在中国环境，云厂商卖的服务一般有两种， `按带宽计费` 和 `按流量计费` 。按带宽计费上cdn那是毋庸置疑了，按流量计费上cdn也是比较合适的，一方面是更快，另一方面是cdn的费用更低。

我们的目的就是在打包的时候将依赖库抽出来，只打包业务代码，依赖库从cdn中引入。对于开发来说是 `无感知的` ，和正常开发一样，只有在打包的时候有区别。

## index.html 文件配置

修改 `public/index.html` 文件，在 `head` 标签中加入cdn引入配置，例如：

`提示：` 按照**最佳实践**应该是 `css引入在head中，js引入在body最后` ，这样能加快页面加载速度。我这么引入纯粹是为了看着好看，也曾经尝试过最佳实践，发现提升几乎不可见。。。

``` html
<!-- 通过cdn的方式引入vue -->
<script src="https://cdn.lantsang.cn/vue/2.6.11/vue.min.js"></script>

<!-- 通过cdn的方式引入vuex -->
<script src="https://cdn.lantsang.cn/vuex/3.3.0/vuex.min.js"></script>

<!-- 通过cdn的方式引入vue-router -->
<script src="https://cdn.lantsang.cn/vue-router/3.1.6/vue-router.min.js"></script>

<!-- 通过cdn的方式引入axios -->
<script src="https://cdn.lantsang.cn/axios/0.19.2/axios.min.js"></script>

<!-- 通过cdn的方式引入uuid -->
<script src="https://cdn.lantsang.cn/uuid/8.3.0/uuid.min.js"></script>

<!-- 通过cdn的方式引入Element ui样式 -->
<link href="https://cdn.lantsang.cn/element-ui/2.13.1/theme-chalk/index.css" rel="stylesheet" />
<!-- 通过cdn的方式引入Element ui组件库 -->
<script src="https://cdn.lantsang.cn/element-ui/2.13.1/index.js"></script>
```

## vue.config.js 文件配置

修改根目录下的 `vue.config.js` 文件（没有新建即可），做类似于如下的修改

``` javascript
module.exports = {
    ……
    configureWebpack: {
        externals: {
            vue: 'Vue',
            'element-ui': 'ELEMENT', //注意名称，如果不确定，去官网或者Google查看应该写成什么。
            'vue-router': 'VueRouter',
            vuex: 'Vuex',
            axios: 'axios',
            nprogress: 'NProgress',
            screenfull: 'screenfull',
            moment: 'moment',
            uuid: 'uuid',
            AMap: 'AMap'
        }
    }……
}
```

配置完成！
