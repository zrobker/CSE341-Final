const express = require('express');
const app = express();
const temp_port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
require('dotenv/config');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(bodyParser.json()).use((req, res, next) =>{res.setHeader('access-controll-allow-origin', '*'); next();}).use('/', require('./routes'));