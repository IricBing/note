# Postgresql 求余函数MOD(x, y)

`MOD(x, y)` 返回 `x` 被 `y` 除后的 `余数` 。 `MOD()` 对于**带有小数部分的数值也起作用**，返回除法运算后的**精确余数**。

示例：

``` sql
$ SELECT MOD(31,8), MOD(234,10), MOD(45.5,6);
```

执行结果：
|mod(integer)|mod(integer)|mod(numeric)|
|-----|-----|-----|
|7|4|3.5|
