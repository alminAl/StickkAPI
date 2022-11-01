const express = require("express");
const { createCommit, getAllCommit } = require("../controllers/commitController");
const userRequireAuth = require("../middlewares/userRequireAuth");
const validation = require("../middlewares/validationMiddleware");
const { createCommitValidation } = require("../validations/commitValidation");


//! express router
const commitRouter = express();
commitRouter.use(userRequireAuth);

commitRouter.get('/', getAllCommit)
commitRouter.post("/", validation(createCommitValidation), createCommit);


module.exports = commitRouter;
