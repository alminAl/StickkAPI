const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const model = mongoose.model;

const commitSchema = new Schema(
  {
    user_id: {
      type: String,
      require: true,
    },
    commit_type: {
      type: String,
    },
    bmi: {
      type: String,
    },
    numOfSmoke: {
      type: String,
    },
  },
  { timestamps: true }
);


module.exports = model("UserCommit", commitSchema);