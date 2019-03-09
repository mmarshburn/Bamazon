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
  console.log(("connected as id " + connection.threadId) + "\n");
  queryAllProducts(); 
});

function queryAllProducts() {
  connection.query("SELECT * FROM products", function (err, res) {
    for (var i = 0; i < res.length; i++) {
      console.log(res[i].item_id + " | " + res[i].product_name + " |  " + res[i].price);
    }
    console.log("\n-----------------------------------\n");

    // inquire about ID and quantity

    inquier
      .prompt([{
        name: "productID",
        type: "input",
        message: "What is the product_id of the item you would like to purchase?\n"
      },
      {
        name: "howMuch",
        type: "input",
        message: "What is the quantity you would like to purchase?\n"
      }])

      // Determine the product chosen - does it need to be converted to INT from string? 
      .then(function (inquirerResponse) {
        var chosenProduct;
        for (var i = 0; i < res.length; i++) {
          if (res[i].item_id === parseInt(inquirerResponse.productID)) {
            chosenProduct = res[i];
            chosenProductPrice = res[i].price;
            chosenProductID = res[i].item_id;

            //  Logging the product as JSON object
        //    console.log(chosenProduct);
          //  console.log(chosenProductID)

            // Var for customer inquirer response
            var customerWants = parseInt(inquirerResponse.howMuch);
            // Available from DB
            var availableDatabaseInventory = chosenProduct.stock_quantity
           // console.log(availableDatabaseInventory);
            if (availableDatabaseInventory > customerWants) {
              var itemsRemaining = availableDatabaseInventory - customerWants;
              console.log("Stock quantity is now: ", itemsRemaining +"\n");
              
               function findRemainingInventory() {
                  connection.query(
                    "UPDATE products SET ? WHERE ?",
                    [
                      {
                        stock_quantity: itemsRemaining
                      },
                      {
                        item_id: chosenProductID
                      }
                    ]); 

                  // Below log not displaying correct value but database is updating
                  // console.log("The remaining stock_quantity is: ", chosenProduct.stock_quantity);
                };

                findRemainingInventory(); 

                function calculateCost() {
                  var userCost = customerWants * chosenProductPrice; 
                  console.log("Please pay $" + parseFloat(userCost) + "\n"); 
                  console.log("-------------------------------------------")
                  console.log("\n Thank you for shopping with us!")
                  connection.end(); 
                }; 
                
                calculateCost(); 
            };
          }
          // If not available, return error and console log
          else if (availableDatabaseInventory <= customerWants) {
            console.log("Invalid request - Not enough inventory");
          }
        }
      })

      })};
      
      
