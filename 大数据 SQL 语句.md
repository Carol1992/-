## 大数据 SQL 语句

从一个庞大的数据库中众多的表格和视图中 query 出所需的数据，是一件熟能生巧的工作。

```
SELECT itemid, itembrand, itemunitprice,
  RANK() OVER ( ORDER BY itemunitprice ) AS rankunitprice
  FROM ssitem;
```
![RANK() OVER](https://i.niupic.com/images/2016/09/21/S6UPau.png)

```
SELECT custname, SUM(salesdollar) AS sumsales,
  RANK() OVER ( ORDER BY SUM(salesdollar) DESC ) salesrank
  FROM sssales, sscustomer
  WHERE sssales.custid = sscustomer.custid
  GROUP BY custname;
```
![RANK() OVER](https://i.niupic.com/images/2016/09/21/qJvPMd.png)

```
SELECT custstate, custname, sum(salesdollar) AS sumsales,
  RANK() OVER ( PARTITION BY custstate
                ORDER BY SUM(salesdollar) DESC ) salesrank
  FROM sssales, sscustomer
  WHERE sssales.custid = sscustomer.custid
  GROUP BY custstate, custname
  ORDER BY custstate;
```
![PARTITION BY](https://i.niupic.com/images/2016/09/21/3m422k.png)

```
SELECT storezip, timeyear, SUM(salesdollar) AS sumsales,
  SUM(SUM(salesdollar)) OVER
    (ORDER BY storezip, timeyear
     ROWS UNBOUNDED PRECEDING) AS cumsumsales
  FROM ssstore, sstimedim, sssales
  WHERE sssales.storeid = ssstore.storeid
  AND sssales.timeno = sstimedim.timeno
  GROUP BY storezip, timeyear;
```
![SUM() OVER](https://i.niupic.com/images/2016/09/21/VdBpRT.png)

```
SELECT storezip, timeyear, SUM(salesdollar) AS sumsales,
  SUM(SUM(salesdollar)) OVER
    (PARTITION BY storezip
     ORDER BY storezip, timeyear
     ROWS UNBOUNDED PRECEDING) AS cumsumsales
  FROM ssstore, sstimedim, sssales
  WHERE sssales.storeid = ssstore.storeid
  AND sssales.timeno = sstimedim.timeno
  GROUP BY storezip, timeyear;
```
![PARTITION BY](https://i.niupic.com/images/2016/09/21/YdDmio.png)

```
SELECT storezip, timeyear, SUM(salesdollar) AS sumsales,
  ROUND(AVG(SUM(salesdollar)) OVER
       (ORDER BY storezip, timeyear
        ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING), 2) AS centermovavgsumsales
  FROM ssstore, sstimedim, sssales
  WHERE sssales.storeid = ssstore.storeid
  AND sssales.timeno = sstimedim.timeno
  GROUP BY storezip, timeyear;
```
![ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING]![](https://i.niupic.com/images/2016/09/21/5JGLSi.png)

```
SELECT timeyear, custcity, SUM(salesdollar) AS sumsales,
  ROUND(RATIO_TO_REPORT(SUM(salesdollar))
  OVER (PARTITION BY timeyear), 2) AS sumsalesratio
  FROM sscustomer, sssales, sstimedim
  WHERE sssales.custid = sscustomer.custid
  AND sssales.timeno = sstimedim.timeno
  GROUP BY timeyear, custcity
  ORDER BY timeyear, SUM(salesdollar) DESC;
```
![RATIO_TO_REPORT](https://i.niupic.com/images/2016/09/21/M1wt6Q.png)

```
SELECT itemname, itembrand, itemunitprice, cumdistunitprice
  FROM (SELECT itemid, itemname, itembrand, itemunitprice, 
    CUME_DIST() OVER (ORDER BY itemunitprice DESC) AS cumdistunitprice
    FROM ssitem)
  WHERE cumdistunitprice <= 0.8;
```
![CUME_DIST() OVER](https://i.niupic.com/images/2016/09/21/npMfuu.png)

```
SELECT custname, SUM(salesunits) AS sumsalesunits,
  RANK() OVER (ORDER BY SUM(salesunits)) AS ranksalesunits,
  PERCENT_RANK() OVER (ORDER BY SUM(salesunits)) AS perranksalesunits,
  ROW_NUMBER() OVER (ORDER BY SUM(salesunits)) AS rownumsalesunits,
  ROUND(CUME_DIST() OVER  (ORDER BY SUM(salesunits)), 2) AS cumdistsalesunits
  FROM sssales, sscustomer
  WHERE sssales.custid = sscustomer.custid
  GROUP BY custname;
```
![cumulative distribution function](https://i.niupic.com/images/2016/09/21/ApL82G.png)

```
SELECT itemname, itemunitprice,
  RANK() OVER (ORDER BY itemunitprice) AS rankunitprice,
  PERCENT_RANK() OVER (ORDER BY itemunitprice) AS perrankunitprice,
  ROW_NUMBER() OVER (ORDER BY itemunitprice) AS rownumunitprice,
  CUME_DIST() OVER (ORDER BY itemunitprice) AS cumdistunitprice,
  FROM ssitem;
```
![cumulative distribution function](https://i.niupic.com/images/2016/09/21/6hqJ6s.png)

```
CREATE VIEW connex_sales_view AS 
  SELECT ssitem.itemid, itemname, itemcategory,itemunitprice, salesno, salesunits,
  salesdollar, salescost, timeyear, timemonth, timeday
  FROM ssitem, sssales, sstimedim
  WHERE itembrand = 'connex'
  AND timeyear BETWEEN 2010 AND 2012
  AND ssitem.itemid = sssales.itemid
  AND sstimedim.timeno = sssales.timeno;
```
```
SELECT itemname, itemcategory, itemunitprice, salesno, salesunits,
  salesdollar, salescost, timeyear, timemonth, timeday
  FROM connex_sales_view
  WHERE itemunitprice < 100 AND timeyear BETWEEN 2011 AND 2012;
```

```
CREATE MATERIALIZED VIEW MV1
  BUILD IMMEDIATE
  REFRESH COMPLETE ON DEMAND
  ENABLE QUERY REWRITE AS 
  SELECT storestate, timeyear, SUM(salesdollar) AS sumdollar
  FROM sssales, ssstore, sstimedim
  WHERE sssales.storeid = ssstore.storeid
  AND sssales.timeno = sstimedim.timeno
  AND timeyear > 2010
  GROUP BY storestate, timeyear;
```
