require("dotenv/config");
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

// app listening was moved to index.js file so that unit tests could import the server without listening

module.exports = app;
