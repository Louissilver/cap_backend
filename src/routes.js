const express = require('express');
const routes = express.Router();

const ClienteController = require('./controllers/ClienteController');
const ClienteMiddleware = require('./middlewares/ClienteMiddleware');

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

module.exports = routes;
