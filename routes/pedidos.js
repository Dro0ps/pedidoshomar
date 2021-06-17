const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/pedidoController');
const auth = require('../middleware/auth');
const { check } = require('express-validator');


// Crea pedidos
// api/pedidos
router.post('/', 
    /* auth, */
    /* [
        check('num_pedido', 'El numero del pedido es obligatoio').not().isEmpty()
    ], */
    pedidoController.subirArchivo,
    pedidoController.crearPedido
);

// Obtener todos los pedidos
router.get('/', 
    auth,
    pedidoController.obtenerPedidos
)

// Actualizar pedido via ID
router.put('/:id', 
    auth,
    
    pedidoController.actualizarPedido
);

// Eliminar un Proyecto
router.delete('/:id', 
    auth,
    pedidoController.eliminarPedido
);

module.exports = router;