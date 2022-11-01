const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const model = mongoose.model;
const bcrypt = require("bcrypt");

const userSchema = new Schema(
  {
    userName: {
      type: String,
      require: true,
    },
    mobile: {
      type: String,
      require: true,
      // unique: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    about: {
      type: String,
      require: true,
    },
    profileImg: {
      type: String,
      require: true,
    },
    isAdmin: {
      type: Boolean,
      require: true,
    },
  },
  { timestamps: true }
);

//! static function for signup
userSchema.statics.signup = async function (
  userName,
  mobile,
  email,
  password,
  profileImg,
  about
) {
  // check existing email
  const existEmail = await this.findOne({ email });
  if (existEmail) {
    throw new Error("Email already used");
  }

  // random password generate with hash
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  // create user
  const user = await this.create({
    userName,
    mobile,
    email,
    password: hash,
    profileImg,
    about,
  });

  return user;
};

//! static function for login
userSchema.statics.login = async function (email, password) {
  // check empty field
  if (!email || !password) {
    throw new Error("email or password must be required");
  }

  // check user is authentic
  const user = await this.findOne({ email });
  if (!user) {
    throw new Error("Invalid Actions");
  }

  // check user password
  const passMatch = await bcrypt.compare(password, user.password);
  if (!passMatch) {
    throw new Error("Invalid Actions");
  }

  return user;
};

// export userModel to userController
module.exports = model("user", userSchema);
