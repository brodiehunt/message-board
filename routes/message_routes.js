const express = require('express');
const router = express.Router();
const messageController = require('../controllers/message_controller');

router.get('/dashboard', messageController.getAllMessages);

router.post('/postMessage', messageController.submitNewMessage);

router.post('/likeMessage', messageController.likeMessage);
module.exports = router;