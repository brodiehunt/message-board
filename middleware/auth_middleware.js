
// Already signed in cant view sign in or sign up pages redirect to dashboard
exports.authRedirect = (req, res, next) => {
    if (req.user) {
        return res.redirect('/messages/dashboard');
    }
    console.log('going to pass it on, authredirect')
    next();
}

// Is person allowed to view resource? if not logged in they can only view three pages
exports.authorize = (req, res, next) => {
    if (!req.user) {
        return res.redirect('/')
    };
    next();
}

// user Authorise- make sure the current user id matches the id of the resource being viewed/edited
// Eg. user with ID: 1 cant make get request for user ID: 2 profile and so on.

exports.validateCorrectUser = (req, res, next) => {

}

