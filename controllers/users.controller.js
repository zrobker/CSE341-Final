const DatabaseError = require("../errors/database.error");

const UserModel = require("../models/User").UserModel;

const getAll = (req, res, next) => {
  UserModel.find({})
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
  // TODO: add validation
  UserModel.create(req.body)
    .then((result) => {
      return res.send(result);
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

const updateUser = async (req, res, next) => {
  const userId = req.params.id;

  try {
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update user properties
    if (req.body.name) {
      user.name = req.body.name;
    }
    if (req.body.password) {
      user.password = req.body.password;
    }
    if (req.body.email) {
      user.email = req.body.email;
    }
    if (req.body.phone_number) {
      user.phone_number = req.body.phone_number;
    }
    // Update the updatedAt property
    user.updatedAt = new Date();

    await user.save();

    res.status(204).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const login = async (req, res) => {
  const userName = req.params.name;
  const password = req.params.password;
  const user = await UserModel.findOne({name: userName})
  const userPassword = await UserModel.findOne({password: password})
  if (!user) {
    return res.status(404).json({ error: "There is no user with that name." });
  }
  try {
    if (password == userPassword){
      res.send("Login Successfull!");
      // Any addtional actions desired when logged in go here
    } else {
      res.send("Login Failed, password does not match.");
      // Send back to login page
    }
  } catch {
    res.status(500).send();
  }
};

const getOne = async (req, res, next) => {
  const userId = req.params.id;

  try {
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteOne = async (req, res, next) => {
  const userId = req.params.id;

  try {
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await UserModel.deleteOne({ _id: userId });

    res.status(202).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  deleteOne,
  getOne,
  updateUser,
  getAll,
  createOne,
  login
};
