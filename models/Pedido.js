const mongoose = require('mongoose');

const PedidoSchema = mongoose.Schema({
    num_pedido: {
        type: String,
        required: false,
        trim: true
    },
    nombre_cliente: {
        type: String,
        required: false,
        trim: true
    },
    monto_pedido: {
        type: String,
        required: false,
        trim: true
    },
    medio_pago: {
        type: String,
        required: false,
        trim: true
    },
    banco: {
        type: String,
        required: false,
        trim: true
    },
    fecha_deposito: {
        type: String,
        required: false,
        trim: true
    },
    tipo_documento: {
        type: String,
        required: false,
        trim: true
    },
    num_documento: {
        type: String,
        required: false,
        trim: true
    },
    fecha_pedido: {
        type: String,
        required: false,
        trim: true
    },
    archivo: {
        type: String
    },
    estado_pedido: {
        type: Boolean,
        default: false,

    },
    estado_despacho: {
        type: Boolean,
        default: false,
    },
    creador: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Usuario'
    },
    creado: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Pedido', PedidoSchema);