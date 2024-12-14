//const { ObjectId } = require('bson');
const mongoose = require('mongoose');
//const Schema = mongoose.Schema;

const PermisoSchema = new mongoose.Schema({
    nom_perm: String,
    key_perm: String,
},{versionKey: false,});


const permiso = mongoose.model('Permiso', PermisoSchema, 'permisos');

module.exports={
    Permiso:permiso
}
