# Postgresql运算符篇

* [运算符优先级](运算符优先级.md)
* [算数运算符](算数运算符.md)
* [比较运算符](比较运算符.md)
* [逻辑运算符](逻辑运算符.md)
* [位操作运算符](位操作运算符.md)

## 概述

运算符是告诉Postgresql执行特定算术或逻辑操作的符号。Postgresql的内部运算符很丰富，主要有四大类，分别是 `算术运算符` 、 `比较运算符` 、 `逻辑运算符` 和 `位操作运算符` 。

## 算术运算符

用于各类数值运算，包括 `加（+）` 、 `减（-）` 、 `乘（*）` 、 `除（/）` 、 `求余/模运算（%）`

## 比较运算符

比较运算符用于比较运算，包括 `大于（>）` 、 `小于（<）` 、 `等于（=）` 、 `大于等于（>=）` 、 `小于等于（<=）` 、 `不等于（!=）` 以及 `IN` 、 `BETWEEN AND` 、 `GREATEST` 、 `LEAST` 、 `LIKE` 等。

## 逻辑运算

逻辑运算符的求值所得结果均为 `t(TRUE)` 、 `f(FALSE)` 。这类运算符有 `逻辑非（NOT）` 、 `逻辑与（AND）` 和 `逻辑或（OR）` 。

## 位操作运算符

参与位操作运算的操作数，按二进制位进行运算。位操作运算符包括： `位与（&）` 、 `位或（|）` 、 `位非（~）` 、 `位异或（^）` 、 `左移（<<）` 和 `右移（>>）`
