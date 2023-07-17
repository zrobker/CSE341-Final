const RegistrationsModel =
  require("../models/Registrations").RegistrationsModel;
const DatabaseError = require("../errors/database.error");

const getAll = (req, res, next) => {
  RegistrationsModel.find({})
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
  RegistrationsModel.create(req.body)
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
  const RegistrationId = req.params.id;

  try {
    const Registration = await RegistrationsModel.findById(RegistrationId);

    if (!Registration) {
      return res.status(404).json({ error: "Registration not found" });
    }

    await RegistrationsModel.deleteOne({ _id: RegistrationId });

    res.status(202).json({ message: "Registration deleted successfully" });
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
