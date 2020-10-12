# Ubuntu 20.04 安装Nginx

## 安装

`注意：` 安装Nginx之前一定要查看一下本地80和443端口是否已被占用！
apt中已经包含nginx软件包，直接安装即可。

``` shell
$ sudo apt install nginx
```

## 测试

* 桌面版

浏览器打开 `127.0.0.1` 即可

* 服务器

``` shell
$ curl http://127.0.0.1/ 
```

得到以下内容即表示安装成功。

``` html
<!DOCTYPE html>
<html>

<head>
    <title>Welcome to nginx!</title>
    <style>
        body {
            width: 35em;
            margin: 0 auto;
            font-family: Tahoma, Verdana, Arial, sans-serif;
        }
    </style>
</head>

<body>
    <h1>Welcome to nginx!</h1>
    <p>If you see this page, the nginx web server is successfully installed and
        working. Further configuration is required.</p>

    <p>For online documentation and support please refer to
        <a href="http://nginx.org/">nginx.org</a>.<br />
        Commercial support is available at
        <a href="http://nginx.com/">nginx.com</a>.</p>

    <p><em>Thank you for using nginx.</em></p>
</body>

</html>
```
