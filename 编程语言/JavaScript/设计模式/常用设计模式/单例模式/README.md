# JavaScript 单例设计模式

## 定义

单例模式的定义是： `保证一个类仅有一个实例，并且提供一个访问它的全局访问点。`

## 简单实现

要实现一个标准的单例模式并不复杂，核心思想就是**用一个变量来标志当前是否已经为某个类创建过对象**，如果是，则在下一次获取该类的实例时，直接返回之前创建的对象。

``` javascript
const Singleton = function(name) {
    this.name = name;
}

Singleton.prototype.getName = function() {
    console.log(this.name);
}

Singleton.getInstance = (function() {
    let instance = null;
    return function(name) {
        if (!instance) {
            instance = new Singleton(name);
        }
        return instance;
    }
})()

const instance1 = new Singleton.getInstance('hello');
const instance2 = new Singleton.getInstance('word');

instance1.getName(); // hello
instance2.getName(); //hello
console.log(instance1 === instance2); //true
```

这种方式实现最简单，也最能想到，只需利用**闭包**的特性就能能容易的实现单例模式。但有一个问题，就是增加了这个类的**不透明性**，使用者必须知道 `Singleton` 是一个单例类，跟以往通过 `new XXX` 的方式写法上不同，**可读性不好**。

## 优化——透明的单例模式

``` javascript
const Singleton = (function() {
    let instance;
    return function(name) {
        if (instance) {
            return instance;
        }
        this.name = name;
        return instance = this;
    }
})();

const instance1 = new Singleton('hello');
const instance2 = new Singleton('word');

console.log(instance1.name); // hello
console.log(instance2.name); // hello
console.log(instance1 === instance2); //true
```

这下就和正常的写法一样了，可以愉快的使用 `new Singleton()` 写法来创建单例模式了！

## 重点——惰性单例

惰性单例是指**在需要的时候才创建对象实例**。惰性单例是单例模式的重点，这种技术在实际开发中非常有用。（用脑子想一想也知道啊，毕竟省资源嘛!）

上面介绍的两种实际上都是惰性单例，只有在使用 `new` 的时候才会创建实例，那似乎会有一个疑问？惰性单例又很好，写起来又简单，那为什么还单独提出来，画上重点？没有必要为了炫技去写非惰性单例吧？带着问题往下看！

## 语言特点

上面提到的两种单例模式的实现，更多的是接近传统面向对象语言的实现，毕竟 `设计模式起源于Java` ，看的也习惯了。但是JavaScript其实是一门 `无类` 的语言，也正是因为如此，在这里可以反本溯源，从核心思想开始走不同的设计道路。

单例模式的核心是:**确保只有一个实例，并提供全局访问。**

那么是不是很容想到一个东西？对，就是JavaScript中的**全局变量**，前端的 `window` 对象，nodejs中的 `global` 对象，不正是单例模式的天然实现吗？事实上也确实是如此。

但是全局变量存在很多问题，它很容易造成**命名空间污染**，在大中型项目中，如果不加以限制和管理，很可能出现同名的全局变量导致变量冲突的问题。在很多node框架中，无论是前台还是后台，都不建议使用全局变量，因此这里也不过多赘述如何优化全局变量这种单例模式了，可以看一下笔记：[命名空间优化全局变量](命名空间优化全局变量.md)
