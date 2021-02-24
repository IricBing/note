# Postgresql单表查询——带 `IN` 关键字的查询

`IN` 操作符用来查询满足指定条件范围内的记录。使用 `IN` 操作符时，将所有检索条件用**括号**括起来，检索条件用**逗号**分隔开，只要满足条件范围内的一个值即为匹配项。

还可以与 `NOT` 关键字连用，表示**不在**所列条件里。

例如：查询所有年龄为 `12` 和 `24` 岁的用户

``` sql
SELECT id, name, age from users WHERE age IN (12,24);
SELECT id, name, age from users WHERE age NOT IN (12,24);
```
