const { response } = require('express');
const res = require('express/lib/response');
const { v4: uuid } = require('uuid');
const Cidade = require('../models/Cidade');

module.exports = {
  async index(request, response) {
    const { _page = 1, _limit, cidade_like } = request.query;

    try {
      const totalCidades = await Cidade.find();
      const cidades = await Cidade.find({
        cidade: { $regex: new RegExp(cidade_like, 'i') },
      })
        .sort({
          cidade: 1,
        })
        .limit(_limit * 1)
        .skip((_page - 1) * _limit);

      response.append('X-Total-Count', totalCidades.length);
      response.append('Access-Control-Expose-Headers', 'X-Total-Count');
      return response.status(200).json(cidades);
    } catch (err) {
      response.status(500).json({ error: err.message });
    }
  },
  async getDetalhe(request, response) {
    const { id } = request.params;
    try {
      const cidade = await Cidade.findById(id);
      return response.status(200).json(cidade);
    } catch (err) {
      response.status(500).json({ error: err.message });
    }
  },
  async create(request, response) {
    const { cidade } = request.body;

    const varCidade = new Cidade({
      _id: uuid(),
      cidade,
    });

    try {
      await varCidade.save();

      return response.status(201).json({
        message: 'Cidade cadastrada com sucesso.',
        _id: varCidade._id,
      });
    } catch (err) {
      response.status(500).json({ error: err.message });
    }
  },
  async update(request, response) {
    const body = request.body;
    try {
      await Cidade.findById(id).updateOne(body);
      return response
        .status(200)
        .json({ message: 'Cidade atualizada com sucesso.' });
    } catch (err) {
      response.status(500).json({ error: err.message });
    }
  },
  async delete(request, response) {
    try {
      await response.cidade.delete();
      return response
        .status(200)
        .json({ message: 'Cidade removida com sucesso.' });
    } catch (err) {
      response.status(500).json({ error: err.message });
    }
  },
};
