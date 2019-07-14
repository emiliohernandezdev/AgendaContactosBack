'use strict'

var Usuario = require('../models/usuario');
var Persona = require('../models/persona');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../services/jwt');
var mongoose = require('mongoose');

function Login(req, res){
    var body = req.body;
    var email = body.email;
    var password = body.password;

    Usuario.findOne({email: email.toLowerCase()}, (err, usuario) => {
        if(err){
            res.status(200).send({message: 'Error al buscar la persona'});
        }else{
            if(!usuario){
                res.status(200).send({message: 'Usuario no encontrado.'});
            }else{
                bcrypt.compare(body.password, usuario.password, (err, ok) => {
                    if(ok){
                        res.status(200).send({message: 'Sesión iniciada con éxito.', token: jwt.createToken(usuario), id: usuario._id})
                        
                    }else{
                        res.status(200).send({message: 'Las contraseñas no coinciden'});
                     }
                })
            }
        }
    })
}

function Register(req, res){
    var body = req.body;
    var user = new Usuario();

    Usuario.find({email: body.email.toLowerCase()}, (err, users) => {
        if(err){
            res.status(200).send({message: 'Error al intentar guardar el usuario'});
        }else{
            if(users.length < 1){
                if(body.first_name && body.email && body.mobile && body.password){
                    user.first_name = body.first_name;
                    user.email = body.email;
                    user.phones.mobile = body.mobile;
                    user.contacts = [];

                    bcrypt.hash(body.password, null, null, (err, hash) => {
                        if(err){
                            res.status(200).send({message: 'Error al guardar la contraseña.'});
                        }else{
                            user.password = hash;
                            user.save((err, userStored) => {
                                if(err){
                                    res.status(200).send({message: 'Error al guardar el usuario'});
                                }else{
        
                                    res.status(200).send({message: 'Usuario guardado con éxito', user: userStored})
                                }
                            } )
                        }
                    })

                }else{
                    res.status(200).send({message: 'Ingresa los datos solicitados'});
                }

            }else{
                res.status(200).send({message: 'Elige diferentes datos para el usuario'});
            }
        }
    })
}

function newContact(req, res){
    var contact = new Persona();
    var body = req.body;
    var params = req.params;
    var userId = params.id;

    if(body.primer_nombre && body.primer_apellido && body.celular && body.genero && params.id){
        contact.primer_nombre = body.primer_nombre;
        contact.segundo_nombre = body.segundo_nombre;
        contact.primer_apellido = body.primer_apellido;
        contact.segundo_apellido = body.segundo_apellido;
        contact.fecha_nacimiento = body.fecha_nacimiento;
        contact.correo = body.correo;
        contact.genero = body.genero;
        contact.direccion = body.direccion;
        contact.telefonos.celular = body.celular;
        contact.telefonos.casa = body.casa;
        contact.telefonos.otro = body.otro;
        
        Usuario.findByIdAndUpdate(userId, {$push: {contacts: contact}}, {new: true}, (err, contactSave) => {
            if(err){
                res.status(200).send({message: 'Error al intentar guardar el contacto.', code: 2})
            }else{
                if(!contactSave){
                    res.status(200).send({message: 'El contacto no se ha guardado.', code: 2})
                }else{
                    res.status(200).send({contactSave, code: 1});
                }

            }
        })
    }else{
        res.status(200).send({message: 'Ingresa los campos requeridos.'})
    }
}

function searchContacts(req, res){
    var params = req.params;
    var id = params.id;


    if(id){
        Usuario.findOne({_id: id}, (err, user) => {
            if(err){
                res.status(200).send({message: 'Error general.'});
            }else{
                if(!user){
                    res.status(200).send({message: 'Usuario inexistente.'});
                }else{
                    res.status(200).send({user});
                }
            }
        })
    }else{
        res.status(200).send({message: 'El ID de usuario es requerido.'})
    }


}


function DeleteContact(req, res){
    var userId = req.body.user;
    var contactId = req.params.id;

    Usuario.findOne({_id: userId}, (err, user) => {
        if(err){
            res.status(200).send({message: 'Error general.', code: 2});
            console.log(err);
        }else{
            if(user){
                for(var indice in user.contacts){
                    var id = user.contacts[indice]._id;

                    if(id == contactId){
                        var index = indice;
                        
                    }
                }

                user.contacts.splice(index, 1);

                

                Usuario.findByIdAndUpdate({_id: userId}, {$set: {contacts: user.contacts}}, (err, ok) =>{
                    if(err){
                        res.status(200).send({message: 'Error al intentar eliminar el contacto.', code: 2})
                    }else{
                        res.status(200).send({message: 'Contacto eliminado con éxito.', code: 1})
                    }
                })
            }else{
            res.status(200).send({message: 'Usuario inexistente.', code: 2})
            }
        }
    })
    

}

function UpdateContact(req, res){
    var userId = req.body.user;
    var contactId = req.params.id;
    var ContactUpdate = JSON.stringify(req.body.contacto);
    

    Usuario.findOneAndUpdate({_id: mongoose.Types.ObjectId(userId), "contacts._id": mongoose.Types.ObjectId(contactId)}, 
    {$set: {"contacts.$.primer_nombre" : ContactUpdate.primer_nombre}},  
    (err, doc, resp) =>  {
        if(err){
            console.log(err);
            res.status(200).send({message: 'Error al actualizar' + err, code: 2});
        }else{
            console.log(resp);
            res.status(200).send({message: 'Actualizado con éxito!', code: 1})
        }
    })
    

}

module.exports = {
    Login,
    Register,
    newContact,
    searchContacts,
    DeleteContact,
    UpdateContact
}