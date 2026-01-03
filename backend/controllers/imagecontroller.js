const { analyzeImageAI } = require('../services/imageService');

exports.checkImageAI = async (req, res) => {
  try {
    const { image } = req.body; // image as base64 string
    if (!image) return res.status(400).json({ error: 'Image is required' });

    const result = await analyzeImageAI(image);
    res.json({ aiGenerated: result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server Error' });
  }
};
