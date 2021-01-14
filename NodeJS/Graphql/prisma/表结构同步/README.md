# Prisma 表结构同步

## 直接同步

``` shell
$ npx prisma db push --preview-feature
```

这行命令会找 `./prisma/schema.prisma` 文件，并根据其内容来同步数据库的表结构。

## Migration方式

参考[官方文档](https://www.prisma.io/docs/concepts/components/prisma-migrate)，这里不做赘述（我们不用这种方式）
