const mongoose = require('mongoose');

const TareaSchema = mongoose.Schema({
    titulo_anexo: {
        type: String,
        required: true,
        trim: true
    },
    anexo: {
        type: String,
        required: true,
        trim: true
    },
    operador: {
        type: String,
        required: true,
        trim: true
    },
    fecha_anexo: {
        type: String,
        required: true,
        trim: true
    },
    creado: {
        type: Date,
        default: Date.now()
    }, 
    pedido: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pedido'
    }
});

module.exports = mongoose.model('Tarea', TareaSchema);