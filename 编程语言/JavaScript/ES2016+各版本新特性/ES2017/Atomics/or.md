# ES2017 `Atomics.or()`

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Atomics/or)

静态方法 `Atomics.or()` 用数组中指定位置的值进行一次**按位或运算**，并返回未计算时数组中指定位置处的值。这个 `atomic` 操作保证了在修改后的值被写回之前没有其它的写入操作发生。

## 语法

``` javascript
Atomics.or(typedArray, index, value)
```

**参数：**

* `typedArray`

  一个共享的整型 `typed array` 。例如 `Int8Array` ， `Uint8Array` ， `Int16Array` ， `Uint16Array` ， `Int32Array` ，或者 `Uint32Array` 。

* `index`

  在 `typedArray` 中要进行按位或运算的索引。

* `value`

  要进行按位或运算的数

**返回值：**

给定位置的**旧值**（ `typedArray[index]` ）。

**错误：**

* 假如 `typedArray` 不是允许的整型之一，则抛出 `TypeError`
* 假如 `typedArray` 不是一个`shared typed array`类型，则抛出 `TypeError`
* 如果 `index` 超出了 `typedArray` 的边界，则抛出 `RangeError`

## 示例

``` javascript
const sab = new SharedArrayBuffer(1024);
const ta = new Uint8Array(sab);
ta[0] = 2;

const old = Atomics.add(ta, 0, 1);
console.log(old) // 2
const now = Atomics.load(ta, 0);
console.log(now) // 3
```
