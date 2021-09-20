const Pedido = require('../models/Pedido');
const { validationResult } = require('express-validator');

exports.crearPedido = async (req, res) => {

    // Revisar si hay errores
    const errores = validationResult(req);
    if( !errores.isEmpty() ) {
        return res.status(400).json({errores: errores.array() })
    }

    const { num_pedido } = req.body;

    try {

        let checaNumero = await Pedido.findOne({num_pedido});

        if(checaNumero) {
            return res.status(400).json({ msg: 'El Pedido Ya Existe' });
        }
        

        // Crear un nuevo pedido
        pedido = new Pedido(req.body);

        // Guardar el creador via JWT
        pedido.creador = req.usuario.id;

        // Asigna el nombre del archivo y la ruta en base de datos
        pedido.archivo = req.files[0].location;

        // guardamos el pedido
        pedido.save();
        res.json(pedido);/*  */
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un Error');
    }
}

// Obtiene todos los pedidos del usuario actual
exports.obtenerPedidosUsuario = async (req, res) => {
    try {
        const pedidos = await Pedido.find({ creador: req.usuario.id }).sort({ creado: -1 });
        res.json({ pedidos });
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
} 

// Obtiene todos los pedidos
exports.obtenerPedidos = async (req, res) => {
    try {
        const pedidos = await Pedido.find(/* { creador: req.usuario.id } */).sort({ creado: -1 })
        .populate("creador").populate({
            path: 'creador',
            model: 'Usuario'
        });
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
        confirma_pago,
        num_documento,
        confirmado_por,
        fecha_confirmacion,
        num_transaccion,
        fecha_entrega,
        lugar_entrega,
        bultos,
        estado_pedido,
        estado_despacho } = req.body;


    const nuevoPedido = {};
    
    if(num_pedido) {
        nuevoPedido.num_pedido = num_pedido;
        nuevoPedido.nombre_cliente = nombre_cliente;
        nuevoPedido.monto_pedido = monto_pedido;
        nuevoPedido.medio_pago = medio_pago;
        nuevoPedido.banco = banco;
        nuevoPedido.fecha_deposito = fecha_deposito;
        nuevoPedido.tipo_documento = tipo_documento;
        nuevoPedido.confirma_pago = confirma_pago;
        nuevoPedido.num_documento = num_documento;
        nuevoPedido.confirmado_por = confirmado_por;
        nuevoPedido.fecha_confirmacion = fecha_confirmacion;
        nuevoPedido.num_transaccion = num_transaccion;
        nuevoPedido.lugar_entrega = lugar_entrega;
        nuevoPedido.fecha_entrega = fecha_entrega;
        nuevoPedido.bultos = bultos;
        nuevoPedido.estado_pedido = estado_pedido;
        nuevoPedido.estado_despacho = estado_despacho;
    }
    if(estado_pedido){
        nuevoPedido.estado_pedido = estado_pedido;
    }
    if(estado_despacho){
        nuevoPedido.estado_despacho = estado_despacho;
    }
    if(confirma_pago){
        nuevoPedido.confirma_pago = confirma_pago;
    }

    try {

        // revisar el ID 
        let pedido = await Pedido.findById(req.params.id);

        // si el pedido existe o no
        if(!pedido) {
            return res.status(404).json({msg: 'Pedido no encontrado'})
        }

        // verificar el creador del pedido
/*         if(pedido.creador.toString() !== req.usuario.id ) {
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

// Subir Facturas
exports.subirFactura = async (req, res) => {

    try {
        // Revisar si hay errores
        const errores = validationResult(req);
        if( !errores.isEmpty() ) {
            return res.status(400).json({errores: errores.array() })
        }

        // Revisar el ID 
        let pedido = await Pedido.findById(req.params.id);

        // Si el pedido existe o no
        if(!pedido) {
            return res.status(404).json({msg: 'Pedido no encontrado'})
        }

        pedido.doc_archivo = req.files[0].location;

        //Construye un nuevo producto
        let subeFactura = req.body;

        
        subeFactura.doc_archivo = pedido.doc_archivo;
           
        // Actualizar
        pedido = await Pedido.findByIdAndUpdate({ _id: req.params.id }, subeFactura, { new: true });
        console.log(pedido);
        
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
            return res.status(400).json({msg: 'No Autorizado'});
        }

        // Eliminar el Pedido
        await Pedido.findOneAndRemove({ _id : req.params.id });
        res.json({ msg: 'Pedido eliminado '})

    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor')
    }
}
