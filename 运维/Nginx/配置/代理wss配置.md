# Nginx 代理 wss 配置

**示例**

```nginx
map $http_upgrade $connection_upgrade {
    default upgrade;
    '' close;
}

server {
	listen 80;
	server_name xxx.xxx.cn;

	return 301 https://xxx.xxx.cn$request_uri;
}

server {
	listen 443 ssl;
	server_name xxx.xxx.cn;

	ssl_certificate /home/ubuntu/certs/xxx.xxx.cn/public.crt;
	ssl_certificate_key /home/ubuntu/certs/xxx.xxx.cn/private.key;
	
	location / {
		proxy_pass https://127.0.0.1:3000;
		proxy_set_header Host $host;
		proxy_set_header X-Real-IP $remote_addr;
		proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
		proxy_set_header HTTP_X_FORWARDED_FOR $remote_addr;
		proxy_set_header X-Forwarded-Proto $scheme;
		proxy_http_version 1.1;     #新增
		proxy_set_header Upgrade $http_upgrade;     #新增
		proxy_set_header Connection $connection_upgrade;       #新增
		proxy_redirect default;
    }
}
```

`说明：` 区别于普通反向代理的地方在于：

1. 增加 `map` 代码块
2. `location` 中标注 `新增` 部分

附件下载： 

[代理wss配置示例.conf](./assets/files/代理wss配置示例.conf)
