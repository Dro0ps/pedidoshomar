const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController');
const auth = require('../middleware/auth');
const { check } = require('express-validator');

// Crea productos
// api/productos
router.post('/', 
    auth,
    [
        check('sku', 'El SKU del producto es obligatoio').not().isEmpty()
    ],
    productoController.crearProducto
);

// Obtener todos los productos
router.get('/', 
    auth,
    productoController.obtenerProductos
)

// Actualizar producto via ID
router.put('/:id', 
    auth,
    [
        check('sku', 'El SKU del producto es obligatoio').not().isEmpty()
    ],
    productoController.actualizarProducto
);

// Eliminar un Producto
router.delete('/:id', 
    auth,
    productoController.eliminarProducto
);

module.exports = router;