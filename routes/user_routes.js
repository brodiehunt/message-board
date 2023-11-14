const express = require('express');
const passport = require('passport');
const router = express.Router();
const userController = require('../controllers/user_controller');
const authMiddleware = require('../middleware/auth_middleware');


router.get('/sign-in', authMiddleware.authRedirect, userController.getSignIn);

router.post('/sign-in', authMiddleware.authRedirect, passport.authenticate('local', {failureRedirect: '/users/sign-in', failureFlash: 'Invalid username or password', successRedirect: '/messages/dashboard'}));

router.get('/sign-up', authMiddleware.authRedirect, userController.getSignUp);

router.post('/sign-up', authMiddleware.authRedirect, userController.submitSignUp);

router.get('/sign-out', authMiddleware.authorize, userController.signOut);

router.get('/profile', authMiddleware.authorize, userController.getProfile);

router.post('/profile', authMiddleware.authorize, userController.updateProfile);

router.post('/secretSubmit', authMiddleware.authorize, userController.secretKeySubmit);

module.exports = router;