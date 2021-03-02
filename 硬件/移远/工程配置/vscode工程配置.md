# `vscode` 工程配置

## 配置文件部分

### `.vscode/extensions.json` 文件

``` json
{
  "recommendations": [
    "streetsidesoftware.code-spell-checker",
    "wayou.vscode-todo-highlight",
    "gruntfuggly.todo-tree",
    "njpwerner.autodocstring",
    "aaron-bond.better-comments",
    "kevinrose.vsc-python-indent",
    "spywhere.guides",
    "obkoro1.korofileheader"
  ]
}
```

## 插件配置

### `Python Docstring Generator`

`Python Docstring Generator` 这个插件默认是采用 `Google` 的注释风格，但是主流用户习惯了 `numpy` 的风格，为了避免采坑，我们选择跟随主流，将 `Python` 的注释风格改为 `numpy` 风格。

在设置页面输入 `autoDoc` ，找到该插件的 `Auto Docstring: Docstring Format` 配置，选择 `numpy` ，如下所示：

![PythonDocstring插件配置numpy风格](assets/images/PythonDocstring插件配置numpy风格.png)

### YAPF

要把 `Python` 代码写漂亮，必须遵循 `PEP8 Python` 编码规范：《[PEP 8 -- Style Guide for Python Code](https://www.python.org/dev/peps/pep-0008/)》。但记住 `PEP8` 规范，是一件非常痛苦的事情，还好 `Google` 发布了一个自动整理 `Python` 代码，让其符合 `PEP8` 规范的工具： `YAPF` 。

安装：

``` shelll
$ pip install yapf
```

配置：

打开设置页面，输入： `python.formatting.provider` ，将代码风格选择为 `yapf` ，如下所示：

![YAPF代码风格配置](assets/images/YAPF代码风格配置.png)
