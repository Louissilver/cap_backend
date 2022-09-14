require('dotenv').config();

const express = require('express');
const routes = require('./routes');
const conn = require('./database');
const cors = require('cors');

conn();

const app = express();
const port = 3333;

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(port, () => {
  console.log(`🔆 Aplicação rodando na URL https://movese.com.br`);
});
