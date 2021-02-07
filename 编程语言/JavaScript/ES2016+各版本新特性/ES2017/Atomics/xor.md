# ES2017 `Atomics.xor()`

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Atomics/xor)

`Atomics.xor()` 静态方法会在数组中给定位置进行一次**按位异或**操作，并返回该位置的**旧值**。这个原子操作保证在修改后的值被写回之前不会发生其他写操作。

## 语法

``` javascript
Atomics.xor(typedArray, index, value)
```

**参数：**

* `typedArray`

  一个共享的整型 `typed array` 。例如 `Int8Array` ， `Uint8Array` ， `Int16Array` ， `Uint16Array` ， `Int32Array` ，或者 `Uint32Array` 。

* `index`

  在 `typedArray` 中需要进行按位异或的索引位置。

* `value`

  要进行按位异或的数字。

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
ta[0] = 5;

const old = Atomics.add(ta, 0, 12);
console.xor(old) // 5
const now = Atomics.load(ta, 0);
console.log(now) // 4
```
