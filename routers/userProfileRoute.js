const express = require("express");
const {
  userProfile,
  updateUser,
  changePassword,
} = require("../controllers/userControllers.js");

const userRequireAuth = require("../middlewares/userRequireAuth.js");
const validation = require("../middlewares/validationMiddleware.js");
const {
  userUpdateValidation,
  passwordValidation,
} = require("../validations/userValidation.js");

//! express router
const userProfileRoutes = express();
userProfileRoutes.use(userRequireAuth);

//! get user
userProfileRoutes.get("/", userProfile);

//! update user
userProfileRoutes.patch("/", updateUser);

//! change password
userProfileRoutes.post(
  "/change_password",
  validation(passwordValidation),
  changePassword
);

//! export modules
module.exports = userProfileRoutes;
