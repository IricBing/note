# Nginx 部署vue单页面

`核心思想：` 就是所有找不到资源的请求都转发到index.html页面上。

**示例：**

``` nginx
server {
	listen 80;
	server_name admin-device.lantsang.net;

	return 301 https://admin-device.lantsang.net$request_uri;
}

server {
	listen 443 ssl;
	server_name admin-device.lantsang.net;

	ssl_certificate /home/ubuntu/certs/T.lantsang.net/public.crt;
	ssl_certificate_key /home/ubuntu/certs/T.lantsang.net/private.key;
	
	root /home/ubuntu/code/iotmanagement/admin/dist;
	index index.html;

	location / {
		try_files $uri $uri/ /index.html;    #核心思想                   
	}
}
```

**说明：** `admin-device.lantsang.net` 为示例域名。

附件下载： 

[部署vue项目配置示例.conf](./assets/files/部署vue项目配置示例.conf)
