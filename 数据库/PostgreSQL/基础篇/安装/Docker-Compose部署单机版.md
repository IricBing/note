# Docker Compose 部署 Postgresql 单机版 （含有pgadmin）

## Step1. 创建docker-compose.yml文件

``` yml
version: '3'
services:
  postgres:
    image: postgres
    restart: always
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: p5tgb6tfc%^
      POSTGRES_DB: iot
    ports:

      - '5432:5432'

    volumes:

      - $PWD/pg-data:/var/lib/postgresql/data

    container_name: postgresql

  pgadmin:
    image: dpage/pgadmin4:latest
    restart: always
    environment: 
      PGADMIN_DEFAULT_EMAIL: iricbing@gmail.com
      PGADMIN_DEFAULT_PASSWORD: p5tgb6tfc%^ 
    ports:

      - "5433:80"

    container_name: pgadmin
```

## Step2. 启动服务

``` shell
$ docker-compose up -d 
```

**附件**

具体配置文件：[docker-compose.yml](assets/files/docker-compose.yml) <br />
