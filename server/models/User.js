const mongoose = require("mongoose");
const { Schema } = mongoose;
const validator = require("validator");

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    maxLength: 35,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: validator.isEmail,
      message: "Invalid email format",
    },
  },
  token: {
    type: String,
  },
  imageCollection: {
    type: Array,
  },
  likedPhotos: {
    type: Array,
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
