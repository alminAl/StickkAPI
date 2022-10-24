const yup = require("yup");

//! user signUp validation
const userSignUpValidation = yup.object({
  userName: yup.string().required(),
  mobile: yup.string().min(11).max(11).required(),
  email: yup.string().email().required(),
  password: yup.string().min(6).max(12).required(),
  about: yup.string().max(100).required(),
});

//! user login validation
const userLoginValidation = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(4).max(8).required(),
});

//! user update validation
const userUpdateValidation = yup.object({
  userName: yup.string().required(),
  mobile: yup.string().min(11).max(11).required(),
  email: yup.string().email().required(),
  about: yup.string().max(100).required(),
});

//! change password validation
const passwordValidation = yup.object({
  password: yup.string().min(4).max(8).required(),
});

//! export validation to userRoute.js
module.exports = {
  userSignUpValidation,
  userLoginValidation,
  userUpdateValidation,
  passwordValidation,
};
