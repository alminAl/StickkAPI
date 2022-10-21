const express = require("express");
const { signUpUser, loginUser } = require("../controllers/userControllers.js");
const router = express();
const validation = require("../middlewares/validationMiddleware.js");
const {
  userSignUpValidation,
  userLoginValidation,
} = require("../validations/userValidation.js");

//! signUp router
router.post("/signup", validation(userSignUpValidation), signUpUser);

//! login router
router.post("/login", validation(userLoginValidation), loginUser);

// ! export router to server.js
module.exports = router;
