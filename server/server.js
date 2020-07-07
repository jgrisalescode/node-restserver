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

// Global config of routes
app.use(require("./routes/index"))

mongoose.connect(
  process.env.URLDB,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
  },
  (err, res) => {
    if (err) {
      throw err
    } else {
      console.log("Data base: " + "ONLINE".green)
    }
  }
)

app.listen(process.env.PORT, () => {
  console.log("Listening on port: " + process.env.PORT.green)
})
