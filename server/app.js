const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const publicDir = path.resolve(__dirname, "..", "public");
const app = express();


app.use(morgan("common"));
app.use(cors());
app.use(bodyParser.json());

app.get("/", (_req, res) => {
  res.sendFile(
    path.join(publicDir, "index.html")
  );
});

app.use("/log", require("./log"));

module.exports = app;
