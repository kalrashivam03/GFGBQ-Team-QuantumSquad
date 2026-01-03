const express = require('express');
const router = express.Router();
const textController = require('../controllers/textController'); // make sure path is correct

// Use the correct controller function
router.post('/analyze', textController.checkText);

module.exports = router; // export router
