# NestJS 工程配置篇

需要安装的插件

* Prettier - Code formatter
* vscode-proto3

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
    "lib": [        //当需要高级语法时，扩充此字段
      "ES2020"
    ],
    "target": "es2019", //这里需要按照当前使用node的版本来选择打包版本
    "sourceMap": true,
    "outDir": "./dist",
    "baseUrl": "./",
    "incremental": true
  }
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
  }
}
```
