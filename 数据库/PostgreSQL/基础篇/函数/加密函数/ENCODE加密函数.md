# Postgresql 加密函数 ENCODE(str, pswd_str)

`ENCODE(str, pswd_str)` 函数使用 `pswd_str` 作为 `加密编码` 来加密 `str` 。常见的加密编码包括： `base64` 、 `hex` 和 `escape` 。

示例：

``` sql
$ SELECT ENCODE('123qwe','hex'), LENGTH(ENCODE('123qwe','hex'));
```

执行结果：

|encode(text)|length(integer)|
|-----|-----|
|313233717765 |     12|
