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

app.get("/user", (req, res) => {
  res.json("GET User")
})

app.post("/user", (req, res) => {
  let body = req.body
  if (body.nombre === undefined) {
    res.status(400).json({
      ok: false,
      message: "name is required"
    })
  } else {
    res.json({ persona: body })
  }
})

app.put("/user/:id", (req, res) => {
  let id = req.params.id
  res.json({
    id
  })
})

app.delete("/user", (req, res) => {
  res.json("DELETE User")
})

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
