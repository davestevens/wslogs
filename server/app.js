const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const publicDir = path.resolve(__dirname, "..", "public");

const app = express();

app.use(morgan("common"));
app.use(cors());
app.use(express.static(publicDir));

app.get("/", (_req, res) => {
  res.sendFile(
    path.join(publicDir, "index.html")
  );
});

module.exports = app;
