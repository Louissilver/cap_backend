const mongoose = require('mongoose');

const empreendimentoSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  ativo: {
    type: Boolean,
    require: true,
  },
  to: {
    type: String,
    required: true,
  },
  titulo: {
    type: String,
    required: true,
  },
  descricao: {
    type: String,
    required: true,
  },
  cidade: {
    type: String,
    required: true,
  },
  thumb: {
    type: String,
    required: true,
  },
  alt: {
    type: String,
    required: true,
  },
  texto: {
    type: String,
    required: true,
  },
  imagens: {
    type: [
      {
        imagem: { type: String, required: true },
        alt: { type: String, required: true },
      },
    ],
    required: true,
  },
});

module.exports = mongoose.model('Empreendimento', empreendimentoSchema);
