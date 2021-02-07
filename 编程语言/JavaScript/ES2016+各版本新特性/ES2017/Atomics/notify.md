# ES2017 `Atomics.notify()`

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Atomics/load)

`注意：` 本操作仅在共享的 `Int32Array` 下可用。

静态方法 `Atomics.notify()` 提醒一些在等待队列中休眠的代理。

## 语法

``` javascript
Atomics.notify(typedArray, index, count)
```

**参数：**

* `typedArray`

  一个共享的 `Uint32Array` 。

* `index`

  在 `typedArray` 中要唤醒的目标索引。

* count

  要通知的正在休眠的代理的数量。默认是 `+Infinity` 。
  
**返回值：**

被唤醒的代理的数量。

**错误：**

* 若 `typedArray` 不是共享的 `Int32Array`，则抛出一个 `TypeError` 异常。
* 如果 `index` 超出了 `typedArray` 的边界，则抛出 `RangeError`

## 示例

由于涉及到线程，js中写起来比较繁琐，敬请期待。
