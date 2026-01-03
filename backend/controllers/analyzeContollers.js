// controllers/analyze.controller.js

exports.analyzeText = (req, res) => {
    const { text } = req.body;

    if (!text) {
        return res.status(400).json({ message: "Text is required for analysis" });
    }

    // Dummy analysis (replace with real AI logic)
    const result = {
        aiGenerated: text.includes("AI"), // simple example
        citation: "Verified",
        confidence: Math.floor(Math.random() * 21) + 80 // 80-100%
    };

    res.json(result);
};
