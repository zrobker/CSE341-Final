const AddressesModel = require("../models/Addresses").AddressesModel;
const DatabaseError = require("../errors/database.error");

const getAll = (req, res, next) => {
  AddressesModel.find({})
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
  AddressesModel.create(req.body)
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
  const AddressesId = req.params.id;

  try {
    const Addresses = await AddressesModel.findById(AddressesId);

    if (!Addresses) {
      return res.status(404).json({ error: "Addresses not found" });
    }

    await AddressesModel.deleteOne({ _id: AddressesId });

    res.status(202).json({ message: "Addresses deleted successfully" });
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
