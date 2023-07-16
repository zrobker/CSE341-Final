require("dotenv/config");
const { auth, requiresAuth } = require('express-openid-connect');
const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger_output.json");
const bodyParser = require("body-parser");
const APIs = require("./apis");
const DB = require("./models/db_connection");
const cors = require("cors");
const app = express();

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(bodyParser.json());

const origin = {
  origin: "*",
};
app.use(cors(origin));

app.use("/", APIs.router);

app.use("/test", (req, res) => {
  res.send("The server is working");
});


require('dotenv').config();
const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

// app listening was moved to index.js file so that unit tests could import the server without listening

module.exports = app;
