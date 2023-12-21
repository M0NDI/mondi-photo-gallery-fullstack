const mongoose = require("mongoose");
const User = require("../models/User");
const bcrypt = require("bcrypt");

const GetAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorMsg: "Internal Server Error" });
  }
};

const GetSingleUser = async (req, res) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({ username: new RegExp(username, "i") });
    if (user !== null) {
      res.status(200).json({ msg: `User created successfully!`, newUser: user });
    } else {
      res.status(404).json({ errorMsg: { msg: "User not found" } });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorMsg: "Internal Server Error" });
  }
};

const UpdateUser = async (req, res) => {
  const { username, newPassword, newUsername } = req.body;

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

  const filter = { username };
  const updateData = { password: hashedPassword, username: newUsername };

  try {
    const updatedUser = await User.findOneAndUpdate(filter, updateData, { new: true });

    if (updatedUser) {
      res.json({ msg: "User details updated successfully", updatedUser });
    } else {
      res.status(404).json({ error: { msg: "User not found" } });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error updating user details" });
  }
};

const DeleteUser = async (req, res) => {
  const { username } = req.body;

  try {
    const deleteUser = await User.findOneAndDelete({ username });
    if (deleteUser) {
      res.status(200).json({ msg: "User deleted." });
    } else if (!deleteUser) {
      res.status(404).json({ msg: "Cannot delete user. User not found." });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  GetAllUsers,
  GetSingleUser,
  UpdateUser,
  DeleteUser,
};
