const mongoose = require('mongoose')
const validator  = require('validator');

// Minimum eight characters, at least one letter and one number:
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    validator: (value) => {
      return validator.isAlpha(value);
    },
  },
  password: {
    type: String,
    required: true,
    validator: (value) => {
      return value.match(passwordRegex);
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: (value) => {
      return validator.isEmail(value);
    },
  },
  phone_number: {
    type: String,
    required: true,
    validator: (value) => {
      return validator.isNumeric(value);
    },
  },
  createdAt: {
    type: Date,
    required: true,
  },
  updatedAt: {
    type: Date,
  },
  events: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
  },
});

const UserModel = mongoose.model('user', UserSchema);

module.exports = {
    UserModel,
    UserSchema
}
