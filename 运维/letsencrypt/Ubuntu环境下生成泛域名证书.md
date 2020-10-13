# 使用letsencrypt在ubuntu环境下生成泛域名证书

`说明：` ubuntu为ubuntu 20.04 版本

## Step1. 安装

``` shell
$ sudo apt install certbot
```

## Step2. 申请泛域名证书

``` shell
$ sudo certbot certonly  --manual --preferred-challenges dns --server https://acme-v02.api.letsencrypt.org/directory 

Saving debug log to /var/log/letsencrypt/letsencrypt.log
Plugins selected: Authenticator manual, Installer None
Please enter in your domain name(s) (comma and/or space separated)  (Enter 'c'
to cancel): *.virtualbing.cn
Obtaining a new certificate
Performing the following challenges:
dns-01 challenge for virtualbing.cn

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

NOTE: The IP of this machine will be publicly logged as having requested this
certificate. If you're running certbot in manual mode on a machine that is not
your server, please ensure you're okay with that.

Are you OK with your IP being logged?

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

(Y)es/(N)o: Y   # 必须写Y

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

Please deploy a DNS TXT record under the name
_acme-challenge.virtualbing.cn with the following value:

h_qQOC9fW4ltpQYH50UbmNQjcKT9gZng4hWXKJ5wlcE

Before continuing, verify the record is deployed.

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

Press Enter to Continue		#注意：这里切记一定要自己验证txt解析生效才行
Waiting for verification...
Cleaning up challenges

IMPORTANT NOTES:
 - Congratulations! Your certificate and chain have been saved at:
   /etc/letsencrypt/live/virtualbing.cn/fullchain.pem
   Your key file has been saved at:
   /etc/letsencrypt/live/virtualbing.cn/privkey.pem
   Your cert will expire on 2020-08-11. To obtain a new or tweaked
   version of this certificate in the future, simply run certbot
   again. To non-interactively renew *all* of your certificates, run
   "certbot renew"
 - If you like Certbot, please consider supporting our work by:

   Donating to ISRG / Let's Encrypt:   https://letsencrypt.org/donate
   Donating to EFF:                    https://eff.org/donate-le
```

## 附：验证txt解析命令

``` shell
$ dig  -t txt  _acme-challenge.virtualbing.cn @8.8.8.8

; <<>> DiG 9.16.1-Ubuntu <<>> -t txt _acme-challenge.virtualbing.cn @8.8.8.8
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 15301
;; flags: qr rd ra; QUERY: 1, ANSWER: 1, AUTHORITY: 0, ADDITIONAL: 1

;; OPT PSEUDOSECTION:
; EDNS: version: 0, flags:; udp: 512
;; QUESTION SECTION:
;_acme-challenge.virtualbing.cn.	IN	TXT

;; ANSWER SECTION:
_acme-challenge.virtualbing.cn.	299 IN	TXT	"h_qQOC9fW4ltpQYH50UbmNQjcKT9gZng4hWXKJ5wlcE"

;; Query time: 155 msec
;; SERVER: 8.8.8.8#53(8.8.8.8)
;; WHEN: 三 5月 13 15:37:48 CST 2020
;; MSG SIZE  rcvd: 115
```
