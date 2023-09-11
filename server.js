const express = require('express');
require('dotenv').config();
const { basicRoutes } = require('./app/routes/basics.routes');
const app = express();
const port = process.env.PORT;

const server = app.listen(port, function () {
    console.log("Pointage app listening at http://localhost:"+port);
 });
 basicRoutes(app);