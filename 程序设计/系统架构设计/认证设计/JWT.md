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

`Header` 部分通常由两部分组成：**令牌类型**（即 `JWT` ）和所使用的**签名算法**(例如 `HMAC SHA256` 或 `RSA` )，实例如下：

```json
{
    "alg": "HS256",
    "typ": "JWT"
}
```

Header会被Base64Url编码为JWT的第一部分。即为：

```shell
$ echo  -n '{"alg":"HS256","typ":"JWT"}'|base64
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
```

### `Payload` 部分

`Payload` 是有关**实体**（通常是用户）和其他数据的声明，它包含**三部分**：

#### 注册声明

这些是一组预定义的 `权利要求` ，**不是强制性的**，而是**建议使用的**，以提供一组有用的可互操作的权利要求。其中一些是：

* `iss`（JWT的签发者）
* `exp`（expires, 到期时间）
* `sub`（主题）
* `aud`（JWT接收者）
* `iat`(issued at，签发时间)
* ……

> 注意：**声明名称都是三个字符**

#### 公开声明

公共的声明可以添加**任何的**信息，一般添加用户的相关信息或其他业务需要的必要信息，但不建议添加敏感信息，因为**该部分在客户端可解密**。

#### 私有声明

私有声明是提供者和消费者所共同定义的声明，一般不建议存放敏感信息，因为 `base64` 是**对称解密**的，意味着该部分信息可以归类为**明文信息**。

示例：

```json
{ "iat": 1593955943, 
  "exp": 1593955973, 
  "uid": 10, 
  "username": "test", 
  "scopes": [ "admin", "user" ] 
}
```

`Payload` 会被 `Base64Url` 编码为 `JWT` 的**第二部分**

```shell
$ echo -n '{"iat":1593955943,"exp":1593955973,"uid":10,"username":"test","scopes":["admin","user"]}'|base64
eyJ1c2VybmFtZSI6InRlc3QiLCJpYXQiOjE1OTM5NTU5NDMsInVpZCI6MTAsImV4cCI6MTU5Mzk1NTk3Mywic2NvcGVzIjpbImFkbWluIiwidXNlciJdfQ
```

> 注意：对于已签名的令牌，此信息尽管可以防止篡改，但任何人都可以读取。除非将其加密，否则**请勿将机密信息放入 `JWT` 的有效负载或报头元素中**。

### `Signature` 部分

`Signature` 部分的生成需要 `base64` 编码之后的 `Header` 、 `base64` 编码之后的 `Payload` 、密钥（ `secret` ）。 `Header` 需要指定签字的算法。

例如，如果要使用 `HMAC SHA256` 算法，则将通过以下方式创建签名：

```javascript
HMACSHA256(
    base64UrlEncode(header) + "." +
    base64UrlEncode(payload),
    secret)
```
