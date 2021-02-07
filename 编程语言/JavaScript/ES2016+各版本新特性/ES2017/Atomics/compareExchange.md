# ES2017 `Atomics.compareExchange()`

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Atomics/compareExchange)

`注意：` 这是一个**实验中的功能**。

`Atomics.compareExchange()` 静态方法会在数组的值**与期望值相等**的时候，将给定的替换值替换掉数组上的值，然后**返回旧值**。此原子操作保证在写上修改的值之前不会发生其他写操作。

## 语法

``` javascript
Atomics.compareExchange(typedArray, index, expectedValue, replacementValue)
```

**参数：**

* `typedArray`

  一个共享的整型 `typed array` 。例如 `Int8Array` ， `Uint8Array` ， `Int16Array` ， `Uint16Array` ， `Int32Array` ，或者 `Uint32Array`

* `index`

  按位与操作的 `typedArray` 的值在数组上的**索引**

* `expectedValue`

  用于比较的值

* `replacementValue`

  将要替换上的值

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
ta[0] = 7;

const old = Atomics.compareExchange(ta, 0, 7, 12);
console.log(old) // 7
const now = Atomics.load(ta, 0);
console.log(now) // 12
```
