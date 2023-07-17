const mongoose = require("mongoose");
const validator = require("validator");

const AddressesSchema = new mongoose.Schema({
  address: {
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
});

const AddressesModel = mongoose.model("Addresses", AddressesSchema);

module.exports = {
  AddressesModel,
  AddressesSchema,
};
