const mongoose = require('mongoose');

const PedidoSchema = mongoose.Schema({
    num_pedido: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    nombre_cliente: {
        type: String,
        required: true,
        trim: true
    },
    monto_pedido: {
        type: String,
        required: true,
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
    confirma_pago: {
        type: Boolean,
        default: false,

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