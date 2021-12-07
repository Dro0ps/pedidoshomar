const express = require('express');
const router = express.Router();
const revisionController = require('../controllers/revisionController');
const auth = require('../middleware/auth');
const { check } = require('express-validator');


// Crea Registros de Revisión
// api/Revisión
router.post('/', 
    auth,
    [
        check('doc_revisado', 'El numero del Documento es obligatoio').not().isEmpty()
    ],
    revisionController.registrarRevision
);

// Obtener todos los registros de revisión
router.get('/', 
    auth,
    revisionController.obtenerRevisiones
)

// Actualizar revisión via ID
router.put('/:id', 
    auth,
    [
        check('doc_revisado', 'El numero del Documento es obligatoio').not().isEmpty()
    ],
    revisionController.actualizarRevision
);

// Eliminar un registro de revisión
router.delete('/:id', 
    auth,
    revisionController.eliminarRevision
);

module.exports = router;