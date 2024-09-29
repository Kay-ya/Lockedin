// // const OpenAI = require('openai');
// // require('dotenv').config();

// // const openai = new OpenAI({
// //     apiKey: process.env.OPENAI_API_KEY,
// //     apiVersion: '2023-05-24', // Replace with the desired API version
// //     defaultModel: 'text-davinci-003' // Replace with the desired model
// //   });


// // // Function to fetch data from OpenAI
// // async function fetchDataFromOpenAI(prompt) {
// //     try {
// //         const response = await openai.chat.completions.create({
// //             model: 'gpt-3.5-turbo', // You can also use 'gpt-4' if you have access
// //             messages: [{ role: 'user', content: prompt }],
// //             max_tokens: 100,
// //         });
// //         return response.choices[0].message.content;
// //     } catch (error) {
// //         console.error('Error fetching data from OpenAI:', error);
// //         throw error;
// //     }
// // }

// // module.exports = { fetchDataFromOpenAI }; // Use CommonJS export


// const Gemini = require('gemini');

// // Set your Gemini API key
// Gemini.apiKey = 'AIzaSyCD-Z3NBx8fOSeuZO5iCqRCOW1Ms03KCAU';

// // Function to fetch data from Gemini
// async function fetchDataFromGemini(prompt) {
//   try {
//     const response = await Gemini.complete({
//       model: 'gemini-1.5-flash', // Adjust the model if needed
//       prompt,
//       max_tokens: 100,
//     });

//     return response.data.choices[0].text;
//   } catch (error) {
//     console.error('Error fetching data from Gemini:', error);
//     throw error;
//   }
// }

// module.exports = { fetchDataFromGemini };