const { detectAIText } = require('../services/text.service');
const Scan = require('../models/scan.model');

exports.checkText = async (req, res, next) => {
  try {
    const { text } = req.body;

    if (!text || text.length < 20) {
      return res.status(400).json({ error: 'Text too short' });
    }

    // 1️⃣ Call AI logic
    const result = await detectAIText(text);

    // 2️⃣ LOG RESULT TO DATABASE ✅ (THIS IS WHERE IT GOES)
    await Scan.create({
      type: 'text',
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
