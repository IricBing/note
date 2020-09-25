# Http Basic 认证篇

## 简介

这是一种最基本的认证方法。在这种认证方法下，用户 `每次发送请求时，请求头中都必须携带能通过认证的身份信息` 。

## 交互流程

``` mermaid
sequenceDiagram
    participant 客户端
    participant 服务器
    客户端 ->> 服务器: 发送未携带身份信息的请求
    服务器 -->> 客户端:  401 Unauthorized <br/> WWW-Authenticate: Basic
    loop 每次请求
        客户端 ->> 服务器: Authorization: Basic Base64(username:password)
        服务器 -->> 客户端:  200 OK 或 403 Forbidden
    end
```

## 优点

是简单，容易理解。

## 缺点

* `不安全：` 认证身份信息用明文传送，因此需结合 https 使用。
* `效率低：` 服务端处理请求时，每次都需要验证身份信息，如用户名和密码。
