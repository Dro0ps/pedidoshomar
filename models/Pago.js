const mongoose = require('mongoose');

const PagoSchema = mongoose.Schema({
    num_pedido_pago: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    rut_depositante: {
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
        required: true,
        trim: true
    },
    fecha_pago: {
        type: String,
        required: true,
        trim: true
    },
    confirmado_por: {
        type: String,
        required: false,
        trim: true
    },
    fecha_confirmacion: {
        type: String,
        required: false,
        trim: true
    },
    confirma_pago: {
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

module.exports = mongoose.model('Pago', PagoSchema);