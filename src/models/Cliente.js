const mongoose = require('mongoose');

const clienteSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  nomeCompleto: {
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
  dataCriacao: {
    type: Date,
  },
  contatoRealizado: {
    type: Boolean,
    default: false,
  },
  aceiteDosTermos: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model('Cliente', clienteSchema);
