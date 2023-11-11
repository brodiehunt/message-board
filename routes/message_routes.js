const express = require('express');
const router = express.Router();

router.get('/dashboard', (req, res) => {
    console.log(req.user, req.session);
    res.render('dashboard');
})
module.exports = router;