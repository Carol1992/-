# 如何建立数据仓库并实现商务智能（Oracle 12c + Pentaho + Microstrategy）？

## 项目背景资料
- 公司名称：CPI Card Group
- 主营业务：payment card production and related services
- 工作流描述：
- ![workflow](https://i.niupic.com/images/2016/09/21/etpGvL.png)
- 数据来源：
- ![data resource](https://i.niupic.com/images/2016/09/21/CWidMA.png)
- ERP数据库：
- ![erp database](https://i.niupic.com/images/2016/09/21/aqEwdA.png)

## 使用 Oracle Database Configuration Assistant 新建和配置全局数据库
- （我建立的数据库 "DBMSTEST"）
- 基本是按照直接点击 “下一步” 的方式来创建全局数据库，oracle创建数据库的时候 will take a while.
- ![ Database Configuration Assistant](https://i.niupic.com/images/2016/09/21/FQfXuS.png)

## 使用 Net Configuration Assistant 配置监听程序 
- （我配置的监听程序 "LISTENER05"）
- 要从远程位置连接数据库，必须配置监听程序。基本是按照直接点击 “下一步” 的方式来配置。
- 配置完成，查看计算机的本地服务，确保 oracle listener 服务已开启。
- ![Net Configuration Assistant](https://i.niupic.com/images/2016/09/21/8gZpBM.png)

## 打开 SQL PLUS 以管理员身份登陆并创建用户和授予用户权限
- （我创建的用户 "yotta"，密码 "123"，权限 "DBA”）
- 创建完数据库后，并不能立即在数据库中建表，必须先创建该数据库的用户，并且为该用户指定表空间。
- create temporary tablespace db_temp tempfile '~\oradata\DBMSTEST\DATAFILE\db_temp.dbf' size 50m;
- create tablespace myusers tempfile '~\oradata\DBMSTEST\DATAFILE\myusers.dbf' size 50m;
- create user yotta identified by 123 default tablespace myuser temporary tablespace db_temp; grant connect, resource, dba to yotta;
- 如果出现表空间文件溢出，需要再增加一个数据文件时:alter tablespace myusers add datafile '~\oradata\DBMSTEST\DATAFILE\newusers.dbf' size 50m;
- 改变原有表空间数据文件的大小:alter database datafile '~\oradata\DBMSTEST\DATAFILE\newusers.dbf' resize 100m;
- 修改 oracle 用户有效期为无限制：alter profile default limit PASSWORD_LIFE_TIME unlimited;

## 用户 yotta 在 SQL PLUS 登录并创建表格，并用 create insert 语句向表格中插入数据，操作结束后记得 commit 表示确认所做的更改 
- SQL> @C:~\DataWarehouseDesign\DWCreateInsertStatements.txt （text 文件或 sql 文件里面包含你要执行的sql语句）
- text 文件或 sql 文件若最后没有 commit，要记得在 cmd 窗口 commit;

## 用户 yotta 通过 SQL Developer 连接到数据库
- （用户名 "yotta"，主机名 "localhost"，SID "DBMSTEST"）
- ![SQL Developer](https://i.niupic.com/images/2016/09/21/i1TIKV.png)

## 双击打开 pentaho data-integration 中的 Spoon.bat，并连接到数据库
- （主机名 "localhost"，数据库 "DBMSTEST"，用户 "yotta"，密码 "123"）
- ![pentaho connect to db](https://i.niupic.com/images/2016/09/21/gc45Rb.png)

## 将 Excel 表格，Access 数据库中的数据经过 pentaho 处理后更新到我们的数据库中
- [PentahoDataIntegrationTutorialMySQL](https://drive.google.com/file/d/0B0ildwxVXhbUeFB3ZWdjQ003cms/view?usp=sharing)
- ![data-integration](https://i.niupic.com/images/2016/09/21/IxD9Sh.png)
- ![data-integration](https://i.niupic.com/images/2016/09/21/mohRC4.png)

## 数据库更新后，打开 Microstrategy 并连接到数据库，稍微清理一下数据，然后根据商业指标实施 BI
在 oracle SQL Developer 查询和创建视图，方便实施 BI
```
/*  BQ1  */
CREATE VIEW BQ1_view AS
SELECT w_location_d.location_id, location_name, w_sales_class_d.sales_class_id, 
sales_class_desc, time_year AS contract_year, time_month AS contract_month, 
base_price, SUM(quantity_ordered) AS totalqty,
SUM(unit_price*quantity_ordered) AS job_amount From
w_location_d, w_sales_class_d, w_time_d, w_job_f WHERE
w_location_d.location_id = w_job_f.location_id AND
w_sales_class_d.sales_class_id = w_job_f.sales_class_id AND
w_time_d.time_id = w_job_f.contract_date
GROUP BY w_location_d.location_id, location_name, w_sales_class_d.sales_class_id, 
sales_class_desc, time_year, time_month, base_price;

/*  BQ2  */
CREATE VIEW BQ2_view AS
SELECT w_job_f.job_id, w_job_f.location_id, location_name, unit_price, quantity_ordered, 
time_year AS contract_year, time_month AS contract_month, 
SUM(invoice_amount) AS invoiceAmount, SUM(invoice_quantity) AS invoiceqty FROM
w_job_f, w_invoiceline_f, w_time_d, w_location_d WHERE
w_job_f.location_id = w_location_d.location_id AND
w_job_f.contract_date = w_time_d.time_id AND
w_invoiceline_f.location_id = w_location_d.location_id
GROUP BY w_job_f.job_id, w_job_f.location_id, location_name, unit_price, quantity_ordered, 
time_year, time_month;

/*  BQ3  */
CREATE VIEW BQ3_view AS
SELECT w_sub_job_f.job_id, w_sub_job_f.location_id, location_name, time_year,
time_month, SUM(cost_labor) AS labor, SUM(cost_material) AS material, SUM(cost_overhead) AS overhead,
SUM(cost_labor+cost_material+cost_overhead) AS totalcost,
SUM(quantity_produced) AS quantity, SUM(cost_labor+cost_material+cost_overhead)/SUM(quantity_produced) AS unitcost FROM
w_sub_job_f, w_time_d, w_job_f,w_location_d WHERE
w_sub_job_f.job_id = w_job_f.job_id AND
w_job_f.location_id = w_location_d.location_id AND
w_job_f.contract_Date = w_time_d.time_id
GROUP BY w_sub_job_f.job_id, w_sub_job_f.location_id, location_name, time_year,
time_month;

/*  BQ4  */
CREATE VIEW BQ4_view AS
SELECT w_invoiceline_f.location_id, location_name, 
w_invoiceline_f.sales_class_id, sales_class_desc, 
time_year AS invoice_year, time_month AS invoice_month, SUM(actual_quantity - invoice_quantity) AS returns,
SUM(shipped_amount - invoice_amount) AS returnAounts FROM
w_invoiceline_f, w_location_d,w_time_d, w_sales_class_d,
w_job_shipment_f WHERE
w_invoiceline_f.location_id = w_location_d.location_id AND
w_invoiceline_f.invoice_sent_date = w_time_d.time_id AND
w_invoiceline_f.sales_class_id = w_sales_class_d.sales_class_id
AND w_invoiceline_f.invoice_id = w_job_shipment_f.invoice_id
AND actual_quantity > invoice_quantity
GROUP BY w_invoiceline_f.location_id, location_name, 
w_invoiceline_f.sales_class_id, sales_class_desc, time_year,
time_month;

/*  BQ5  */
CREATE VIEW BQ5_VIEW AS
SELECT w_job_f.job_id, w_job_f.location_id, location_name, w_sales_class_d.sales_class_id, 
sales_class_desc, date_promised, Last_Shipment_Date, 
SumDelayShipQty, getBusDaysDiff(date_promised, Last_Shipment_Date) AS BusDaysDiff
FROM (SELECT W_SUB_JOB_F.JOB_ID, MAX(actual_ship_Date) AS Last_Shipment_Date,
SUM ( actual_Quantity ) AS SumDelayShipQty
FROM W_JOB_SHIPMENT_F, W_SUB_JOB_F, W_Job_F
WHERE W_SUB_JOB_F.SUB_JOB_ID = W_JOB_SHIPMENT_F.SUB_JOB_ID
AND W_Job_F.Job_Id = W_SUB_JOB_F.JOB_ID
AND Actual_Ship_Date > Date_Promised
GROUP BY W_SUB_JOB_F.JOB_ID) VIEWSS 
INNER JOIN w_job_f ON w_job_f.job_id = VIEWSS.JOB_ID 
INNER JOIN w_location_d ON w_job_f.location_id = w_location_d.location_id
INNER JOIN w_sales_class_d ON w_sales_class_d.sales_class_id = w_job_f.sales_class_id;

/*  BQ6  */
CREATE VIEW BQ6_VIEW AS
SELECT w_job_f.job_id, w_job_f.location_id, location_name, 
w_job_f.sales_class_id, sales_class_desc, date_ship_by, FirstShipDate,
getBusDaysDiff(FirstShipDate, date_ship_by) AS delaytime
FROM
( SELECT W_SUB_JOB_F.JOB_ID, MIN(Actual_Ship_Date) as FirstShipDate
   FROM W_JOB_SHIPMENT_F, W_SUB_JOB_F 
   WHERE W_SUB_JOB_F.SUB_JOB_ID = W_JOB_SHIPMENT_F.SUB_JOB_ID
   GROUP BY W_SUB_JOB_F.JOB_ID
 ) X1 
 INNER JOIN w_job_f ON X1.job_id = w_job_f.job_id 
 INNER JOIN w_location_d ON w_job_f.location_id = w_location_d.location_id 
 INNER JOIN w_sales_class_d ON w_job_f.sales_class_id = w_sales_class_d.sales_class_id;

/*  AQ1  */
SELECT w_job_f.job_id, location_name, time_year, time_month, 
SUM(unit_price*quantity_ordered) AS job_amount, 
SUM(SUM(unit_price*quantity_ordered))
OVER(ORDER BY time_month ROWS UNBOUNDED PRECEDING) AS cumeSumAmount FROM
w_job_f, w_time_d, w_location_d WHERE
w_job_f.location_id = w_location_d.location_id AND
w_job_f.contract_date = w_time_d.time_id
GROUP BY w_job_f.job_id, location_name, time_year, time_month;

/*  AQ2  */
SELECT w_job_f.job_id, location_name, time_year, time_month, 
SUM(unit_price*quantity_ordered) AS job_amount, 
AVG(SUM(unit_price*quantity_ordered))
OVER(ORDER BY time_month, time_year ROWS BETWEEN 0 PRECEDING AND 11 FOLLOWING) AS MovingAvgSumAmount FROM
w_job_f, w_time_d, w_location_d WHERE
w_job_f.location_id = w_location_d.location_id AND
w_job_f.contract_date = w_time_d.time_id
GROUP BY w_job_f.job_id, location_name, time_year, time_month;

/*  AQ3  */
SELECT BQ2_VIEW.location_name, BQ2_VIEW.contract_year, BQ2_VIEW.contract_month, 
SUM(invoiceAmount-totalcost) AS profit,
RANK() OVER(ORDER BY SUM(invoiceAmount-totalcost) DESC ) AS profitRank
FROM BQ3_VIEW, BQ2_VIEW
WHERE BQ3_VIEW.JOB_id = BQ2_VIEW.JOB_id
GROUP BY BQ2_VIEW.location_name, BQ2_VIEW.contract_year, BQ2_VIEW.contract_month;

/*  AQ4  */
SELECT BQ2_VIEW.location_name, BQ2_VIEW.contract_year, BQ2_VIEW.contract_month, 
SUM(invoiceAmount-totalcost)/SUM(invoiceAmount) AS margin,
RANK() OVER(ORDER BY SUM(invoiceAmount-totalcost)/SUM(invoiceAmount) DESC ) AS profitRank
FROM BQ3_VIEW, BQ2_VIEW
WHERE BQ3_VIEW.JOB_id = BQ2_VIEW.JOB_id
GROUP BY BQ2_VIEW.location_name, BQ2_VIEW.contract_year, BQ2_VIEW.contract_month;

/*  AQ5  */
CREATE VIEW AQ5_VIEW AS
SELECT BQ2_VIEW.JOB_ID, BQ2_VIEW.location_name, BQ2_VIEW.contract_year, BQ2_VIEW.contract_month, 
SUM(invoiceAmount-totalcost)/SUM(invoiceAmount) AS margin,
PERCENT_RANK() OVER(ORDER BY SUM(invoiceAmount-totalcost)/SUM(invoiceAmount) DESC ) AS profitRank
FROM BQ3_VIEW, BQ2_VIEW
WHERE BQ3_VIEW.JOB_id = BQ2_VIEW.JOB_id
GROUP BY BQ2_VIEW.JOB_ID, BQ2_VIEW.location_name, BQ2_VIEW.contract_year, BQ2_VIEW.contract_month;

/*  AQ6  */
SELECT JOB_ID, location_name, contract_year, contract_month, margin, profitRank
FROM AQ5_VIEW
WHERE profitRank > 0.95
GROUP BY JOB_ID, location_name, contract_year, contract_month, margin, profitRank;

/*  AQ7  */
SELECT sales_class_desc, 
time_year AS invoice_year, SUM(actual_quantity - invoice_quantity) AS returns,
RANK() OVER(ORDER BY SUM(actual_quantity - invoice_quantity) DESC) AS returnRank FROM
w_invoiceline_f,w_time_d, w_sales_class_d,w_job_shipment_f WHERE
w_invoiceline_f.invoice_sent_date = w_time_d.time_id AND
w_invoiceline_f.sales_class_id = w_sales_class_d.sales_class_id
AND w_invoiceline_f.invoice_id = w_job_shipment_f.invoice_id
AND actual_quantity > invoice_quantity
GROUP BY w_invoiceline_f.sales_class_id, sales_class_desc, time_year;

/*  AQ8  */
SELECT sales_class_desc, 
time_year AS invoice_year, SUM(actual_quantity - invoice_quantity) AS returns,
RATIO_TO_REPORT(SUM(actual_quantity - invoice_quantity)) 
OVER(PARTITION BY time_year) AS returnRatio FROM
w_invoiceline_f,w_time_d, w_sales_class_d,w_job_shipment_f WHERE
w_invoiceline_f.invoice_sent_date = w_time_d.time_id AND
w_invoiceline_f.sales_class_id = w_sales_class_d.sales_class_id
AND w_invoiceline_f.invoice_id = w_job_shipment_f.invoice_id
AND actual_quantity > invoice_quantity
GROUP BY w_invoiceline_f.sales_class_id, sales_class_desc, time_year;

/*  AQ9  */
SELECT location_name, date_promised, SUM(DELAYTIME) AS delaydays,
RANK() OVER(ORDER BY SUM(DELAYTIME) DESC) AS delayRank FROM
w_job_f, BQ6_VIEW WHERE
w_job_f.job_id = BQ6_VIEW.job_id
GROUP BY location_name, date_promised;

/*  AQ10  */
SELECT BQ5_VIEW.location_name, w_job_f.date_promised, time_year, count(w_job_f.job_id) AS delayJobs,
SUM(BUSDAYSDIFF) AS delaydays, SUM(quantity_ordered-sumdelayshipqty)/SUM(quantity_ordered) AS delayRate,
RANK() OVER(PARTITION BY time_year ORDER BY SUM(quantity_ordered-sumdelayshipqty)/SUM(quantity_ordered)) AS delayRatio
FROM w_job_f, BQ5_VIEW, W_TIME_D WHERE
w_job_f.job_id = BQ5_VIEW.job_id AND
w_job_f.date_promised = w_time_d.time_id
GROUP BY BQ5_VIEW.location_name, w_job_f.date_promised, time_year;
```
[Carol-Capstone-project-Analysis2016](https://drive.google.com/file/d/0B0ildwxVXhbUd1NtS2dueUViT3c/view?usp=sharing)
![Microstrategy](https://i.niupic.com/images/2016/09/21/T7sU9T.png)
