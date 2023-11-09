const express = require('express');
const router = express.Router();


router.get('/sign-in', (rea, res) => {
    res.render('sign-in')
})

router.post('/sign-in', (req, res) => {
    console.log('hit route')
})

router.get('/sign-up', (req, res) => {
    res.render('sign-up');
});

router.post('/sign-up', (req, res) => {
    console.log('route hit');
    res.send('form completed');
})

router.get('/sign-out', (req, res) => {
    res.send('signing oout')
})

module.exports = router;