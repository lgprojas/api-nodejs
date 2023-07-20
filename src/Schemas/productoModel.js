const mongoose = require('mongoose');
const SchemaProd = mongoose.Schema;

const ProductoSchema = new SchemaProd({
    nombre: String,
    color: String,
}, {versionKey: false});

module.exports = mongoose.model('Productos', ProductoSchema);