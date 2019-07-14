'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UsuarioSchema = Schema({
    first_name: String,
    email: String,
    password: String,
    phones: {
        mobile: String,
        house: String,
        other: String
    },
    contacts: []
});

module.exports = mongoose.model('Usuario', UsuarioSchema);