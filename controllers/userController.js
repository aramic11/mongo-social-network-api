const { User } = require('../models');

module.exports = {
  async getAllUsers(req, res) {
    try {
      const users = await User.find({});
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: "Something went wrong while trying to get all users" });
    }
  },

  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Something went wrong while trying to create a new user" });
    }
  },

  async getOneUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .populate('friends')
        .populate('thoughts')
        .select('-__v');
      if (!user) {
        return res.status(404).json({ message: 'No user found with the provided ID' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: "Something went wrong while trying to get user details" });
    }
  },

  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );
      if (!user) {
        return res.status(404).json({ message: 'No user found with the provided ID' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: "Something went wrong while trying to update user details" });
    }
  },

  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.userId });
      if (!user) {
        return res.status(404).json({ message: 'No user found with the provided ID' });
      }
      res.json({ message: 'User deleted successfully', deleted: user });
    } catch (error) {
      res.status(500).json({ error: "Something went wrong while trying to delete user" });
    }
  },

  async addFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      );
      if (!user) {
        return res.status(404).json({ message: 'No user found with the provided ID' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: "Something went wrong while trying to add friend to user" });
    }
  },

  async removeFriend(req, res) {
    try {
      const friend = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      );
      if (!friend) {
        return res.status(404).json({ message: 'No friend found with the provided ID' });
      }
      res.json(friend);
    } catch (error) {
      res.status(500).json({ error: "Something went wrong while trying to remove friend from user" });
    }
  },
};
