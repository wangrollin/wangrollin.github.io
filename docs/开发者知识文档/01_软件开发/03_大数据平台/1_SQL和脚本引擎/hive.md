



## Lynda教程：Analyzing Big Data with Hive

### Hive comcepts and setup

##### why use hive

Hive是类SQL的接口，可以交互式查询hadoop数据

优点：这样就不需要会写java，也能使用sql来分析数据，有很多工具天然支持sql，这样可以让工具用sql分析hadoop上的数据

缺点：没有实现全部的标准SQL；面向批处理，速度慢；schema-on-read，读的时候才有结构，所以很脆弱，底层数据变了，容易出错

hive的代替项：spark，impala，hive on Tez，Presto，第三方数据库（如 Vertical）



##### how hive works

hive 数据仓库：逻辑定义的表，用户定义的函数；schema是在执行查询的时候产生的

无结构的数据需要清洗，处理，结构化，然后才能产生有意义的数据

|  HDFS  -->   | -->  Hive DW |
| :----------: | :----------: |
|   Raw data   |  processed   |
| unstructured |  structrued  |
|  compressed  |  aggregated  |
| partitioned  | partitioned  |



##### settings up our demo environment

CDH quickstart VM，现在已经下载不到了



### working with data in hive

##### understanding table structures in hive

HIve的table是一种表结构，可以在其上运行sql查询语句；可用的table主要有两种类型：managed管理的，external外部的

| managed                                      | external                                       |
| -------------------------------------------- | ---------------------------------------------- |
| hive拥有这些数据                             | 只是定义                                       |
| 数据不在原来的位置，移动到了hive的数据仓库里 | 指向HDFS中的文件                               |
| 格式遵循SQL的传统                            | 很脆弱，因为这些文件可能会改变，而Hive感知不到 |



通常，创建了一个managed table，会在hive的warehouse目录下创建一个同名的文件夹，里面放数据



##### creating tables in hive

从HUE作为入口，从本地文件导入变成hive table



##### handling csv files in hive

有时候，csv文件里的""中间会有逗号，hive要处理这种情况，需要使用定制的引擎，叫做SerDe，序列化反序列化，来处理这种数据

```sql
ALTER TABLE <table-name> SET SERDE 'com.bizo.hive.serde.csv.CSVSerde'
```

在HUE的hive编辑器里执行这段sql，同时把相应的jar放到hive session里，执行完之后，hive会自动把重新格式化的数据放到table里，再读取table的数据，发现数据正常了



##### partitioning tables

分区的表，一种hive的结构，基于一些条件逻辑，把很大的表拆成多个小表，通常用来提高性能（比如一年的数据放在一个子集里）



用脚本创建表格结构，之前都是直接用ui来上传文件并创建表格

```sql
create table sales_all_years (RowID smallint, OrderID int, OrderDate date, OrderMonthYear date, Quantity int, Quote float, DiscountPct float, Rate float, SaleAmount float, CustomerName string, CompanyName string, Sector string, Industry string, City string, ZipCode string, State string, Region string, ProjectCompleteDate date, DaystoComplete int, ProductKey string, ProductCategory string, ProductSubCategory string, Consultant string, Manager string, HourlyWage float, RowCount int, WageMargin float)
partitioned by (yr int)
row format serde 'com.bizo.hive.serde.csv.CSVSerde'
stored as textfile;


-- 在/user/hive/warehouse/tablename/ 里面创建文件夹：2009 2010等，然后把每个年份的csv文件上传到对应的文件夹里

-- add the partitions
alter table sales_all_years
add partition (yr=2009)
location '2009/';

alter table sales_all_years
add partition (yr=2010)
location '2010/';

alter table sales_all_years
add partition (yr=2011)
location '2011/';

alter table sales_all_years
add partition (yr=2012)
location '2012/';
```



### retrieving data from hive

##### simple select statement

```sql
/* structure
SELECT <columns>
FROM <table>
JOIN <other tables>
WHERE <filter condition>
GROUP BY <grouping>
HAVING <aggregate filter>  在聚合操作执行之后执行having
ORDER BY <column list>
LIMIT <number of rows>
*/


-- the most basic select
select * -- all columns from table
from sales --table to pull from
limit 100 --only return the top 100 rows
    
-- out of order
from sales
select *
limit 100

-- aliasing tables and picking columns
select 
    s.orderdate,   
    s.saleamount,
    s.rowid
from 
    sales s
limit 100;

-- aliasing columns
select 
    s.orderdate as OrderDate,   
    s.saleamount as Sales,
    s.rowid as RowNum
from 
    sales s
limit 100;
```



##### retrieving data from complex structures

hive支持复杂表结构

