//const { ObjectId } = require('bson');
const mongoose = require('mongoose');
//const Schema = mongoose.Schema;

const RoleSchema = new mongoose.Schema({
    nom_role: String,
},{versionKey: false,});


const role = mongoose.model('Role', RoleSchema, 'roles');

module.exports={
    Role:role
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