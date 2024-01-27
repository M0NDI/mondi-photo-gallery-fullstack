const express = require("express");
const router = express.Router();

const { authenticateUser } = require("../utils/authenticate");
const { authorizeUserPermissions } = require("../utils/authenticate");

const {
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  showCurrentUser,
  updateUserPassword,
} = require("../controllers/usersController");

router.route("/showCurrentUser").get(authenticateUser, showCurrentUser);
router.route("/updateUserPassword").patch(authenticateUser, updateUserPassword);

router
  .route("/")
  .get(authenticateUser, authorizeUserPermissions("admin"), getAllUsers)
  .patch(authenticateUser, updateUser)
  .delete(authenticateUser, authorizeUserPermissions("admin"), deleteUser);

router.route("/:username").get(getSingleUser);

module.exports = router;