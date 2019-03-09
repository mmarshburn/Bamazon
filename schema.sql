CREATE DATABASE bamazon; 

CREATE TABLE products (
item_id INTEGER AUTO_INCREMENT NOT NULL,
product_name VARCHAR (100) NOT NULL,
department_name VARCHAR (100) NOT NULL,
price DECIMAL (13,2), 
stock_quantity INTEGER
); 

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES
('Bar Soap', 'Health', '4.99', '85'), 
('Toothpaste', 'Health', '8.99', '100'), 
('Jogging Shoes', 'Fitness', '42.99', '200'), 
('Athletic Shorts', 'Fitness', '16.99', '75'), 
('Blanket', 'Home', '22.50', '90'), 
('Tempurpedic Pillow', 'Home', '52.99', '25'), 
('Guitar', 'Entertainment', '125.99', '20'), 
('Xbox 360', 'Entertainment', '225.99', '45'), 
('Football', 'Sports', '21.99', '30'), 
('Basketball', 'Sports', '21.99', '60'), 
('Baseball Glove', 'Sports', '49.99', '50'), 
('Apple TV', 'Entertainment', '99.99', '18'), 
('Coffee Table Book', 'Entertainment', '25.00', '8'); 

