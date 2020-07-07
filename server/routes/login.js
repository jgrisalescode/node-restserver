const express = require("express")
const bcrypt = require("bcrypt")
const User = require("../models/user")
const app = express()

app.post("/login", (req, res) => {
  let body = req.body
  User.findOne({ email: body.email }, (err, userDB) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err
      })
    }

    if (!userDB) {
      console.log("User invalid")
      return res.status(400).json({
        ok: false,
        err: {
          message: "User or password invalids"
        }
      })
    }

    if (!bcrypt.compareSync(body.password, userDB.password)) {
      console.log("Password invalid")
      return res.status(400).json({
        ok: false,
        err: {
          message: "User or password invalids"
        }
      })
    }

    res.json({
      ok: true,
      user: userDB,
      token: 123
    })
  })
})

module.exports = app
