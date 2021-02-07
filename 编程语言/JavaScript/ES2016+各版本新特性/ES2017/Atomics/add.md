# ES2017 `Atomics.add()`

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Atomics/add)

`Atomics.add()` 静态方法会**将给定的值加到数组里的某个特定位置上，并返回该位置的旧值**。此原子操作保证在写上修改的值之前不会发生其他写操作。

## 语法

``` javascript
Atomics.add(typedArray, index, value)
```

**参数：**

* `typedArray`

  一个共享的整型 `typed array` 。例如 `Int8Array` ， `Uint8Array` ， `Int16Array` ， `Uint16Array` ， `Int32Array` ，或者 `Uint32Array` 。

* `index`

  在 `typedArray` 中的位置，该位置数值会被加总并更新。

* `value`

  增加的数字。

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

const old = Atomics.add(ta, 0, 12);
console.log(old) // 0
const now = Atomics.load(ta, 0);
console.log(now) // 12
```
