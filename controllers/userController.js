const { Thought, User } = require('../models');

const userController = {

  // Function to get all users
  async getUsers (req, res) {
      try {
          const users = await User.find();
          res.json(users);
      } catch(err) {
          res.status(500).json(err);
      }
  },

  // Function to get a single user by its userId, populated with friends and thoughts
  async getSingleUser (req, res) {
      try {
          const user = await User.findOne({ _id: req.params.userId })
              .select('__v')
              .populate('friends')
              .populate('thoughts');

          if (!user) {
              return res.status(404).json({ message: 'No user with this id!' });
          }
          res.json(user);
      } catch (err) {
          res.status(500).json(err);
      }
  },

  // Function to create a new user
  async createUser (req, res) {
      try {
          const user = await User.create(req.body);
          res.json(user);
      } catch (err) {
          console.log(err);
          res.status(500).json(err);
      }
  },

  // Function to update a user by its userId
  async updateUser(req, res) {
      try {
          const user = await User.findOneAndUpdate(
              { _id: req.params.userId },
              { $set: req.body },
              { runValidators: true, new: true }
          );

          if (!user) {
              return res.status(404).json({ message: 'No user with this id!' });
          }

          res.json(user);
      } catch (err) {
          res.status(500).json(err);
      }
  },

  // Function to delete a user by its userId
  async deleteUser (req, res) {
      try {
          const user = await User.findOneAndDelete({ _id: req.params.userId });

          if (!user) {
              return res.status(404).json({ message: 'No user with this id!' });
          }

          // Get the ids of user's `thoughts` and delete them 
          await Thought.deleteMany({ _id: { $in: user.thoughts } });
          res.json({ message: 'User and associated thoughts deleted!' });
      } catch (err) {
          console.log(err);
          res.status(500).json(err);
      }
  },

  // Function to add a friend for a user
  async addFriend(req, res) {
      try {
          const user = await User.findOneAndUpdate(
              { _id: req.params.userId },
              { $addToSet: { friends: req.params.friendId } },
              { new: true }
          );

          if (!user) {
              return res.status(404).json({ message: 'No user with this id!' });
          }

          res.json(user);
      } catch (err) {
          console.log(err);
          res.status(500).json(err);
      }
  },

  // Function to delete a friend for a user
  async deleteFriend(req, res) {
      try {
          const user = await User.findOneAndUpdate(
              { _id: req.params.userId },
              { $pull: { friends: req.params.friendId } },
              { new: true }
          );

          if (!user) {
              return res.status(404).json({ message: 'No user with this id!' });
          }

          res.json(user);
      } catch (err) {
          console.log(err);
          res.status(500).json(err);
      }
  },
};

module.exports = userController;


