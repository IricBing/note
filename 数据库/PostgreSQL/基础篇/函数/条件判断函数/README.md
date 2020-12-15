# Postgresql 条件判断函数

**条件判断函数**亦称为**控制流程函数**，根据满足的条件而执行相应的流程。 在 `Postgresql` 中只有一种条件判断函数，为 `CASE` 函数

语法规则如下：

``` sql
CASE expr WHEN v1 THEN r1 [WHEN v2 THEN r2] [ELSE rn] END --语法一
CASE WHEN v1 THEN r1 [WHEN v2 THEN r2] [ELSE rn] END    --语法二
```

语法一表示：如果 `expr` 值等于某个 `vn` ，则返回对应位置 `THEN` 后面的结果；如果与所有值都不相等，则返回 `ELSE` 后面的 `rn` 。
语法二表示：某个 `vn` 值为 `TRUE` 时，返回对应位置 `THEN` 后面的结果；如果所有值都不为 `TRUE` ，则返回 `ELSE` 后的 `rn` 。

示例：

``` sql
$ SELECT CASE 2 WHEN 1 THEN 'one' WHEN 2 THEN 'two' ELSE 'more' END, CASE WHEN 1 < 0 THEN 'true' ELSE 'false' END;
```

执行结果：

|case(text)|case(text)|
|-----|-----|
| two  | false|
