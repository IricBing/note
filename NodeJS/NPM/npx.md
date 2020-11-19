# 什么是 npx ？

`npm` 从**5.2**版本开始，增加了 `npx` 命令，这个命令可以执行 `node_modules` 中的可执行文件，还可以避免全局安装模块。

例如：

``` shell
$ npm install -D mocha

$ node-modules/.bin/mocha --version
$ npx mocha --version   # 等价于上一条命令
```
