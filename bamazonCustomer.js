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
    return;
  }
  start();
});

function start() {
  console.log('Welcome to my store. Here are the products available for purchase -');
  connection.query('SELECT item_id, product_name, price From products', (error, results) => {
    if (error) {
      console.log(error);
    }
    for (let i = 0; i < results.length; i++) {
      console.log(`
        Item ID: ${results[i].item_id}
        Name: ${results[i].product_name}
        Cost: $${results[i].price}
        `);
    }
    buyId();
    function buyId() {
      inquirer
        .prompt([
          {
            name: 'productId',
            type: 'input',
            message: 'Enter the id number of the item you\'d like to purchase.',
            validate(idNumber) { // eslint-disable-next-line
              if (isNaN(idNumber) === false && parseInt(idNumber) <= results.length && parseInt(idNumber) > 0) {
                return true;
              }
              return false;
            },
          },
          {
            name: 'numProducts',
            type: 'input',
            message: 'Enter the number of products you\'d like to buy.',
            validate(idNumber) { // eslint-disable-next-line
              if (isNaN(idNumber) === false && parseInt(idNumber) <= results.length && parseInt(idNumber) > 0) {
                return true;
              }
              return false;
            },
          },
        ]).then((answer) => { // eslint-disable-next-line
          const userInput = parseInt(answer.productId);
          const query = `SELECT * FROM products WHERE item_id = ${userInput}`;
          connection.query(query, (error, response) => {
            if (error) throw error; // eslint-disable-next-line
            const numInStock = parseInt(response[0].stock_quantity); // eslint-disable-next-line
            const numUserRequested = parseInt(answer.numProducts);
            const cost = parseFloat(response[0].price);
            const arizonaSalesTax = parseFloat(1.086);
            const totalCost = (cost * numUserRequested) * arizonaSalesTax;
            const salesTotal = numUserRequested * cost;
            if (numInStock < numUserRequested) {
              console.log('Insufficient quantity!');

              connection.end();
            } else {
              connection.query(`UPDATE products SET stock_quantity = stock_quantity - ${numUserRequested}, product_sales = ${salesTotal.toFixed(2)} WHERE item_id = ${userInput}`);
              console.log(`Thank you for your purchase. Your total cost is $${totalCost.toFixed(2)}`);
              connection.end();
            }
          });
        });
    }
  });
}
