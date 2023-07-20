const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductoSchema = new Schema({
    nombre: String,
    color: String,
},{versionKey: false});

//module.exports = mongoose.model('Productos', ProductoSchema);


//module.exports = model('User', UserSchema);