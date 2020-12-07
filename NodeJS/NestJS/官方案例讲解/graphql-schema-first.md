# NestJS 官方案例第12篇 —— graphql schema first讲解

笔记写于**2020年12月7日**，为了避免因官方更新而导致代码不一的情况，我特意拷贝了一份放到 `个人Gitlab` 上，[地址](https://git.virtualbing.cn/nestjs-official-demo/graphql-schema-first)

官方使用的是 `npm` ，个人喜欢用 `yarn` ，因此在 `lock文件` 中与官方不同，删除了官方的 `package-lock.json` 文件，增加了 `yarn.lock` 文件。

## 项目结构

``` shell
graphql-schema-first
    ├── .eslintrc.js    # eslint 配置文件
    ├── .gitignore  # git ignore 配置文件
    ├── nest-cli.json   # nest cli 配置文件
    ├── package.json    # 项目配置文件
    ├── README.md   # 说明文件
    ├── src     #源码目录
    │   ├── app.module.ts   # 根模块配置
    │   ├── cats    # cat 模块目录
    │   │   ├── cats.graphql    # graphql文件
    │   │   ├── cats.guard.ts   # guard（守卫）文件
    │   │   ├── cats.module.ts  # cat 模块配置文件
    │   │   ├── cats.resolvers.ts   # resolver文件，http入口，类似于restful结构的controller文件
    │   │   ├── cats.service.ts     # service文件
    │   │   └── dto     # dto目录
    │   │       └── create-cat.dto.ts   # 创建请求DTO配置文件
    │   ├── common      # 公共部分文件
    │   │   ├── directives  # 指令目录
    │   │   │   └── upper-case.directive.ts # 字段转大小指令
    │   │   ├── plugins # 插件目录
    │   │   │   └── logging.plugin.ts   # 打印插件
    │   │   └── scalars # ？？？ TODO: 搞清楚后来写
    │   │       └── date.scalar.ts  # ？？？TODO: 搞清楚后来写
    │   ├── generate-typings.ts # 由graphql文件生成ts文件配置文件
    │   ├── graphql.schema.ts   # 根据graphql文件自动生成的文件
    │   └── main.ts # 程序主入口
    ├── tsconfig.build.json     # tsc build配置文件
    ├── tsconfig.json           # tsc 基础配置
    └── yarn.lock        # yarn 锁文件

7 directories, 21 files
```
