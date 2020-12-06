# Postgresql 绝对值函数ABS(x)

`ABS(x)` 返回 `x` 的**绝对值**。

示例：

``` sql
$ SELECT ABS(2), ABS(-3.3), ABS(-33);
```

执行结果：
|abs(integer)|abs(integer)|abs(integer)|
|-----|-----|-----|
|2|3.3|33|
