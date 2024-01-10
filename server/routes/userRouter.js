const express = require("express");
const router = express.Router();

const authenticateUser = require('../utils/authenticate')

const {
  GetAllUsers,
  GetSingleUser,
  UpdateUser,
  DeleteUser,
} = require("../controllers/usersController");

router.route("/").get(authenticateUser, GetAllUsers).patch(UpdateUser).delete(DeleteUser);
router.route("/:username").get(authenticateUser, GetSingleUser);

module.exports = router;
