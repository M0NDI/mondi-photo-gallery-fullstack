const mongoose = require("mongoose");
const UserSchema = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { createJwt, isTokenValid, attachCookiesToResponse } = require("../utils/jwt");
require("dotenv").config();

const Register = async (req, res) => {
  const saltRounds = 10;

  try {
    let { username, password, email, role } = req.body;

    // Generate a salt
    const salt = await bcrypt.genSalt(saltRounds);

    // Hash the user's password with the generated salt
    const hashedPassword = await bcrypt.hash(password, salt);

    // validate user input
    if (!(username && password && email)) {
      return res.status(400).send("Inputs cannot be empty");
    }

    // check if user exists in database
    const user = await UserSchema.findOne({ username });

    if (user) {
      return res.status(409).send("User already exists.");
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

    const tokenUser = {
      username: createUser.username,
      email: createUser.email,
      id: createUser._id,
    };
    const token = createJwt({ payload: tokenUser });

    res.status(200).json({
      status: 200,
      success: true,
      message: "Successfully registered",
      user: tokenUser,
    });
  } catch (error) {
    console.log(error);
  }
};

const Login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.json({ ERROR: "Please provide email and password" });
    }

    const user = await UserSchema.findOne({ username: new RegExp(username, "i") });
    if (!user) {
      return res.status(404).json({
        status: 404,
        success: false,
        errorMessage: "User not found.",
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        status: 400,
        success: false,
        errorMessage: "Wrong password",
      });
    }

    const tokenUser = { username: user.username, email: user.email, role:user.role, id: user._id };
    attachCookiesToResponse({ res, user: tokenUser });
  } catch (error) {
    console.log(error);
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
