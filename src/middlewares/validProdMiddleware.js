const path = require('path');
const { check } = require('express-validator');

//const db = require('../database/models');

module.exports = [
	check('title').notEmpty().withMessage('Tienes que escribir un titulo').bail()
	.isLength({ min:5 }).withMessage('Escribir titulo de 5 caracteres como minimo'),
	check('description').isLength({ min:20 }).withMessage('Escribir Descripcion de 20 caracteres como minimo'),
	check('imgTop').custom((value, { req }) => {
		let file = req.file;
		let acceptedExtensions = ['.jpg', '.png', '.gif', 'jpeg'];

		if (!file) {
			throw new Error('Tienes que subir una imagen');
		} else {
			let fileExtension = path.extname(file.originalname);
			if (!acceptedExtensions.includes(fileExtension)) {
				throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
			}
		}

		return true;
	}),
	check('imgBack').custom((value, { req }) => {
		let file = req.file;
		let acceptedExtensions = ['.jpg', '.png', '.gif', 'jpeg'];

		if (!file) {
			throw new Error('Tienes que subir una imagen');
		} else {
			let fileExtension = path.extname(file.originalname);
			if (!acceptedExtensions.includes(fileExtension)) {
				throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
			}
		}

		return true;
	})
]