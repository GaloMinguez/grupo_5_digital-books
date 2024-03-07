const path = require('path');
const { check } = require('express-validator');

const db = require('../database/models');

module.exports = [
	check('email')
	.notEmpty().withMessage('Tienes que escribir un correo electrónico').bail()
	.isEmail().withMessage('Debes escribir un formato de correo válido')
	.custom(userEmail=> {
		return new Promise((resolve, reject) => {
			db.Usuario.findOne({ where: { email: userEmail } })
			.then(emailExist => {
				if(emailExist !== null){
					resolve(true)
				}else{
					reject(new Error('Este email no existe!!'))
				}
			})
			
		})
	}),
	check('password').notEmpty().withMessage('Tienes que escribir una contraseña').bail()
	.custom(userPass=> {
		return new Promise((resolve, reject) => {
			db.Usuario.findOne({ where: { password: userPass } })
			.then(passExist => {
				if(passExist !== null){
					reject(new Error('Este password no existe!!'))
				}else{
					resolve(true)
				}
			})			
		})
	})
]