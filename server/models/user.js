const mongoose = require("mongoose")

let Schema = mongoose.Schema

let userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"]
  },
  email: {
    type: String,
    required: [true, "Email is needed"]
  },
  password: {
    type: String,
    required: [true, "You must provide a password"]
  },
  img: {
    type: String,
    required: false
  },
  role: {
    type: String,
    default: "USER_ROLE"
  },
  active: {
    type: Boolean,
    default: true
  },
  google: {
    type: Boolean,
    default: false
  }
})

module.exports = mongoose.model("User", userSchema)
