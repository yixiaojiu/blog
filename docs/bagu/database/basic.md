# 基础

## 主键

它是用于唯一标识表中每一行记录的列或列组合。主键可以是一列，也可以是多列的组合，称为复合主键。常见主键包括自增整数、uuid。

特点：主键的值必须是唯一的、主键列不允许有空值（NULL）、一旦某行数据的主键值被设定，它就不应该轻易改变

作用：

- 通过确保每条记录的唯一性，防止重复数据的插入
- 在关系型数据库中，主键常常被用作外键（Foreign Key）来建立表与表之间的关联，从而维护数据间的关系和引用完整性
- 主键自动成为表的索引，可以加快数据查询的速度

## left join 与 right join

主要用于在查询时从两个或多个表中返回相关的行

```sql
SELECT Employees.Name, Departments.DepartmentName
FROM Employees
LEFT JOIN Departments ON Employees.DepartmentID = Departments.DepartmentID;
```

假设有两个表，Employees（员工表）和 Departments（部门表），我们想列出所有员工及其所在部门，即使某些员工没有分配到特定部门。即使某个员工的 DepartmentID 在 Departments 表中没有对应的记录，该员工的信息也会被列出，但 DepartmentName 列的值会是 NULL
