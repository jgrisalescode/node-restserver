require("./config/config")
const express = require("express")
const mongoose = require("mongoose")
const colors = require("colors")
const app = express()
const bodyParser = require("body-parser")

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(require("./routes/user"))

mongoose.connect("mongodb://localhost:27017/cafe", (err, res) => {
  if (err) {
    throw err
  } else {
    console.log("Data base" + " ONLINE".green)
  }
})

app.listen(process.env.PORT, () => {
  console.log("Listening on port: " + process.env.PORT.green)
})
