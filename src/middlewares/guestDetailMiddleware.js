function guestDetailMiddleware(req, res, next) {
	if (req.session.userLogged) {
        if (req.session.userLogged.category != 'Admin'){
            return res.redirect('/');
        }
	} 
	if (!req.session.userLogged) {
        return res.redirect('/users/login');
    }
	next();
}

module.exports = guestDetailMiddleware;