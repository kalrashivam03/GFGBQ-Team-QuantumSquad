const { analyzeTextAI } = require('../services/textService');

exports.checkTextAI = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: 'Text is required' });

    const result = await analyzeTextAI(text);
    res.json({ aiGenerated: result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server Error' });
  }
};
