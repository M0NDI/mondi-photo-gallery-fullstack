const mongoose = require("mongoose");
const UserSchema = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { createJwt, isTokenValid, attachCookiesToResponse } = require("../utils/jwt");
const createTokenUser = require("../utils/createTokenUser");
require("dotenv").config();
const validator = require("validator");

const Register = async (req, res) => {
  const saltRounds = 10;

  try {
    let { username, password, email, role } = req.body;

    // Generate a salt
    const salt = await bcrypt.genSalt(saltRounds);

    // Hash the user's password with the generated salt
    const hashedPassword = await bcrypt.hash(password, salt);

    // validate user input
    if (!username || !password || !email) {
      return res.status(400).json({ ERR: "Inputs cannot be empty", statusCode: 400 });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({ ERR: "Password must be at least 8 characters", statusCode: 400 });
    }

    if (!validator.isAlphanumeric(username)) {
      return res.status(400).json({ ERR: "Name cannot contain only numbers" });
    }

    // Check if the username contains at least one letter
    if (!username.match(/[a-zA-Z]/)) {
      return res.status(400).json({ ERR: "Name must contain at least one letter" });
    }

    if (!validator.isEmail(email)) {
      // If email is not in a valid format, return a 400 Bad Request response
      return res.status(400).json({ ERR: "Email format is not valid" });
    }

    // check if user exists in database
    const user = await UserSchema.findOne({ username: username });

    if (user) {
      return res.status(409).json({ ERR: "Username is already taken", status: 409 });
    }

    let userCount = await UserSchema.countDocuments({});
    if (userCount == 0) {
      role = "admin";
    } else {
      role = "user";
    }

    // Create a new user with the hashed password
    const createUser = await UserSchema.create({
      username,
      password: hashedPassword,
      email,
      role,
      imageCollection: [],
    });

    const tokenUser = createTokenUser(createUser);
    const token = createJwt({ payload: tokenUser });

    res.status(200).json({
      status: 200,
      success: true,
      message: "Successfully registered",
      user: tokenUser,
    });
  } catch (error) {
    console.error(error);
  }
};

const Login = async (req, res) => {
  try {
    const { username, password } = req.body;
    // validate user input
    if (!username || !password) {
      return res.status(400).json({ ERR: "Inputs cannot be empty", statusCode: 400 });
    }

    const user = await UserSchema.findOne({ username });
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!user || !isPasswordMatch) {
      return res.status(404).json({
        status: 404,
        success: false,
        ERR: "Wrong username or password",
      });
    }

    const tokenUser = createTokenUser(user);
    attachCookiesToResponse({ res, user: tokenUser });
    res.status(200).json({ success: "User logged in", user: user.username, success: true });
  } catch (error) {
    console.error(error);
  }
};

const Logout = async (req, res) => {
  await res.clearCookie("token");
  res.status(200).json({ msg: "User logged out" });
};

module.exports = {
  Login,
  Register,
  Logout,
};
