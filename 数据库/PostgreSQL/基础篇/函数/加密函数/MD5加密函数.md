# 加密函数MD5(str)

`MD5(str)` 为字符串算出一个 `MD5 128比特检查和` 。该值以 `32` 位 `十六进制` 数字的二进制字符串形势返回，若参数为 `NULL` 则会返回 `NULL` 。

示例：

``` sql
$ SELECT MD5('123qwe'), MD5(NULL);
```

执行结果：

|md5(text)|md5(text)|
|-----|-----|
|46f94c8de14fb36680850768ff1b7f2a | [null]|
