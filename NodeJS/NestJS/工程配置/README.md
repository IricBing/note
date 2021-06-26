# `NestJS` 工程配置篇

**node 版本**

* v12.x
* v14.x   `推荐`

## 安装必要的开发包

### `cross-env`

```shell
$ yarn add -D cross-env
```

修改 `package.json` 文件

```json
{
  "scripts": {
    "lint": "cross-env NODE_ENV=production eslint \"{src,apps,libs,test}/**/*.ts\" --fix",
  }
}
```

## 配置文件部分

### `.vscode/settings.json` 文件

示例：

```json
{
  "editor.detectIndentation": false, // vscode默认启用了根据文件类型自动设置tabsize的选项
  "editor.tabSize": 2, // 重新设定tabsize
  "editor.formatOnSave": true, // #每次保存的时候自动格式化
  // 在使用搜索功能时，将这些文件夹/文件排除在外
  "search.exclude": {
    "**/node_modules": true,
    "**/bower_components": true,
    "**/target": true,
    "**/logs": true,
    "**/dist": true
  },
  // 这些文件将不会显示在工作空间中
  "files.exclude": {
    "**/.git": true,
    "**/.svn": true,
    "**/.hg": true,
    "**/CVS": true,
    "**/.DS_Store": true,
    "**/*.js": {
      "when": "$(basename).ts" //ts编译后生成的js文件将不会显示在工作空中
    },
    "**/node_modules": true
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "typescript.preferences.importModuleSpecifier": "relative", // 使用相对路径
  "javascript.preferences.importModuleSpecifier": "relative", // 使用相对路径
  "clang-format.executable": "/usr/bin/clang-format", //环境中需要安装 clang-format 软件
  "clang-format.style": "google",
}
```

### `.vscode/launch.json` 文件

```json
{
  // Use IntelliSense to learn about possible attributes.
  // Hover to view descriptions of existing attributes.
  // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Debug locate master server",
      "runtimeVersion": "14.17.0", // 这里要按照项目的 .nvmrc文件进行修改！
      "args": [
        "${workspaceFolder}/src/main.ts"
      ],
      "runtimeArgs": [
        "--nolazy",
        "-r",
        "ts-node/register"
      ],
      "sourceMaps": true,
      "cwd": "${workspaceRoot}",
      "protocol": "inspector"
    },
    {
      "type": "node",
      "request": "launch",
      "name": "Jest All",
      "runtimeVersion": "14.17.0", // 这里要按照项目的 .nvmrc文件进行修改！
      "program": "${workspaceFolder}/node_modules/.bin/jest",
      "args": [
        "--runInBand"
      ],
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen",
      "disableOptimisticBPs": true,
      "windows": {
        "program": "${workspaceFolder}/node_modules/jest/bin/jest",
      }
    },
    {
      "type": "node",
      "request": "launch",
      "name": "Jest Current File",
      "runtimeVersion": "14.17.0", // 这里要按照项目的 .nvmrc文件进行修改！
      "program": "${workspaceFolder}/node_modules/.bin/jest",
      "args": [
        "/${fileBasenameNoExtension}"
      ],
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen",
      "disableOptimisticBPs": true,
      "windows": {
        "program": "${workspaceFolder}/node_modules/jest/bin/jest",
      }
    },
    {
      "type": "node",
      "request": "launch",
      "name": "Jest e2e test",
      "runtimeVersion": "14.17.0", // 这里要按照项目的 .nvmrc文件进行修改！
      "program": "${workspaceFolder}/node_modules/.bin/jest",
      "args": [
        "--config",
        "${workspaceFolder}/test/jest-e2e.json",
        "--runInBand"
      ],
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen",
      "disableOptimisticBPs": true,
      "windows": {
        "program": "${workspaceFolder}/node_modules/jest/bin/jest",
      }
    }
  ]
}
```

### `.vscode/extensions.json` 文件

```json
{
  "recommendations": [
    "streetsidesoftware.code-spell-checker",
    "aaron-bond.better-comments",
    "mikestead.dotenv",
    "dbaeumer.vscode-eslint",
    "plex.vscode-protolint",
    "wayou.vscode-todo-highlight",
    "gruntfuggly.todo-tree",
    "esbenp.prettier-vscode",
    "graphql.vscode-graphql",
    "prisma.prisma"
  ]
}
```

### `nest-cli.json` 文件

示例：

```json
{
  "collection": "@nestjs/schematics",
  "sourceRoot": "src",
  "compilerOptions": {
    "assets": [
      "**/*.proto",
      "**/*.graphql",
      "**/*.prisma"
    ],
    "watchAssets": true
  }
}
```

### `tsconfig.json` 文件

