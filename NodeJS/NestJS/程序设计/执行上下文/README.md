# `NestJS` 执行上下文

## 需求

随着系统的复杂性增加，我们很容易遇到一种场景，就是想要知道当前进行资源操作的究竟是谁。比如，系统中有超过一个用户拥有删除商品的权限，某一天突然发现有个商品被删除了（我们系统全部是软删除，这里以软删除举例），想要知道删除这个商品的究竟是谁。再比如，系统中有超过一个用户拥有发送系统通知的权限，追溯某一条通知是谁发的也是一样的道理。

上面这些案例如果系统日志和用户活动日志做的足够好的话，是可以达到目的的。但是有一些场景，系统日志和用户活动日志就无能为力了，比如本文所介绍的 `RBAC` 扩展场景。

## 方案调研

由于此部分篇幅过长，抽离到独立笔记：[方案调研](方案调研.md)

## 方案实现

不要跳过上一步直接看这个！根据需求来看是否需要这种方案！

### Step1. 安装依赖

``` shell
$ yarn add cls-hooked

$ yarn add -D @types/cls-hooked
```

### `Step2.` 构造请求上下文类—— `RequestContext`

在 `request.context.ts` 文件中写入如下内容：

``` typescript
import { getNamespace } from 'cls-hooked';
import { Request, Response } from 'express';
import { v4 as uuid } from 'uuid';
import { JwtPayload } from '../../user/interfaces/jwt-payload.interface';

export class RequestContext {
  public static nsid = uuid();

  public uuid: string;
  public request: Request;
  public response: Response;

  /**
   * 请求上下文构造函数
   * @param request 请求对象
   * @param response 返回对象
   */
  constructor(request: Request, response: Response) {
    this.uuid = uuid();
    this.request = request;
    this.response = response;
  }

  /**
   * 获取请求上下文
   * @returns 当前请求上下文
   */
  public static currentRequestContext(): RequestContext {
    const namespace = getNamespace(RequestContext.nsid);

    return namespace && namespace.active ? namespace.get(RequestContext.name) : null;
  }

  /**
   * 获取当前请求
   * @returns 当前请求
   */
  public static currentRequest(): Request {
    const requestContext = RequestContext.currentRequestContext();

    return requestContext?.request;
  }

  /**
   * 获取当前用户
   * @returns 当前用户
   */
  public static currentUser(): JwtPayload {
    const requestContext = RequestContext.currentRequestContext();

    return requestContext?.request?.user;
  }
}
```

> 提示：项目采用 `jwt` 的方式进行校验，将用户信息解密后挂载到 `Request` 请求中，所以在 `types.d.ts` 中扩展了 `express` 中的 `Request` 对象。当前操作用户可以通过 `express.Request.user` 来拿到。

### `Step3.` 编写中间件—— `RequestContextMiddleware`

在 `request-context.middleware.ts` 文件中写入如下内容：

``` typescript
import { NextFunction, Response, Request } from 'express';
import { RequestContext } from '../context/request.context';
import { getNamespace, createNamespace } from 'cls-hooked';

/**
 * 请求上下文中间件
 * @param req 请求参数
 * @param res 返回参数
 * @param next next函数
 */
export function RequestContextMiddleware(req: Request, res: Response, next: NextFunction) {
  const requestContext = new RequestContext(req, res);
  const namespace = getNamespace(RequestContext.nsid) || createNamespace(RequestContext.nsid);

  namespace.run(() => {
    namespace.set(RequestContext.name, requestContext);
    next();
  });
}
```

### `Step4.` 启用中间件

最简单的是**全局**启用中间件，在 `app.module.ts` 中进行如下配置：

``` typescript
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestContextMiddleware).forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
```

> 提示：启用这个中间件会**损耗性能**，全局启用并不合适，应该在需要的地方单独配置！比如，我们的场景在查询时不需要上下文功能，完全没有必要用 `RequestMethod.ALL` ，具体如何配置请结合自己的实际场景进行思考。
