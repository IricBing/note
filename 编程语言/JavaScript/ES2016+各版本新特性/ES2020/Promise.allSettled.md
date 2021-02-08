# ES2020 Promise.allSettled()

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled)

`Promise.allSettled()` 方法返回一个在所有给定的 `promise` 都已经 `fulfilled` 或 `rejected` 后的 `promise` ，并带有一个**对象数组**，每个对象表示对应的 `promise` 结果。

**语法：**

``` javascript
Promise.allSettled(iterable);
```

**参数：**

* `iterable`

  一个**可迭代**的**对象**，例如 `Array` ，其中每个成员都是 `Promise` 。

**返回值：**

一旦所指定的 `promises` 集合中每一个 `promise` 已经完成，无论是成功的达成或被拒绝，未决议的 `Promise` 将被异步完成。那时，所返回的 `promise` 的处理器将传入一个数组作为输入，该数组包含原始 `promises` 集中每个 `promise` 的结果。

对于每个结果对象，都有一个 `status` 字符串。如果它的值为 `fulfilled` ，则结果对象上存在一个 `value` 。如果值为 `rejected` ，则存在一个 `reason` 。 `value` （或 `reason` ）反映了每个 `promise` 决议（或拒绝）的值。

**示例：**

``` javascript
const promise1 = Promise.resolve(3);
const promise2 = new Promise((resolve, reject) => setTimeout(reject, 100, 'foo'));
const promises = [promise1, promise2];

Promise.allSettled(promises).then((results) => results.forEach((result) => console.log(result.status)));

// expected output:
// "fulfilled"
// "rejected"
```
