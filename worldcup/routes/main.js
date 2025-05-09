const express = require("express");
const margan = require("morgan");
const fs = require("fs");
const path = require("path");
const mongoClient = require("mongodb").MongoClient;

const app = express();
app.use(margan("dev"));

var db;
var databaseUrl = "mongodb://13.213.51.109:27017";

app.get("/", (req, res) => {
  res.sendFile(__dirname, "./index.html");
});

app.get("/worldcup", (req, res) => {
  mongoClient.connect(databaseUrl, function (err, database) {
    if (err) throw err;
    db = database.db("test");
    db.collection("worldcup")
      .find({}, { _id: 0, no: 1, nation: 1, date: 1, score: 1 })
      .toArray((err, result) => {
        if (err) throw err;
        console.log("result : ", result);
        // res.send(result);
        res.writeHead(200, {
          "content-type": "text/html charset=utf-8",
        });
        var template = `
        <table border="1" style="margin:auto; text-align:center;">
            <tr>
                <th>No</th>
                <th>Nation</th>
                <th>Date</th>
                <th>Score</th>
            </tr>
        `;
        result.forEach((item) => {
          score = item.score;
          if (score == undefined) {
            score = "Before the game";
          } else {
            score = item.score;
          }
          template += `
            <tr>
                <td>${item.no}</td>
                <td>${item.nation}</td>
                <td>${item.date}</td>
                <td>${score}</td>
            </tr>
            `;
        });
        template += "</table>";
        res.end(template);
      });
  });
});

module.exports = app;