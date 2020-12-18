# NestJS 原理探究——依赖注入

为了更好的理解这篇笔记，请看一下前导笔记：[IoC](../../../../程序设计/架构思想/Ioc/README.md)、[DI](../../../../程序设计/架构思想/DI/README.md)、[DI手写实现](../../../../程序设计/架构思想/DI/手写实现.md)——必读！

从简单的点开始入手，在[手写实现](../../../../程序设计/架构思想/DI/手写实现.md)项目的设计就是以 `nestjs` 为蓝版，因此很多命名都和 `nestjs` 源码中的命名一致。首先开最简单的修饰符， `@Injectable` 和 `@Inject` 。

这两个修饰符的源码文件路径为： 

 `packages/common/decorators/core/injectable.decorator.ts`

`packages/common/decorators/core/inject.decorator.ts` 。

## @Injectable 修饰符实现

看一下 `inject.decorator.ts` 中的源码实现，（已删除注释，后续源码也全部删除注释）

``` typescript
import { v4 as uuid } from 'uuid';
import { SCOPE_OPTIONS_METADATA } from '../../constants';
import { ScopeOptions } from '../../interfaces/scope-options.interface';
import { Type } from '../../interfaces/type.interface';

export type InjectableOptions = ScopeOptions;

export function Injectable(options?: InjectableOptions): ClassDecorator {
  return (target: object) => {
    Reflect.defineMetadata(SCOPE_OPTIONS_METADATA, options, target);
  };
}

export function mixin(mixinClass: Type<any>) {
  Object.defineProperty(mixinClass, 'name', {
    value: uuid(),
  });
  Injectable()(mixinClass);
  return mixinClass;
}
```

对比一下手写实现中的源码

``` typescript
import { Type } from "./type";
import "reflect-metadata";

const INJECTABLE_METADATA_KEY = Symbol("INJECTABLE_KEY");

export function Injectable() {
  return function(target: any) {
    Reflect.defineMetadata(INJECTABLE_METADATA_KEY, true, target);
    return target;
  };
}

export function isInjectable<T>(target: Type<T>) {
  return Reflect.getMetadata(INJECTABLE_METADATA_KEY, target) === true;
}
```

可以发现，在核心代码实现上仅仅比我们多了一个 `options` 参数，我们默认使用 `true` ，它提供了可配置参数。通过源码的注释，可以发现，这个是用来标识**注入作用域**的。源码注释为：**Defines the injection scope.** 连接地址为：https://docs.nestjs.com/fundamentals/injection-scopes， 打开连接地址，发现即为官方的**FUNDAMENTALS-> Injection scopes**文档，通过编辑器前往类型定义位置，也可查看到这个 `type` 的源码为：

``` typescript
export enum Scope {
  DEFAULT,
  TRANSIENT,
  REQUEST,
}

export interface ScopeOptions 
  scope?: Scope;
}
```

结合源码可以很容易的读懂**注入作用域**这个功能。

`mixin()` 方法用作**混入**，这个之后再讲解。

## @Inject 修饰符实现

先看一下 `inject.decorator.ts` 文件中的源码实现：

``` typescript
import {
  PROPERTY_DEPS_METADATA,
  SELF_DECLARED_DEPS_METADATA,
} from '../../constants';
import { isFunction, isUndefined } from '../../utils/shared.utils';

export function Inject<T = any>(token?: T) {
  return (target: object, key: string | symbol, index?: number) => {
    token = token || Reflect.getMetadata('design:type', target, key);
    const type =
      token && isFunction(token) ? ((token as any) as Function).name : token;

    if (!isUndefined(index)) {
      let dependencies =
        Reflect.getMetadata(SELF_DECLARED_DEPS_METADATA, target) || [];

      dependencies = [...dependencies, { index, param: type }];
      Reflect.defineMetadata(SELF_DECLARED_DEPS_METADATA, dependencies, target);
      return;
    }
    let properties =
      Reflect.getMetadata(PROPERTY_DEPS_METADATA, target.constructor) || [];

    properties = [...properties, { key, type }];
    Reflect.defineMetadata(
      PROPERTY_DEPS_METADATA,
      properties,
      target.constructor,
    );
  };
}
```

