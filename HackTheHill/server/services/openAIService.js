const OpenAI = require('openai');
require('dotenv').config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// Function to fetch data from OpenAI
async function fetchDataFromOpenAI(prompt) {
    try {
        const response = await openai.chat.completions.create({
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

module.exports = { fetchDataFromOpenAI }; // Use CommonJS export
