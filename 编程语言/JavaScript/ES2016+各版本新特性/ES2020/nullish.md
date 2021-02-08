# ES2020 nullish（空值合并）运算符

在之前，我们通常会使用 `||` 来实现一些**假值**数据的默认赋值，但是很多情况下， `''` 、 `0` 、 `false` 这种是有具体含义的，不应该走默认赋值。这个工程经验丰富的，感触绝对颇深。

``` javascript
console.log(null ? ? 42) //42
console.log(null || 42) //42
console.log(undefined ? ? 42) //42
console.log(undefined || 42) //42
console.log(false ? ? 42) //false
console.log(false || 42) //42
console.log('' ? ? 42) //''
console.log('' || 42) //42
console.log(0 ? ? 42) //0
console.log(0 || 42) //42
console.log(NaN ? ? 42) //NaN
console.log(NaN || 42) //42
```
