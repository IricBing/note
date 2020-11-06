# NestJS 工程配置篇

**需要安装的插件**

* Prettier - Code formatter
* vscode-proto3
* Clang-Format

**node 版本**

* v12.x
* v14.x   `推荐`

## nest-cli.json 文件

示例：

``` json
{
  "collection": "@nestjs/schematics",
  "sourceRoot": "src",
  "compilerOptions": {
    "assets": [
      "**/*.proto"
    ]
  }
}
```

## tsconfig.json 文件

示例：

``` json
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

## tsconfig.build.json 文件

示例：

``` json
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

## .prettierrc 文件

示例：

``` json
{
  "singleQuote": true,
  "trailingComma": "none",
  "semi": true,
  "printWidth": 200,
  "bracketSpacing": true,
  "arrowParens": "avoid"
}
```

## .vscode/settings.json 文件

示例：

``` json
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
  "clang-format.executable": "/usr/bin/clang-format", //环境中需要安装 clang-format 软件
  "clang-format.style": "google",
}
```

## .vscode/launch.json 文件

``` json
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
      "program": "${workspaceFolder}/node_modules/.bin/jest",
      "args": [
        "${fileBasenameNoExtension}"
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

## 提交代码前自动格式化代码——可选

`注意：`  `monoRepo` 模式不可用，需要使用 `lerna` 来配置。

安装 `husky` 和 `lint-staged` 包

``` shell
$ yarn add -D husky lint-staged
```

之后修改 `package.json` 文件，在最后面增加如下规则:

``` json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "src/**/*.ts": [
      "prettier --write \"src/**/*.ts\""
    ],
    "test/**/*.ts": [
      "prettier --write \"test/**/*.ts\""
    ]
  }
}
```
