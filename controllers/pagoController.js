const Pago = require('../models/Pago');
const { validationResult } = require('express-validator');

exports.registrarPago = async (req, res) => {

    // Revisar si hay errores
    const errores = validationResult(req);
    if( !errores.isEmpty() ) {
        return res.status(400).json({errores: errores.array() })
    }

    const { num_pedido_pago, monto_pedido, fecha_pago } = req.body;

    try {

        let checaNumero = await Pago.findOne({num_pedido_pago});

        if(checaNumero) {
            return res.status(400).json({ msg: 'El Pedido Ya Existe' });
        }
        

        // Crear un nuevo pago
        pago = new Pago(req.body);

        // Guardar el creador via JWT
        pago.creador = req.usuario.id;

        // guardamos el pago
        pago.save();
        res.json(pago);/*  */
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un Error');
    }
}

// Obtiene todos los pagos del usuario actual
exports.obtenerPagos = async (req, res) => {
    try {
        const pagos = await Pago.find(/* { creador: req.usuario.id } */).sort({ creado: -1 });
        res.json({ pagos });
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
} 

// Actualiza un pago
exports.actualizarPago = async (req, res) => {

    // Revisar si hay errores
    const errores = validationResult(req);
    if( !errores.isEmpty() ) {
        return res.status(400).json({errores: errores.array() })
    }

    // extraer la información del pago
    const { 
        num_pedido_pago,
        nombre_cliente,
        monto_pedido,
        medio_pago,
        banco,
        fecha_pago,
        confirma_pago
    } = req.body;


    const nuevoPago = {};
    
    if(num_pedido) {
        nuevoPago.num_pedido_pago = num_pedido_pago;
        nuevoPago.nombre_cliente = nombre_cliente;
        nuevoPago.monto_pedido = monto_pedido;
        nuevoPago.medio_pago = medio_pago;
        nuevoPago.banco = banco;
        nuevoPago.fecha_pago = fecha_pago;
        nuevoPago.tipo_documento = tipo_documento;
        nuevoPago.confirma_pago = confirma_pago;

    }

    if(confirma_pago){
        nuevoPago.confirma_pago = confirma_pago;
    }

    try {

        // revisar el ID 
        let pago = await Pago.findById(req.params.id);

        // si el pago existe o no
        if(!pago) {
            return res.status(404).json({msg: 'Pago no encontrado'})
        }

        // verificar el creador del pago
/*         if(pago.creador.toString() !== req.usuario.id ) {
            return res.status(401).json({msg: 'No Autorizado'});
        } */

        // actualizar
        pago = await Pago.findByIdAndUpdate({ _id: req.params.id }, { $set : nuevoPago}, { new: true });

        res.json({pago});

    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor');
    }
}

// Elimina un pago por su id
exports.eliminarPago = async (req, res ) => {
    try {
        // revisar el ID 
        let pago = await Pago.findById(req.params.id);

        // si el pago existe o no
        if(!pago) {
            return res.status(404).json({msg: 'Pago no encontrado'})
        }

        // verificar el creador del pago
        if(pago.creador.toString() !== req.usuario.id ) {
            return res.status(400).json({msg: 'No Autorizado'});
        }

        // Eliminar el Pago
        await Pago.findOneAndRemove({ _id : req.params.id });
        res.json({ msg: 'Pago eliminado '})

    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor')
    }
}
