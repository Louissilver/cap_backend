const res = require('express/lib/response');
const Cliente = require('../models/Cliente');
const clienteSchema = require('../validations/clienteValidation');

module.exports = {
  async validateId(request, response, next) {
    const { id } = request.params;

    try {
      const cliente = await Cliente.findById(id);
      response.cliente = cliente;
      if (!cliente) {
        return response.status(404).json({ error: 'Cliente não encontrado.' });
      }
    } catch (err) {
      return response.status(500).json({ error: err.message });
    }

    next();
  },
  async validation(request, response, next) {
    const body = request.body;

    try {
      await clienteSchema.validate(body);
      next();
    } catch (err) {
      return response.status(500).json({ campo: err.path, erro: err.message });
    }
  },
};
