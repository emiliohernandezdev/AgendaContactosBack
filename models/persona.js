'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PersonaSchema = Schema({
    primer_nombre: String,
    segundo_nombre: String,
    primer_apellido: String,
    segundo_apellido: String,
    fecha_nacimiento: Date,
    correo: String,
    direccion: String,
    genero: String,
    telefonos : 
        {
            celular: Number,
            casa: Number,
            otro: Number
        }
    
});

module.exports = mongoose.model('Persona', PersonaSchema);