示例：

```json
{
  "compilerOptions": {
    "module": "commonjs",
    "declaration": true,
    "removeComments": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "allowSyntheticDefaultImports": true,
    //node 12.x
    // "lib": [        //当需要高级语法时，扩充此字段
    //   "ES2020"
    // ],
    // "target": "es2019", //这里需要按照当前使用node的版本来选择打包版本
    //node 14.x
    "target": "es2020",
    "sourceMap": true,
    "outDir": "./dist",
    "baseUrl": "./",
    "incremental": true
  }
}
```

### `tsconfig.build.json` 文件

示例：

```json
{
  "extends": "./tsconfig.json",
  "include": [  //include 属性是用来避免在开发时更改静态资源（通常为public文件夹下的内容）而导致服务重启的情况，仅监听src文件下所有文件
    "src/**/*"
  ],
  "exclude": [
    "node_modules",
    "test",
    "dist",
    "**/*spec.ts"
  ]
}
```

### `.prettierrc` 文件

示例：

```json
{
  "singleQuote": true,
  "trailingComma": "none",
  "semi": true,
  "printWidth": 160,
  "bracketSpacing": true,
  "arrowParens": "avoid"
}
```

### `.eslintrc.js` 文件

**示例：**

```javascript
module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: 'tsconfig.json',
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint/eslint-plugin'],
    extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
        'prettier',
    ],
    root: true,
    env: {
        node: true,
        jest: true,
    },
    ignorePatterns: ['.eslintrc.js'],
    rules: {
        '@typescript-eslint/interface-name-prefix': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        "@typescript-eslint/no-empty-interface": 'off',
        "@typescript-eslint/ban-types": 'off',
        "@typescript-eslint/no-unused-vars": ['warn', {
            "argsIgnorePattern": "^_"
        }],
        'no-console': process.env.NODE_ENV === 'production' ? ['error', {
            allow: ['warn', 'error']
        }] : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-var': 0,
        "no-unused-vars": ['warn', {
            "argsIgnorePattern": "^_"
        }],
        'prefer-rest-params': 0
    },
};
```

### `.gitignore` 文件

```gitignore
# environment file
.env

# ignore npm lock file, use yarn.lock
package-lock.json
```

## 可选配置

### 提交代码前自动格式化代码

`注意：`  `monoRepo` 模式不可用，需要使用 `lerna` 来配置。

安装 `husky` 和 `lint-staged` 包（因为需要增加 `ENV` 参数，所以还是把 `cross-env` 包装上吧。）

```shell
$ yarn add -D husky lint-staged cross-env 
```

在项目根目录增加 `.lintstagedrc.json` 文件，写入如下内容：

```json
{
  "src/**/*.ts": [
    "prettier --write \"src/**/*.ts\"",
    "cross-env NODE_ENV=production eslint \"{src,apps,libs,test}/**/*.ts\" --fix",
    "git add ."
  ],
  "test/**/*.ts": [
    "prettier --write \"test/**/*.ts\"",
    "cross-env NODE_ENV=production eslint \"{src,apps,libs,test}/**/*.ts\" --fix",
    "git add ."
  ]
}
```

接下来配置 `husky` ，输入如下命令：

```shell
$ yarn husky install

$ yarn husky add .husky/pre-commit "npx lint-staged"
```

最后配置一下 `package.json` 文件，在 `scripts` 脚本中增加一行命令：

```json
{
  "scripts": {
    "postinstall": "husky install",
  }
}
```

> 提示： `husky` 版本进化很快，还破坏性升级，这就有点难受了，如果发现不好使，可能就是升级了，目前版本： `6.0.0`

### 生产环境打包优化

#### 新建 `tsconfig.build.prod.json` 文件

这是一个新建的文件，主要是为了生产环境构建的时候移除无用信息配置的，这里面还想加入混淆压缩等功能，使用ts官网上的 `gulp+uglify` 搞了半天没成功。。。

```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "declaration": false,
    "sourceMap": false,
    "incremental": false
  },
  "exclude": [
    "node_modules",
    "test",
    "dist",
    "**/*spec.ts"
  ]
}
```

修改 `package.json` 文件，添加如下命令：

```json
{
  "scripts": {
    "build:prod": "rimraf dist && nest build -p tsconfig.build.prod.json",
  }
}
```

以后生产环境构建使用如下命令：

```shell
$ yarn build:prod
```

### `Docker` 支持

#### 新建 `.dockerignore` 文件

内容如下：

```gitignore
**/*
!package.json
!.yarnrc
!yarn.lock

!./dist/
```

#### 新建 `Dockerfile` 文件

配置信息依环境而定，本笔记不做示例。
