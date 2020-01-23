require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");

const { isDev } = require("./core/configs");
const { registerRoute } = require("./router");

// middleware
const errorHandler = (err, req, res, next) => {
  return res
    .status(500)
    .json({ msg: "Something happend, please check your request." });
};

const createApp = () => {
  const app = express();
  app.use(helmet());
  app.disable("x-powered-by");

  app.use(bodyParser.json());
  app.use(cors());

  if (!isDev()) {
    app.use(errorHandler);
  }

  registerRoute(app);

  return app;
};

module.exports = {
  createApp
};
