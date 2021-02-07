# ES2018 RegExp.prototype.dotAll

`JavaScript` 正则表达式中点（ `.` ）是一个**特殊字符**，它可以匹配**除了一下条件的任意字符**。

* 四个字节的UTF-16字符
* 换行符（\n）
* 回车符（\r）
* 行分隔符
* 段分隔符

为了使点（ `.` ）可以匹配任意字符， `ES2018` 引入新的修饰符 `s` 。这种模式被称为 `dotAll` 模式，根据字面意思便是**dot（.）**匹配一切字符。

示例：

``` javascript
console.log(/mazey.happy/.test('mazey\nhappy')); // false
console.log(/mazey.happy/s.test('mazey\nhappy')); // true
```
