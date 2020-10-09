const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.listen(3000);
