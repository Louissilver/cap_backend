const { response } = require('express');
const res = require('express/lib/response');
const { v4: uuid } = require('uuid');
const Empreendimento = require('../models/Empreendimento');

module.exports = {
  async index(request, response) {
    const { _page = 1, _limit, titulo_like } = request.query;

    try {
      const empreendimentos = await Empreendimento.find({
        titulo: { $regex: new RegExp(titulo_like, 'i') },
      })
        .limit(_limit * 1)
        .skip((_page - 1) * _limit);

      response.append('X-Total-Count', empreendimentos.length);
      return response.status(200).json(empreendimentos);
    } catch (err) {
      response.status(500).json({ error: err.message });
    }
  },

  async getDetalhe(request, response) {
    const { id } = request.params;
    try {
      const empreendimentos = await Empreendimento.findOne({ to: id });
      return response.status(200).json(empreendimentos);
    } catch (err) {
      response.status(500).json({ error: err.message });
    }
  },

  async create(request, response) {
    const empreendimento = new Empreendimento({
      _id: uuid(),
      ...request.body,
    });

    try {
      await empreendimento.save();

      return response.status(201).json({
        message: 'Empreendimento cadastrado com sucesso.',
        titulo: request.body.titulo,
      });
    } catch (err) {
      response.status(500).json({ error: err.message });
    }
  },

  async update(request, response) {
    const { id } = request.params;
    const body = request.body;
    try {
      await Empreendimento.findOne({ to: id }).updateOne(body);
      return response
        .status(200)
        .json({ message: 'Empreendimento atualizado com sucesso.' });
    } catch (err) {
      response.status(500).json({ error: err.message });
    }
  },
  async delete(request, response) {
    try {
      await response.empreendimento.delete();
      return response
        .status(200)
        .json({ message: 'Empreendimento removido com sucesso.' });
    } catch (err) {
      response.status(500).json({ error: err.message });
    }
  },
};
