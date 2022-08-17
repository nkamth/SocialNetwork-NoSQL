const { User } = require("../models");

const userController = {
  getUsers(req, res) {
    User.find()
      .select("-__v")
      .then((dbUser) => {
        res.json(dbUser);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select("-__v")
      .populate("friends")
      .populate("thoughts")
      .then((dbUser) => {
        res.json(dbUser);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  createUser(req, res) {
    User.create(req.body)
    .then((dbUser) => {
        res.json(dbUser);
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

module.exports = userController;
