const { response } = require('express');
const res = require('express/lib/response');
const { v4: uuid } = require('uuid');
const Empreendimento = require('../models/Empreendimento');

module.exports = {
  async index(request, response) {
    try {
      const empreendimentos = await Empreendimento.find(
        {},
        { texto: 0, imagens: 0 }
      );
      return response.status(200).json({ empreendimentos: empreendimentos });
    } catch (err) {
      response.status(500).json({ error: err.message });
    }
  },

  async getDetalhe(request, response) {
    const { id } = request.params;
    try {
      const empreendimentos = await Empreendimento.findOne(
        { to: id },
        {
          descricao: 0,
          cidade: 0,
          thumb: 0,
          alt: 0,
        }
      );
      return response.status(200).json({ empreendimentos });
    } catch (err) {
      response.status(500).json({ error: err.message });
    }
  },
};
