//const { ObjectId } = require('bson');
const mongoose = require('mongoose');
const { isStringObject } = require('util/types');
const Schema = mongoose.Schema;

const UsuarioSchema = new Schema({
    nombre: String,
    email: String,
    codigo: String,
    usuario: String,
    clave: String,
    createdAt: String,
    updatedAt: String,
},{versionKey: false,});

module.exports = mongoose.model('Usuarios', UsuarioSchema);


//const mongoose = require('mongoose');
//const {Schema, model} = require('mongoose');

//module.exports = model('User', UserSchema);

//Creamos el modelo de Usuario que está en la BD
/*const UsuarioSchema = new mongoose.Schema({
    _id: {
        type: ObjectId,
        required: true,
    },
    nombre: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    codigo: {
        type: String,
        required: true,
    },
    usuario: {
        type: String,
        required: true,
    },
    clave: {
        type: String,
        required: true,
    },
});*/