const express = require('express');
const router = express.Router();
const { checkImage } = require('../controllers/imageController');

router.post('/check', checkImage);

module.exports = router;
