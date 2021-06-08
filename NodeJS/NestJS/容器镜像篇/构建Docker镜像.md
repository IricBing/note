# Nestjs 项目构建Docker镜像

`前提：` 参考笔记[nestjs 工程配置](../工程配置/README.md)添加Docker支持。

## 思想（yarn方式）

**Step1**

先将项目打包出 `dist` 文件夹。

**Step2**

基础镜像选择 `node:14.15.0-alpine` ，（ `注意：` 版本应该来自于项目的 `.nvmrc` 文件！）

并设置一些辅助配置，例如：时区、node可用内存等。

**Step3**

将 `dist` 文件夹， `package.json` 文件， `.env` 文件， `yarn.lock` 文件通过 `COPY` 指令拷贝到容器中的工程目录。

**Step4**

运行 `yarn install`

**Step5**

将 `.env` 文件中的环境变量写到 `Dockerfile` 文件中（PS：这是可选操作），按需修改其中的环境。

**Step6**

使用 `EXPOSE` 指令暴露端口。

**Step7**

使用 `CMD` 指令运行 `node dist/main.js`

完成！

## 完整文件

示例：（附件下载：[Dockerfile](assets/files/基础版Dockerfile)、[.dockerignore](assets/files/.dockerignore)）

```Dockerfile
FROM node:14.15.0-alpine

LABEL maintainer="Iric<iricbing@gmail.com>"

WORKDIR /app

# 设置时区
RUN echo "Asia/Shanghai" > /etc/timezone && ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime 

# 设置NODE最大可用内存
ENV NODE_OPTIONS=--max-old-space-size=6144

# 此处可以这样写的原因是在Dockerfile文件相同目录下有.dockerignore文件（类似于git提交时的gitignore文件）
COPY . .    

RUN yarn install

EXPOSE 3000

# 基础配置
ENV COMMON_JWT_EXPIRES_IN=7200000
ENV COMMON_PRINT_USER_ACTIVITY_LOG=false
ENV COMMON_PRINT_SYSTEM_LOG=false
ENV COMMON_ENABLE_SWAGGER=false
ENV COMMON_PASSWORD_SALT=AxJK4m+APM1QcU1eRzFdZ7
ENV COMMON_PORT=3000

# 微服务相关
ENV MICRO_GRPC_BIND=0.0.0.0
ENV MICRO_GRPC_PORT=3300
ENV MICRO_LOG_HOST=kunda-log    
ENV MICRO_LOG_PORT=3000

# 数据库相关
ENV DATABASE_TYPE=postgres
ENV DATABASE_HOST=kunda-postgresql
ENV DATABASE_PORT=5432
ENV DATABASE_USERNAME=postgres
ENV DATABASE_PASSWORD=p5tgb6tfc%^
ENV DATABASE_DATABASE=kunda
ENV DATABASE_SYNCHRONIZE=true
ENV DATABASE_LOGGING=false

# 用作token验证的redis数据库
ENV REDIS_TOKEN_NAME=token
ENV REDIS_TOKEN_DB=2
ENV REDIS_TOKEN_HOST=kunda-redis
ENV REDIS_TOKEN_PORT=6379
ENV REDIS_TOKEN_PASSWORD=
ENV REDIS_TOKEN_KEY_PREFIX=kunda-token-

# 用作分布式锁的redis数据库
ENV REDIS_LOCK_NAME=lock
ENV REDIS_LOCK_DB=3
ENV REDIS_LOCK_HOST=kunda-redis
ENV REDIS_LOCK_PORT=6379
ENV REDIS_LOCK_PASSWORD=
ENV REDIS_LOCK_KEY_PREFIX=kunda-lock-

ENV KAFKA_BROKER_LIST=[\"kunda-kafka:9092\"]

CMD ["node" ,"dist/main.js"]
```

`注意：` 其中的 `MICRO_LOG_HOST` 字段、 `DATABASE_HOST` 字段、 `REDIS_TOKEN_HOST` 字段等写的是**Docker网络中的容器名称**

`KAFKA_BROKER_LIST` 字段中的 `"` 需要使用 `\` 来标识。
