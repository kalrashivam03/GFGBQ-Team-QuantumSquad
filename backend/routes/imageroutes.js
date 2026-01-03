const express = require('express');
const router = express.Router();
const { checkImageAI } = require('../controllers/imageController');

router.post('/check', checkImageAI);

module.exports = router;
