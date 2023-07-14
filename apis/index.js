const Router = require("express").Router;
const router = Router();
const UsersController = require("../controllers/users.controller");
const EventsController = require("../controllers/events.controller");

/** GET */
router.get("/users", UsersController.getAll);
router.get("/events", EventsController.getAll);
router.get("/users/:id", UsersController.getOne);
router.get("/events/:id", EventsController.getOne);

/** POST */
router.post("/users", UsersController.createOne);
router.post("/events", EventsController.createOne);
router.post("/login", UsersController.login);

/** PUT */
router.put("/users/:id", UsersController.updateUser);
router.put("/events/:id", EventsController.updateEvent);

/** DELETE */
router.delete("/users/:id", UsersController.deleteOne);
router.delete("/events/:id", EventsController.deleteOne);

module.exports = {
  router,
};
