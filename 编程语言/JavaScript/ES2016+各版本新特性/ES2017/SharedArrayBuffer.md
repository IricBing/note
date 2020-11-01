# ES2017 SharedArrayBuffer

[MDN 文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer)

简单解释： `SharedArrayBuffer` 对象用来表示一个**通用的，固定长度的原始二进制数据缓冲区**，类似于 `ArrayBuffer` 对象，它们都可以用来在共享内存（shared memory）上创建视图。**与 ArrayBuffer 不同的是，SharedArrayBuffer 不能被分离。**

`注意：` 作为对[Spectre](https://meltdownattack.com/)的响应，**所有主流浏览器均默认于2018年1月5日禁用SharedArrayBuffer**。 Chrome在启用了网站隔离功能的平台上的[v67中重新启用](https://bugs.chromium.org/p/chromium/issues/detail?id=821270)了该功能，以防止出现Spectre风格的漏洞。

## 示例

``` javascript
const buffer = new SharedArrayBuffer(8);

console.log(buffer.byteLength); // 8
```

## 语法

> new SharedArrayBuffer(length)

**参数**

* length

所创建的数组缓冲区的大小，以字节(byte)为单位。

**返回值**

一个大小指定的新 `SharedArrayBuffer` 对象。**其内容被初始化为 0。**

## 作用

### 分配及共享内存

为了将一个 `SharedArrayBuffer` 对象从一个用户代理**共享**到另一个用户代理（另一个页面的主进程或者当前页面的一个 worker ）从而实现**共享内存**，我们需要运用 `postMessage` 和 `结构化克隆算法` （ [structured cloning](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm) ）。

结构化克隆算法接收被映射到一个新的 `SharedArrayBuffers` 对象上的 `SharedArrayBuffers` 对象与 `TypedArrays` 对象。在这两种映射下，这个新的 `SharedArrayBuffer` 对象会被传递到目标用户代理的接收函数上，导致在目标用户代理产生了一个新的私有 `SharedArrayBuffer` 对象（正如 ` ArrayBuffer` 一样）。然而，这两个 `SharedArrayBuffer` 对象指向的共享数据块其实是同一个，并且在某一代理中的一个块的副作用将最终导致另一个代理具有可见性。
