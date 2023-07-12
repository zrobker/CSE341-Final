const Router = require("express").Router;
const router = Router();
const UsersController = require("../controllers/users.controller");
const EventsController = require("../controllers/events.controller");
const {
  validateRequest,
  userValidation,
  eventValidation,
  deleteValidation,
  getValidation,
} = require("../utils/validation.js");

/** GET */
router.get("/users", getValidation, validateRequest, UsersController.getAll);
router.get("/events", getValidation, validateRequest, EventsController.getAll);
router.get(
  "/users/:id",
  getValidation,
  validateRequest,
  UsersController.getOne
);
router.get(
  "/events/:id",
  getValidation,
  validateRequest,
  EventsController.getOne
);
router.get(
  "/events/createdBy/:id",
  getValidation,
  validateRequest,
  EventsController.getCreatedBy
);

/** POST */
router.post(
  "/users",
  userValidation(),
  validateRequest,
  UsersController.createOne
);
router.post(
  "/events",
  eventValidation(),
  validateRequest,
  EventsController.createOne
);

/** PUT */
router.put(
  "/users/:id",
  userValidation(),
  validateRequest,
  UsersController.updateUser
);
router.put(
  "/events/:id",
  eventValidation(),
  validateRequest,
  EventsController.updateEvent
);

/** DELETE */
router.delete(
  "/users/:id",
  deleteValidation,
  validateRequest,
  UsersController.deleteOne
);
router.delete(
  "/events/:id",
  deleteValidation,
  validateRequest,
  EventsController.deleteOne
);

module.exports = {
  router,
};
