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

module.exports = {
  validateToken
}
