'use strict'

var express = require('express');
var UsuarioController = require('../controllers/usuario');

var api = express.Router();

api.post('/login', UsuarioController.Login);
api.post('/register', UsuarioController.Register)
api.post('/newContact/:id', UsuarioController.newContact);
api.get('/get-contacts/:id', UsuarioController.searchContacts);
api.post('/delete-contact/:id', UsuarioController.DeleteContact)
api.post('/update-contact/:id', UsuarioController.UpdateContact);


module.exports = api;