const express = require("express")
const app = express()

app.get("/user", (req, res) => {
  res.json("GET User LOCAL!!")
})

app.post("/user", (req, res) => {
  let body = req.body
  if (body.name === undefined) {
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

module.exports = app
