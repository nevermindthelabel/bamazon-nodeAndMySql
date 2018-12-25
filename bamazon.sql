CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products
(
    item_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    product_name VARCHAR
(35) NOT NULL,
    department_name VARCHAR
(15) NOT NULL,
    price DECIMAL
(6,2) NULL,
    stock_quantity INT NULL
);
INSERT INTO products
    (product_name, department_name, price, stock_quantity)

VALUES
    ('Samsung 55 in 4k TV', 'electronics', 477.99, 5),
    ('Valentine One Radar Detector', 'electronics', 494.97, 10),
    ('Amazon Fire Kids Edition Tablet', 'electronics', 69.99, 100),
    ('Huawei MediaPad M5', 'electronics', 279.99, 10),
    ('Huggies size 5 diapers', 'home goods', 40.84, 200),
    ('Pampers Baby Wipes', 'home goods', 14.64, 300),
    ('Coffee Mugs', 'home goods', 11.99, 15),
    ('Coffee Maker', 'home goods', 53.83, 5),
    ('Peets coffee 20 oz', 'home goods', 12.98, 500),
    ('Razer Blade gaming laptop', 'electronics', 1599.99, 3);