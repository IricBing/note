# `Docker Compose` 安装 `Gitlab` （基于 `Ubuntu 20.04` ）

```yml
version: '3.8'

gitlab:
  image: 'gitlab/gitlab-ce:latest'
  restart: always
  hostname: 'gitlab.example.com'
  environment:
    GITLAB_OMNIBUS_CONFIG: |
      external_url 'https://gitlab.example.com'
  ports:
    - '80:80'
    - '443:443'
    - '22:22'
  volumes:
    - /etc/localtime:/etc/localtime:ro
    - '/srv/gitlab/config:/etc/gitlab'
    - '/srv/gitlab/logs:/var/log/gitlab'
    - '/srv/gitlab/data:/var/opt/gitlab'
```

启动命令：

```shell
$ docker-compose up -d
```
