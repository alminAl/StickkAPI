require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

//! import router
const userRouter = require("./routers/userRoute.js");
const userProfileRouter = require("./routers/userProfileRoute.js");

// ! express app
const app = express();

//! middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));

//! server route
app.get("/", async (req, res) => {
  res.json({api:"hello from stickk server 📕"});
});

//! use router
app.use("/api/auth", userRouter);
app.use("/api/user/profile", userProfileRouter);

//! mongoose connect to database
mongoose
  .connect(`${process.env.MONGODB_CONNECTION}`)
  .then(() => {
    // console.log("database connected");
    const port = process.env.PORT || 4000;
    app.listen(port, () => {
      console.log(`server is running: ${port} 😎`);
    });
  })
  .catch((err) => {
    console.log(err.message);
  });
