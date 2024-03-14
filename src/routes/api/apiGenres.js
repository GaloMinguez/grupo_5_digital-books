const express = require('express');
const router = express.Router();
const apiGenreController = require('../../controllers/api/apiGenreController');

//Listado de todos los usuarios
router.get('/', apiGenreController.listAPI);

module.exports = router;