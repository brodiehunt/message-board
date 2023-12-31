const { body, validationResult } = require('express-validator');
const User = require('../models/User');


// SIGN UP 


exports.submitSignUpUtil = async(req, res, next) => {
    const {email, password, username} = req.body;
    // Construct new user
    const user = new User({
        username,
        email,
        password
    });
    await user.save();
    // send user to controller
    return user;
    
}

exports.handleValidationErrors = async (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        if (req.formSource === 'signUp') {
            return res.render('sign-up', {
                errors: errors.array(),
                formData: req.body
            })
        }
        if (req.formSource === 'profileUpdate') {
            return res.render('profile', {
                errors: errors.array(),
                formData: req.body
            })
        }
    }
    next();
}
// check if username or email already exists
exports.checkUserExists = async (req, res, next) => {
    try {
        const existingUser = await User.find({
            $or: [
                {username: req.body.username},
                { email: req.body.email}
            ]
        });
        if (existingUser.length !== 0) {
            console.log('existing user', existingUser)
            const message = {msg: 'Username or email already in use', path: 'form'}
            if (req.body.formSource === 'signUp') {
                return res.render('sign-up', {
                    errors: [message],
                    formData: req.body
                })
            }
            if (req.body.formSource === 'profileUpdate') {
                return res.render('profile', {
                    errors: [message],
                    formData: req.body
                })
            }
        }
        next();
    } catch (error) {
        next(err);
    }
}

exports.checkSecretKey = (req, res, next) => {
    console.log('check secret', req.body.secret, process.env.ADMIN_SECRET)
    if (req.body.secret !== process.env.ADMIN_SECRET) {
        return res.redirect('/users/profile', {
            errors: [],
            formData: {
                email: req.user.email,
                username: req.user.username,
            }
        })
    }
    next();
};

exports.addAdminStat = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        user.isAdmin = true;
        await user.save();
        return user;
    } catch (err) {
        next(err)
    }
}

exports.updateProfileUtil = async (req,res, next) => {
    try {
        const user = await User.findById(req.user.id);
        user.username = req.body.username;
        user.email = req.body.email;
        await user.save();
        return user;
    } catch (error) {
        next(err);
    }
}

exports.validateSignUp = [
    body('username', 'Username is required')
        .trim()
        .isLength({min: 3, max: 20})
        .withMessage('Username must be more than 2 and less than 20 characters')
        .escape(),
    body('email', 'Must be a correct email: example@email.com')
        .trim()
        .isEmail()
        .escape(),
    body('password', 'Must include an password')
        .trim()
        .isLength({min: 6, max: 20})
        .withMessage('Password must be more than 5 and less than 20 characters')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
        .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number.')
        .escape(),
    body('passwordConfirm', 'Must confirm your password')
        .trim()
        .escape()
        .custom((value, { req }) => value === req.body.password)
    .withMessage('Password confirmation does not match password')
];

exports.validateUpdate = [
    body('username', 'Username is required')
        .trim()
        .isLength({min: 3, max: 20})
        .withMessage('Username must be more than 2 and less than 20 characters')
        .escape(),
    body('email', 'Must be a correct email: example@email.com')
        .trim()
        .isEmail()
        .escape(),
];