const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controller');


router.get('/sign-in', userController.getSignIn);

router.post('/sign-in', userController.submitSignIn);

router.get('/sign-up', userController.getSignUp);

router.post('/sign-up', userController.submitSignUp);

router.get('/sign-out', (req, res) => {
    res.send('signing oout')
})

module.exports = router;