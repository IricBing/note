# `Docker` 安装 `Gitea`

这里直接采用docker-compose来安装即可，[官方文档](https://docs.gitea.io/en-us/install-with-docker/)

整理好的[docker-compose.yml](assets/images/docker-compose.yml)文件

```yml
version: "3"

networks:
  gitea:
    external: false

volumes:
  gitea:
    driver: local
  gitea-postgres:
    driver: local

services:
  server:
    image: gitea/gitea:1.14.2
    container_name: gitea
    environment:
      - USER_UID=1000
      - USER_GID=1000
      - GITEA__database__DB_TYPE=postgres
      - GITEA__database__HOST=db:5432
      - GITEA__database__NAME=gitea
      - GITEA__database__USER=gitea
      - GITEA__database__PASSWD=gitea
    restart: always
    networks:
      - gitea
    volumes:
      - gitea:/data
      - /etc/timezone:/etc/timezone:ro
      - /etc/localtime:/etc/localtime:ro
    ports:
      - "8000:3000"
      - "222:22"
    depends_on:
      - db

  db:
    image: postgres:13-alpine
    restart: always
    environment:
      - POSTGRES_USER=gitea
      - POSTGRES_PASSWORD=gitea
      - POSTGRES_DB=gitea
    networks:
      - gitea
    volumes:
      - gitea-postgres:/var/lib/postgresql/data
```
