const Router = require("express").Router;
const router = Router();
const UsersController = require("../controllers/users.controller");
const EventsController = require("../controllers/events.controller");
const AddressesController = require("../controllers/addresses.controller");
const ActivitiesController = require("../controllers/activities.controller");
const { auth, requiresAuth } = require("express-openid-connect");
const {
  activitiesValidation,
  addressesValidation,
  validateRequest,
  userValidation,
  eventValidation,
  deleteValidation,
  getValidation,
} = require("../utils/validation.js");

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
router.use(auth(config));

// req.isAuthenticated is provided from the auth router
router.get("/", (req, res) => {
  res.send(req.oidc.isAuthenticated() ? "Logged in" : "Logged out");
});

/** GET */
router.get(
  "/activities",
  getValidation,
  validateRequest,
  ActivitiesController.getAll
);
router.get("/users", getValidation, validateRequest, UsersController.getAll);
router.get("/events", getValidation, validateRequest, EventsController.getAll);
router.get(
  "/addresses/",
  getValidation,
  validateRequest,
  AddressesController.getAll
);
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
  "/activities",
  activitiesValidation(),
  validateRequest,
  ActivitiesController.createOne
);
router.post(
  "/addresses",
  // requiresAuth(),
  addressesValidation(),
  validateRequest,
  AddressesController.createOne
);
router.post(
  "/users",
  // requiresAuth(),
  userValidation(),
  validateRequest,
  UsersController.createOne
);
router.post(
  "/events",
  // requiresAuth(),
  eventValidation(),
  validateRequest,
  EventsController.createOne
);

/** PUT */
router.put(
  "/users/:id",
  // requiresAuth(),
  userValidation(),
  validateRequest,
  UsersController.updateUser
);
router.put(
  "/events/:id",
  // requiresAuth(),
  eventValidation(),
  validateRequest,
  EventsController.updateEvent
);

/** DELETE */
router.delete(
  "/activities/:id",
  // requiresAuth(),
  deleteValidation,
  validateRequest,
  ActivitiesController.deleteOne
);
router.delete(
  "/addresses/:id",
  // requiresAuth(),
  deleteValidation,
  validateRequest,
  AddressesController.deleteOne
);
router.delete(
  "/users/:id",
  // requiresAuth(),
  deleteValidation,
  validateRequest,
  UsersController.deleteOne
);
router.delete(
  "/events/:id",
  // requiresAuth(),
  deleteValidation,
  validateRequest,
  EventsController.deleteOne
);

module.exports = { router };
