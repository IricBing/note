# ES2018 Object展开符

非常常用，就不做过多赘述。看示例：

``` javascript
const {
    a,
    ...rest
} = {
    a: 1,
    b: 2,
    c: 3
};
console.log(a) // 1
console.log(rest) // { b: 2, c: 3 }

const spread = {
    b: 2,
    c: 3
};
const value = {
    a: 1,
    ...spread
};
console.log(value) // { a: 1, b: 2, c: 3 }
```
