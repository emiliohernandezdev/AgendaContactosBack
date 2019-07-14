'use strict'

var express = require('express');
var PersonaController = require('../controllers/persona');

var api = express.Router();

api.get('/prueba-controlador', PersonaController.pruebaPersona);
api.get('/personas', PersonaController.getPersonas);
api.post('/savePersona', PersonaController.crearPersona);

module.exports = api;