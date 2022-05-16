const res = require('express/lib/response');
const { validate: isUuid } = require('uuid');
const Empreendimento = require('../models/Empreendimento');

module.exports = {
  async validateId(request, response, next) {
    const { id } = request.params;

    try {
      const empreendimento = await Empreendimento.find({ to: id });
      response.empreendimento = empreendimento;
      if (!empreendimento) {
        return response
          .status(404)
          .json({ error: 'Empreendimento não encontrada.' });
      }
    } catch (err) {
      return response.status(500).json({ error: err.message });
    }

    next();
  },
};
