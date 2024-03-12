const express = require('express');
const router = express.Router();
const apiUserController = require('../../controllers/api/apiUserController');

//Listado de todos los usuarios
router.get('/', apiUserController.listAPI);
//Detalle de un usuario en base a una categoria indicado
router.get('/:id', apiUserController.detailAPI);
//Agregar un usuario
router.post('/create', apiUserController.createAPI);
//Modificar un usuario
router.put('/update/:id', apiUserController.updateAPI);
//Eliminar un usuario
router.delete('/delete/:id', apiUserController.destroyAPI);

module.exports = router;