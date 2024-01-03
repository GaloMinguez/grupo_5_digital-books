const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');

const User = require('../models/user');

const controller = {
	register: (req, res) => {
		return res.render('../views/users/register');
	},
	processRegister: (req, res) => {
		const resultValidation = validationResult(req);

		if (resultValidation.errors.length > 0) {
			return res.render('../views/users/register', {
				errors: resultValidation.mapped(),
				oldData: req.body
			});
		}

		let userInDB = User.findByField('email', req.body.email);

		if (userInDB) {
			return res.render('../views/users/register', {
				errors: {
					email: {
						msg: 'Este email ya está registrado'
					}
				},
				oldData: req.body
			});
		}
		let userToCreate = {
			...req.body,
			password: bcryptjs.hashSync(req.body.password, 10),
			category: 'Customer',
			avatar: req.file.filename
		}
		let userCreated = User.create(userToCreate);

		return res.redirect('/users/login');
	},
	login: (req, res) => {
		return res.render('../views/users/login');
	},
	loginProcess: (req, res) => {
		let userToLogin = User.findByField('email', req.body.email);
		
		if(userToLogin) {
			let isOkThePassword = bcryptjs.compareSync(req.body.password, userToLogin.password);
			if (isOkThePassword) {
				delete userToLogin.password;
				req.session.userLogged = userToLogin;

				console.log(req.body.remember_user);
				if(req.body.remember_user) {
					//res.cookie('userEmail', req.body.email, { maxAge: (1000 * 10) })
					res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 60 }) //60 minutos
				}

				return res.redirect('/users/profile');
			} 
			return res.render('../views/users/login', {
				errors: {
					email: {
						msg: 'Las credenciales son inválidas'
					}
				}
			});
		}

		return res.render('../views/users/login', {
			errors: {
				email: {
					msg: 'No se encontro este email en la Base de Datos'
				}
			}
		});
	},
	profile: (req, res) => {
		return res.render('../views/users/profile', {
			user: req.session.userLogged
		});
	},

	logout: (req, res) => {
		res.clearCookie('userEmail');
		req.session.destroy();
		return res.redirect('/');
	}

}

module.exports = controller;