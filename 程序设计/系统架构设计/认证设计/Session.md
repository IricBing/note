# Session 认证篇

## 简介

这种认证方法结合了 Session 和 Cookie。服务端将本次会话信息以 Session 对象的形式保存在服务端的内存、数据库或文件系统中，并将对应的 Session 对象 ID 值 SessionID 以 Cookie 形式返回给客户端，SessionID 保存在客户端的 Cookie 中。

这是一种 `有状态的认证方法` ：服务端保存 Session 对象，客户端以 Cookie 形式保存 SessionID。

## 交互流程

``` mermaid
sequenceDiagram
    participant 客户端
    participant 服务器
    客户端 ->> 服务器: 登录（用户名+密码）
    服务器 ->> 服务器: 验证身份信息
    alt 通过
        服务器 ->> 服务器: 生成一个Session对象,保存
        服务器 -->> 客户端: SessionID
    else 未通过
        服务器 -->> 客户端: 400 Bad Request
    end
    客户端 ->> 客户端: 将SessionID保存到Cookie中
    loop 每次请求
        客户端 ->> 服务器: 请求头中携带 SessionID Cookie
        服务器 ->> 服务器: 从请求的 Cookie 中获取 SessionID<br/>并查询其对应的Session对象<br/>从而获得身份信息。
    end
    opt 客户端退出本次会话
        客户端 ->> 客户端: 删除Cookie中的SessionID
        服务器 ->> 服务器: 删除Session对象
    end
```

## 优点

* `较安全` ：客户端每次请求时无需发送身份信息，只需发送 SessionID。
* `较高效` ：服务端无需每次处理请求时都要验证身份信息，只需通过 SessionID 查询 Session 对象。

## 缺点

* `扩展性差` : Session 对象保存在服务端，如果是保存在多个服务器上，有一致性问题，如果保存在单个服务器上，无法适应用户增长。
* 基于 Cookie 的 SessionID `不能跨域共享` ，同一用户的多个客户端（如浏览器客户端和 APP）不能共享 SessionId。
* 基于 Cookie 的 SessionID `易被截获生成 CSRF 攻击` 。
