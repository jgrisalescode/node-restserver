/**
 * Validate Token
 */

const jwt = require("jsonwebtoken")

let validateToken = (req, res, next) => {
  // Get the token from header of request
  let token = req.get("token")
  jwt.verify(token, process.env.TOKEN_SEED, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        ok: false,
        err
      })
    }
    req.user = decoded.user
    next()
  })
}

let validateUserRole = (req, res, next) => {
  let user = req.user
  if (user.role === "ADMIN_ROLE") {
    next()
  } else {
    return res.status(401).json({
      ok: false,
      err: {
        message: "You moust be ADMIN User"
      }
    })
  }
}

module.exports = {
  validateToken,
  validateUserRole
}
