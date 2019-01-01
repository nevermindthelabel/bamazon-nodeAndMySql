
require('dotenv').config();
const mysql = require('mysql');
const inquirer = require('inquirer');

const databasePassword = process.env.DATABASE_PASSWORD;
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: databasePassword,
  database: 'bamazon',
});

connection.connect((error) => {
  if (error) {
    console.log(error);
  }
  menu();
});


function menu() {
  inquirer
    .prompt([
      {
        name: 'managerAnswer',
        type: 'list',
        message: 'Welcome to the manager menu. What would you like to view?',
        choices: [
          'Products for sale',
          'View low inventory',
          'Add to inventory',
          'Add new Product',
        ],
      },
    ]).then((answers) => {
      if (answers.managerAnswer === 'Products for sale') {
        forSale();
      } else if (answers.managerAnswer === 'View low inventory') {
        viewLowInventory();
      } else if (answers.managerAnswer === 'Add to inventory') {
        addToInventory();
      } else {
        addNewProduct();
      }
    });
}

function forSale() {
  connection.query('SELECT item_id, product_name, price, stock_quantity From products', (error, results) => {
    if (error) {
      console.log(error);
    }
    for (let i = 0; i < results.length; i++) {
      console.log(`
        Item ID: ${results[i].item_id}
        Name: ${results[i].product_name}
        Cost: $${results[i].price}
        Inventory: ${results[i].stock_quantity}
        `);
    } connection.end();
  });
}

function viewLowInventory() {
  connection.query('SELECT * FROM products WHERE stock_quantity <= 5', (error, results) => {
    if (error) {
      console.log(error);
    }
    for (let i = 0; i < results.length; i++) {
      console.log(`
      Welcome, Manager. We have low stock on ${results[i].product_name}, we have ${results[i].stock_quantity} in stock.
      `);
    } connection.end();
  });
}

function addToInventory() {
  inquirer
    .prompt([
      {
        name: 'numProductsToAdd',
        type: 'input',
        message: 'Enter the number of items you\'d like add to our inventory',
        validate(number) {
          if (isNaN(number) === false && parseInt(number) > 0) {
            return true;
          }
          return false;
        },
      },
      {
        name: 'productId',
        type: 'input',
        message: 'Enter the id number of the items',
        validate(number) {
          if (isNaN(number) === false && parseInt(number) > 0) {
            return true;
          }
          return false;
        },
      },
    ]).then((answer) => {
      const managerAddProducts = parseInt(answer.numProductsToAdd);
      const productIdNum = parseInt(answer.productId);
      connection.query(`UPDATE products SET stock_quantity = stock_quantity + ${managerAddProducts} WHERE item_id = ${productIdNum}`);
      connection.end();
    });
}

function addNewProduct() {
  inquirer
    .prompt([
      {
        name: 'newProduct',
        type: 'input',
        message: 'What product would you like to add?',
      },
      {
        name: 'departmentName',
        type: 'input',
        message: 'What department does the new product belong to?',
      },
      {
        name: 'newProductPrice',
        type: 'input',
        message: 'What is the price for the new item',
      },
      {
        name: 'newProductStock',
        type: 'input',
        message: 'What is the number you would like to get for our stock?',
      },
    ]).then((answer) => {
      const newProductName = answer.newProduct;
      const newProductDepartment = answer.departmentName;
      const newProductPrice = answer.newProductPrice;
      const newProductStock = answer.newProductStock;
      connection.query(`UPDATE products SET product_name = ${newProductName}, department_name = ${newProductDepartment}, price = ${newProductPrice}, stock_quantity = ${newProductStock}
      `);
    });
}
