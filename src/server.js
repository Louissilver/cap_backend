const express = require('express');
const routes = require('./routes');
const conn = require('./database');
const cors = require('cors');
const PORT = process.env.PORT || 80;

conn();

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

var server = app.listen(PORT, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("server is listening at http://%s:%s", host, port);
});
