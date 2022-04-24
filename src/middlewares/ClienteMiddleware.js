const res = require('express/lib/response');
const { validate: isUuid } = require('uuid');
const Cliente = require('../models/Cliente');

module.exports = {
  async validateId(request, response, next) {
    const { id } = request.params;

    if (!isUuid(id)) {
      return response.status(400).json({ error: 'Id inválido' });
    }

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
};
