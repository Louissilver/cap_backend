const express = require('express');
const routes = require('./routes');
const conn = require('./database');
const cors = require('cors');
const PORT = process.env.PORT || 5001;

conn();

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(PORT, () => {
  console.log(`🔆 Aplicação rodando na URL https://capbackendapi.herokuapp.com/`);
});
