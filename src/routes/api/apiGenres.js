const express = require('express');
const router = express.Router();
const apiGenreController = require('../../controllers/api/apiGenreController');

//Listado de todos los usuarios
router.get('/', apiGenreController.listAPI);
//Detalle de un genero en base a un id indicado
router.get('/detail/:id', apiGenreController.detailAPI);
//Productos por genero
router.get('/detail/:id/products', apiGenreController.genreProducts);

module.exports = router;