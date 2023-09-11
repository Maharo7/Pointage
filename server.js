const express = require('express');
require('dotenv').config();
const { basicRoutes } = require('./app/routes/basics.routes');
const app = express();
const port = process.env.PORT;
const dataService = require('./app/services/data.service');
const bodyParser = require('body-parser');

dataService.connectDatabase()
    .then(response => {
      if(response) {
         const server = app.listen(port, function () {
            console.log("Pointage app listening at http://localhost:"+port);
         });
         app.use(bodyParser.json());
         basicRoutes(app);
         app.emit('serverReady');
      }
    })
    .catch(error => {
        console.error('Error: ' + error);
    });

module.exports = app;