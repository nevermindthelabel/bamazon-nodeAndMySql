
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
    head: ['department_id',
      'department_name',
      'over_head_costs',
      'product_sales',
      'total_profit'],
    colWidths: [15],
  });
  connection.query('SELECT departments.department_id,products.department_name, products.over_head_costs, products.product_sales FROM departments INNER JOIN products ON departments.department_name=departments.department_name', (error, results) => {
    if (error) {
      console.log(error);
    } for (let i = 0; i < results.length; i++) {
      console.log(`
      ${results[i].department_id},
      ${results[i].department_name},
      ${results[i].over_head_costs}
      `);
      const id = results[i].department_id;
      const name = results[i].department_name;
      const cost = results[i].over_head_costs;
      table.push([id, name, cost]);
      console.log(table.toString());
    }
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
    ]).then((answer) => {
      const userAddedDepartment = answer.newDepartmentName;
      connection.query(`INSERT INTO departments (department_name, over_head_costs) VALUES (${userAddedDepartment, 0})`);
      connection.end();
    });
}
