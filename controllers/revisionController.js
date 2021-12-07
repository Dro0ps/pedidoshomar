const Revision = require('../models/Revision');
const { validationResult } = require('express-validator');

exports.registrarRevision = async (req, res) => {

    // Revisar si hay errores
    const errores = validationResult(req);
    if( !errores.isEmpty() ) {
        return res.status(400).json({errores: errores.array() })
    }

    const { doc_revisado } = req.body;

    try {

        let checaDocumento = await Revision.findOne({doc_revisado});

        if(checaDocumento) {
            return res.status(400).json({ msg: 'El documento ya se encuentra revisado' });
        }
        

        // Crear un nuevo revision
        revision = new Revision(req.body);

        // Guardar el creador via JWT
        revision.creador = req.usuario.id;

        // guardamos la revision
        revision.save();
        res.json(revision);/*  */
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error en el registro');
    }
}

// Obtiene todos los revisiones del usuario actual
exports.obtenerRevisiones = async (req, res) => {
    try {
        const revisiones = await Revision.find(/* { creador: req.usuario.id } */).sort({ creado: -1 });
        res.json({ revisiones });
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al obtener revisiones');
    }
} 

// Actualiza un revision
exports.actualizarRevision = async (req, res) => {

    // Revisar si hay errores
    const errores = validationResult(req);
    if( !errores.isEmpty() ) {
        return res.status(400).json({errores: errores.array() })
    }

    // extraer la información del revision
    const { 
        doc_revisado,
        revisado,
        fecha_revisado,
        revisado_por,
        comentarios,
        verificado,
        fecha_verificado
    } = req.body;


    const nuevaRevision = {};
    
    if(doc_revisado) {
        nuevaRevision.doc_revisado = doc_revisado;
        nuevaRevision.banco = banco;
        nuevaRevision.fecha_revisado = fecha_revisado;
        nuevaRevision.revisado_por = revisado_por;
        nuevaRevision.comentarios = comentarios;
        
        nuevaRevision.verificado = verificado;
        nuevaRevision.fecha_verificado = fecha_verificado;
        
    }
    if(revisado){
        nuevaRevision.revisado = revisado;
    }
    if(verificado){
        nuevaRevision.verificado = verificado;
    }
    try {

        // revisar el ID 
        let revision = await Revision.findById(req.params.id);

        // si el revision existe o no
        if(!revision) {
            return res.status(404).json({msg: 'Revision no encontrada'})
        }

        // verificar el creador del revision
/*         if(revision.creador.toString() !== req.usuario.id ) {
            return res.status(401).json({msg: 'No Autorizado'});
        } */

        // actualizar
        revision = await Revision.findByIdAndUpdate({ _id: req.params.id }, { $set : nuevaRevision}, { new: true });

        res.json({revision});

    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor (Update)');
    }
}

// Elimina un revision por su id
exports.eliminarRevision = async (req, res ) => {
    try {
        // revisar el ID 
        let revision = await Revision.findById(req.params.id);

        // si el revision existe o no
        if(!revision) {
            return res.status(404).json({msg: 'Revision no encontrado'})
        }

        // verificar el creador del revision
        if(revision.creador.toString() !== req.usuario.id ) {
            return res.status(400).json({msg: 'No Autorizado'});
        }

        // Eliminar el Revision
        await Revision.findOneAndRemove({ _id : req.params.id });
        res.json({ msg: 'Revision eliminado '})

    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor (Delete)')
    }
}
