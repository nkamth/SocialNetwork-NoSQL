const { Thoughts, User } = require("../models");

const thoughtsControllers = {
  // get all thoughts
  getThoughts(req, res) {
    Thoughts.find({})
      .select("-__v")
      .populate("reactions")
      .then((dbThoughts) => {
        res.json(dbThoughts);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // get single though by id
  getThoughtsById(req, res) {
    Thoughts.findOne({ _id: req.params.id })
      .select("-__v")
      .populate("reactions")
      .then((dbThoughts) => {
        if (!dbThoughts) {
          res.status(404).json({ message: "No thought with this id" });
          return;
        }
        res.json(dbThoughts);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // create thought
  createThoughts(req, res) {
    Thoughts.create(req.body)
      // push the created thought's _id to the associated user's thoughts array field
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then((dbUser) => {
        if (!dbUser) {
          res
            .status(404)
            .json({ message: "Thought created but no user with this id" });
          return;
        }
        res.json(dbUser);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  //update thought
  updateThoughts(req, res) {
    Thoughts.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
      runValidators: true,
    })
      .then((dbThoughts) => {
        if (!dbThoughts) {
          res.status(404).json({ message: "No thought found with this id" });
          return;
        }
        res.json(dbThoughts);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  //   delete Thoughts
  deleteThoughts(req, res) {
    Thoughts.findOneAndDelete({ _id: req.params.id })
      .then(({ username }) => {
        return User.findOneAndUpdate(
          { username: username },
          { $pull: { thoughts: req.params.id } },
          { new: true }
        );
      })
      .then((dbUser) => {
        if (!dbUser) {
          res.status(404).json({ message: "No user found" });
          return;
        }
        res.json(dbUser);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  //create reactions
  createReaction(req, res) {
    Thoughts.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $push: { reactions: req.body } },
      { new: true, runValidators: true }
    )
      .then((dbThoughts) => {
        if (!dbThoughts) {
          res.status(404).json({ message: "No thought with this id" });
          return;
        }
        res.json(dbThoughts);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  //   remove Reaction
  removeReaction(req, res) {
    Thoughts.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { new: true }
    )
      .then((dbThoughts) => {
        if (!dbThoughts) {
          res.status(404).json({ message: "No thought with this id" });
          return;
        }
        res.json(dbThoughts);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
};

module.exports = thoughtsControllers;
