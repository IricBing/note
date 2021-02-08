# ES2019 `Object.fromEntries()`

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/fromEntries)

`Object.fromEntries()` 方法把键值对列表转换为一个对象。

`Object.fromEntries() ` 方法接收一个键值对的列表参数，并返回一个**带有这些键值对的新对象**。这个迭代参数应该是一个能够实现 `@@iterator` 方法的的对象，返回一个迭代器对象。它生成一个具有两个元素的类数组的对象，第一个元素是**将用作属性键的值**，第二个元素是**与该属性键关联的值**。

`Object.fromEntries()` 执行与 `Object.entries()` **互逆**的操作。

**语法：**

``` javascript
Object.fromEntries(iterable);
```

**参数：**

* `iterable`

  类似 `Array` 、 `Map` 或者其它实现了可迭代协议的 `可迭代对象` 。

**返回值：**

一个由该迭代对象条目提供对应属性的新对象。

## 示例

### `Map` 转化为 `Object`

``` javascript
const map = new Map([
    ['foo', 'bar'],
    ['baz', 42]
]);
const obj = Object.fromEntries(map);
console.log(obj); // { foo: "bar", baz: 42 }
```

### `Array` 转化为 `Object`

``` javascript
const arr = [
    ['0', 'a'],
    ['1', 'b'],
    ['2', 'c']
];
const obj = Object.fromEntries(arr);
console.log(obj); // { 0: "a", 1: "b", 2: "c" }
```

### 对象转换

``` javascript
const object1 = {
    a: 1,
    b: 2,
    c: 3
};

const object2 = Object.fromEntries(
    Object.entries(object1)
    .map(([key, val]) => [key, val * 2])
);

console.log(object2);
// { a: 2, b: 4, c: 6 }
```
