const express = require("express");
const { signup, login, logout } = require("../controllers/authControllers");
const router = express.Router();

const validate = require("../middlewares/validateMiddleware");
const { signupSchema, loginSchema } = require("../utils/authValidation");

router.post("/signup", validate(signupSchema), signup);
router.post("/login", validate(loginSchema), login);
router.post("/logout", logout);

module.exports = router;
