const express = require("express");
const axios = require("axios");
const winston = require("winston");
const dotenv = require("dotenv");
const { createLogger, transports } = require("winston");

const app = express();
dotenv.config();

const logger = createLogger({
  transports: [
    new transports.File({ filename: "apiLogger.log" }),
    new transports.Console({ format: winston.format.simple() }),
  ],
});

setInterval(() => {
  const options = {
    method: "GET",
    url: process.env.URL,
    headers: {
      "X-RapidAPI-Key": process.env.X_RapidAPI_Key,
      "X-RapidAPI-Host": process.env.X_RapidAPI_Host,
    },
  };

  const start = performance.now();
  axios
    .request(options)
    .then(() => {
      const end = performance.now();
      const time = end - start;

      logger.info("Response time: " + time + " ms");
    })
    .catch((ex) => console.log(ex));
}, 3000);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Listening on port " + port));
