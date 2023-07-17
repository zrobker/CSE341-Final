const mongoose = require("mongoose");
const validator = require("validator");

const ActivitiesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  min: {
    type: String,
    required: true,
  },
  max: {
    type: String,
    required: true,
  },
});

const ActivitiesModel = mongoose.model("Activities", ActivitiesSchema);

module.exports = {
  ActivitiesModel,
  ActivitiesSchema,
};
