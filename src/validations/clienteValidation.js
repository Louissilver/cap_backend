const yup = require('./traducoesYup');

const phoneRegExp = RegExp('^\\([\\d]{2}\\) \\d [\\d]{4}\\-[\\d]{4}$');

const clienteSchema = yup.object().shape({
  nomeCompleto: yup.string().min(3).required(),
  telefone: yup
    .string()
    .required()
    .matches(phoneRegExp, 'O número de telefone não é válido.'),
  cidadeInteresse: yup.string().required(),
  dataCriacao: yup.date(),
  contatoRealizado: yup.boolean(),
  aceiteDosTermos: yup.boolean(),
});

module.exports = clienteSchema;
