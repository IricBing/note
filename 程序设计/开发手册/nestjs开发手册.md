# `nestjs` 开发手册

## 编程规约

因为 `nestjs` 这个项目灵感来源于 `Angular` 项目，在很多地方都能看到很多十分类似的设计，因此我们主要以 `Angular` 官网的[风格指南](https://angular.cn/guide/styleguide)这篇文章作为**蓝版**，但是由于 `Angular` 属于前端框架，对于后台来说还是有一定的“水土不服”，所以结合 `NodeJS` 创始人新开的 `Deno` 项目风格——[Deno Style Guide](https://deno.land/manual/contributing/style_guide)，融合成 `NestJS` 的编程风格。

### 缩进风格

**强制**使用 `2个空格` 来代替 `tab` 。

> 通常在项目的 `.vscode/settings.json` 文件中进行配置即可。

### 命名风格

关于命名风格的代号请转至笔记：[常见命名风格](常见命名风格.md)

基础命名风格如下：（对于 `Dto` 等特殊类的命名已单独列出，参见下文）

|类别|风格|示例|
|-----|-----|-----|
|类名|大驼峰格式|UserController、UserService|
|属性名|小驼峰|findById、findAndPaging|
