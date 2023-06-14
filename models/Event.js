const mongoose = require('mongoose')
const validator  = require('validator');

const EventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    validator: (value) => {
      return validator.isAlpha(value);
    },
  },
  local: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  updatedAt: {
    type: Date,
  },
  createdBy:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  invites:  [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ],

  confirmed:  [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ]
});
const EventModel = mongoose.model('event', EventSchema);

module.exports = {
    EventModel,
    EventSchema
}