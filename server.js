require("dotenv/config");
const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger_output.json");
const bodyParser = require("body-parser");
const APIs = require("./apis");
const DB = require("./models/db_connection");
const cors = require("cors");

const app = express();

// TODO: Fix swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(bodyParser.json());

const origin = {
  origin: "*",
};
app.use(cors(origin));

app.use("/", APIs.router);

DB.initDb(() => {
  console.log(`⚡️[server]: Connection with MongoDB database was successful!`);
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
  });
});

module.exports = { app };
