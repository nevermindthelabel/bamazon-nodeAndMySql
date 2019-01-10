DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (

    item_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    product_name VARCHAR
(35) NOT NULL,
    department_name VARCHAR
(25) NOT NULL,
    price DECIMAL
(6,2) DEFAULT NULL,
    stock_quantity INT DEFAULT NULL,
    product_sales DECIMAL
(11, 2) DEFAULT 0

);

CREATE TABLE departments
(
    department_id INT PRIMARY KEY NOT NULL
    AUTO_INCREMENT,
    department_name VARCHAR
    (25) NOT NULL,
    over_head_costs DECIMAL NOT NULL
)