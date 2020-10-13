# 使用letsencrypt在Docker环境下生成泛域名证书

## 生成命令

``` shell
$ docker run -it --rm --name certbot \
    -v $PWD:/etc/letsencrypt \
    certbot/certbot \
    certonly --manual --preferred-challenges=dns-01 \
    --server=https://acme-v02.api.letsencrypt.org/directory
```

`说明：` 操作与ubuntu环境下一致，就不再赘述，具体可看[Ubuntu环境下生成泛域名证书](Ubuntu环境下生成泛域名证书.md)。
