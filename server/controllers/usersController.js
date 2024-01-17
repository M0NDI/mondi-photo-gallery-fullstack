const mongoose = require("mongoose");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const createTokenUser = require("../utils/createTokenUser");
const { attachCookiesToResponse } = require("../utils/jwt");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorMsg: "Internal Server Error" });
  }
};

const getSingleUser = async (req, res) => {
  console.log(req.user);
  const { username } = req.params;

  try {
    const user = await User.findOne({ username: new RegExp(username, "i") });

    if (user !== null) {
      res.status(200).json({ msg: `User found`, requestedUser: user });
    } else {
      return res.status(404).json({ errorMsg: { msg: "User not found" } });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorMsg: "Internal Server Error" });
  }
};

const updateUser = async (req, res) => {
  const { username, email } = req.body;
  if (!username || !email) {
    return res.status(400).json({ ERR: "Username or email field cannot be empty" });
  }
  const user = await User.findOneAndUpdate(
    { _id: req.user.id },
    { username, email },
    { new: true, runValidators: true }
  );
  const tokenUser = createTokenUser(user);
  attachCookiesToResponse({ res, user: tokenUser });
  res.status(200).json({ success: "User updated successfully." });
};

const deleteUser = async (req, res) => {
  const { username } = req.body;

  try {
    const deleteUser = await User.findOneAndDelete({ username });

    if (!deleteUser) {
      return res.status(404).json({ msg: "Cannot delete user. User not found." });
    }
    res.status(200).json({ msg: "User deleted." });
  } catch (error) {
    console.log(error);
  }
};

const updateUserPassword = async (req, res, next) => {
  const { username, oldPassword, newPassword } = req.body;
  try {
    const findUser = await User.findOne({ username });

    if (!findUser) {
      return res.status(404).json({ ERR: "User not found, cannot change password." });
    }
    if (!oldPassword || !newPassword || !username) {
      return res
        .status(400)
        .json({ ERR: "Please provide your username, old password and new password." });
    }

    const validateOldPassword = await bcrypt.compare(oldPassword, findUser.password);
    if (!validateOldPassword) {
      return res.status(401).json({ ERR: "Given password and existing password do not match." });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    const filterObject = { username };
    const updateDataObject = { password: hashedNewPassword };

    await User.findOneAndUpdate(filterObject, updateDataObject);

    res.status(200).json({ success: "Password successfully changed!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ ERR: error });
  }
};

const showCurrentUser = (req, res) => {
  try {
    const currentUser = req.user;
    if (!currentUser) {
      return res.status(401).json({ ERR: "There is no current user.", statusCode: 401 });
    } else {
      res.status(200).json({ user: req.user });
    }
  } catch (error) {
    console.log(error);
  }
};

const showCurrentUserLikedImages = async (req, res) => {
  const { username } = req.user;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      console.log("User not found");
      return res.status(404).json({ ERR: "Cannot get likedImages. User not found." });
    } else {
      console.log("Current user's liked photos:", user.likedPhotos);
      res.status(200).json({ likedImages: user.likedPhotos });
    }
  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({ ERR: "Internal Server Error" });
  }
};

module.exports = {
  getAllUsers,
  getSingleUser,
  deleteUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
  showCurrentUserLikedImages,
};
