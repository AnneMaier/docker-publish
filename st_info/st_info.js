var express = require('express');
var mysql = require('mysql');
const env = require('dotenv').config({ path: '../.env'  });   
var app = express();

var connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB
});

connection.connect(function (err) {
    if (err){
        console.error("DB is not connected! Error: " + err + "\n\n");
    }else{
        console.log("DB is connected!\n\n");
    }
});



// var main = require('./routes/main');
// app.use('/', main);


app.get('/', function (req, res) {
  connection.query('select * from st_info', function (err, rows, fields) {

    if (err) {
      console.error("쿼리 실행 오류:", err);
      res.writeHead(500);
      res.end('데이터베이스 오류 발생');
      return;
    }

    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    var template = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Result</title>
      </head>
      <body>
      <table border="1" style="margin:auto; text-align:center;">
        <tr>
          <th>ST_ID</th>
          <th>NAME</th>
          <th>DEPT</th>
        </tr>
    `;
    for (var i = 0; i < rows.length; i++) {
      template += `
        <tr>
          <td>${rows[i].ST_ID}</td>
          <td>${rows[i].NAME}</td>
          <td>${rows[i].DEPT}</td>
        </tr>
      `;
    }
    template += `
      </table>
      </body>
      </html>
    `;
    res.end(template);
  });
});

app.listen(8080, function () {
    console.log("Express server listening on port 8080 \n\n");
})