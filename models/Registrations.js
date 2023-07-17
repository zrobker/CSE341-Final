const mongoose = require("mongoose");
const validator = require("validator");

const RegistrationsSchema = new mongoose.Schema({
  event: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Event",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  createdAt: {
    type: Date,
    required: true,
  },
  updatedAt: {
    type: Date,
  },
});

const RegistrationsModel = mongoose.model("Registrations", RegistrationsSchema);

module.exports = {
  RegistrationsModel,
  RegistrationsSchema,
};
