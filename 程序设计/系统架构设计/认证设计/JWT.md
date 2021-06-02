# `JWT` 认证篇

## 起源

`JWT` 的全称是 `JSON Web Token` ，是一个开放标准（ [RFC 7519](https://datatracker.ietf.org/doc/html/rfc7519) ），它定义了一种**紧凑且自包含**的方式，以**JSON对象**的形式在各方之间安全地传输信息，特别适用于**分布式**站点的单点登录（ `SSO` ）场景。 `JWT` 的声明一般被用来在身份提供者和服务提供者间传递被认证的用户身份信息，以便于从资源服务器获取资源，也可以增加一些额外的其它业务逻辑所必须的声明信息，该 `token` 也可直接被用于认证，也可被加密。

> 思考：有些资料称：**JWT是目前最流行的跨域认证解决方案**，这个是为什么？

## `Token` 结构

`JWT` 的 `Token` 以紧凑形式的三部分构成，这三部分之间以 `.` （英文句号）来分割，格式为：

```
xxx.yyy.zzz
```

其中，第一部分（ `xxx` ）称为 `Header` ，第二部分（ `yyy` ）称为 `Payload` ，第三部分（ `zzz` ）称为 `Signature`

### `Header` 部分

参考网址：https://zhuanlan.zhihu.com/p/158186278?from_voters_page=true

### `Payload` 部分

### `Signature` 部分
