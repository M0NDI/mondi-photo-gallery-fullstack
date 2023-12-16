const mongoose = require("mongoose");
const UserSchema = require("../models/User");
const bcrypt = require("bcrypt");

const Login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await UserSchema.findOne({ username: new RegExp(username, "i") });

    if (!user) {
      return res.status(404).json({ error: { msg: `Invalid credentials` } });
    }

    // Compare the entered password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: { msg: `Invalid credentials` } });
    }

    // Password is valid, user is authenticated
    res.json({ msg: `Successfully logged in` });
  } catch (error) {
    // Handle errors
    console.log("Error during login:", error);
    res.status(500).json({ error: { msg: "Internal Server Error" } });
  }
};

const Register = async (req, res) => {
  const saltRounds = 10;

  const { username, password, email, imageCollection } = req.body;

  try {
    // Generate a salt
    const salt = await bcrypt.genSalt(saltRounds);

    // Hash the user's password with the generated salt
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user with the hashed password
    const createUser = await UserSchema.create({
      username: username,
      password: hashedPassword,
      email: email,
      imageCollection: [],
    });

    if (createUser) {
      res.status(201).json({ msg: "User created successfully", newUser: createUser });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: { msg: "Internal Server Error" } });
  }
};

module.exports = {
  Login,
  Register,
};
