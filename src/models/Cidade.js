const mongoose = require('mongoose');

const cidadeSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  cidade: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Cidade', cidadeSchema);
