const { User, Thoughts } = require("../models");

const userController = {
  // get all users
  getUsers(req, res) {
    User.find()
      .select("-__v")
      .populate("friends")
      .populate("thoughts")
      .then((dbUser) => {
        res.json(dbUser);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select("-__v")
      .populate("friends")
      .populate("thoughts")
      .then((dbUser) => {
        if (!dbUser) {
          res.status(404).json({ message: "No User found with this Id" });
          return;
        }
        res.json(dbUser);
      })
      .catch((err) => {
        console.log(err);
        res.status(404).json(err);
      });
  },
  //   create user
  createUser(req, res) {
    User.create(req.body)
      .then((dbUser) => {
        res.json(dbUser);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  //   Update User
  updateUser(req, res) {
    User.findOneAndUpdate({ _id: req.params.userId }, body, {
      new: true,
      runValidators: true,
    })
      .then((dbUser) => {
        if (!dbUser) {
          res.status(404).json({ message: "No user found with this id" });
          return;
        }
        res.json(dbUser);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  //   delete user
  deleteUser(req, res) {
    User.findByIdAndDelete({ _id: req.parama.userId })
      .then((dbUser) => {
        dbUser.thoughts.forEach((thought) => {
          Thoughts.findOneAndDelete({ _id: thought })
            .then((dbThoughtData) => {
              if (!dbThoughtData) {
                res.status(500).json({ message: "There was an error" });
                return;
              }
              res.json(dbUser);
            })
            .catch((err) => {
              console.log(err);
              res.status(400).json(err);
            });
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  //   add Friend
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.UserId },
      { $addToSet: { friends: req.params.friendId } },
      { new: true, runValidators: true }
    )
      .then((dbUser) => {
        if (!dbUser) {
          res.status(404).json({ message: "No User with this id" });
          return;
        }
        res.json(dbUser);
      })
      .catch((err) => res.json(err));
  },

  //   delete friend
  removeFriend(req, res) {
    User.findByIdAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { new: true }
    )
      .then((dbUser) => {
        if (!dbUser) {
          return res.status(404).json({ message: "No user with this id" });
        }
        res.json(dbUser);
      })
      .catch((err) => res.json(err));
  },
};

module.exports = userController;
