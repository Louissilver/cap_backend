const res = require('express/lib/response');
const Cidade = require('../models/Cidade');
const cidadeSchema = require('../validations/cidadeValidation');

module.exports = {
  async validateId(request, response, next) {
    const { id } = request.params;

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
  async validation(request, response, next) {
    const body = request.body;

    try {
      await cidadeSchema.validate(body);
      next();
    } catch (err) {
      return response.status(500).json({ campo: err.path, erro: err.message });
    }
  },
  async indexValidation(request, response, next) {
    const { cidade } = request.body;

    try {
      const cidadeExistente = await Cidade.find({ cidade: cidade });
      if (cidadeExistente.length > 0) {
        return response.status(404).json({
          error: 'Cidade já cadastrada no sistema.',
          cidadeExistente: cidadeExistente,
        });
      }
      next();
    } catch (err) {
      return response.status(500).json({ error: err.message });
    }
  },
};
