require('dotenv').config();
var mysql = require('mysql');
var inquirer = require('inquirer');
var fs = require('fs');
var databasePassword = process.env.DATABASE_PASSWORD;
var connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: databasePassword,
  database: 'bamazon'
});

connection.connect(function (error) {
  if (error) {
    console.log(error)
  }
});
start();

function start() {

  console.log('Welcome to my store. Here are the products available for purchase -');
  connection.query('SELECT item_id, product_name, price From products', function (error, results) {
    if (error) {
      console.log(error);
    }
    for (var i = 0; i < results.length; i++)
      console.log(`
        Item ID: ${results[i].item_id}
        Name: ${results[i].product_name}
        Cost: $${results[i].price}
        `)
    buyId();
    function buyId() {

      inquirer
        .prompt([
          {
            name: 'productId',
            type: 'input',
            message: 'Enter the id number of the item you\'d like to purchase.',
            validate: function (idNumber) {
              if (isNaN(idNumber) == false && parseInt(idNumber) <= results.length && parseInt(idNumber) > 0) {
                return true;
              } else {
                return false;
              }
            }
          }
        ]).then(function (answer) {
          // console.log(answer)
          var userInput = parseInt(answer.productId) 
          var query = 'SELECT item_id FROM products WHERE item_id='+ userInput  ;
          connection.query(query, { productId: answer.productId }, function (error, response) {
            if (error) throw error;
            console.log(response);
          })
        })
    }
  })
}

// connection.end();
