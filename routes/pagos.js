const express = require('express');
const router = express.Router();
const pagoController = require('../controllers/pagoController');
const auth = require('../middleware/auth');
const { check } = require('express-validator');


// Crea pedidos
// api/pedidos
router.post('/', 
    auth,
    [
        check('num_pedido_pago', 'El numero del pedido es obligatoio').not().isEmpty()
    ],
    pagoController.registrarPago
);

// Obtener todos los pedidos
router.get('/', 
    auth,
    pagoController.obtenerPagos
)

// Actualizar pedido via ID
router.put('/:id', 
    auth,
    [
        check('num_pedido_pago', 'El numero del pedido es obligatoio').not().isEmpty()
    ],
    pagoController.actualizarPago
);

// Eliminar un Proyecto
router.delete('/:id', 
    auth,
    pagoController.eliminarPago
);

module.exports = router;