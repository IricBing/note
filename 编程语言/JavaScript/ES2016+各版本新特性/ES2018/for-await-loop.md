# ES2018 `for await` 循环

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for-await...of)

`for await...of` 语句创建一个循环，该循环遍历异步可迭代对象以及同步可迭代对象，包括: 内置的 `String` , `Array` ，类似数组对象 (例如 `arguments` 或 `NodeList` )， `TypedArray` , `Map` , `Set` 和用户定义的异步/同步迭代器。它使用对象的每个不同属性的值调用要执行的语句来调用自定义迭代钩子。

类似于 `await` 运算符一样，该语句只能在一个 `async function` 内部使用。

`注意：`  `for await...of` **不适用**于不是异步可迭代的异步迭代器。

**语法：**

``` javascript
for await (variable of iterable) {
    statement
}
```

* `variable`

  在每次迭代中，将不同属性的值分配给变量。变量有可能以 `const` , `let` , 或者 `var` 来声明。

* `iterable`

  被迭代枚举其属性的对象。与 `for...of` 相比，这里的对象可以返回 `Promise` ，如果是这样，那么 `variable` 将是 `Promise` 所包含的值，否则是值本身。

**示例一：**(迭代异步可迭代对象)

``` javascript
var asyncIterable = {
    [Symbol.asyncIterator]() {
        return {
            i: 0,
            next() {
                if (this.i < 3) {
                    return Promise.resolve({
                        value: this.i++,
                        done: false
                    });
                }

                return Promise.resolve({
                    done: true
                });
            }
        };
    }
};

(async function() {
    for await (num of asyncIterable) {
        console.log(num);
    }
})();

// 0
// 1
// 2
```

**示例二：**（迭代异步生成器 ）

``` javascript
async function* asyncGenerator() {
    var i = 0;
    while (i < 3) {
        yield i++;
    }
}

(async function() {
    for await (num of asyncGenerator()) {
        console.log(num);
    }
})();
// 0
// 1
// 2
```
