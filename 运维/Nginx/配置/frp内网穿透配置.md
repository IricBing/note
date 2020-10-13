# Nginx frp内网穿透配置

`核心思想：` 和反向代理一样的思想，就是将请求转发到frp监听的端口上，但是需要注意一点： `frp也通过域名来区分入口` ，所以**在配置的时候一定要将远端访问域名也转过去！**

**示例**

``` nginx
server {
	listen 80;
	server_name ~^(?<serial>.+)-locate.virtualbing.cn$;

	return 301 https://$serial-locate.virtualbing.cn$request_uri;
}

server {
	listen 443;
	server_name ~^(?<serial>.+)-locate.virtualbing.cn$;

	ssl_certificate /home/ubuntu/certs/T.virtualbing.cn/public.crt;
	ssl_certificate_key /home/ubuntu/certs/T.virtualbing.cn/private.key;

	location / {
		proxy_pass http://127.0.0.1:10080;
		proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header REMOTE-HOST $remote_addr;                       
	}
}
```

`说明：` 这里用到了 `泛域名` 配置的知识，具体可[查看](泛域名配置.md)

附件下载： 

[frp内网穿透配置示例.conf](./assets/files/frp内网穿透配置示例.conf)