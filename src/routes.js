const express = require('express');
const routes = express.Router();

const ClienteController = require('./controllers/ClienteController');
const ClienteMiddleware = require('./middlewares/ClienteMiddleware');
const CidadeController = require('./controllers/CidadeController');
const CidadeMiddleware = require('./middlewares/CidadeMiddleware');
const EmpreendimentoController = require('./controllers/EmpreendimentoController');
const EmpreendimentoMiddleware = require('./middlewares/EmpreendimentoMiddleware');

// Clientes
routes.get('/clientes', ClienteController.index);
routes.get('/clientes/data', ClienteController.getAllByDate);
routes.get(
  '/clientes/:id',
  ClienteMiddleware.validateId,
  ClienteController.getDetalhe
);
routes.post(
  '/clientes',
  ClienteMiddleware.validation,
  ClienteController.create
);
routes.put(
  '/clientes/:id',
  ClienteMiddleware.validateId,
  ClienteMiddleware.validation,
  ClienteController.update
);
routes.delete(
  '/clientes/:id',
  ClienteMiddleware.validateId,
  ClienteController.delete
);

// Cidades
routes.get('/cidades', CidadeController.index);
routes.get(
  '/cidades/:id',
  CidadeMiddleware.validateId,
  CidadeController.getDetalhe
);
routes.post(
  '/cidades',
  CidadeMiddleware.validation,
  CidadeMiddleware.indexValidation,
  CidadeController.create
);
routes.put(
  '/cidades/:id',
  CidadeMiddleware.validateId,
  CidadeMiddleware.indexValidation,
  CidadeMiddleware.validation,
  CidadeController.update
);
routes.delete(
  '/cidades/:id',
  CidadeMiddleware.validateId,
  CidadeController.delete
);

// Empreendimentos
routes.get('/empreendimentos', EmpreendimentoController.index);
routes.get(
  '/empreendimentos/:id',
  EmpreendimentoMiddleware.validateId,
  EmpreendimentoController.getDetalhe
);
routes.post(
  '/empreendimentos',
  EmpreendimentoMiddleware.indexValidation,
  EmpreendimentoMiddleware.validation,
  EmpreendimentoController.create
);
routes.put(
  '/empreendimentos/:id',
  EmpreendimentoMiddleware.indexValidation,
  EmpreendimentoMiddleware.validateId,
  EmpreendimentoMiddleware.validation,
  EmpreendimentoController.update
);
routes.delete(
  '/empreendimentos/:id',
  EmpreendimentoMiddleware.validateId,
  EmpreendimentoController.delete
);

module.exports = routes;
