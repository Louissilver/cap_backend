const { response } = require('express');
const res = require('express/lib/response');
const { v4: uuid } = require('uuid');
const Cliente = require('../models/Cliente');

module.exports = {
  async index(request, response) {
    const { _page = 1, _limit, nomeCompleto_like } = request.query;
    try {
      const totalClientes = await Cliente.find();
      const clientes = await Cliente.find({
        nomeCompleto: { $regex: new RegExp(nomeCompleto_like, 'i') },
      })
        .limit(_limit * 1)
        .skip((_page - 1) * _limit);
      response.append('X-Total-Count', totalClientes.length);
      response.append('Access-Control-Expose-Headers', 'X-Total-Count');
      return response.status(200).json(clientes);
    } catch (err) {
      response.status(500).json({ error: err.message });
    }
  },
  async getDetalhe(request, response) {
    const { id } = request.params;
    try {
      const cliente = await Cliente.findById(id);
      return response.status(200).json(cliente);
    } catch (err) {
      response.status(500).json({ error: err.message });
    }
  },
  async create(request, response) {
    const cliente = new Cliente({
      _id: uuid(),
      dataCriacao: Date.now(),
      ...request.body,
    });

    try {
      await cliente.save();

      return response
        .status(201)
        .json({ message: 'Cliente cadastrado com sucesso.', _id: cliente._id });
    } catch (err) {
      response.status(500).json({ error: err.message });
    }
  },
  async update(request, response) {
    const body = request.body;
    try {
      await Cliente.findById(id).updateOne(body);
      return response
        .status(200)
        .json({ message: 'Cliente atualizada com sucesso.' });
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
