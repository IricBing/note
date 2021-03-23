# `nestjs` 开发手册

## 编程规约

因为 `nestjs` 这个项目灵感来源于 `Angular` 项目，在很多地方都能看到很多十分类似的设计，因此我们主要以 `Angular` 官网的[风格指南](https://angular.cn/guide/styleguide)这篇文章作为**蓝版**，但是由于 `Angular` 属于前端框架，对于后台来说还是有一定的“水土不服”，所以结合 `NodeJS` 创始人新开的 `Deno` 项目风格——[Deno Style Guide](https://deno.land/manual/contributing/style_guide)，融合成 `NestJS` 的编程风格。

### 缩进风格

**强制**使用 `2个空格` 来代替 `tab` 。

> 通常在项目的 `.vscode/settings.json` 文件中进行配置即可。

### 文件、文件夹命名及目录结构

按照 `Angular` 的风格，采用模块化设计。

<details>
<summary>展开目录结构示例</summary>

``` shell
<project name>
    ├── config
    │   ├── development.json
    │   ├── docker
    │   │   ├── development.json
    │   │   ├── production.json
    │   │   └── staging.json
    │   ├── production.json
    │   └── staging.json
    ├── nest-cli.json
    ├── package.json
    ├── README.md
    ├── src
    │   ├── app.module.ts
    │   ├── constants
    │   │   └── redis.constant.ts
    │   ├── dtos
    │   │   ├── bool.res.dto.ts
    │   │   ├── id.req.dto.ts
    │   │   ├── id.res.dto.ts
    │   │   ├── uuid.req.dto.ts
    │   │   └── uuid.res.dto.ts
    │   ├── entities
    │   │   ├── basic.entity.ts
    │   │   └── transformer
    │   │       └── bigint.transformer.ts
    │   ├── global.d.ts
    │   ├── interfaces
    │   │   └── config.interface.ts
    │   ├── main.ts
    │   ├── modules
    │   │   ├── email
    │   │   │   ├── constants
    │   │   │   │   └── email.constant.ts
    │   │   │   ├── controllers
    │   │   │   │   └── email.controller.ts
    │   │   │   ├── dtos
    │   │   │   │   └── send-email-auth-code.req.dto.ts
    │   │   │   ├── email.module.ts
    │   │   │   ├── interfaces
    │   │   │   │   ├── email-content.interface.ts
    │   │   │   │   └── email-recipient.interface.ts
    │   │   │   └── services
    │   │   │       └── email.service.ts
    │   │   ├── guard
    │   │   │   ├── constants
    │   │   │   │   └── guard.constant.ts
    │   │   │   ├── controllers
    │   │   │   │   └── guard.controller.ts
    │   │   │   ├── dtos
    │   │   │   │   └── get-gurd-list.res.dto.ts
    │   │   │   ├── entities
    │   │   │   │   └── guard.entity.ts
    │   │   │   ├── guard.module.ts
    │   │   │   └── services
    │   │   │       └── guard.service.ts
    │   │   ├── log
    │   │   │   ├── constants
    │   │   │   │   └── log.constant.ts
    │   │   │   ├── entities
    │   │   │   │   └── log.entity.ts
    │   │   │   ├── log.module.ts
    │   │   │   └── services
    │   │   │       └── log.service.ts
    │   │   ├── role
    │   │   │   ├── constants
    │   │   │   │   └── role.constant.ts
    │   │   │   ├── controllers
    │   │   │   │   └── role.controller.ts
    │   │   │   ├── dtos
    │   │   │   │   ├── create-role.req.dto.ts
    │   │   │   │   └── get-role-list.req.dto.ts
    │   │   │   ├── entities
    │   │   │   │   └── role.entity.ts
    │   │   │   ├── role.module.ts
    │   │   │   └── services
    │   │   │       └── role.service.ts
    │   │   └── user
    │   │       ├── constants
    │   │       │   └── user.constant.ts
    │   │       ├── controllers
    │   │       │   ├── user-auth.controller.ts
    │   │       │   └── user.controller.ts
    │   │       ├── dtos
    │   │       │   ├── login.req.dto.ts
    │   │       │   ├── login.res.dto.ts
    │   │       │   ├── register.req.dto.ts
    │   │       │   └── register.res.dto.ts
    │   │       ├── entities
    │   │       │   ├── user-auth.entity.ts
    │   │       │   ├── user.entity.ts
    │   │       │   ├── user-perference.entity.ts
    │   │       │   ├── user-profile.entity.ts
    │   │       │   └── user-role.entity.ts
    │   │       ├── interfaces
    │   │       │   ├── jwt.payload.interface.ts
    │   │       │   └── token.interface.ts
    │   │       ├── services
    │   │       │   ├── auth.service.ts
    │   │       │   ├── user-auth.service.ts
    │   │       │   ├── user-profile.service.ts
    │   │       │   ├── user-role.service.ts
    │   │       │   └── user.service.ts
    │   │       └── user.module.ts
    │   ├── pipes
    │   │   └── validation.pipe.ts
    │   ├── preInit.ts
    │   ├── services
    │   │   ├── init.service.ts
    │   │   └── redis.lant.service.ts
    │   ├── strategies
    │   │   └── jwt.strategy.ts
    │   └── utils
    │       ├── lant.util.ts
    │       └── regular.util.ts
    ├── test
    │   ├── app.e2e-spec.ts
    │   └── jest-e2e.json
    ├── tsconfig.build.json
    ├── tsconfig.json
    └── yarn.lock
```

</details>

### 命名风格

关于命名风格的代号请转至笔记：[常见命名风格](常见命名风格.md)

基础命名风格如下：（对于 `Dto` 等特殊类的命名已单独列出，参见下文）

|类别|风格|示例|
|-----|-----|-----|
|类名|大驼峰格式| `UserController` 、 `UserService` |
|属性名|小驼峰| `findById` 、 `findAndPaging` |
|方法名|小驼峰| `findById` 、 `findAndPaging` |
|枚举属性名|大驼峰| `Gender. Male` 、 `Gender. Female` |
|常量|大蛇| `REQUEST_URL` 、 `PI` |
