# JavaScript ES2016 新特性

nodejs对于ES2016的支持可见 [node.green](https://node.green/#ES2016)

## 幂运算符

`**` 幂运算符，与 ` Math.pow()` 方法相同。

基础用法

``` javascript
console.log(2 ** 3) // 8
console.log(-(5 ** 2)) //-25
console.log((-5) ** 2) //25
```

赋值用法

``` javascript
let a = 2;
a **= 3;
console.log(a); // 8
```

## Array.prototype.includes()

新增数组 `includes()` 方法，用来判断一个数组是否包含一个指定的值，返回 `Boolean` 类型。

基础用法

``` javascript
[1, 2, 3].includes(1); // true
![1, 2, 3].includes(4); // true
![1, 2, 3].includes(1, 1); // true
[NaN].includes(NaN); // true
Array(1).includes(); // true
```

原型调用用法

``` javascript
let passed = 0;
const result = [].includes.call({
    get "0"() {
        passed = NaN;
        return 'foo';
    },
    get "11"() {
        passed += 1;
        return 0;
    },
    get "19"() {
        passed += 1;
        return 'foo';
    },
    get "21"() {
        passed = NaN;
        return 'foo';
    },
    get length() {
        passed += 1;
        return 24;
    }
}, 'foo', 6)
console.log(result) //  true
console.log(passed) // 3
```

`TypedArray` 用法

``` javascript
[Int8Array, Uint8Array, Uint8ClampedArray, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array]
.every(function(TypedArray) {
    console.log(new TypedArray([1, 2, 3]))
    console.log(new TypedArray([1, 2, 3]).includes(1)) //true
    console.log(!new TypedArray([1, 2, 3]).includes(4)) //true
    console.log(!new TypedArray([1, 2, 3]).includes(1, 1)) //true
    return true
})
```
