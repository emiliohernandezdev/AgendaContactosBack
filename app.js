'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
	next();
});	


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// Cargar rutas de Teacher

var persona_routes = require('./routes/persona');
var usuario_routes = require('./routes/usuario');


// Ruta global y específica
app.use('/v1', persona_routes);
app.use('/v2', usuario_routes)

//CORS


//Ruta de ejemplo

app.get('/prueba', (req, res) => {
    res.status(200).send({message: 'Probando nuestro api'});

});

module.exports = app;
