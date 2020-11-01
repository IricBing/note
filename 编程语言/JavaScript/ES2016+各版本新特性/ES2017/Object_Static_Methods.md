# ES2017 Object static methods

## Object.values()

``` javascript
var obj = Object.create({
    a: "qux",
    d: "qux"
});
obj.a = "foo";
obj.b = "bar";
obj.c = "baz";
var v = Object.values(obj);
console.log(v); //["foo", "bar", "baz"]
```

## Object.entries()

``` javascript
var obj = Object.create({
    a: "qux",
    d: "qux"
});
obj.a = "foo";
obj.b = "bar";
obj.c = "baz";
var e = Object.entries(obj);
console.log(e);

// (3) [Array(2), Array(2), Array(2)]
// 0: (2) ["a", "foo"]
// 1: (2) ["b", "bar"]
// 2: (2) ["c", "baz"]
// length: 3
```

## Object.getOwnPropertyDescriptors()

``` javascript
var object = {
    a: 1
};
var B = typeof Symbol === 'function' ? Symbol('b') : 'b';
object[B] = 2;
var O = Object.defineProperty(object, 'c', {
    value: 3
});
var D = Object.getOwnPropertyDescriptors(O);

console.log(object); // VM63:11 {a: 1, c: 3, Symbol(b): 2}
console.log(B); // Symbol(b)
console.log(O); // {a: 1, c: 3, Symbol(b): 2}
console.log(D);
// {a: {…}, c: {…}, Symbol(b): {…}}
// a: {value: 1, writable: true, enumerable: true, configurable: true}
// c: {value: 3, writable: false, enumerable: false, configurable: false}
// Symbol(b): {value: 2, writable: true, enumerable: true, configurable: true}
```

`注意：` 该方法不支持未定的描述符，如下所示：

``` javascript
var P = new Proxy({
    a: 1
}, {
    getOwnPropertyDescriptor: function(t, k) {}
});
console.log(Object.getOwnPropertyDescriptors(P).hasOwnProperty('a')); //false
```
