# ES2017 Trailing commas in function syntax 

函数语法中支持尾逗号（个人感觉，这个东西也就是方便了code review，其他的意义真的想不到）。不多说，很简单，写两个示例吧。

* **形参后加逗号**

``` javascript
function f(a, b, ) {}
```

* **实参后加逗号**

``` javascript
Math.min(1, 2, 3, )
```
