const ActivitiesModel = require("../models/Activities").ActivitiesModel;
const DatabaseError = require("../errors/database.error");

const getAll = (req, res, next) => {
  ActivitiesModel.find({})
    .then((result) => {
      return res.send(result);
    })
    .catch((e) => {
      console.error(e);
      next(
        new DatabaseError(
          "Something went wrong when trying to retrieve users.",
          500,
          true
        )
      );
    });
};
const createOne = (req, res, next) => {
  ActivitiesModel.create(req.body)
    .then((result) => {
      return res.status(200).send(result);
    })
    .catch((e) => {
      console.error(e);
      next(
        new DatabaseError(
          "Something went wrong when trying to create a new user.",
          500,
          true
        )
      );
    });
};

const deleteOne = async (req, res, next) => {
  const ActivityId = req.params.id;

  try {
    const Activity = await ActivitiesModel.findById(ActivityId);

    if (!Activity) {
      return res.status(404).json({ error: "Activity not found" });
    }

    await ActivitiesModel.deleteOne({ _id: ActivityId });

    res.status(202).json({ message: "Activity deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  deleteOne,
  getAll,
  createOne,
};
