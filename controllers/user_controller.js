const userUtils = require('../utils/user')


// SIGN UP -- CREATE USER
exports.getSignUp = (req, res) => {
    res.render('sign-up');
}

exports.submitSignUp = [
    userUtils.validateSignUp,
    userUtils.handleValidationErrors,
    userUtils.checkUserExists,
    async (req, res, next) => {
        try {
            const user = await userUtils.submitSignUpUtil(req);
            req.login(user, (err) => {
                if (err) {
                    return next(err);
                }
                res.redirect('/messages/dashboard');
            })
        } catch (error) {
            next(error);
        };
    }
];

// SIGN IN
exports.getSignIn = (req, res) => {
    res.render('sign-in');
}

exports.submitSignIn = async (req, res) => {

}
// SIGN OUT
exports.signOut = async (req, res) => {

}

// VIEW PROFILE
exports.getProfile = async (req, res) => {

}

// UPDATE USER PROFILE 
exports.updateProfile = async (req, res) => {

}




