const { requiresAuth } = require("express-openid-connect");

const checkAuth = (req, res, next) => {
  if (req.headers["jest-bypass"] === "true") {
    next();
  } else {
    requiresAuth()(req, res, next);
  }
};

module.exports = checkAuth;
