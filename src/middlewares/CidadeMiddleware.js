const res = require('express/lib/response');
const { validate: isUuid } = require('uuid');
const Cidade = require('../models/Cidade');

module.exports = {
  async validateId(request, response, next) {
    const { id } = request.params;

    if (!isUuid(id)) {
      return response.status(400).json({ error: 'Id inválido' });
    }

    try {
      const cidade = await Cidade.findById(id);
      response.cidade = cidade;
      if (!cidade) {
        return response.status(404).json({ error: 'Cidade não encontrada.' });
      }
    } catch (err) {
      return response.status(500).json({ error: err.message });
    }

    next();
  },
};
