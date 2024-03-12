const express = require('express');
const router = express.Router();
const apiProductController = require('../../controllers/api/apiProductController');

//Listado de todos los productos
router.get('/', apiProductController.listAPI);
//Detalle de un producto en base a un genero indicado
router.get('/:id', apiProductController.detailAPI);
//Agregar un producto
router.post('/create', apiProductController.createAPI);
//Modificar un producto
router.put('/update/:id', apiProductController.updateAPI);
//Eliminar un producto
router.delete('/delete/:id', apiProductController.destroyAPI);

module.exports = router;