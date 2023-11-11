const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controller');
const authMiddleware = require('../middleware/auth_middleware');

router.get('/sign-in', authMiddleware.authRedirect, userController.getSignIn);

router.post('/sign-in', authMiddleware.authRedirect, userController.submitSignIn);

router.get('/sign-up', authMiddleware.authRedirect, userController.getSignUp);

router.post('/sign-up', authMiddleware.authRedirect, userController.submitSignUp);

router.get('/sign-out', authMiddleware.authorize, userController.signOut);

module.exports = router;