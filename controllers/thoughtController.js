const { Thought, User } = require('../models');

const thoughtController = {

  // Function to get all thoughts
  async getThoughts (req, res) {
      try {
          const thoughts = await Thought.find();
          res.json(thoughts);
      } catch (err) {
          console.log(err);
          res.status(500).json(err);
      }
  },

  // Function to get a single thought by its thoughtId
  async getSingleThought (req, res) {
      try {
          const thought = await Thought.findOne({ _id: req.params.thoughtId });
          
          if (!thought) {
              return res.status(404).json({ message: 'No thought with this id!' });
          }
      } catch (err) {
          console.log(err);
          res.status(500).json(err);
      }
  },

  // Function to create a new thought
  async createThought(req, res) {
      try {
        const thought = await Thought.create(req.body);
  
        const user = await User.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { thoughts: thought._id } },
          { new: true }
        );
  
        if (!user) {
          return res.status(404).json({ message: 'Thought created but no user with this id!' });
        }
  
        res.json({ message: 'Thought successfully created!' });
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
  },

  // Function to update a thought by its thoughtId
  async updateThought(req, res) {
    try{
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );
  
      if (!thought) {
        return res.status(404).json({ message: 'No thought with this id!' });
      } 

      res.json(thought);
    }catch (err) {
  
      res.json(thought);
  
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Function to delete a thought by its thoughtId
  async deleteThought(req, res) {
      try {
        const thought = await Thought.findOneAndRemove({ _id: req.params.thoughtId });
  
        if (!thought) {
          return res.status(404).json({ message: 'No thought with this id!' });
        }
  
        const user = User.findOneAndUpdate(
          { thoughts: req.params.thoughtId },
          { $pull: { thoughts: req.params.thoughtId } },
          { new: true }
        );
  
        if (!user) {
          return res.status(404).json({ message: 'Thought created but no user with this id!' });
        }
  
        res.json({ message: 'Thought successfully deleted!' });
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
  },

  //Function to add a Reaction
  async addReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: 'No thought with this id!' });
      }

      res.json(thought);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Function to remove a reaction from a thought
  async removeReaction(req, res) {
      try {
        const thought = await Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $pull: { reactions: { reactionId: req.params.reactionId } } },
          { runValidators: true, new: true }
        );
  
        if (!thought) {
          return res.status(404).json({ message: 'No thought with this id!' });
        }
  
        res.json(thought);
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
  },
};

module.exports = thoughtController;


