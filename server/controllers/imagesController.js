const mongoose = require("mongoose");
const User = require("../models/User");

// ADD IMAGE TO LIKED ARRAY
const addImageToLiked = async (req, res) => {
  try {
    const { username } = req.user;
    const { likedPhoto } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ ERR: "Cannot add image to liked. User not found." });
    }
    if (!likedPhoto) {
      return res.status(400).json({ ERR: "Bad request. No data was posted" });
    }

    const existingLikedPhoto = user.likedPhotos.find((photo) => photo.id === likedPhoto.id);

    if (!existingLikedPhoto) {
      // Add the image to the likedPhotos array
      user.likedPhotos.push(likedPhoto);

      // Save the updated user document in the database
      await user.save();

      return res.status(200).json({ message: "Image added to liked successfully." });
    } else {
      // Liked photo with the same id already exists
      return res
        .status(409)
        .json({ ERR: "Image with the same id already exists in liked photos." });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ ERR: "Internal server error" });
  }
};

// REMOVE IMAGE FROM LIKED ARAY
const removeLikedImage = async (req, res) => {
  try {
    const { imageToRemove } = req.body;
    const { username } = req.user;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ ERR: "User not found, cannot remove liked image." });
    }

    // Find the index of the imageToRemove.id in the likedPhotos array
    const indexToRemove = user.likedPhotos.findIndex((photo) => photo.id === imageToRemove.id);

    // If the image is found in the array, remove it
    if (indexToRemove !== -1) {
      user.likedPhotos.splice(indexToRemove, 1);

      // Save the updated user document in the database
      await user.save();

      return res.status(200).json({ SUCCESS: true, message: "Liked image removed successfully." });
    } else {
      return res.status(400).json({ ERR: "Image not found in the likedPhotos array." });
    }
  } catch (error) {
    console.error("Error removing liked image:", error);
    return res.status(500).json({ ERR: "Internal Server Error" });
  }
};

// SHOW USER LIKED IMAGES
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

module.exports = { addImageToLiked, removeLikedImage, showCurrentUserLikedImages };
