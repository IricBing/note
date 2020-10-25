# 算法复杂度

## 时间复杂度

## 空间复杂度

## 大O表示法

* **O(1):** 常数复杂度 Constant Complexity 
* **O(log n):** 对数复杂度 Logarithmic Complexity
* **O(n):** 线性时间复杂度 Liner Complexity     （大部分算法的复杂度）
* **O(n^2):** N square Complexity 平方
* **O(n^3):** N square Complexity 立方
* **O(2^n):** Exponential Growth 指数
* **O(n!):** Factorial 阶乘

`注意：` 好几块代码合并在一起时，只看最高的复杂度运算

## 实例分析

* [斐波那契数列(Fibonacci)递归算法复杂度分析](斐波那契数列递归算法复杂度分析.md)

## 主定理（Master Theorem）

[百度百科](https://baike.baidu.com/item/%E4%B8%BB%E5%AE%9A%E7%90%86/3463232?fr=aladdin)

|算法|递推关系|复杂度|
|-----|-----|-----|
|二叉搜索|T(n)=T(n/2)+O(1)|O(log n)|
|二叉遍历|T(n)=2T(n/2)+O(1)|O(n)|
|最优排序矩阵搜索|T(n)=2T(n/2)+O(log n)|O(n)|
|归并排序|T(n)=2T(n/2)+O(n)|O(nlog n)|
