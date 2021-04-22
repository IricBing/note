# `uni-app` 路由架构设计

## 背景

`uni-app` 作为一款**全平台**开发框架，既可以支持**小程序**，又可以支持 `h5` 以及 `APP` ，从大的方面讲，这些平台可以分为**两大类**： `单页面` （ `h5` 和 `APP` ，因为是打包的 `vue` ）、 `多页面` （小程序的 `pages` ）。

仔细研读 `uni-app` 关于 `pages.json` 配置文件[相关文档](https://uniapp.dcloud.io/collocation/pages)和**路由与页面跳转**[相关文档](https://uniapp.dcloud.io/api/router)，可以发现，uni-app沿用的是小程序的模式，也就是将页面全部注册进pages.json文件，之后通过navigateTo、redirectTo等方式进行页面跳转。

用JSON配置文件来配置页面会导致一个不够优雅的问题，那就是随着页面的增加，这个文件会越来越大，代码臃肿，非常的不好维护。

## 方案

### 模块化配置

对于 `uni-app` 默认的配置来说，最不可接受的其实是 `pages.json` 文件不可拆分问题，这个问题需要优先解决。但是没有找到合适的自动生成 `pages.json` 文件的包，受到[uniapp-pages-json-cli-build](https://github.com/fengcms/uniapp-pages-json-cli-build)思想的影响，觉得可以通过手写生成脚本来实现。

阅读 `uni-app` 关于 `pages.json` 的相关文档发现，我们要想实现传统 `vue` 项目那种模块化的路由配置只需要关注配置文件中的 `pages` 和 `subPackages` 属性即可。动态生成这两个属性的值，其他的属性可以写到一个文件中。

因此，我设计的路由模块文件架构如下所示：（源码参见：[uni-app demo](https://git.virtualbing.cn/uni-app/demo)）

``` shell
.
├── api
│   └── user.js
├── App.vue
├── config
│   └── index.js
├── main.js
├── manifest.json
├── pages
│   ├── index
│   │   └── index.vue
│   └── user
│       ├── login
│       └── register
├── pages.json
├── router
│   ├── build.js
│   ├── guard.js
│   ├── index.js
│   └── modules
│       ├── app
│       ├── subapp1
│       └── subapp2
├── static
│   └── logo.png
├── store
│   ├── index.js
│   ├── modules
│   │   └── user.js
│   └── storage
│       ├── expiresAt.js
│       ├── expiresIn.js
│       ├── guardList.js
│       ├── roleList.js
│       ├── token.js
│       └── userData.js
├── subpackages
│   ├── app1
│   │   └── pages
│   └── app2
│       └── pages
├── uni.scss
└── utils
    ├── index.js
    ├── regular.js
    └── request.js

22 directories, 23 files
```

其中： `router/index.js` 文件中配置的是官方 `pages.json` 除了 `pages` 和 `subPackages` 属性之外的配置，示例：[index.js](https://git.virtualbing.cn/uni-app/demo/blob/82fe40f609f131e540c771e3027b68b3f0b27196/src/router/index.js)

考虑到**分包机制**，页面注册的时候就要拆开，主包全部放到 `router/modules/app/` 文件夹下，子包放到 `router/modules/子包/` 文件夹下，在[案例工程](https://git.virtualbing.cn/uni-app/demo)下，一共有两个子应用，分别为： `subapp1` 和 `subapp2` 。

对于主应用，我们只需要循环遍历 `router/modules/app/` 文件夹的文件，读取内容，整合到 `router/index.js` 文件中的 `pages` 属性中即可。

对于子应用，同样的道理，不过子应用文件夹下有一个特殊的文件—— `index.js` 文件（e.g. `router/modules/subapp1/index.js` ），这个文件的作用与主应用的 `index.js` 文件是一致的。主应用的 `index.js` 文件用来配置主应用的除了 `pages` 和 `subPackages` 属性之外的配置，那么子应用的 `index.js` 文件就是配置子应用里除了 `pages` 外的属性（子应用的配置字段比较少，除了 `pages` 属性外也就是 `root` 属性、 `name` 属性和 `independent` 属性了， `uni-app` 官方倒是**只有** `root` 属性，[相关文档](https://uniapp.dcloud.io/collocation/pages?id=subpackages)，但是微信小程序是有的，[相关文档](https://developers.weixin.qq.com/miniprogram/dev/framework/subpackages/basic.html)）。

#### 文件格式

在设计上尽量符合传统 `vue` 项目的配置，因此设计成如下格式：

``` javascript
module.exports = {
    baseUrl: 'pages/user/',
    children: [{
            path: 'register',
            title: '注册',
            name: 'register',
            home: true,
            style: {
                navigationBarTextStyle: 'black'
            },
            meta: {
                guard: ['userRegister']
            }
        },
        {
            path: 'login',
            title: '登录',
            name: 'login'
        }
    ]
}
```

其中：

* `baseUrl`字段表示`user`这个模块所在的位置

  按照我们 `vue` 项目的习惯，最终地址都是 `index.vue` ，所以用户注册的实际页面是： `src/pages/user/register/index.vue` 。

* `path`字段表示**路径地址**
* `title`字段表示**小程序的标题**

  这个字段会写入到 `pages.json` 文件的 `"style": {"navigationBarTitleText": "注册"}` 中。

* `name`字段是用来给下一步集成的`uni-simple-router`包来使用的
* `home`字段是用来标识是否页面是第一个页面，因为小程序默认从`pages.json`文件中`pages`数组元素的第一个配置项进入，整个路由中应该**只配置一项**为页面入口！
* 其他字段原样输出到`pages.json`文件

### 构建脚本

构建脚本是： `src/router/build.js` 文件，内容如下：

<details>
<summary>展开查看源码</summary>

``` javascript
const {
    readdirSync,
    writeFile
} = require('fs');
const {
    join,
    resolve
} = require('path');
const router = require('./index.js');
const subapp1 = require('./modules/subapp1');
const subapp2 = require('./modules/subapp2');

const builder = (app, baseUrl, children, root) => {
    const routeList = [];
    for (const route of children) {
        if (route.children) routeList.push(...builder(baseUrl + route.path + '/', route.children));
        else {
            const item = {
                path: baseUrl + route.path + '/index',
                name: app + '/' + route.name,
                home: route.home,
                style: {
                    navigationBarTitleText: route.title
                }
            };
            Object.keys(route).forEach(prop => !['path', 'name', 'title'].includes(prop) && (item[prop] = Object.assign(item[prop] || {}, route[prop])));
            routeList.push(item);
        }
    }

    // 如果是递归调用根节点，表示此时的routeList已经是完整的页面列表了，将带有home标志的元素移动到数组最开始。
    if (root) {
        const homePageIndex = routeList.findIndex(route => route.home);
        if (~homePageIndex) {
            const homePage = routeList.find(route => route.home);
            delete homePage.home;
            routeList.splice(homePageIndex, 1);
            routeList.unshift(homePage);
        }
    }

    return routeList;
};

// 将路由模块配置文件转化为 uniapp 配置文件格式
const buildRouter = (app, route) => {
    const {
        baseUrl,
        children
    } = route;

    return builder(app, baseUrl, children, true);
};

// 构建 pages
router.pages = readdirSync(resolve(__dirname, './modules/app'))
    .map(filename => buildRouter('app', require('./modules/app/' + filename)))
    .flat();
subapp1.pages = readdirSync(resolve(__dirname, './modules/subapp1'))
    .filter(filename => filename !== 'index.js')
    .map(filename => buildRouter('subapp1', require('./modules/subapp1/' + filename)))
    .flat();
subapp2.pages = readdirSync(resolve(__dirname, './modules/subapp2'))
    .filter(filename => filename !== 'index.js')
    .map(filename => buildRouter('subapp2', require('./modules/subapp2/' + filename)))
    .flat();

router.subpackages = [subapp1, subapp2];

// 写入 pages.json 文件
writeFile(
    join(__dirname, '..', 'pages.json'),
    // 我这边是用两个空格来缩进 pages.json，如果喜欢制表符，第三个参数更换你为 \t 即可
    JSON.stringify(router, null, '  '),
    /* eslint-disable-next-line */
    e => (e ? console.error(e) : console.log('pages.json 配置文件更新成功'))
);
```

</details>

然后在 `package.json` 文件中增加构建 `pages.json` 文件的脚本：

``` json
  "scripts": {
    "build:pages": "node src/router/build.js"
    }
```

以后就可以通过命令： `$ yarn build:pages` 命令来生成 `pages.json` 文件了，达到了解耦的目标！

### 路由优化

为了降低技术栈迁入难度，尽量符合传统vue项目的习惯，引入 `uni-simple-router` 这个包，[官方文档](https://hhyang.cn/src/router/start/quickstart.html)，和 `uni-read-pages` 这个包，[项目地址](https://github.com/SilurianYang/uni-read-pages#readme)。

方案上，我们通过 `uni-read-pages` 来读取 `pages.json` 文件中的内容，并加入到 `webpack` 的全局变量中，之后在 `uni-simple-router` 这个包中自动注入，相关配置直接参考[官方文档](https://hhyang.cn/v2/start/quickstart.html)即可。同时，这个包支持**路由守卫**！因为 `router/index.js` 文件给构建脚本用了，我就将路由引入和守卫放到一起了，写到了 `router/guard.js` 文件中。

``` javascript
import {
    RouterMount,
    createRouter
} from 'uni-simple-router';

const router = createRouter({
    platform: process.env.VUE_APP_PLATFORM,
    routes: ROUTES
});

//全局路由前置守卫
router.beforeEach((to, from, next) => {
    next();
});

// 全局路由后置守卫
router.afterEach((to, from) => {});

export {
    router,
    RouterMount
};
```

路由注册： `src/main.js`

``` javascript
import Vue from 'vue';
import App from './App';
import {
    router,
    RouterMount
} from './router/guard';

Vue.use(router);

Vue.config.productionTip = false;

App.mpType = 'app';

const app = new Vue({
    ...App,
    router
});

//v1.3.5起 H5端 你应该去除原有的app.$mount();使用路由自带的渲染方式
// #ifdef H5
RouterMount(app, router, '#app');
// #endif

// #ifndef H5
app.$mount(); //为了兼容小程序及app端必须这样写才有效果
// #endif
```

## 采坑集锦

### 路由传参

在之前纯 `vue` ，使用 `vue-router` 项目开发时，路由跳转（以 `push` 方法举例），可以通过 `name` 或者 `path` 来定位路由条目，并且通过 `params` 或者 `query` 来进行传参。

在 `uni-simple-router` 这个包中，只能通过 `name + params` 和 `path + query` 这两种方式!!
