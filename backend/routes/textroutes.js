const express = require('express');
const router = express.Router();
const { checkTextAI } = require('../controllers/textController');

router.post('/check', checkTextAI);

module.exports = router;
