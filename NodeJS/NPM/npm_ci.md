# npm ci 命令

## 功能简介

`npm ci` 类似于 `npm i` ，它的用途是在**自动化环境**下使用，例如：测试平台、CI/CD环境等。

在安装包时，它会自动跳过某些面向用户的功能，通常会比 `npm i` 安装的**更快**。

同时，它也比常规安装**更加的严格**

## 使用

首先，项目必须有一个 `package-lock.json` 或者 `npm-shrinkwrap.json` 文件。

安装时，如果 `node_modules` 文件夹已经存在，那么就**先删除这个文件夹，之后从头开始安装！**(PS: 该命令无法安装单个依赖项)

如果在安装时， `package-lock.json` 中的依赖项与 `package.json` 中的依赖项不匹配时， `npm ci` 就会退出并显示错误，而不是更新 `package-lock.json` 。

`注意：` 它永远不回写入 `package.json` 或任何包锁——**安装基本上是冻结的！**
