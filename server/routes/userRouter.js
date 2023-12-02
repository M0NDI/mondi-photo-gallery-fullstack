const express = require("express");
const router = express.Router();

const { GetAllUsers, GetSingleUser, UpdateUser } = require("../controllers/usersController");

router.route("/").get(GetAllUsers).post(UpdateUser);
router.route("/:username").get(GetSingleUser);

module.exports = router;