| 类型   | 描述               | 例子              | 引用方式   |
| ------ | ------------------ | ----------------- | ---------- |
| array  | 一组同样类型的数据 | array(1,2)        | col[0]     |
| map    | 任意类型的键值对   | map('a',1,'b',2)  | col['key'] |
| struct | 一组属性名的集合   | struct('a',1,1.0) | xxx.yy     |



```sql
-- Get email survey opt-in values for all customers
SELECT
  c.id,
  c.name,
  c.email_preferences.categories.surveys
FROM customers c;



-- Select customers for a given shipping ZIP Code
SELECT
  customers.id,
  customers.name
FROM customers
WHERE customers.addresses['shipping'].zip_code = '76710';

-- Get customers and their first order only
SELECT
    c.id,
    c.name,
    orders[0]
FROM
    customers c
    
-- Get customers and all of their Order IDs
SELECT
  c.id AS customer_id,
  c.name AS customer_name,
  ords.order_id AS order_id
FROM
  customers c
LATERAL VIEW EXPLODE(c.orders) o AS ords
-- 相当于把数组炸了出来，从横着放变成了竖着放


-- Get total of each order for these customers
SELECT
  c.id AS customer_id,
  c.name AS customer_name,
  ords.order_id AS order_id,
  order_items.price * order_items.qty AS total_amount
FROM
  customers c
LATERAL VIEW EXPLODE(c.orders) o AS ords
LATERAL VIEW EXPLODE(ords.items) i AS order_items
limit 1000;
```



### aggregating data

##### simple aggregations

hive的聚合操作

| simple  | advanced |
| ------- | -------- |
| SUM()   | STDEV()  |
| MIN()   | VAR()    |
| MAX()   |          |
| AVG()   |          |
| COUNT() |          |



```sql
--Let's understand monthly sales figures
select
    ordermonthyear as OrderMonth,
    count(1) as OrderCount, --if every row represents one order we just count 1
    sum(s.saleamount) as TotalSales,
    avg(s.saleamount) as AvgSales,
    min(s.saleamount) as MinSales,
    max(s.saleamount) as MaxSales
    
from 
    sales_all_years s
where
    lower(ordermonthyear) != 'ordermonthyear'
group by
    ordermonthyear
order by
    ordermonthyear desc


-- Now let's break it down further by category by month
select
    ordermonthyear as OrderMonth,
    productcategory as Category,
    count(1) as OrderCount, --if every row represents one order we just count 1
    sum(s.saleamount) as TotalSales,
    avg(s.saleamount) as AvgSales,
    min(s.saleamount) as MinSales,
    max(s.saleamount) as MaxSales
    
from 
    sales_all_years s
where
    lower(ordermonthyear) != 'ordermonthyear'
group by
    ordermonthyear,
    productcategory
order by
    ordermonthyear desc
```



##### enhanced aggregations with grouping sets

```sql
-- Enhanced aggregations with grouping sentences
select
    ordermonthyear as OrderMonth,
    productcategory as Category,
    sum(saleamount) as TotalSales
from
    sales_all_years
where
    lower(ordermonthyear) != 'ordermonthyear'
group by
    ordermonthyear,
    productcategory
-- enhancing
grouping sets
    (ordermonthyear, productcategory) -- same as union of two queries with group by of a and b separately
/*
	select和group by相当于选出了列，grouping sets相当于给出了几种方式；正常情况下是合并的关系，但是sets里写的是分开的，则一列是null
*/
    
    
-- get both individually and the combo. Identify which using GROUPING__ID
select
    ordermonthyear as OrderMonth,
    productcategory as Category,
    GROUPING__ID as Grp,
    sum(saleamount) as TotalSales
    
from
    sales_all_years
where
    lower(ordermonthyear) != 'ordermonthyear'
group by
    ordermonthyear,
    productcategory
-- enhancing
grouping sets
    ((ordermonthyear, productcategory), ordermonthyear, productcategory)
```



##### using CUBE and ROLLUP

```sql
-- WITH CUBE returns subtotals of all possible comibnations. Be careful with large datasets!
-- This is nice if you're unsure of the aggregation level you'll want but certainly can cause slowness
select
    ordermonthyear as OrderMonth,
    productcategory as Category,
    GROUPING__ID as Grp,
    sum(saleamount) as TotalSales
from
    sales_all_years
where
    lower(ordermonthyear) != 'ordermonthyear'
group by
    ordermonthyear,
    productcategory
-- enhancing
with cube


-- WITH ROLLUP is similar in that it creates multiple aggregation levels, but as a hierarchy instead
-- Same query, except this time the grouping levels are defined as a hierarchy
select
    ordermonthyear as OrderMonth,
    productcategory as Category,
    GROUPING__ID as Grp,
    sum(saleamount) as TotalSales
from
    sales_all_years
where
    lower(ordermonthyear) != 'ordermonthyear'
group by
    ordermonthyear,
    productcategory
-- enhancing  rollup只是让结果的摆放更加整齐一些
with rollup
```



