const { User, Thought } = require('../models');

module.exports = {
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      console.error(`Error occurred while getting thoughts: ${err}`);
      res.status(500).json({ message: 'Failed to get thoughts' });
    }
  },

  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      const user = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $addToSet: { thoughts: thought._id } },
        { new: true }
      );
      if (!user) {
        return res.status(404).json({
          message: 'Thought created, but no user was found with that ID',
        });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json({ message: 'Failed to create thought' });
    }
  },

  async getThoughtById(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId }).select('-__v');
      if (!thought) {
        return res.status(404).json({ message: 'Could not find thought with that ID' });
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json({ message: 'Failed to get thought' });
    }
  },

  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );
      if (!thought) {
        return res.status(404).json({ message: 'Could not find thought with that ID' });
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json({ message: 'Failed to update thought' });
    }
  },

  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndRemove({ _id: req.params.thoughtId });
      if (!thought) {
        return res.status(404).json({ message: 'Could not find thought with that ID' });
      }
      const user = await User.findOneAndUpdate(
        { username: thought.username },
        { $pull: { thoughts: thought._id } },
        { new: true }
      );
      res.json(user);
    } catch (err) {
      console.error(`Error occurred while deleting thought: ${err}`);
      res.status(500).json({ message: 'Failed to delete thought' });
    }
  },

  async addReaction(req, res) {
    try {
      console.log('Adding a reaction...');
      console.log(req.body);
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      );
      if (!thought) {
        return res.status(404).json({ message: 'Could not find thought with that ID' });
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json({ message: 'Failed to add reaction' });
    }
  },

  async removeReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      );
      if (!thought) {
        return res.status(404).json({ message: 'No reaction found with that ID :(' });
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  }
};
``
