const { Schema, model } = require("mongoose");
const moment = require('moment');

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    //   get: (timestamp) => timestamp.toLocaleString(),
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: { getters: true },
  }
);

thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});
thoughtSchema.virtual("formattedTimeStamp").get(function () {
    return moment(this.timestamp).format('YYYY-MM-DD HH:mm:ss');
})

const Thought = mongoose.model("Thought", thoughtSchema);

module.exports = Thought;
