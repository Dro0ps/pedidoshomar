const Producto = require('../models/Producto');
const { validationResult } = require('express-validator');


// Crear al producto
exports.crearProducto = async (req, res) => {

    // Revisar si hay errores
    const errores = validationResult(req);
    if( !errores.isEmpty() ) {
        return res.status(400).json({errores: errores.array() })
    }


    try {
        // Crear un nuevo producto
        const producto = new Producto(req.body);

        // guardamos el producto
        producto.save();
        res.json(producto);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al crear producto');
    }

}

// Obtiene todos los productos del usuario actual
exports.obtenerProductos = async (req, res) => {
    try {
        const productos = await Producto.find();
        res.json({ productos });
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
} 

// Actualiza un producto
exports.actualizarProducto = async (req, res) => {

    // Revisar si hay errores
    const errores = validationResult(req);
    if( !errores.isEmpty() ) {
        return res.status(400).json({errores: errores.array() })
    }

    // extraer la información del producto
    const { 
        sku,
        nombre_producto,
        precio,
        codigo,
        categoria
         } = req.body;


    const nuevoProducto = {};
    
    if(sku) {
        nuevoProducto.sku = sku;
        nuevoProducto.nombre_producto = nombre_producto;
        nuevoProducto.precio = precio;
        nuevoProducto.codigo = codigo;
        nuevoProducto.categoria = categoria;
        
    }
    

    try {

        // revisar el ID 
        let producto = await Producto.findById(req.params.id);

        // si el producto existe o no
        if(!producto) {
            return res.status(404).json({msg: 'Producto no encontrado'})
        }


        // actualizar
        producto = await Producto.findByIdAndUpdate({ _id: req.params.id }, { $set : nuevoProducto}, { new: true });

        res.json({producto});

    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor');
    }
}

// Elimina un producto por su id
exports.eliminarProducto = async (req, res ) => {
    try {
        // revisar el ID 
        let producto = await Producto.findById(req.params.id);

        // si el producto existe o no
        if(!producto) {
            return res.status(404).json({msg: 'Producto no encontrado'})
        }

        // Eliminar el Producto
        await Producto.findOneAndRemove({ _id : req.params.id });
        res.json({ msg: 'Producto eliminado '})

    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor')
    }
}