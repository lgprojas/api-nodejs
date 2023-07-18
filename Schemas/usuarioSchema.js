//const { ObjectId } = require('bson');
const mongoose = require('mongoose');
//const Schema = mongoose.Schema;

const LoginSchema = new mongoose.Schema({
    nombre: String,
    email: String,
    usuario: String,
    clave: String,
},{versionKey: false,});

const UsuarioSchema = new mongoose.Schema({
    nombre: String,
    email: String,
    codigo: String,
    usuario: String,
    clave: String,
    createdAt: String,
    updatedAt: String,
},{versionKey: false,});

const login = mongoose.model('Login', LoginSchema, 'usuarios');
const usuarios = mongoose.model('Usuario', UsuarioSchema, 'usuarios');

module.exports={
    Login:login,
    Usuario:usuarios
}

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