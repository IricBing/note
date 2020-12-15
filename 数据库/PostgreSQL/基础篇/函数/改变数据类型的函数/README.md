# Postgresql 改变数据类型的函数

`CAST(x AS type)` 函数将一个类型的值转化为另一个类型的值。

示例：

``` sql
$ SELECT CAST(100 AS CHAR(2));
```

执行结果：
|bpchar(character(2))|
|-----|
|10|
