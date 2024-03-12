const express = require('express');
const router = express.Router();

const genreController = require('../controllers/genreController');

//Rutas API
//Listado de todos los generos
router.get('/api/genres', genreController.listAPI);
//Detalle de un genero en base a un id indicado
router.get('/api/products/:id', genreController.detailAPI);

module.exports = router;