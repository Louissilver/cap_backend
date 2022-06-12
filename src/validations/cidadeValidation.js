const yup = require('./traducoesYup');

const cidadeSchema = yup.object().shape({
  cidade: yup.string().min(3).required(),
});

module.exports = cidadeSchema;
