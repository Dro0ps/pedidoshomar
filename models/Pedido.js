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
    num_documento: {
        type: String,
        required: false,
        trim: true,
        
    },
    confirmado_por: {
        type: String,
        required: false,
        trim: true,
        default: "sin asignar"
    },
    fecha_confirmacion: {
        type: String,
        required: false,
        trim: true,
        default: "sin asignar"
    },
    num_transaccion: {
        type: String,
        required: false,
        trim: true,
        default: "sin asignar"
    },
    fecha_entrega: {
        type: String,
        required: false,
        trim: true,
        
    },
    lugar_entrega: {
        type: String,
        required: false,
        trim: true,
        default: "sin asignar"
    },
    bultos: {
        type: String,
        required: false,
        trim: true,
        default: "sin asignar"
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
    archivo: {
        type: String
    },
    doc_archivo: {
        type: String
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