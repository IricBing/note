# ES2019 `Array.prototype.flatMap()`

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/flatMap)

`flatMap()` 方法首先使用映射函数映射每个元素，然后将结果压缩成一个**新数组**。它与 `map` 连着深度值为 `1` 的 `flat` 几乎相同，但 `flatMap` 通常在合并成一种方法的效率稍微高一些。

**语法：**

``` javascript
var new_array = arr.flatMap(function callback(currentValue[, index[, array]]) {
    // return element for new_array
} [, thisArg])
```

**参数：**

* `callback`

  可以生成一个新数组中的元素的函数，可以传入三个参数：

  + `currentValue`

    当前正在数组中处理的元素

  + `index`   | 可选

    数组中正在处理的当前元素的索引

  + `array`   | 可选

    被调用的 `map` 数组

* `thisArg`   | 可选

  执行 `callback` 函数时 使用的 `this` 值。

**返回值：**

一个新的数组，其中每个元素都是回调函数的结果，并且结构深度 `depth` 值为 `1` 。

**示例：**

``` javascript
const arr1 = [1, 2, 3, 4];

arr1.map(x => [x * 2]); // [[2], [4], [6], [8]]

arr1.flatMap(x => [x * 2]); // [2, 4, 6, 8]

// 只能展开一级
arr1.flatMap(x => [
    [x * 2]
]); // [[2], [4], [6], [8]]
```
