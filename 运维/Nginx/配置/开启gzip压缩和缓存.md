# Nginx 开启gzip压缩和缓存

## 配置示例

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

    gzip on;	#打开gzip压缩
	gzip_min_length 1K;	#超过1K的文件开始压缩
	gzip_comp_level	8;	#压缩级别（1-10)越大压缩率越好，但也越耗性能
	gzip_types text/plain application/javascript application/x-javascript text/css application/xml text/javascript application/x-httpd-php image/jpeg image/gif image/png font/ttf font/otf image/svg+xml;	#压缩的文件类型
	gzip_vary on;	#浏览器请求头是否开启压缩支持
	gzip_disable "MSIE [1-6]\.";	#IE1-6不压缩

	# 开启缓存
	location ~* ^.+\.(ico|gif|jpg|jpeg|png)$ { 
	    access_log   off; 
	    expires      30d;
	}

	location ~* ^.+\.(css|js|txt|xml|swf|wav)$ {
	    access_log   off;
	    expires      24h;
	}

	location ~* ^.+\.(html|htm)$ {
	    expires      1h;
	}

	location ~* ^.+\.(eot|ttf|otf|woff|svg)$ {
	    access_log   off;
	    expires max;
	}
}
```

附件下载： 

[开启gzip压缩和缓存配置示例.conf](./assets/files/开启gzip压缩和缓存配置示例.conf)
