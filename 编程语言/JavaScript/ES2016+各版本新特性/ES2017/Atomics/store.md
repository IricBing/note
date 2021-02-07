# ES2017 `Atomics.store()`

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Atomics/store)

静态的 `Atomics.store()` 方法将给定的值**存储**在数组中的指定位置，并返回该值。

## 语法

``` javascript
Atomics.store(typedArray, index, value)
```

**参数：**

* `typedArray`

  一个共享的整型 `typed array` 。例如 `Int8Array` ， `Uint8Array` ， `Int16Array` ， `Uint16Array` ， `Int32Array` ，或者 `Uint32Array` 。

* `index`

  在 `typedArray` 中用来**存储value**的**位置**。

* `value`

  要存储的数字

**返回值：**

被存储的值

**错误：**

* 假如 `typedArray` 不是允许的整型之一，则抛出 `TypeError`
* 假如 `typedArray` 不是一个`shared typed array`类型，则抛出 `TypeError`
* 如果 `index` 超出了 `typedArray` 的边界，则抛出 `RangeError`

## 示例

``` javascript
const sab = new SharedArrayBuffer(1024);
const ta = new Uint8Array(sab);

const value = Atomics.store(ta, 0, 12);
console.log(value) // 12
```
