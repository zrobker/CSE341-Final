const { body, check, validationResult } = require("express-validator");

const eventValidation = () => {
  return [
    body("name")
      .trim()
      .escape()
      .isLength({ min: 1 })
      .optional()
      .withMessage("Error, 'name' did not meet the required format."),
    body("local")
      .trim()
      .escape()
      .isLength({ min: 1 })
      .optional()
      .withMessage("Error, 'local' did not meet the required format."),
    body("createdBy")
      .trim()
      .escape()
      .isLength({ min: 1 })
      .optional()
      .withMessage("Error, 'createdBy' did not meet the required format."),
    body("createdAt")
      .trim()
      .escape()
      .isISO8601()
      .optional()
      .withMessage("Error, 'createdAt' did not meet the required format.'"),
    body("createdAt")
      .trim()
      .escape()
      .isISO8601()
      .optional()
      .withMessage("Error, 'updatedAt' did not meet the required format.'"),
  ];
};

const userValidation = () => {
  return [
    body("name")
      .optional()
      .isString()
      .isLength({ min: 1 })
      .trim()
      .escape()
      .withMessage("Error, 'name' did not meet the required format."),
    body("password")
      .optional()
      .isString()
      .isLength({ min: 1 })
      .trim()
      .escape()
      .withMessage("Error, 'password' did not meet the required format."),
    body("email")
      .optional()
      .isString()
      .isLength({ min: 1 })
      .trim()
      .escape()
      .isEmail()
      .withMessage("Error, 'email' did not meet the required format."),
    body("phone_number")
      .optional()
      .isString()
      .isLength({ min: 1 })
      .trim()
      .escape()
      .isMobilePhone()
      .withMessage("Error, 'phone_number' did not meet the required format."),
  ];
};

const getValidation = check("method")
  .custom((value, { req }) => req.method === "GET")
  .withMessage("Invalid request method");

const deleteValidation = check("method")
  .custom((value, { req }) => req.method === "DELETE")
  .withMessage("Invalid request method");

const validateRequest = (req, res, next) => {
  let errors = [];
  errors = validationResult(req);
  if (errors.isEmpty()) {
    next();
  } else {
    res.status(400).json(errors);
  }
};

module.exports = {
  eventValidation,
  userValidation,
  getValidation,
  deleteValidation,
  validateRequest,
};
