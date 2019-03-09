//require mysql and inquirer

var mysql = require("mysql");
var inquier = require("inquirer");

//create connection
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "12323Moose",
  database: "bamazon"
});

// initialize app and query the database for all products

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  queryAllProducts();
  findRemainingInventory();
});

function queryAllProducts() {
  connection.query("SELECT * FROM products", function (err, res) {
    for (var i = 0; i < res.length; i++) {
      console.log(res[i].item_id + " | " + res[i].product_name + " |  " + res[i].price);
    }
    console.log("-----------------------------------");

    // inquire about ID and quantity

    inquier
      .prompt([{
        name: "productID",
        type: "input",
        message: "What is the product_id of the item you would like to purchase?"
      },
      {
        name: "howMuch",
        type: "input",
        message: "What is the quantity you would like to purchase?"
      }])

      // Determine the product chosen - does it need to be converted to INT from string? 
      .then(function (inquirerResponse) {
        var chosenProduct;
        for (var i = 0; i < res.length; i++) {
          if (res[i].item_id === parseInt(inquirerResponse.productID)) {
            chosenProduct = res[i];
            chosenProductID = chosenProduct.productID;

            //  Logging the product as JSON object
            console.log(chosenProduct);

            // Var for customer inquirer response
            var customerWants = parseInt(inquirerResponse.howMuch);
            // Available from DB
            var availableDatabaseInventory = chosenProduct.stock_quantity
            console.log(availableDatabaseInventory);
            if (availableDatabaseInventory > customerWants) {
              var itemsRemaining = availableDatabaseInventory - customerWants;
              console.log("The itemsRemaining are: ", itemsRemaining);

          connection.query(
            "UPDATE products SET ? WHERE ?",
            ([
              {
                  stock_quantity: itemsRemaining)
                  },
        {
          product_id: chosenProductID
        }
                ]);
    // function () {

  }
  );
}
              // If not available, return error and console log
            else if (availableInventory <= customerNumber) {
  console.log("Invalid request - Not enough inventory");
}

function findRemainingInventory() {
  console.log("The remaining stock_quantity is: ", chosenProduct.stock_quantity);

}}})})})};
};
        // Should add some else statement to log error if above ID 13


        // Check if inventory is available for the product



        // // If available, Use minus to update the database

        // // Console log the cost to the user

        // // Show the full database again? 

        //       if (chosenProduct)

        //   

      
 


