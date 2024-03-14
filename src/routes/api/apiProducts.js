const express = require('express');
const router = express.Router();
const apiProductController = require('../../controllers/api/apiProductController');

//Listado de todos los productos
router.get('/', apiProductController.listAPI);
//Detalle de un producto en base a un id indicado
router.get('/detail/:id', apiProductController.detailAPI);
//Detalle de ultimo producto agregado
router.get('/lastProduct', apiProductController.lastProduct); 
//Agregar un producto
router.post('/create', apiProductController.createAPI);
//Modificar un producto
router.put('/update/:id', apiProductController.updateAPI);
//Eliminar un producto
router.delete('/delete/:id', apiProductController.destroyAPI);

module.exports = router;