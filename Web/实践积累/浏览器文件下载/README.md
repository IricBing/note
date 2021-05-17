# 浏览器文件下载

## 需求场景

通常我们将文件放在一个 `URL` 路径中提供下载，例如： `https://www.virtualbing.cn/public/temp/123.xlsx` ，浏览器访问这个地址就会下载一个 `Excel` 文件。在浏览器中，点击一个按钮开始下载这个文件就是我们要实现的功能。

## 实现方式

最简单的方式就是通过：window.open()方法来实现下载，例如：

``` javascript
const url = 'https://www.virtualbing.cn/public/temp/123.xlsx';
window.open(url);
```

这样浏览器就会打开一个新的标签页，并下载此文件。

但是：这种方式有问题，如果要下载的文件过大，那么就会被浏览器阻止，右上角会提示**禁止网页弹出弹窗！**

接下来就是对这种方式进行优化了，优化的思路就是创建一个 `DOM节点` ，类型为 `a` 标签，将文件 `url` 放到 `href` 属性中，之后将此元素添加到 `body` 中，并模拟点击，点击后再销毁此节点。 

代码实现如下所示：

``` javascript
const downloadElement = document.createElement('a');
downloadElement.href = 'https://www.virtualbing.cn/public/temp/123.xlsx';
document.body.appendChild(downloadElement);
downloadElement.click();
document.body.removeChild(downloadElement);
```
