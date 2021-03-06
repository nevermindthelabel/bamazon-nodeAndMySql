# bamazon-nodeAndMySql

## Overview

We where tasked with creating an Amazon style app using [node.js](https://nodejs.org) in the terminal and [MySQL](https://www.mysql.com/) as a database to store our data in. There are three different levels with in the app, the first one is required and the next two are optional. In the initial level, the app will take orders from a customer and deplete stock from our inventory. This code can be viewed in the [JavaScript file](https://github.com/nevermindthelabel/bamazon-nodeAndMySql/blob/master/bamazonCustomer.js), the [products](https://github.com/nevermindthelabel/bamazon-nodeAndMySql/blob/master/products.sql) and the [database schema](https://github.com/nevermindthelabel/bamazon-nodeAndMySql/blob/master/bamazon.sql). 

Using the [npm modules](https://www.npmjs.com/) for [MySQL](https://www.npmjs.com/package/mysql) (database connections and queries), [inquirer](https://www.npmjs.com/package/inquirer) (interacting with the user), and [cli-table3](https://www.npmjs.com/package/cli-table3) (creating pretty tables to display the data) we where able to create an interactive app that can display all aspects of the store, from an error message to the customer if the requested product is no longer in stock to a complete supervisor view of the store and each department's profit margins.

This is a back end only app, so I have included a link to my [YouTube Chanel](https://youtu.be/ZraA0RovQqY?t=7) to see it in action.
