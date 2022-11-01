require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userModel = require("../models/userModel.js");

//! create token
const createToken = (_id) => {
  return jwt.sign({ _id }, `${process.env.MY_SECRET_TOKEN}`, {
    expiresIn: "3d",
  });
};

//! secure password method
const securePassword = async (password) => {
  try {
    const passwordHash = await bcrypt.hash(password, 10);
    return passwordHash;
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

//! sign up controller
const signUpUser = async (req, res) => {
  // get user Information
  const { userName, mobile, email, password, about, isAdmin } = req.body;

  try {
    const user = await userModel.signup(
      userName,
      mobile,
      email,
      password,
      about,
      isAdmin
    );
    const token = createToken(user._id);
    res.status(201).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// ! login controller
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.login(email, password);
    const token = createToken(user._id);
    const userName = user.userName;
    res.status(201).json({ email, token, userName });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//! get user profile
const userProfile = async (req, res) => {
  try {
    const user_id = req.user;
    const user = await userModel.findById(user_id).select("-password");
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//! update user profile
const updateUser = async (req, res) => {
  const user_id = req.user;
  const { userName, email, mobile, profileImg, about } = req.body;
  try {
    const user = await userModel
      .findOneAndUpdate(
        { _id: user_id },
        {
          userName,
          email,
          mobile,
          about,
          profileImg,
        },
        {
          returnOriginal: false,
        }
      )
      .select("-password");
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//! change password
const changePassword = async (req, res) => {
  try {
    const user_id = req.user;
    const password = req.body.password;

    const newPassword = await securePassword(password);

    const user = await userModel.findOneAndUpdate(
      { _id: user_id },
      {
        $set: {
          password: newPassword,
        },
      },
      {
        new: true,
        upsert: true,
      }
    );
    res.status(200).json({ user, message: "Password change successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//! export all controller to userRoute.js
module.exports = {
  signUpUser,
  loginUser,
  userProfile,
  updateUser,
  changePassword,
};
