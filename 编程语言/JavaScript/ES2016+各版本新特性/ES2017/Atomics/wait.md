# ES2017 `Atomics.wait()`

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Atomics/wait)

`注意:` 这项操作仅允许同一个共享内存的 `Int32Array` 配合使用并且无法运行在主线程中。

静态方法 `Atomics.wait()` 确保了一个在 `Int32Array` 数组中给定位置的值没有发生变化、仍然是给定的值时进程将会睡眠，直到被唤醒或超时。该方法返回一个字符串，值为 `"ok"` , `"not-equal"` , 或 `"timed-out"` 之一。

## 语法

``` javascript
Atomics.wait(typedArray, index, value[, timeout])
```

**参数：**

* `typedArray`

  一个共享内存的 `Uint32Array` 数组。

* `index`

  给定需要检测的 `typedArray` 数组的位置索引。

* `value`

  给定需要检测的位置索引的预期值。

* `timeout`(可选)

  超时前等待的**毫秒数**。 `Infinity` , 如未提供该参数，将为无穷大。

**返回值：**

一个 `String` 字符串，值为 `"ok"` , `"not-equal"` , 或 `"timed-out"` 三种之一。

**错误：**

* 如果参数 `typedArray` 不是一个共享内存的 `Int32Array` 数组，将会抛出一个 `TypeError` 。
* 如果 `index` 超出了 `typedArray` 的边界，则抛出 `RangeError`

## 示例

由于涉及到线程，js中写起来比较繁琐，敬请期待。
