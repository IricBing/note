# ES2018 Promise.prototype.finally()

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/finally)

`finally()` 方法返回一个 `Promise` 。在 `promise` 结束时，无论结果是 `fulfilled` 或者是 `rejected` ，都会执行指定的回调函数。

这为在 `Promise` 是否成功完成后都需要执行的代码提供了一种方式。

这避免了同样的语句需要在 `then()` 和 `catch()` 中各写一次的情况。

`注意:` 在 `finally` 回调中 `throw` （或**返回被拒绝的promise**）将以 `throw()` 指定的原因拒绝新的 `promise` 。

由于这个方法太过常见，应用示例不再赘述。
