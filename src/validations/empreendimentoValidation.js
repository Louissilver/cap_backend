const yup = require('./traducoesYup');

const urlRegExp = RegExp(
  '(http(s?):)([/|.|\\w|\\s|-])*\\.(?:jpg|gif|png|jpeg)'
);
const stringSimplesExp = RegExp('^[a-zA-Z0-9_-]+$');

const empreendimentoSchema = yup.object().shape({
  ativo: yup.boolean(),
  titulo: yup.string().required(),
  to: yup
    .string()
    .required()
    .matches(
      stringSimplesExp,
      'O texto informado está em um formato inválido. Informe apenas letras, números e "_", sem espaços ou caracteres especiais.'
    ),
  descricao: yup.string().required(),
  cidade: yup.string().required(),
  thumb: yup
    .string()
    .required()
    .matches(urlRegExp, 'A URL informada está em um formato inválido.'),
  alt: yup.string().required(),
  texto: yup.string().required(),
  imagens: yup.array().of(
    yup.object().shape({
      imagem: yup
        .string()
        .required()
        .matches(urlRegExp, 'A URL informada está em um formato inválido.'),
      alt: yup.string().required(),
    })
  ),
});

module.exports = empreendimentoSchema;
