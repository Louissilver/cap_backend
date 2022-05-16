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
routes.post('/clientes', ClienteController.create);
routes.put(
  '/clientes/:id',
  ClienteMiddleware.validateId,
  ClienteController.update
);
routes.delete(
  '/clientes/:id',
  ClienteMiddleware.validateId,
  ClienteController.delete
);

// Cidades
routes.get('/cidades', CidadeController.index);
routes.post('/cidades', CidadeController.create);
routes.put(
  '/cidades/:id',
  CidadeMiddleware.validateId,
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

module.exports = routes;
