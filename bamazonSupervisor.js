
require('dotenv').config();
const mysql = require('mysql');
const inquirer = require('inquirer');
const Table = require('cli-table3');

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
  menuOptions();
});

function menuOptions() {
  inquirer
    .prompt([
      {
        name: 'supervisorResponse',
        type: 'list',
        message: 'What would you like to view today?',
        choices: [
          'View product sales by department',
          'Create new department',
        ],
      },
    ]).then((answers) => {
      if (answers.supervisorResponse === 'View product sales by department') {
        viewSalesByDepartment();
      } else {
        createNewDepartment();
      }
    });
}

function viewSalesByDepartment() {
  const table = new Table({
    head: ['id',
      'department_name',
      'over_head_cost',
      'product_sales',
      'total_profit'],
    colWidths: [5, 18, 20, 15, 15],
  });
  connection.query(`SELECT departments.department_id, 
  departments.department_name, departments.over_head_costs,
  CASE WHEN SUM(products.product_sales) IS NULL THEN 0 ELSE SUM(products.product_sales) END AS product_sales,SUM(products.product_sales) - departments.over_head_costs AS total_profit FROM products RIGHT JOIN departments ON products.department_name = departments.department_name GROUP BY departments.over_head_costs, departments.department_id, departments.department_name`, (error, results) => {
    if (error) {
      console.log(error);
    } for (let i = 0; i < results.length; i++) {
      const id = results[i].department_id;
      const name = results[i].department_name;
      const cost = results[i].over_head_costs;
      const sales = results[i].product_sales;
      const profit = results[i].total_profit;
      table.push([id, name, cost, sales, profit]);
    }
    console.log(table.toString());
  });
  connection.end();
}

function createNewDepartment() {
  inquirer
    .prompt([
      {
        name: 'newDepartmentName',
        type: 'rawlist',
        message: 'What department would you like to add to the database?',
        choices: [
          'automotive',
          'books',
          'sporting goods',
          'computer',
          'mens clothing',
          'womens clothing',
          'baby',
          'food',
          'medical',
        ],
      },
      {
        name: 'overHeadCost',
        type: 'input',
        message: 'What is the overhead in the new department?',
      },
    ]).then((answer) => {
      const userAddedDepartment = answer.newDepartmentName.replace(' ', '_');
      const userAddedOverHead = parseInt(answer.overHeadCost);
      connection.query('INSERT INTO departments SET ?', { department_name: userAddedDepartment, over_head_costs: userAddedOverHead });
      connection.end();
    });
}
