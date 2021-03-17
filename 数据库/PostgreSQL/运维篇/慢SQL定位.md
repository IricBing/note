# Postgresql 慢SQL定位

前提准备：[启用pg_stat_statements插件](启用pg_stat_statements插件.md)

## 重置监听计数器

进入 `psql` 终端，输入如下命令：

``` sql
create extension pg_stat_statements;  -- 这个命令只需要执行一次，不需要重复启用
select pg_stat_reset();
select pg_stat_statements_reset();
```

按照实际情况开始等待一段时间，之后开始查询监听结果

``` sql
select * from pg_stat_statements order by max_exec_time desc limit 5;     -- 查询执行所需时间最慢的5条SQL语句
```

pg_stat_statements表的结构如下：

|列名|类型|描述|
|-----|-----|-----|
|userid|oid（references pg_authid.oid）|执行语句的用户OID|
|dbid|oid (references pg_database.oid)|执行语句的数据库OID|
|queryid|bigint|内部hash码，从执行语句的语法树上计算得到|
|query |text|执行的SQL语句|
|plans |bigint|Number of times the statement was planned (if pg_stat_statements.track_planning is enabled, otherwise zero)|
|total_plan_time |double precision|Total time spent planning the statement, in milliseconds (if pg_stat_statements.track_planning is enabled, otherwise zero)|
|min_plan_time |double precision|Minimum time spent planning the statement, in milliseconds (if pg_stat_statements.track_planning is enabled, otherwise zero)|
|max_plan_time |double precision|Maximum time spent planning the statement, in milliseconds (if pg_stat_statements.track_planning is enabled, otherwise zero)|
|mean_plan_time |double precision|Mean time spent planning the statement, in milliseconds (if pg_stat_statements.track_planning is enabled, otherwise zero)|

表格未完待续。。。
