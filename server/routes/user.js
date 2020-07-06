const express = require("express")
const app = express()
const bcrypt = require("bcrypt")
const _ = require("underscore")
const User = require("../models/user")

app.get("/user", (req, res) => {
  let from = req.query.from || 0
  from = Number(from)

  let limit = req.query.limit || 5
  limit = Number(limit)

  User.find({ active: true }, "name email role google active img")
    .skip(from)
    .limit(limit)
    .exec((err, users) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err
        })
      }
      User.count({ active: true }, (err, count) => {
        res.json({
          ok: true,
          users,
          count
        })
      })
    })
})

app.post("/user", (req, res) => {
  let body = req.body
  let user = new User({
    name: body.name,
    email: body.email,
    password: bcrypt.hashSync(body.password, 10),
    role: body.role
  })

  user.save((err, userDB) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err
      })
    }
    // userDB.password = null
    res.json({
      ok: true,
      user: userDB
    })
  })
})

app.put("/user/:id", (req, res) => {
  let id = req.params.id

  // One way to validate what fileds update or not
  // But we`ll use underscore.js to performe this feature
  // delete body.password
  // delete body.google
  let body = _.pick(req.body, ["name", "email", "img", "role", "active"])

  User.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, userDB) => {
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

app.delete("/user/:id", (req, res) => {
  let id = req.params.id
  let inactivateUser = {
    active: false
  }
  User.findByIdAndUpdate(id, inactivateUser, { new: true }, (err, deletedUser) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err
      })
    }
    if (!deletedUser) {
      return res.status(400).json({
        ok: false,
        err: {
          message: "User not found"
        }
      })
    }
    res.json({
      ok: true,
      deletedUser
    })
  })
})

module.exports = app
