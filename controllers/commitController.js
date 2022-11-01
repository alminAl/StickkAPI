const commitModel = require("../models/commitModel");

// create
const createCommit = async (req, res) => {
  try {
    const { commit_type, bmi, numOfSmoke } = req.body;
    const user = req.user;
    const commit = await commitModel.create({
      create_by: user,
      commit_type,
      bmi,
      numOfSmoke,
    });
    res.status(201).json(commit);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllCommit = async (req, res) => {
  try {
    const commit = await commitModel.find({});
    res.status(200).json(commit);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createCommit,
  getAllCommit,
};
