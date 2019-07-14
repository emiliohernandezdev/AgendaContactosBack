'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 3000;



mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/moduloPersona', {useNewUrlParser:true})
.then((err, res)=> {
    console.log('Conexión establecida a la base de datos');

    app.listen(port,() => {
        console.log("Servidor ejecutándose en el puerto "+ port);


    });
})
.catch(err=>console.log(err));

