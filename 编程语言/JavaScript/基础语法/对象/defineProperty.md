# `Object.defineProperty()` 方法

[官方文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)

`Object.defineProperty()` 方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回此对象。

`注意：` 应当直接在 `Object` 构造器对象上调用此方法，而不是在任意一个 `Object` 类型的实例上调用。

## 语法

```javascript
Object.defineProperty(obj, prop, descriptor)
```

* 参数
  + **obj**  要定义属性的对象
  + **prop** 要定义或修改的属性的名称或 `Symbol`

  + **descriptor** 要定义或修改的属性描述符
* 返回值
  + 被传递给函数的对象。

 

> 在 `ES6` 中，由于 `Symbol` 类型的特殊性，用 `Symbol` 类型的值来做对象的 `key` 与常规的定义或修改不同，而 `Object.defineProperty` 是定义 `key` 为 `Symbol` 的属性的方法之一。

## 描述

该方法允许**精确地添加或修改对象的属性**。通过赋值操作添加的普通属性是**可枚举的**，在枚举对象属性时会被枚举到（ `for...in` 或 `Object.keys` 方法），可以改变这些属性的值，也可以删除这些属性。这个方法允许修改默认的额外选项（或配置）。默认情况下，使用 `Object.defineProperty()` 添加的属性值是不可修改 `（immutable）` 的。

对象里目前存在的属性描述符有两种主要形式：**数据描述符**和**存取描述符**。数据描述符是一个具有值的属性，该值可以是可写的，也可以是不可写的。存取描述符是由 `getter` 函数和 `setter ` 函数所描述的属性。一个描述符只能是这两者其中之一；不能同时是两者。

这两种描述符**都是对象**。它们**共享**以下可选键值（默认值是指在使用 `Object.defineProperty()` 定义属性时的默认值）：

### configurable 默认为false

当且仅当该属性的 `configurable` 键值为 `true` 时，该属性的描述符才能够被改变，同时该属性也能从对应的对象上被删除。

### enumerable 默认为false

当且仅当该属性的 `enumerable` 键值为 `true` 时，该属性才会出现在对象的枚举属性中。

### value 默认为undefined

该属性对应的值。可以是任何有效的 `JavaScript` 值（数值，对象，函数等）。

### writable 默认为false

当且仅当该属性的 `writable` 键值为 `true` 时，属性的值，也就是上面的 `value` ，才能被赋值运算符改变。

### get 默认为undefined

属性的 `getter` 函数，如果没有 `getter` ，则为 `undefined` 。当访问该属性时，会调用此函数。执行时不传入任何参数，但是会传入 `this` 对象（由于继承关系，这里的 `this` 并不一定是定义该属性的对象）。该函数的返回值会被用作属性的值。

### set 默认为undefined

属性的 `setter` 函数，如果没有 `setter` ，则为 `undefined` 。当属性值被修改时，会调用此函数。该方法接受一个参数（也就是被赋予的新值），会传入赋值时的 `this` 对象。

### 是否可拥有键值汇总

|描述符|configurable|enumerable|value|writable|get|set|
|-----|-----|-----|-----|-----|-----|-----|
|数据描述符|可以|可以|可以|可以|不可以|不可以|
|存取描述符|可以|可以|不可以|不可以|可以|可以|

如果一个描述符不具有 `value` 、 `writable` 、 `get` 和 `set` 中的任意一个键，那么它将被认为是一个**数据描述符**。如果一个描述符同时拥有 `value` 或 `writable` 和 `get` 或 `set` 键，则会产生一个**异常**。

记住，这些选项不一定是自身属性，也要考虑继承来的属性。为了确认保留这些默认值，在设置之前，可能要冻结 `Object.prototype` ，明确指定所有的选项，或者通过 `Object.create(null)` 将 `__proto__` 属性指向 `null` 。
