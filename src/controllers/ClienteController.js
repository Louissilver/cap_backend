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
    const { nome, telefone, cidadeInteresse } = request.body;

    if (!nome || !telefone || !cidadeInteresse) {
      return response.status(400).json({
        error:
          'Está faltando informação em Nome, Telefone ou Cidade de interesse.',
      });
    }

    const cliente = new Cliente({
      _id: uuid(),
      nome,
      telefone,
      cidadeInteresse,
    });

    try {
      await cliente.save();

      return response
        .status(201)
        .json({ message: 'Cliente cadastrado com sucesso.' });
    } catch (err) {
      response.status(400).json({ error: err.message });
    }
  },
  async update(request, response) {
    const { nome, telefone, cidadeInteresse } = request.body;

    if (!nome && !telefone && !cidadeInteresse) {
      return response.status(400).json({
        error:
          'É necessário informar um novo Nome, Telefone ou Cidade de interesse.',
      });
    }

    if (nome) response.cliente.nome = nome;
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