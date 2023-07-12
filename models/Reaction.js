const { Schema, Types} = require('mongoose');
const moment = require('moment');

const reactionSchema = new Schema (
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: Types.ObjectId,
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date, 
            default: Date.now,
            get: function () {
                return moment(this.createdAt).format('YYYY-MM-DD HH:mm:ss');
              },

        },
    },
);

module.exports = ReactionSchema;