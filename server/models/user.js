const mongoose = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")

let Schema = mongoose.Schema
let validRoles = {
  values: ["ADMIN_ROLE", "USER_ROL"],
  message: "{VALUE} not a valid role"
}

let userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"]
  },
  email: {
    type: String,
    unique: true,
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
    default: "USER_ROLE",
    enum: validRoles
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

// Using plugin mongoose-unique-validator
userSchema.plugin(uniqueValidator, {
  message: "{PATH} must be unique"
})

module.exports = mongoose.model("User", userSchema)
