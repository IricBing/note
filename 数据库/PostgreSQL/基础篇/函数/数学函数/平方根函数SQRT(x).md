# Postgresql 平方根函数SQRT(x)

`SQRT(x)` 返回 `非负数x` 的**二次方根**。因为负数的平方根是虚数，Postgresql没有支持虚数，所以输入负数会抛出错误。

示例：

``` sql
$ SELECT SQRT(9), SQRT(40);
```

执行结果：
|sqrt(double precision)|sqrt(double precision)|
|-----|-----|
|3|6.32455532033676|
