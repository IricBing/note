# ES2017 String padding

## String.prototype.padStart

[MDN 文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/padStart)

简单解释： `padStart()` 方法用另一个字符串填充当前字符串(如果需要的话，会重复多次)，以便产生的字符串达到给定的长度。从当前字符串的左侧开始填充。

**语法：**

> str.padStart(targetLength [, padString])

**参数**

* `targetLength`

当前字符串需要填充到的目标长度。如果这个数值小于当前字符串的长度，则返回当前字符串本身。

* `padString` | **可选**

填充字符串。如果字符串太长，使填充后的字符串长度超过了目标长度，则只保留最左侧的部分，其他部分会被截断。此参数的缺省值为 " "（U+0020）。

``` javascript
console.log('hello'.padStart(10)) // '     hello'
console.log('hello'.padStart(10, '1234')) // '12341hello'
console.log('hello'.padStart()) //'hello'
console.log('hello'.padStart(6, '123')) //'1hello'
console.log('hello'.padStart(3)) // 'hello'
console.log('hello'.padStart(3, '123')) // 'hello'
```

## String.prototype.padEnd

[MDN 文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/padEnd)

简单解释： `padEnd()` 方法会用一个字符串填充当前字符串（如果需要的话则重复填充），返回填充后达到指定长度的字符串。从当前字符串的末尾（右侧）开始填充。

**语法：**

> str.padEnd(targetLength [, padString])

**参数**

* `targetLength`

当前字符串需要填充到的目标长度。如果这个数值小于当前字符串的长度，则返回当前字符串本身。

* `padString` | **可选**

填充字符串。如果字符串太长，使填充后的字符串长度超过了目标长度，则只保留最左侧的部分，其他部分会被截断。此参数的缺省值为 " "（U+0020）。

``` javascript
console.log('hello'.padEnd(10)) // 'hello     '
console.log('hello'.padEnd(10, '1234')) //'hello12341'
console.log('hello'.padEnd()) // 'hello'
console.log('hello'.padEnd(6, '123')) // 'hello1'
console.log('hello'.padEnd(3)) // 'hello'
console.log('hello'.padEnd(3, '123')) // 'hello'
```
