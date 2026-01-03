exports.detectAIText = async (text) => {
  // Simple heuristic (placeholder)
  const aiPatterns = ['as an ai', 'in conclusion', 'overall'];

  const score = aiPatterns.filter(p =>
    text.toLowerCase().includes(p)
  ).length;

  return {
    isAI: score >= 2,
    confidence: Math.min(score * 30, 95)
  };
};
