# `Go Modules`

## 引言

`Go modules` 是 `Go` 语言中正式官宣的项目依赖解决方案， `Go modules` （前身为 `vgo` ）于 `Go1.11` 正式发布，在 `Go1.14` 已经准备好，并且**可以用在生产上了**， `Go` 官方也鼓励所有用户从其他依赖项管理工具迁移到 `Go modules` 。

## What

`Go modules` 是 `Go` 语言的**依赖解决方案**，发布于 `Go1.11` ，成长于 `Go1.12` ，丰富于 `Go1.13` ，正式于 `Go1.14` 推荐在生产上使用。

`Go modules` 目前集成在 `Go` 的工具链中，只要安装了 `Go` ，自然而然也就可以使用 `Go modules` 了，而 `Go modules` 的出现也解决了在 `Go1.11` 前的几个常见争议问题：

1. `Go` 语言长久以来的依赖管理问题。
1. “淘汰”现有的 `GOPATH` 的使用模式。
1. 统一社区中的其它的依赖管理工具（提供迁移功能）。
