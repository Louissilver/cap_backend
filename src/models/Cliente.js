const mongoose = require('mongoose');

const clienteSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  nome: {
    type: String,
    required: true,
  },
  telefone: {
    type: String,
    required: true,
  },
  cidadeInteresse: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Cliente', clienteSchema);
