# Ubuntu `curl` 命令

## 发送 `POST` 请求

### 发送 `JSON` 数据

示例：

```shell
$ curl -H "Content-Type:application/json" -X POST -d '{"nodes":[{"Status":0,"LineName":"Line Cell 02","StationName":"Station005"}]}' 'http://10.87.100.163:8080/AndonApi/ExternalManPowers'
```
