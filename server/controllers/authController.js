const mongoose = require("mongoose");
const UserSchema = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const Login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await UserSchema.findOne({ username: new RegExp(username, "i") });

    if (!user) {
      res.status(404).json({
        status: 404,
        success: false,
        errorMessage: "User not found.",
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      res.status(400).json({
        errorMessage: "Wrong password"
      })
    }

    const token = jwt.sign(
      {
        username: user.username,
        password: user.password,
      },
      process.env.TOKEN_KEY,
      {
        expiresIn: "1d",
      }
    );

    res.status(200).json({
      status: 200,
      success: true,
      message: "Successfully logged in",
      token: token,
    });
  } catch (error) {
    console.log(error);
  }
};

const Register = async (req, res) => {
  const saltRounds = 10;

  try {
    const { username, password, email } = req.body;

    // Generate a salt
    const salt = await bcrypt.genSalt(saltRounds);

    // Hash the user's password with the generated salt
    const hashedPassword = await bcrypt.hash(password, salt);

    // validate user input
    if (!(username && password && email)) {
      res.status(400).send("Inputs cannot be empty");
    }

    // check if user exists in database
    const user = await UserSchema.findOne({ username });

    if (user) {
      return res.status(409).send("User already exists.");
    }

    // Create a new user with the hashed password
    const createUser = await UserSchema.create({
      username: username,
      password: hashedPassword,
      email: email,
      imageCollection: [],
    });

    return res.status(200).json({
      success: true,
      data: createUser,
      token,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  Login,
  Register,
};
