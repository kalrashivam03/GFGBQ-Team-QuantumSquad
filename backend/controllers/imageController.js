const { detectAIImage } = require('../services/image.service');
const Scan = require('../models/scan.model');

exports.checkImage = async (req, res, next) => {
  try {
    const { imageBase64 } = req.body;

    if (!imageBase64) {
      return res.status(400).json({ error: 'Image required' });
    }

    // 1️⃣ Call AI detection logic
    const result = await detectAIImage(imageBase64);

    // 2️⃣ Log result to MongoDB ✅
    await Scan.create({
      type: 'image',
      aiGenerated: result.isAI,
      confidence: result.confidence
    });

    // 3️⃣ Send response to frontend
    res.json({
      success: true,
      aiGenerated: result.isAI,
      confidence: result.confidence
    });

  } catch (err) {
    next(err);
  }
};
