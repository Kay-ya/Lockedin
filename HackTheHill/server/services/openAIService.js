const OpenAIApi = require('openai');

// Load environment variables
require('dotenv').config();

// Initialize OpenAI API with the API key
const openai = new OpenAIApi({
    apiKey: process.env.OPENAI_API_KEY,
});

// Function to fetch data from OpenAI
async function fetchDataFromOpenAI(prompt) {
    try {
        const response = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo', // You can also use 'gpt-4' if you have access
            messages: [{ role: 'user', content: prompt }],
            max_tokens: 100,
        });
        return response.choices[0].message.content;
    } catch (error) {
        console.error('Error fetching data from OpenAI:', error);
        throw error;
    }
}

module.exports = { fetchDataFromOpenAI };