### filetering results

##### simple filter with the WHERE clause

```sql
-- add "where" to filter to a specific partition
select  *
from    sales_all_years
where   yr=2009
limit   1000;

-- remove the header row with a second where clause
select  *
from    sales_all_years
where   yr = 2009
and     lower(rowid) != 'rowid'
limit   1000;

-- when working with dates, use between
select  *
from    sales_all_years
where   orderdate between '2010-01-01' and '2010-12-31'
```



##### filtering aggregates with HAVING clause

```sql

-- start by finding all the product sales for 2009
select 
    productcategory,
    productsubcategory,
    productkey,
    sum(saleamount) as TotalSales
from sales_all_years
where
    Yr=2009
group by 
    productcategory, 
    productsubcategory, 
    productkey
limit 1000;


--show only products with over 100K in sales_all_years
select 
    productcategory,
    productsubcategory,
    productkey,
    sum(saleamount) as TotalSales
from sales_all_years
where
    Yr=2009
group by 
    productcategory, 
    productsubcategory, 
    productkey
having
    sum(saleamount) > 100000
limit 1000;
```



##### Finding similar values with LIKE

```sql
-- Find tables in the product list
SELECT DISTINCT order_items.name
FROM customers c
LATERAL VIEW EXPLODE(c.orders) o AS ords
LATERAL VIEW EXPLODE(ords.items) i AS order_items
-- WHERE lower(order_items.name) like '%table%'
LIMIT 1000;




-- Gather some stats about orders of table products
SELECT 
    c.name AS CustName,
    addy.city as CustCity,
    addy.state as CustState,
    addy.zip_code as CustZip,
    count(distinct ords.order_id) as OrderCount,
    sum(order_items.price * order_items.qty) as OrderAmount
FROM customers c
-- get address information
LATERAL VIEW EXPLODE(c.addresses) a AS a_key, addy

-- get order details
LATERAL VIEW EXPLODE(c.orders) o AS ords
LATERAL VIEW EXPLODE(ords.items) i AS order_items

--filter results
WHERE 
    lower(order_items.name) like '%table%'
    
GROUP BY
    c.name,
    addy.city,
    addy.state,
    addy.zip_code
```



### joining tables

##### combining tables with JOIN

hive只支持 equi join，也就是=

inner join, left join, full outer join

```sql
create table clients (
    Name                string,
    Symbol              string,
    LastSale            double,
    MarketCapLabel      string,
    MarketCapAmount     bigint,
    IPOyear             int,
    Sector              string,
    industry            string,
    SummaryQuote        string
)
row format serde 'com.bizo.hive.serde.csv.CSVSerde'
stored as textfile;
-- 先创建好表结构，然后会生成一个文件夹，把csv上传进去，select就能看到了


-- checkout client data
select *
from clients;

-- how many rows do we have?
-- 35,749
select count(1)
from sales_all_years

-- inner join from sales
-- 35,749
select count(1)
from sales_all_years s
join clients c on s.companyname = c.name

-- Add details about clients for a more comprehensive answer
select 
    c.marketcaplabel, 
    c.marketcapamount,
    c.name, 
    c.ipoyear, 
    c.symbol,
    count(distinct s.orderid) OrderCount,
    sum(s.saleamount) as TotalSales
from sales_all_years s
join clients c on s.companyname = c.name
group by
    c.marketcaplabel, 
    c.marketcapamount,
    c.name, 
    c.ipoyear,
    c.symbol
order by
    c.marketcapamount desc
```



##### when to use SEMI JOIN

```sql
drop table vip_clients;
-- create new vip table
create table if not exists vip_clients(name string);
-- load some data
insert into vip_clients values
    ('Apple Inc.'), 
    ('Google Inc.'), 
    ('Facebook, Inc.'), 
    ('Amazon.com, Inc.'),
    ('QUALCOMM Incorporated'),
    ('America Movil, S.A.B. de C.V.'),
    ('Starbucks Corporation'),
    ('Costco Wholesale Corporation'),
    ('DIRECTV'),
    ('Adobe Systems Incorporated'),
    ('Netflix, Inc.');
    


-- ANSI SQL method using exists
select *
from sales_all_years s
where exists(
    select *
    from vip_clients v
    where s.companyname = v.name);

-- get info about vip customers only ???
select 
    s.companyname,
    s.productcategory,
    count(distinct s.orderid) OrderCount,
    sum(s.saleamount) as TotalSales
from sales_all_years s
left semi join vip_clients v on (s.companyname = v.name) 
group by
    s.companyname,
    s.productcategory
```



