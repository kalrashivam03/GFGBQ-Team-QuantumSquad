exports.detectAIImage = async (image) => {
  // Placeholder logic
  // Real-world: Hive API / CLIP embeddings / GAN detection

  const randomScore = Math.floor(Math.random() * 100);

  return {
    isAI: randomScore > 60,
    confidence: randomScore
  };
};
