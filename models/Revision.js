const mongoose = require('mongoose');

const RevisionSchema = mongoose.Schema({
    doc_revisado: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    revisado: {
        type: Boolean,
        default: false,
    },
    fecha_revisado: {
        type: String,
        required: true,
        trim: true
    },
    revisado_por: {
        type: String,
        required: false,
        trim: true
    },
    comentarios: [{ 
        body: String, 
        date: Date 
    }],
    verificado: {
        type: Boolean,
        default: false,
    },
    fecha_verificado: {
        type: String,
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

module.exports = mongoose.model('Revision', RevisionSchema);