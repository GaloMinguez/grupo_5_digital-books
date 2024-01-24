const User = require('../modelos/user');
//const db = require('../database/models');
//const User = db.Usuario

function userLoggedMiddleware(req, res, next) {
	res.locals.isLogged = false;

	let emailInCookie = req.cookies.userEmail;

console.log(emailInCookie);
	/*let userFromCookie = db.Usuario.findOne({
		where: {
			email : emailInCookie
		}
	});*/


	let userFromCookie = User.findByField('email', emailInCookie);

	console.log(userFromCookie);
	if (userFromCookie) {
		req.session.userLogged = userFromCookie;
	}

	if (req.session.userLogged) {
		res.locals.isLogged = true;
		res.locals.userLogged = req.session.userLogged;
	}

	next();
}

module.exports = userLoggedMiddleware;