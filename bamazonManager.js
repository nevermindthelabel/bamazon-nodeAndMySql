/*
List a set of menu options:
View Products for Sale
View Low Inventory
Add to Inventory
Add New Product
If a manager selects View Products for Sale,
the app should list every available item: the
item IDs, names, prices, and quantities.
If a manager selects View Low Inventory, then
 it should list all items with an inventory
 count lower than five.
If a manager selects Add to Inventory, your
app should display a prompt that will let the
 manager "add more" of any item currently in
the store. If a manager selects Add New
Product, it should allow the manager to add a
completely new product to the store.
*/
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
      const productIdNum = parseInt(answer.productId)
      connection.query(`UPDATE products SET stock_quantity = stock_quantity + ${managerAddProducts} WHERE item_id = ${productIdNum}`);
      connection.end();
    });
}
