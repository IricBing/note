# ES2017 `Atomics.exchange()`

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Atomics/exchange)

`注意：` 这是一个**实验中的功能**。

`Atomics.exchange()` 静态方法会用给定的值**替换**掉数组上的值，然后返回数组的**旧值**。此原子操作保证在写上修改的值之前不会发生其他写操作。

## 语法

``` javascript
Atomics.exchange(typedArray, index, value)
```

**参数：**

* `typedArray`

  一个共享的整型 `typed array` 。例如 `Int8Array` ， `Uint8Array` ， `Int16Array` ， `Uint16Array` ， `Int32Array` ，或者 `Uint32Array`

* `index`

  被替换的 `typedArray` 值的**索引**

* `value`

  去替换的值

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

const old = Atomics.exchange(ta, 0, 12);
console.log(old) // 0
const now = Atomics.load(ta, 0);
console.log(now) // 12
```
