// routes/analyze.routes.js
const express = require("express");
const router = express.Router();
const analyzeController = require("../controllers/analyzeController");

// If you want JWT auth, uncomment below middleware and create verifyToken function
// const verifyToken = require("../middleware/auth.middleware");
// router.post("/", verifyToken, analyzeController.analyzeText);

router.post("/", analyzeController.analyzeText);

module.exports = router;
