const EventModel = require("../models/Event").EventModel;
const DatabaseError = require("../errors/database.error");

const getAll = (req, res, next) => {
  EventModel.find({})
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
  EventModel.create(req.body)
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

const updateEvent = async (req, res, next) => {
  const eventId = req.params.id;

  try {
    const event = await EventModel.findById(eventId);

    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    // Update event properties
    if (req.body.name) {
      event.name = req.body.name;
    }
    if (req.body.local) {
      event.local = req.body.local;
    }
    if (req.body.confirmed) {
      event.confirmed = req.body.confirmed;
    }
    if (req.body.invites) {
      event.invites = req.body.invites;
    }
    // Update the updatedAt property
    event.updatedAt = new Date();

    await event.save();

    res.status(204).json(event);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getOne = async (req, res, next) => {
  const eventId = req.params.id;

  try {
    const event = await EventModel.findById(eventId);

    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    res.status(200).json(event);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteOne = async (req, res, next) => {
  const eventId = req.params.id;

  try {
    const event = await EventModel.findById(eventId);

    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    await EventModel.deleteOne({ _id: eventId });

    res.status(202).json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getCreatedBy = async (req, res, next) => {
  const createdById = req.params.id;

  try {
    const event = await EventModel.find({ createdBy: createdById });

    if (!event) {
      return res.status(404).json({ error: "Event no found" });
    }
    res.status(200).json(event);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error." });
  }
};

module.exports = {
  deleteOne,
  getOne,
  updateEvent,
  getAll,
  createOne,
  getCreatedBy,
};
