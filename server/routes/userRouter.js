const express = require("express");
const router = express.Router();

const {
  GetAllUsers,
  GetSingleUser,
  UpdateUser,
  DeleteUser,
} = require("../controllers/usersController");

router.route("/").get(GetAllUsers).patch(UpdateUser).delete(DeleteUser);
router.route("/:username").get(GetSingleUser);

module.exports = router;
