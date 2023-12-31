const express = require("express");
const router = express.Router();

const {Login, Register, Logout} = require('../controllers/authController')

router.post("/login", Login);
router.post("/register", Register);
router.get('/logout', Logout)

module.exports = router;