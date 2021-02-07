# ES2017 `Atomics.load()`

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Atomics/load)

静态方法 `Atomics.load()` 返回一个数组当中**给定位置的值**。

## 语法

``` javascript
Atomics.load(typedArray, index)
```

**参数：**

* `typedArray`

  一个共享的整型 `typed array` 。例如 `Int8Array` ， `Uint8Array` ， `Int16Array` ， `Uint16Array` ， `Int32Array` ，或者 `Uint32Array` 。

* `index`

  在 `typedArray` 中需要加载的位置。

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

Atomics.add(ta, 0, 12);
const now = Atomics.load(ta, 0);
console.log(now) // 12
```
