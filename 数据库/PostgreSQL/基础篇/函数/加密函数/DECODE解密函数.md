# Postgresql 解密函数 DECODE(crypt_str, pswd_str)

`DECODE(crypt_str, pswd_str)` 函数将 `pswd_str` 作为密码，解密加密字符串 `crypt_str` 。

示例：

``` sql
$ SELECT DECODE(ENCODE('123qwe','hex'),'hex');
```

执行结果：

|decode(bytea)|
|-----|
|[binary data]|