对比手写的实现:

``` typescript
import { Token } from './provider';
import 'reflect-metadata';

const INJECT_METADATA_KEY = Symbol('INJECT_KEY');

export function Inject(token: Token<any>) {
  return function(target: any, _: string | symbol, index: number) {
    Reflect.defineMetadata(INJECT_METADATA_KEY, token, target, `index-${index}`);
    return target;
  };
}

export function getInjectionToken(target: any, index: number) {
  return Reflect.getMetadata(INJECT_METADATA_KEY, target, `index-${index}`) as Token<any> | undefined;
}
```

可以看到， `nestjs` 对于 `@Inject` 修饰符的实现比我们复杂多了。首先，两个方法的传参不一样，我们手写实现的时候是固定死了，必须是 `Token` 类型（这个类型是自己封装的，具体内容查看示例代码），而源码中这里是可选类型，还是任意可选类型！

源码首先判断一下 `token` 是否有值，如果没有就通过反射从元数据中获取，默认 `key` 为 `'design:type'` 。

接下来实际上是获取这个 `token` 的标识（虽然代码中变量名叫 `type` ），如果是函数类型，那么就以**函数名**作为标识，否则就以**token本身**作为标识。

接下来的 `if` 判断的是依赖注入到了那里，是**本身**，还是**继承的父类(原型链上)**。如果 `!isUndefined(index)` 为真值，那么表示在自己的构造函数中注入的（PS：这里的语法是[装饰器工厂](../../../../编程语言/TypeScript/基础篇/装饰器/装饰器工厂与组合.md)）。既然是在自己的构造函数中注入了，那么先获取一下已经存入到 `metadata` 中的依赖项，然后将本次的依赖插入到数组中，之后重新放到元数据中。并返回，结束函数执行。最后自身注入的依赖格式为：

``` typescript
[
    {
        index: 0,
        param: Symbol('configProvider')
    },
    {
        index: 1,
        param: Symbol('httpClient')
    }
    ……
]
```

如果注入来自**继承的父类(原型链上)**，那么就先获取父类的依赖列表，之后将本次依赖项插入到列表中，更新元数据中的信息。最后的信息格式为：

``` typescript
[
    {
        key: 'configService',
        type: Symbol('configProvider')
    }
    {
        key: 'httpClient',
        type: Symbol('httpClient')
    }
    ……
]
```

这个时候再来回顾自己的实现，发现我们只实现了来自自身构造函数中的注入，并没有实现继承功能，同时对于 `Token` 的类型也支持的不够全面。

## Provider 类型

该类型的声明在 `packages/common/interfaces/modules/provider.interface.ts` 。

源码如下：

``` typescript
import { Abstract } from '../abstract.interface';
import { Scope } from '../scope-options.interface';
import { Type } from '../type.interface';

export type Provider<T = any> =
  | Type<any>
  | ClassProvider<T>
  | ValueProvider<T>
  | FactoryProvider<T>
  | ExistingProvider<T>;

export interface ClassProvider<T = any> {
  provide: string | symbol | Type<any> | Abstract<any> | Function;
  useClass: Type<T>;
  scope?: Scope;
}

export interface ValueProvider<T = any> {
  provide: string | symbol | Type<any> | Abstract<any> | Function;
  useValue: T;
}

export interface FactoryProvider<T = any> {
  provide: string | symbol | Type<any> | Abstract<any> | Function;
  useFactory: (...args: any[]) => T;
  inject?: Array<Type<any> | string | symbol | Abstract<any> | Function>;
  scope?: Scope;
}

export interface ExistingProvider<T = any> {
  provide: string | symbol | Type<any> | Abstract<any> | Function;
  useExisting: any;
}
```
