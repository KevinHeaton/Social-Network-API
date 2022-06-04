const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const UserSchema =  new Schema({
    username: {
      type: String,
      unique: true,
      required: 'Please enter a username!',
      trim: true
    },
    email: {
      type: String,
      required: 'Please enter a valid email!',
      unique: true,
      match: [/.+\@.+\..+/, 'Please provide a valid email!'] 
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought'
      }
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }
)