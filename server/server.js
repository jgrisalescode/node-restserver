const express = require("express")
const app = express()

app.get("/", (req, res) => {
  res.json({
    message: "Hello World!",
    user: "Julian"
  })
})

app.listen(3000, () => {
  console.log("Listening on port 3000")
})
