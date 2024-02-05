const express = require("express");
const router = express.Router();

const { authenticateUser } = require("../utils/authenticate");
// const { authorizeUserPermissions } = require("../utils/authenticate");

const {
  showCurrentUserLikedImages,
  addImageToLiked,
  removeLikedImage,
} = require("../controllers/imagesController");

router.route("/showCurrentUserLikedImages").get(authenticateUser, showCurrentUserLikedImages);
router.route("/addImageToLiked").post(authenticateUser, addImageToLiked);
router.route("/removeLikedImage").post(authenticateUser, removeLikedImage);

module.exports = router;