const Pedido = require('../models/Pedido');
const { validationResult } = require('express-validator');

const multer = require('multer');
const shortid = require('shortid');

const configuracionMulter = {
    storage: fileStorage = multer.diskStorage({
        destination: (req, res, next) => {
            next(null, __dirname+'/../uploads/');
        },
        filename : (req, file, next) => {
            const extension = file.mimetype.split('/')[1];
            next(null, `${shortid.generate()}.${extension}`);
        }
    })
    
}
const upload = multer(configuracionMulter).single('archivo');

// Sube archivo en el servidor
exports.subirArchivo = (req, res, next) => {
    upload(req, res, function(error) {
        if(error) {
            console.log(error);
            // TODO :Manejar Errores
        } else {
            next();
        }
    })
}


exports.crearPedido = async (req, res) => {

    // Revisar si hay errores
    const errores = validationResult(req);
    if( !errores.isEmpty() ) {
        return res.status(400).json({errores: errores.array() })
    }


    try {
        // Crear un nuevo pedido
        const pedido = new Pedido(req.body);

        // Guardar el creador via JWT
        pedido.creador = req.usuario.id;

        // Leer el nombre del archivo
        pedido.archivo = req.file.filename;

        // guardamos el pedido
        pedido.save();
        res.json(pedido);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

// Obtiene todos los pedidos del usuario actual
exports.obtenerPedidos = async (req, res) => {
    try {
        const pedidos = await Pedido.find(/* { creador: req.usuario.id }).sort({ creado: -1 } */);
        res.json({ pedidos });
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
} 

// Actualiza un pedido
exports.actualizarPedido = async (req, res) => {

    // Revisar si hay errores
    const errores = validationResult(req);
    if( !errores.isEmpty() ) {
        return res.status(400).json({errores: errores.array() })
    }

    // extraer la información del pedido
    const { 
        num_pedido,
        nombre_cliente,
        monto_pedido,
        medio_pago,
        banco,
        fecha_deposito,
        tipo_documento,
        num_documento,
        archivo,
        estado_pedido,
        estado_despacho,
        
        fecha_pedido
    } = req.body;


    const nuevoPedido = {};
    
    if(num_pedido) {
        nuevoPedido.num_pedido = num_pedido;
        nuevoPedido.nombre_cliente = nombre_cliente;
        nuevoPedido.monto_pedido = monto_pedido;
        nuevoPedido.medio_pago = medio_pago;
        nuevoPedido.banco = banco;
        nuevoPedido.fecha_deposito = fecha_deposito;
        nuevoPedido.tipo_documento = tipo_documento;
        nuevoPedido.num_documento = num_documento;
        nuevoPedido.archivo = archivo;
        nuevoPedido.estado_pedido = estado_pedido;
        nuevoPedido.estado_despacho = estado_despacho;
        
    }
    if(estado_pedido){
        nuevoPedido.estado_pedido = estado_pedido;
    }
    if(estado_despacho){
        nuevoPedido.estado_despacho = estado_despacho;
    }

    try {

        // revisar el ID 
        let pedido = await Pedido.findById(req.params.id);

        // si el pedido existe o no
        if(!pedido) {
            return res.status(404).json({msg: 'Pedido no encontrado'})
        }

        /* // verificar el creador del pedido
        if(pedido.creador.toString() !== req.usuario.id ) {
            return res.status(401).json({msg: 'No Autorizado'});
        } */

        // actualizar
        pedido = await Pedido.findByIdAndUpdate({ _id: req.params.id }, { $set : nuevoPedido}, { new: true });

        res.json({pedido});

    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor');
    }
}

// Elimina un pedido por su id
exports.eliminarPedido = async (req, res ) => {
    try {
        // revisar el ID 
        let pedido = await Pedido.findById(req.params.id);

        // si el pedido existe o no
        if(!pedido) {
            return res.status(404).json({msg: 'Pedido no encontrado'})
        }

        // verificar el creador del pedido
        if(pedido.creador.toString() !== req.usuario.id ) {
            return res.status(401).json({msg: 'No Autorizado'});
        }

        // Eliminar el Pedido
        await Pedido.findOneAndRemove({ _id : req.params.id });
        res.json({ msg: 'Pedido eliminado '})

    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor')
    }
}
