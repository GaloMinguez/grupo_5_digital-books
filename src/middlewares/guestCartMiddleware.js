function guestCartMiddleware(req, res, next) {
	if (req.session.userLogged) {
		return res.redirect('/cart');
	} 
	if (!req.session.userLogged) {
        return res.redirect('/users/login');
    }
	next();
}

module.exports = guestCartMiddleware;