const path = require('path');
const { check } = require('express-validator');

const db = require('../database/models');

module.exports = [
	check('fullName').notEmpty().withMessage('Tienes que escribir un nombre').bail()
	.isLength({ min:2 }).withMessage('Escribir nombre y apellido de 6 caracteres como minimo'),
	check('email', 'Email invalido').exists()
	.isEmail().withMessage('Debes escribir un formato de correo válido').trim().escape()
	.custom(userEmail=> {
		return new Promise((resolve, reject) => {
			db.Usuario.findOne({ where: { email: userEmail } })
			.then(emailExist => {
				if(emailExist !== null){
					reject(new Error('Este email ya existe!!'))
				}else{
					resolve(true)
				}
			})
			
		})
	}),
	check('password').notEmpty().withMessage('Tienes que escribir una contraseña').bail()
		.isLength({ min:8 }).withMessage('Escribir una contraseña de 8 caracteres como minimo'),
	check('cfpassword').trim().notEmpty().withMessage('Tienes que escribir una contraseña').bail()
	.custom((value, {req}) => {
		if (value !== req.body.password) {
			throw new Error('Las constraseñas no son iguales!!')
		}
		return true; 
		}),
	check('avatar').custom((value, { req }) => {
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