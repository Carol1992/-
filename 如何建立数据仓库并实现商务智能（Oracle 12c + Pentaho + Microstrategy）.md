# 如何建立数据仓库并实现商务智能（Oracle 12c + Pentaho + Microstrategy）？

## 使用 Oracle Database Configuration Assistant 新建和配置全局数据库（我建立的数据库 "DBMSTEST"）

## 使用 Net Configuration Assistant 配置监听程序 （我配置的监听程序 "LISTENER05"）

## 打开 SQL PLUS 以管理员身份登陆并创建用户和授予用户权限（我创建的用户 "yotta"，密码 "123"，权限 "可以对表格进行新建，删除，插入，更新操作”）

## 用户 yotta 在 SQL PLUS 登录并创建表格，并向表格中插入数据，操作结束后记得 commit 表示确认所做的更改

## 用户 yotta 通过 SQL Developer 连接到数据库（用户名 "yotta"，主机名 "localhost"，SID "DBMSTEST"）

## 双击打开 pentaho data-integration 中的 Spoon.bat，并连接到数据库（主机名 "localhost"，数据库 "DBMSTEST"，用户 "yotta"，密码 "123"）

## 将 Excel 表格，Access 数据库中的数据经过 pentaho 处理后更新到我们的数据库中

## 数据库更新后，打开 Microstrategy 并连接到数据库，稍微清理一下数据，然后根据商业指标实施 BI
