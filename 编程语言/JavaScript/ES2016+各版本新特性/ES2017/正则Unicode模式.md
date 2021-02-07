# ES2017 正则 `Unicode` 模式

`JavaScript` 内部，字符以 `UTF-16` 的格式储存，每个字符固定为 `2` 个字节。对于那些需要 `4` 个字节储存的字符（ `Unicode` 码点大于 `0xFFFF` 的字符）， `JavaScript` 会认为它们是两**个字符**。

当一个正则表达式使用这个修饰符后， `4` 个字节长的字符将被正确地处理。同时也能够用上 `Unicode` 属性（ `Unicode property` ）来进行查找了。
