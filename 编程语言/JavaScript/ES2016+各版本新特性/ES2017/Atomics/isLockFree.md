# ES2017 `Atomics.isLockFree()`

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Atomics/isLockFree)

`注意：` 这是一个**实验中的功能**。

静态方法 `Atomics.isLockFree()` 用于**校验**是否能够使用原子操作的 `TypedArray` 的标准字节长度之一. 若该字节长度为可处理的 `TypedArray` 标准字节长度之一则返回 `true` 。

`TypedArray` 的标准字节长度参见 [BYTES_PER_ELEMENT](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/BYTES_PER_ELEMENT)

## 语法

``` javascript
Atomics.isLockFree(size)
```

**参数：**

* `size`

  整形。字节长度, 通常为[TypedArray. BYTES_PER_ELEMENT](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/BYTES_PER_ELEMENT)

**返回值：**

`Boolean` 是否为能够使用原子操作的 `TypedArray` 的标准字节长度之一。

## 示例

``` javascript
Atomics.isLockFree(1); // true
Atomics.isLockFree(2); // true
Atomics.isLockFree(3); // false
Atomics.isLockFree(4); // true
Atomics.isLockFree(5); // false
Atomics.isLockFree(6); // false
Atomics.isLockFree(7); // false
Atomics.isLockFree(8); // false
Atomics.isLockFree(Float64Array.BYTES_PER_ELEMENT); // false,Atomics方法无法处理Float64Array
```
