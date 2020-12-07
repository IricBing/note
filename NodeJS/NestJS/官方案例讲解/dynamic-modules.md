# # NestJS 官方案例第25篇 —— dynamic modules(动态模块)讲解

笔记写于**2020年12月7日**，为了避免因官方更新而导致代码不一的情况，我特意拷贝了一份放到 `个人Gitlab` 上，[地址](https://git.virtualbing.cn/nestjs-official-demo/dynamic-modules)

官方使用的是 `npm` ，个人喜欢用 `yarn` ，因此在 `lock文件` 中与官方不同，删除了官方的 `package-lock.json` 文件，增加了 `yarn.lock` 文件。

## 项目结构

``` shell
dynamic-modules
    ├── config  # 配置文件夹
    │   └── development.env # 开发环境配置文件
    ├── .eslintrc.js    # eslint 配置规则文件
    ├── .gitignore      # git ignore配置文件
    ├── nest-cli.json   # nest cli 配置文件
    ├── package.json    # 项目配置文件
    ├── .prettierrc     # prettier 配置文件
    ├── README.md       # 说明文档文件
    ├── src     # 源码目录
    │   ├── app.controller.spec.ts  # app controller 单元测试文件
    │   ├── app.controller.ts       # app controller 文件
    │   ├── app.module.ts       # module声明文件
    │   ├── app.service.ts      # service文件
    │   ├── config      # 配置模块目录
    │   │   ├── config.module.ts    # 配置模块声明文件
    │   │   ├── config.service.spec.ts  # config service 单元测试文件
    │   │   ├── config.service.ts   # config service文件
    │   │   ├── constants.ts    # 常量文件
    │   │   └── interfaces      # 接口文件夹
    │   │       ├── config-options.interface.ts     # config 参数接口
    │   │       ├── envconfig.interface.ts  # 配置文件（development.env）内容类型
    │   │       └── index.ts    # 导出配置
    │   └── main.ts     # 程序主入口
    ├── tsconfig.build.json # tsc build配置文件
    ├── tsconfig.json   # tsc 基础配置
    └── yarn.lock       # yarn 锁文件

4 directories, 22 files
```

## 内容讲解

`main.ts` 文件、 `app.controller.ts` 文件和 `app.controller.spec` 文件均无需特殊讲解。

### app.module.ts

这是项目根模块注册的地方，里面内容如下所示:

``` typescript
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [ConfigModule.register({ folder: './config' })],     //关键点！
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

可以看出，与以往文件最大的不同在于 `imports: [ConfigModule.register({ folder: './config' })]` 这一行。这里面导入的 `ConfigModule` 模块写了 `register` 方法，并传入了一个 `object` 。

通过 `F12` 进入 `register` 方法看一下，发现这个方法定义在 `src/config/config.module.ts` 文件中。而且这个文件和普通的 `module` 文件格式大不相同！内容如下：

``` typescript
import { DynamicModule, Module } from '@nestjs/common';
import { ConfigService } from './config.service';
import { CONFIG_OPTIONS } from './constants';

export interface ConfigModuleOptions {
  folder: string;
}

@Module({})
export class ConfigModule {
  static register(options: ConfigModuleOptions): DynamicModule {
    return {
      module: ConfigModule,
      providers: [
        {
          provide: CONFIG_OPTIONS,
          useValue: options,
        },
        ConfigService,
      ],
      exports: [ConfigService],
    };
  }
}
```

由代码可以看到， `register` 方法是一个**静态方法**，返回类型是 `nestjs` 的 `DynamicModule` 类型。
