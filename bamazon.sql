DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products
(
    item_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    product_name VARCHAR
(35) NOT NULL,
    department_name VARCHAR
(25) NOT NULL,
    price DECIMAL
(6,2) NULL,
    stock_quantity INT NULL
);