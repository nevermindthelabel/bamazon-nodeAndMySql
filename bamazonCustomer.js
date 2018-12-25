require('dotenv').config();
var mysql = require('mysql');
var inquirer = require('inquirer');
var fs = require('fs');
var databasePassword = process.env.DATABASE_PASSWORD;
var connection = mysql.createConnection({
    host: 'localhost',
    // port: 3306,
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
    connection.query('SELECT * From products', function(error, results) {
        if (error){
            console.log(error);
        }
        for (var i = 0; i < results.length; i++)
        console.log(`
        Item ID: ${results[i].item_id}
        Name: ${results[i].product_name}
        Cost: $${results[i].price}
        `)
        buyId();
    })
}
function buyId() {
    inquirer
        .prompt({
            name: 'productId',
            type: 'input',
            message: 'Which item would you like to buy by id number?'
        }).then(function(answer){
            var query = 'SELECT item_id FROM products WHERE ?';
            connection.query(query, { productId: answer.productId }, function (error, response) {
                for (var i = 0; i < response.length; i++) {
                    console.log('id :' + response[i])
                }
            })
        })
}
connection.end();
