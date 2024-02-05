const mongoose = require("mongoose");
const { Schema } = mongoose;

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
  },
  role: {
    type: String,
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
