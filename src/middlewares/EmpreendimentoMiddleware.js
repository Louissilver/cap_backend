const res = require('express/lib/response');
const Empreendimento = require('../models/Empreendimento');
const empreendimentoSchema = require('../validations/empreendimentoValidation');

module.exports = {
  async validateId(request, response, next) {
    const { id } = request.params;

    try {
      const empreendimento = await Empreendimento.findOne({ to: id });
      response.empreendimento = empreendimento;
      if (!empreendimento) {
        return response
          .status(404)
          .json({ error: 'Empreendimento não encontrado.' });
      }
    } catch (err) {
      return response.status(500).json({ error: err.message });
    }

    next();
  },
  async validation(request, response, next) {
    const body = request.body;

    try {
      await empreendimentoSchema.validate(body);
      next();
    } catch (err) {
      return response.status(500).json({ campo: err.path, erro: err.message });
    }
  },
  async indexValidation(request, response, next) {
    const { _id, to } = request.body;
    try {
      const empreendimentoExistente = await Empreendimento.find({ to: to });
      if (
        empreendimentoExistente.length > 0 &&
        _id !== empreendimentoExistente[0]._id
      ) {
        return response
          .status(404)
          .json({ error: 'URL relativa já cadastrada no sistema.' });
      }
      next();
    } catch (err) {
      return response.status(500).json({ error: err.message });
    }
  },
};
