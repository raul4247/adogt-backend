const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require("../routes");
const {customPassport} = require("./security") 

module.exports = () => {
  const app = express();

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(cors());
  app.use(routes);

  return app;
};
