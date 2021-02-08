# ES2020 `BigInt`

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/BigInt)

`BigInt` 是一种**内置对象**，它提供了一种方法来表示**大于** `2^53 - 1` 的整数。这原本是 `Javascript` 中可以用 `Number` 表示的**最大数字**。 `BigInt` 可以表示**任意大的整数**。

可以用在一个整数字面量后面加 `n` 的方式定义一个 `BigInt` ，如： `10n` ，或者调用函数 `BigInt()` 。

它在某些方面类似于 `Number` ，但是也有几个关键的**不同点**：

* 不能用于 `Math` 对象中的方法；
* 不能和任何 `Number` 实例混合运算，两者必须转换成同一种类型。
* 在两种类型来回转换时要小心，因为 `BigInt` 变量在转换成 `Number` 变量时可能会**丢失精度**。

这个细节比较多，详细内容请转至[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/BigInt)
