require("dotenv").config();
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel.js");

const userRequireAuth = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    res.status(401).send({ message: "Unauthorized User" });
  }

  if (authorization && authorization.startsWith("Bearer")) {
    try {
      const token = authorization.split(" ")[1];
      const { _id } = jwt.verify(token, process.env.MY_SECRET_TOKEN);
      req.user = await userModel.findById({ _id });
      next();
    } catch (error) {
      res.status(401).send({ message: "Unauthorized access" });
    }
  }
};

module.exports = userRequireAuth;
