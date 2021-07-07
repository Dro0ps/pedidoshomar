const mongoose = require('mongoose');

const ProductoSchema = mongoose.Schema({
    sku: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    nombre_producto: {
        type: String,
        required: true,
        trim: true
    },
    precio: {
        type: String,
        required: true,
        trim: true
    },
    codigo: {
        type: String,
        required: true,
        trim: true
    },
    categoria: {
        type: String,
        required: true,
        trim: true
    }

});

module.exports = mongoose.model('Producto', ProductoSchema);