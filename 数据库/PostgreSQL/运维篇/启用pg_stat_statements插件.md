# 启用 `pg_stat_statements` 插件

修改 `Postgresql` 配置文件 `/var/lib/postgresql/data/postgresql.conf` ，开启 `pg_stat_statements` 插件支持。

> 温馨提示：如果系统中有多个版本，可能在 `data` 文件夹前还会根据版本包一层，例如： `/var/lib/postgresql/13/data/postgresql.conf`

加上如下内容：

``` conf
shared_preload_libraries = 'pg_stat_statements'     # 表示要在启动时导入pg_stat_statements 动态库

pg_stat_statements.max = 1000   # 表示监控的语句最多为1000句

pg_stat_statements.track = all  # 表示监控所有的sql语句

# pg_stat_statements.track = top  # 表示不监控嵌套的sql语句

# pg_stat_statements.track_utility = true     # 表示对 INSERT/UPDATE/DELETE/SELECT 之外的sql动作也作监控。

# pg_stat_statements.save = true    # 表示当postgresql停止时，把信息存入磁盘文件以备下次启动时再使用。
```

**重启** `Postgresql` 数据库，插件就启用了。
