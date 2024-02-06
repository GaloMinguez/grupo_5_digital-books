function guestDetailMiddleware(req, res, next) {
	if (req.session.userLogged) {
        if (req.session.userLogged.category_id != '1'){  //si no es Administrador no accede
            return res.redirect('/');
        }
	} 
	if (!req.session.userLogged) {
        return res.redirect('/users/login');
    }
	next();
}

module.exports = guestDetailMiddleware;