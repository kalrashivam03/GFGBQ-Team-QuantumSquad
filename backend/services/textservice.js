const axios = require('axios');

exports.analyzeTextAI = async (text) => {
  // Example using OpenAI's AI text classifier
  const response = await axios.post('https://api.openai.com/v1/classifications', {
    model: 'text-classifier-model', 
    query: text
  }, {
    headers: { 'Authorization': `Bearer ${process.env.OPENAI_API_KEY}` }
  });

  // response format may vary
  return response.data.label === 'AI-generated';
};
