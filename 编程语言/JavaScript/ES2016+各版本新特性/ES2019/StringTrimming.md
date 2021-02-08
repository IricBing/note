# ES2019 string trimming

`trimStart()` 方法从字符串的开头删除空格。 `trimLeft()` 是此方法的别名。

`trimStart() / trimLeft()` 方法移除原字符串**左端**的连续空白符并返回一个新字符串，并**不会直接修改原字符串本身**。

`trimEnd()` 方法从一个字符串的末端移除空白字符。 `trimRight()` 是这个方法的别名。

`trimEnd() / trimRight()` 方法移除原字符串**右端**的连续空白符并返回一个新字符串，并**不会直接修改原字符串本身**。

**示例：**

``` javascript
const str = "   foo  ";

console.log(str.length); // 8

const trimStart = str.trimStart() // 等同于 str = str.trimLeft();
console.log(trimStart.length); // 5
console.log(trimStart); // "foo  "

const trimEnd = str.trimRight(); // 或写成str = str.trimEnd();
console.log(trimEnd.length); // 6
console.log(trimEnd); // '   foo'
```
