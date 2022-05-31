const { response } = require('express');
const res = require('express/lib/response');
const { v4: uuid } = require('uuid');
const Cliente = require('../models/Cliente');

module.exports = {
  async index(request, response) {
    try {
      const clientes = await Cliente.find();
      return response.status(200).json({ clientes });
    } catch (err) {
      response.status(500).json({ error: err.message });
    }
  },
  async create(request, response) {
    const { nomeCompleto, telefone, cidadeInteresse } = request.body;

    if (!nomeCompleto && !telefone && !cidadeInteresse) {
      return response.status(404).json({
        error:
          'Está faltando informação em: \n\nNome completo\nTelefone\nCidade de interesse',
      });
    } else if (!nomeCompleto) {
      return response.status(404).json({
        error: 'Está faltando informação em: \n\nNome completo',
      });
    } else if (!telefone) {
      return response.status(404).json({
        error: 'Está faltando informação em: \n\nTelefone',
      });
    } else if (!cidadeInteresse) {
      return response.status(404).json({
        error: 'Está faltando informação em: \n\nCidade de interesse',
      });
    }

    const cliente = new Cliente({
      _id: uuid(),
      nomeCompleto,
      telefone,
      cidadeInteresse,
      dataCriacao: Date.now(),
    });

    try {
      await cliente.save();

      return response
        .status(201)
        .json({ message: 'Cliente cadastrado com sucesso.' });
    } catch (err) {
      return response.status(404).json({
        error:
          'Está faltando informação em Nome completo\nTelefone\nCidade de interesse.',
      });
    }
  },
  async update(request, response) {
    const { nomeCompleto, telefone, cidadeInteresse } = request.body;

    if (!nomeCompleto && !telefone && !cidadeInteresse) {
      return response.status(400).json({
        error:
          'É necessário informar um novo Nome, Telefone ou Cidade de interesse.',
      });
    }

    if (nomeCompleto) response.cliente.nomeCompleto = nomeCompleto;
    if (telefone) response.cliente.telefone = telefone;
    if (cidadeInteresse) response.cliente.cidadeInteresse = cidadeInteresse;

    try {
      await response.cliente.save();
      return response
        .status(200)
        .json({ message: 'Cliente atualizado com sucesso.' });
    } catch (err) {
      response.status(500).json({ error: err.message });
    }
  },
  async delete(request, response) {
    try {
      await response.cliente.delete();
      return response
        .status(200)
        .json({ message: 'Cliente removido com sucesso.' });
    } catch (err) {
      response.status(500).json({ error: err.message });
    }
  },
};
