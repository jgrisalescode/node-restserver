const dotenv = require("dotenv").config()
// Port
process.env.PORT = process.env.PORT || 3000
// Enviroment
process.env.NODE_ENV = process.env.NODE_ENV || "dev"
// Database
let urlDB
if (process.env.NODE_ENV === "dev") {
  urlDB = "mongodb://localhost:27017/cafe"
} else {
  urlDB = process.env.CONNECTIONSTRING
}
process.env.URLDB = urlDB
