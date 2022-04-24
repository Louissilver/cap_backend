require('dotenv').config();

const mongoose = require('mongoose');

const conn = () => {
  mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = mongoose.connection;
  db.on('error', (error) => console.log(error));
  db.once('open', () => console.log('🎲 Banco de dados conectado'));
};

module.exports = conn;
