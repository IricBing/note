# Array.prototype.includes() 原型调用用法案例讲解

官方示例如下：

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

我们不妨先更改一下这个案例，加一下日志，更改如下

``` javascript
let passed = 0;
const result = [].includes.call({
    get "0"() {
        console.log(1);
        passed = NaN;
        return 'foo';
    },
    get "11"() {
        console.log(2);
        passed += 1;
        return 0;
    },
    get "21"() {
        console.log(4);
        passed = NaN;
        return 'foo';
    },
    get "19"() {
        console.log(3);
        passed += 1;
        return 'foo';
    },
    get length() {
        console.log(5);
        passed += 1;
        return 24;
    }
}, 'foo', 6)
console.log(result)
console.log(passed)
// 输出如下：
// 5
// 2
// 3
// true
// 3
```

那么，可以知道，最开始是调用了 `length` ，之后依次是 `11` , `19` , `21` 。

首先看一下 `call()` 方法的第二个参数 `'foo'` ，这个是用来匹配的，很好理解。主要是第三个参数 `6` ，这个参数是用来排序并按顺序迭代用的，可以看到并没有调用 `0` ，因为 `0` 比 `6` 小，然后按照**数字排序顺序**（不是属性定义顺序）来迭代查找 `foo` 值。可以尝试一下去掉参数 `6` 会得到什么样的结果，对比有参数时有何不同，加深理解。
