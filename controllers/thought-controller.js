const { Thought, User } = require('../models');

const thoughtController = {

  getAllThoughts(req, res) {
    Thought.find({})
      .sort({ _id: -1 })
      .then(thoughtData => res.json(thoughtData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
    .then(thoughtData => {
      if (!thoughtData) {
        res.status(404).json({ message: 'No thought found with this id!' });
        return;
      }
      res.json(thoughtData);
    })
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
  },

  addThought({ params, body }, res) {
    Thought.create(body)
    .then(({ _id }) => {
      return User.findOneAndUpdate(
        { _id: body.userId },
        { $push: { thoughts: _id } },
        { new: true, runValidators: true }
      )
    })
    .then(userData => {
      if (!userData) {
        res.status(404).json({ message: 'No user found with this id!' });
        return;
      }
      res.json(userData);
    })
    .catch(err => res.json(err));
  },

  addReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push: { reactions: body } },
      { new: true, runValidators: true }
    )
    .then(thoughtData => {
      if (!thoughtData) {
        res.status(404).json({ message: 'No thought found witht his id!' });
        return;
      }
      res.json(thoughtData);
    })
    .catch(err => res.json(err));
  },

  updateThought({ params, body }, res) {
    console.log(body);
    Thought.findOneAndUpdate(
      { _id: params.id }, 
      body, 
      { new: true, runValidators: true })
    .then(({ _id }) => {
      return User.findOneAndUpdate(
        { _id: params.userId },
        { $push: { thoughts: _id } },
        { new: true, runValidators: true }
      )
    })
    .then(thoughtData => {
      if (!thoughtData) {
        res.status(404).json({ message: 'No user found with this id!' });
        return;
      }
      res.json(thoughtData);
    })
    .catch(err => res.json(err));
  },

  removeThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id })
    .then(deletedThought => {
      if (!deletedThought) {
        return res.status(404).json({ message: 'No thought with this id!' });
      }
      return User.findOneAndUpdate(
        { _id: params.id },
        { $pull: { thoughts: params.id } },
        { new: true }
      );
    })
    .then(userData => {
      if (!userData) {
        res.status(404).json({ message: 'No user found with this id!' });
        return;
      }
      res.json(userData);
    })
    .catch(err => res.json(err));
  },

  removeReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true }
    )
    .then(thoughtData => res.json(thoughtData))
    .catch(err => res.json(err));
  }
};

module.exports = thoughtController; 