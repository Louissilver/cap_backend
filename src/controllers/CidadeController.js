const { response } = require('express');
const res = require('express/lib/response');
const { v4: uuid } = require('uuid');
const Cidade = require('../models/Cidade');

module.exports = {
  async index(request, response) {
    try {
      const cidades = await Cidade.find().sort({ cidade: 1 });
      return response.status(200).json({ cidades: cidades });
    } catch (err) {
      response.status(500).json({ error: err.message });
    }
  },
  async create(request, response) {
    const { cidade } = request.body;

    if (!cidade) {
      return response.status(404).json({
        error: 'Está faltando informação em: \n\nCidade',
      });
    }

    const varCidade = new Cidade({
      _id: uuid(),
      cidade,
      dataCriacao: Date.now(),
    });

    try {
      await varCidade.save();

      return response
        .status(201)
        .json({ message: 'Cidade cadastrada com sucesso.' });
    } catch (err) {
      return response.status(404).json({
        error: 'Está faltando informação em: \n\nCidade',
      });
    }
  },
  async update(request, response) {
    const { cidade } = request.body;

    if (!cidade) {
      return response.status(400).json({
        error: 'É necessário informar o nome da cidade.',
      });
    }

    if (cidade) response.cidade.cidade = cidade;

    try {
      await response.cidade.save();
      return response
        .status(200)
        .json({ message: 'Cidade atualizado com sucesso.' });
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
