# 分布式锁-redis单机实现

分布式锁的核心功能为—— `获取` 和 `释放` 。

分别来讲一下这两个功能的设计思想。

## 获取

顾名思义， `分布式锁` 的概念有两个核心—— `分布式` 和 `锁` ，既然是分布式，那么就会涉及到资源竞争、并发这些问题，**锁就是为了解决这些问题的方式**。

获取分布式锁，有两种结果—— `拿到锁` 以及 `锁被占用` ，锁的概念是同一时间只能被一个资源访问，那么也就是在并发获取锁的时候，只能有一个获取成功，其他均失败，直到这个资源释放掉锁或自动回收锁。

这个实现的核心是redis中 `set` 方法的 `mode` —— `NX` ，（PS：关于该功能的详细介绍请转至笔记：[Redis SET 命令](../../../数据库/Redis/基础篇/命令/SET.md)）

使用这个方式我们往redis中插入数据时，如果相同key，就会得到两种结果，一种是redis中没有数据，插入，然后返回 **"OK"**，一种是redis中已经有了这个key，返回**null**

这样就实现了资源竞争的时候只有一个请求能够拿到资源！

## 释放

释放这里就比获取要考虑的场景更多了一些，首先要避免 `死锁` ，这个很容想到实现方式：就是在 `set` 命令的时候设置**有效期**，redis默认支持。

接下来是拿到资源的线程主动释放这个锁。正常情况，拿到锁后执行任务，之后释放锁（删除redis中的数据）。正常情况很容易做，接下来考虑异常情况。

如果该线程执行的时间过长，**redis中的锁自动过期了，并且被其他线程重新获取了**，这个时候直接去释放锁是不合适的，因为释放掉了其他线程的锁！

所以，我们在释放锁的时候要先进行校验，校验是不是我们的锁——**通过获取value值来校验**

那么这时候就很清晰了，我们在设置锁的时候，value值不能相同，因为这样没法校验！一般可采用 `uuid` 的方式来生成value值。

## 代码实现

`nest.js` 实现示例：

``` typescript
import { Injectable, Inject } from '@nestjs/common';
import { RedisService } from 'nestjs-redis';
import { Redis, RedisLock } from '../constants/redis.constant';
import { ConfigService } from '../../config/services/config.service';
import { ConfigProvider } from '../../config/constants/config.constant';
import { v4 as uuid } from 'uuid';

@Injectable()
export class RedisLantService {
  constructor(
    @Inject(ConfigProvider)
    private readonly configService: ConfigService,
    private readonly redisService: RedisService
  ) {}

  /** 分布式锁 key-value map */
  private readonly lockMap: Map<RedisLock, string> = new Map();
  private readonly lockClient = this.redisService.getClient(this.configService.redis.lock.name);

  /**
   * 获取分布式锁
   * @param lock 分布式锁
   * @param expire 有效期，单位：毫秒
   */
  async getLock(lock: RedisLock, expire: number): Promise<boolean> {
    const value = uuid();
    const result = await this.lockClient.set(lock, value, 'PX', expire, 'NX');
    if (result) this.lockMap.set(lock, value);
    return !!result;
  }

  /**
   * 释放分布式锁
   * @param lock 分布式锁
   */
  async releaseLock(lock: RedisLock): Promise<boolean> {
    if (this.lockMap.get(lock) !== (await this.lockClient.get(lock))) return false;
    return !!(await this.lockClient.psetex(lock, 1, this.lockMap.get(lock)));
  }
}
```

## 进阶

很多情况下服务会集群部署，在集群部署的时候redis一般也会集群部署，上面的设计思路没有考虑到集群的特点，直接搬到集群中会出现异常，例如：集群发生故障转移导致锁丢了等场景，集群请转至笔记[分布式锁-redis集群实现](redis集群实现.md)
