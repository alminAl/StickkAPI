const yup = require("yup");



//! user login validation
const createCommitValidation = yup.object({
  commit_type: yup.string().required(),
});




//! export validation to userRoute.js
module.exports = {
  createCommitValidation
};
