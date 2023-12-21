const express = require("express");
const router = express.Router();

const { GetAllUsers, GetSingleUser, UpdateUser, DeleteUser } = require("../controllers/usersController");

router.route("/").get(GetAllUsers).patch(UpdateUser);
router.route("/:username").get(GetSingleUser).delete(DeleteUser);

module.exports = router;