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
exports.signOut = async (req, res,next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    })
}

// VIEW PROFILE
exports.getProfile = async (req, res) => {
    const formData = {
        username: req.user.username,
        email: req.user.email
    }
    res.render('profile', {
        formData: formData,
        errors: []
    })
}

// UPDATE USER PROFILE 
exports.updateProfile = [
    userUtils.validateUpdate,
    userUtils.handleValidationErrors,
    userUtils.checkUserExists,
    async (req, res, next) => {
        try {
            console.log('should not be getting here')
            const updatedUser = await userUtils.updateProfileUtil(req);
            return res.render('profile', {
                errors: [],
                formData: {
                    username: updatedUser.username,
                    email: updatedUser.email
                }
            });
        } catch (err) {
            next(err);
        }
    }
]


// Secret key submit
exports.secretKeySubmit = [
    userUtils.checkSecretKey,
    async (req, res, next) => {
        try {
            const user = userUtils.addAdminStat(req);
            res.render('profile', {
                formData: {
                    username: req.user.username,
                    email: req.user.email
                },
                errors: []
            })
        } catch (err) {
            next(err)
        }
    }
]




