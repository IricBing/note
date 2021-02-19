# `Python` 数据类型—— `Number` （数字）

`Python3` 支持 `int` 、 `float` 、 `bool` 、 `complex` （**复数**）。

在 `Python3` 里，只有一种整数类型 `int` ，表示为**长整型**，没有 `python2` 中的 `Long` 。

内置的 `type()` 函数可以用来**查询变量所指的对象类型**。

``` python
>>> a, b, c, d = 20, 5.5, True, 4+3j
>>> print(type(a), type(b), type(c), type(d))
<class 'int'> <class 'float'> <class 'bool'> <class 'complex'>
```

此外还可以用 `isinstance()` 方法来判断：

``` python
>>> a = 111
>>> isinstance(a, int)
True
```

> 在 `Python2` 中**没有布尔型**，用数字 `0` 表示 `False` ，数字 `1` 表示 `True` 。 `Python3` 把 `True` 和 `False` 定义成**关键字**，但他们的值还是 `1` 和 `0` ，它们可以和数字相加。
