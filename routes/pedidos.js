const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/pedidoController');
const auth = require('../middleware/auth');
const { check } = require('express-validator');


const AWS = require('aws-sdk');
require('dotenv').config({ path: 'variables.env' });
const multerS3 = require('multer-s3')
const multer = require('multer');
const shortid = require('shortid');


// Crea pedidos
// api/pedidos

AWS.config.update({
    secretAccessKey: process.env.AWS_SECRET_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY,
    region: process.env.AWS_BUCKET_REGION
});

const s3 = new AWS.S3();

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.AWS_BUCKET_NAME_PEDIDO,
        key: function (req, file, cb) {
            console.log(file);
            const extension = file.mimetype.split('/')[1];
            /* cb(null, `${shortid.generate()}.${extension}`); */ //use Date.now() for unique file keys
            cb(null, `${shortid.generate()}${file.originalname}`); //use Date.now() for unique file keys
        },

    })
});

const uploadFactura = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.AWS_BUCKET_NAME_FACTURA,
        key: function (req, file, cb) {
            console.log(file);
            const extension = file.mimetype.split('/')[1];
            /* cb(null, `${shortid.generate()}.${extension}`); */ //use Date.now() for unique file keys
            cb(null, `${shortid.generate()}${file.originalname}`); //use Date.now() for unique file keys
        },

    })
});



router.post('/', 
    auth,
    /* [
        check('num_pedido', 'El numero del pedido es obligatoio').not().isEmpty()
    ], */
    upload.array('archivo'),
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
    [
        check('num_pedido', 'El numero del pedido es obligatoio').not().isEmpty()
    ],
    pedidoController.actualizarPedido
);

// Subir factura a pedido via ID
router.put('/up/:id', 
    auth,
    /* [
        check('num_pedido', 'El numero del pedido es obligatoio').not().isEmpty()
    ], */
    uploadFactura.array('doc_archivo'),
    pedidoController.subirFactura
);


// Eliminar un Proyecto
router.delete('/:id', 
    auth,
    pedidoController.eliminarPedido
);

module.exports = router;