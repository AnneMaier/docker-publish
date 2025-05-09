"use strict";

var express = require("express");
const app = express();

const hostname = "0.0.0.0";
const port = 8000;

var main = require("./routes/main.js");

app.use(express.static(__dirname + "/public"));
app.use("/", main);

app.listen(port, hostname);
console.log(`Server running at http://${hostname}:${port}/`);