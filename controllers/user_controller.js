const userUtils = require('../utils/user')


// SIGN UP -- CREATE USER
exports.getSignUp = (req, res) => {
    return res.render('sign-up', {
        errors: [],
        formData: null
    });
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
    const failureMessages = req.flash('error');
    return res.render('sign-in', {
        errors: failureMessages,
        formData: null
    });
}

// SIGN OUT
exports.signOut = async (req, res) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    })
}

// VIEW PROFILE
exports.getProfile = async (req, res) => {

}

// UPDATE USER PROFILE 
exports.updateProfile = async (req, res) => {

}




