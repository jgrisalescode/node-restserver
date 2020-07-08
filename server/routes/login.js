const express = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { OAuth2Client } = require("google-auth-library")
const client = new OAuth2Client(process.env.CLIENT_ID)
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

    let token = jwt.sign(
      {
        user: userDB
      },
      process.env.TOKEN_SEED,
      { expiresIn: process.env.TOKEN_EXPIRE_DATE }
    )

    res.json({
      ok: true,
      user: userDB,
      token
    })
  })
})

// Google settings
async function verify(token) {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.CLIENT_ID // Specify the CLIENT_ID of the app that accesses the backend
    // Or, if multiple clients access the backend:
    //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  })
  const payload = ticket.getPayload()
  return {
    name: payload.name,
    email: payload.email,
    img: payload.picture,
    google: true
  }
}

app.post("/google", async (req, res) => {
  let token = req.body.idtoken
  let googleUser = await verify(token).catch(err => {
    res.status(403).json({
      ok: false,
      err
    })
  })
  // Validations on DB when we have the Google User
  // User exists?
  User.findOne({ email: googleUser.email }, (err, userDB) => {
    if (err) {
      res.status(500).json({
        ok: false,
        err
      })
    }
    // Create the user if doesn`t have an account
    if (userDB) {
      // Is authenticated by Googgle
      if (userDB.google === false) {
        res.status(400).json({
          ok: false,
          err: {
            message: "You must use the normal authentication not Google"
          }
        })
      } else {
        // New token or update
        let token = jwt.sign(
          {
            user: userDB
          },
          process.env.TOKEN_SEED,
          { expiresIn: process.env.TOKEN_EXPIRE_DATE }
        )
        return res.json({
          ok: true,
          user: userDB,
          token
        })
      }
    } else {
      // If the user does not exist on DB
      let user = new User()
      user.name = googleUser.name
      user.email = googleUser.email
      user.img = googleUser.img
      user.google = true
      user.password = ":)"

      user.save((err, userDB) => {
        if (err) {
          return res.status(500).json({
            ok: true,
            err
          })
        }
        let token = jwt.sign(
          {
            user: userDB
          },
          process.env.TOKEN_SEED,
          { expiresIn: process.env.TOKEN_EXPIRE_DATE }
        )
        return res.json({
          ok: true,
          user: userDB,
          token
        })
      })
    }
  })
})

module.exports = app
