'use strict'

//var mongoose = require('mongoose');
var Persona = require('../models/persona');

function pruebaPersona(req, res){
     res.status(200).send({message: 'Persona está corriendo'});
}

function getPersonas(req, res){
    Persona.find({}, (err, todasLasPersonas)=>{
        if(err){
            res.status(200).send({message: 'Error al traer los datos'});
        }else{
            res.status(200).send({todasLasPersonas});
        }
    });
}



function crearPersona(req, res){
    var persona = new Persona();
    var params = req.body;
    
    if(params.primer_nombre && params.celular){
        
            persona.primer_nombre = params.primer_nombre;
            persona.segundo_nombre = params.segundo_nombre;
            persona.primer_apellido = params.primer_apellido;
            persona.segundo_apellido = params.segundo_apellido;
            persona.fecha_nacimiento = params.fecha_nacimiento;
            persona.correo = params.correo;
            persona.direccion = params.direccion;

                persona.telefonos.celular = params.celular,
                persona.telefonos.casa = params.casa,
                persona.telefonos.otros = params.otros
            

        persona.save((err, personaSave)=>{
            if(err){
                console.log(err);
                res.status(200).send({message: 'Usuario no guardado'})
            }else{
                res.status(200).send({personaSave});
            }
        })
    }else{
        console.log(params);
        res.status(200).send({message: 'Ingrese todos los campos requeridos'});

    }
}

module.exports = {
    pruebaPersona,
    getPersonas,
    crearPersona

}