##### joining multiple tables together

hive里的join操作是累加操作的，有一个执行顺序

```sql
-- first join to filter just on vip_clients
select 
    s.companyname,
    s.productcategory,
    count(distinct s.orderid) OrderCount,
    sum(s.saleamount) as TotalSales
from sales_all_years s
left semi join vip_clients v on (s.companyname = v.name) 
group by
    s.companyname,
    s.productcategory
    
-- now add clients table for additional context
select 
    s.companyname,
    s.productcategory,
    c.marketcaplabel, 
    c.marketcapamount,
    c.name, 
    c.ipoyear, 
    c.symbol,
    count(distinct s.orderid) OrderCount,
    sum(s.saleamount) as TotalSales
from sales_all_years s
left semi join vip_clients v on (s.companyname = v.name) 
join clients c on s.companyname = c.name
group by
    s.companyname,
    s.productcategory,
    c.marketcaplabel, 
    c.marketcapamount,
    c.name, 
    c.ipoyear, 
    c.symbol
```



### manipulating data

##### types of data manipulation functions

hive函数：内置或HQL的扩展，来操作数据

函数类型：

- string：concat(), lower(), substr(), trim()
- math：round(), rand(), sqrt(), abs()
- data：to_data(), year(), month(), day(), datediff(), date_add(), date_sub()
- conditional：if(), coalesce(), case...when



##### string functions

```sql
-- build customer key
select 
    lower(name), 
    regexp_replace(name, '[^a-zA-Z0-9]+', ''),
    lower(regexp_replace(name, '[^a-zA-Z0-9]+', '')) as CustKey
from clients

-- parse out the quote from the url
select 
    name, 
    summaryquote, 
    parse_url(summaryquote,'PATH'), -- domain后面的路径
    locate('/',parse_url(summaryquote,'PATH'),2),
    substring(parse_url(summaryquote,'PATH'),9,4),
    substring(
        parse_url(summaryquote,'PATH'),
        locate('/',parse_url(summaryquote,'PATH'),2)+1
        ,4
    ) as symbol
from clients

-- combine the two for a new customer key
select 
    name, 
    concat(
        lower(regexp_replace(name, '[^a-zA-Z0-9]+', '')),
        '-',
        substring(parse_url(summaryquote,'PATH'),9,4)
    ) as CustKey
from clients
```



##### math functions

```sql
-- basic calculations using mathmatical operators
select
    orderid,
    orderdate,
    quantity,
    rate,
    discountpct,
    quantity*rate*(1-discountpct) as QuoteAmt,
    round(quantity*rate*(1-discountpct)) as QuoteAmtRound
from sales_all_years
where yr=2009

-- use rand and others to simulate new data
select 
    rand(), 
    saleamount,
    orderid,
    wagemargin,
    round(saleamount*rand()) as RandSaleAmount,
    floor(wagemargin) as WageMarginFlr,
    ceiling(wagemargin) as WageMarginCl
from sales_all_years
where yr=2009
```



##### data functions

```sql
-- find difference between two dates
select
    orderid,
    productcategory,
    productsubcategory,
    orderdate,
    projectcompletedate,
    datediff(projectcompletedate, orderdate) duration
from sales_all_years

-- get some stats by month
select
    productcategory,
    productsubcategory,
    year(orderdate) y,
    month(orderdate) m,
    avg(datediff(projectcompletedate, orderdate)) duration
from sales_all_years
group by    
    productcategory,
    productsubcategory,
    year(orderdate),
    month(orderdate)
order by
    3,4

-- find the last day of the month
select distinct
	date_sub(
		to_date(
			concat(cast(year(orderdate) as string),"-",cast(month(orderdate)+1 as string),"-01")
		)
	,1 ),
	orderdate
from sales_all_years
limit 100;
```



##### conditional functions

```sql
-- identify large sales with IF
select 
    orderid,
    saleamount,
    if(saleamount > 5000, 1, 0) as LargeSale
from sales_all_years
limit 1000;

-- create sales size categories
select 
    orderid,
    saleamount,
    case 
        when saleamount > 5000 then 'large'
        when saleamount > 1000 then 'medium'
        else 'small'
    end as SalesSize
from sales_all_years
limit 1000;

-- perform what-if analysis by reassigning regions
-- 只可以处理 等于
select 
    case lower(region)
        when 'west' then 'Southwest'
        when 'south' then 'Southwest'
        else region
    end as new_region,
    year(orderdate) as y,
    sum(saleamount) as TotalSales
from sales_all_years

group by
    case lower(region)
        when 'west' then 'Southwest'
        when 'south' then 'Southwest'
        else region
    end,
    year(orderdate)

limit 100;
```



### conclusion





