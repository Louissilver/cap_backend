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
  async getAllByDate(request, response) {
    let { dataInicial, dataFinal } = request.query;

    try {
      if (dataInicial && dataFinal) {
        const clientes = await Cliente.find({
          dataCriacao: {
            $gte: new Date(`${dataInicial}T00:00:00.000Z`),
            $lt: new Date(`${dataFinal}T23:59:59.999Z`),
          },
        });
        response.append('X-Total-Count', clientes.length);
        response.append('Access-Control-Expose-Headers', 'X-Total-Count');
        return response.status(200).json(clientes);
      }
      if (dataInicial && !dataFinal) {
        const clientes = await Cliente.find({
          dataCriacao: {
            $gte: new Date(`${dataInicial}T00:00:00.000Z`),
          },
        });
        response.append('X-Total-Count', clientes.length);
        response.append('Access-Control-Expose-Headers', 'X-Total-Count');
        return response.status(200).json(clientes);
      }
      if (!dataInicial && dataFinal) {
        const clientes = await Cliente.find({
          dataCriacao: {
            $lt: new Date(`${dataFinal}T23:59:59.999Z`),
          },
        });
        response.append('X-Total-Count', clientes.length);
        response.append('Access-Control-Expose-Headers', 'X-Total-Count');
        return response.status(200).json(clientes);
      }
      if (!dataInicial && !dataFinal) {
        const clientes = await Cliente.find();
        response.append('X-Total-Count', clientes.length);
        response.append('Access-Control-Expose-Headers', 'X-Total-Count');
        return response.status(200).json(clientes);
      }
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
      await Cliente.findById(body._id).updateOne(body);
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
