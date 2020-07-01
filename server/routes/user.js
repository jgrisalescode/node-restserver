const express = require("express")
const app = express()
const User = require("../models/user")

app.get("/user", (req, res) => {
  res.json("GET User LOCAL!!")
})

app.post("/user", (req, res) => {
  let body = req.body
  let user = new User({
    name: body.name,
    email: body.email,
    password: body.password,
    role: body.role
  })

  user.save((err, userDB) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err
      })
    }
    res.json({
      ok: true,
      user: userDB
    })
  })
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

module.exports = app
