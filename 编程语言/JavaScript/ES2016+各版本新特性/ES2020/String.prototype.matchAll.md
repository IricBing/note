# ES2020 `String.prototype.matchAll()`

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/matchAll)

`matchAll() ` 方法返回一个包含所有匹配正则表达式的结果及分组捕获组的**迭代器**。

**语法：**

``` javascript
str.matchAll(regexp)
```

**参数：**

* `regexp`

  正则表达式对象。如果所传参数不是一个正则表达式对象，则会隐式地使用 `new RegExp(obj)` 将其转换为一个 `RegExp` 。

  其中 `RegExp` 必须是设置了**全局模式** `g` 的形式，否则会抛出异常 `TypeError` 。

**返回值：**

一个**迭代器**（**不可重用**，结果耗尽需要再次调用方法，获取一个新的迭代器）。

**示例：**

``` javascript
const regexp = /t(e)(st(\d?))/g;
const str = 'test1test2';

str.match(regexp); // Array ['test1', 'test2']

const array = [...str.matchAll(regexp)];

array[0]; // ['test1', 'e', 'st1', '1', index: 0, input: 'test1test2', length: 4]
array[1]; // ['test2', 'e', 'st2', '2', index: 5, input: 'test1test2', length: 4]
```
