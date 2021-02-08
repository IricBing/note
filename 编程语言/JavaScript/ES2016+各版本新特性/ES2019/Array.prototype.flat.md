# ES2019 `Array.prototype.flat()`

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/flat)

`flat()` 方法会按照一个可指定的**深度递归遍历数组**，并将所有元素与遍历到的子数组中的元素合并为一个**新数组**返回。

**语法：**

``` javascript
var newArray = arr.flat([depth])
```

**参数：**

* `depth` | 可选

  指定要提取嵌套数组的**结构深度**，默认值为 `1` 。如果传入 `Infinity` ，可展开**任意深度**的嵌套数组。

**返回值：**

一个包含将数组与子数组中所有元素的**新数组**。

**示例：**

``` javascript
const arr1 = [1, 2, [3, 4]];
arr1.flat(); // [1, 2, 3, 4]

const arr2 = [1, 2, [3, 4, [5, 6]]];
arr2.flat(); // [1, 2, 3, 4, [5, 6]]

const arr3 = [1, 2, [3, 4, [5, 6]]];
arr3.flat(2); // [1, 2, 3, 4, 5, 6]

//使用 Infinity，可展开任意深度的嵌套数组
const arr4 = [1, 2, [3, 4, [5, 6, [7, 8, [9, 10]]]]];
arr4.flat(Infinity); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// 扁平化与数组空项
const arr4 = [1, 2, , 4, 5];
arr4.flat(); // [1, 2, 4, 5]
```
