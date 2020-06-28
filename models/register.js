const mongoose = require("mongoose");

const registerSchema = new mongoose.Schema(
  {
    firstname: { type: String },
    lastname: { type: String },
    mobile: { type: String },
    email: { type: String },
    password: { type: String, required: true },
    username: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("Register", registerSchema);
