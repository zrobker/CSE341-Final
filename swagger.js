const swaggerAutogen = require("swagger-autogen")();

const outputFile = "./swagger_output.json";
const endpointsFiles = ["./apis/*.js"]; // Specify the path to your API routes

const doc = {
  info: {
    title: "Your API Documentation",
    description: "API documentation for your Node.js app",
    version: "1.0.0",
  },
  host: "localhost:3000", // Replace with your app's URL
  basePath: "/",
  schemes: ["http"], // Add 'https' if your app uses HTTPS
  consumes: ["application/json"],
  produces: ["application/json"],
};

swaggerAutogen(outputFile, endpointsFiles, doc);
