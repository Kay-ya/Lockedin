import 'dotenv/config';

console.log('Loading environment variables...'); // Track dotenv loading

import express from 'express'; // Import express
const app = express(); // Create the Express app
console.log('Express app created');

import multer from 'express-fileupload'; // Import multer
console.log('Multer middleware imported');

import { MongoClient } from 'mongodb'; // Import MongoClient for MongoDB
console.log('MongoClient imported for MongoDB');

import { processPdf } from './pdf-scraper.js'; // Import processPdf function
console.log('processPdf function imported from pdf-scraper.js');

import { scrapeWeb } from './web-scraper.js'; // Import scrapeWeb function
console.log('scrapeWeb function imported from web-scraper.js');

// const { extractFlashcardsFromText } = require('./flashcard-extractor'); // Replace with your actual file path
// console.log('extractFlashcardsFromText function imported from flashcard-extractor.js');

const { GoogleGenerativeAI } = require('@google/generative-ai');

const port = process.env.PORT || 5000;

// MongoDB connection URL
const mongoURI = 'mongodb://localhost:27017'; // Replace with your actual MongoDB URI

// Connect to MongoDB
let client; // Declare a global client variable to hold the connection

async function connectToMongo() {
  try {
    client = await MongoClient.connect(mongoURI);
    console.log('Connected to MongoDB server');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
}

connectToMongo();

// Configure file upload middleware
app.use(multer({
  limits: { fileSize: 5000000 },
  createParentPath: true,
  useTempFiles: true,
}));

console.log('Configured file upload middleware');

// OpenAI API key (replace with your actual key)
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

console.log('Initialized OpenAI API client');

// Function to parse PDF content (unchanged) // what does this do? ====================================>
function getPDFText(pdfData) {
  return new Promise((resolve, reject) => {
    const PDFscraper = require('pdf2json');
    const pdfscraper = new PDFscraper(null, 1);
    pdfscraper.on('pdfscraper_dataError', reject);
    pdfscraper.on('pdfscraper_dataReady', (pdfData) => {
      resolve(pdfscraper.getRawTextContent());
    });
    pdfscraper.parseBuffer(pdfData);
  });
}

// Combined function for processing content and categorizing flashcards with OpenAI
async function processContentAndCategorize(content) {
  const flashcards = [];

  // Use OpenAI for NLP and extract terms/definitions
  console.log('Calling OpenAI for NLP...');
  const response = await genAI.generateContent({
    model: "gemini-1.5-flash", // Adjust the model if needed
    prompt: `Extract key concepts and questions from this text: "${content}"`,
    max_tokens: 100,
  });

  const generatedText = response.data.choices[0].text;
  const extractedFlashcards = generatedText.split('\n').map(line => {
    const [term, definition] = line.split(':');
    return { term, definition };
  });

  flashcards.push(...extractedFlashcards);

  // Categorize flashcards based on complexity or other criteria
  const categories = {
    basic: [],
    intermediate: [],
    advanced: []
  };

  const categorize = (term, definition) => {
    const wordCount = (term + definition).split(/\s+/).length;
    const complexity = calculateComplexity(term, definition); // Implement your complexity metric

    if (wordCount <= 10 && complexity <= 2) {
      categories.basic.push({ term, definition });
    } else if (wordCount <= 20 && complexity <= 4) {
      categories.intermediate.push({ term, definition });
    } else {
      categories.advanced.push({ term, definition });
    }
  };

  for (const flashcard of flashcards) {
    categorize(flashcard.term, flashcard.definition);
  }

  const categorizedFlashcards = categories.basic.concat(categories.intermediate, categories.advanced);
  return categorizedFlashcards;
}

// Placeholder web parsing function (replace with your actual logic)
async function parseWeb(url) {
  console.log('Parsing web content from URL:', url);
  // ... your web scraping logic to extract text content
  return extractedText;
}

// Main function to test PDF processing and flashcard extraction
async function main() {
  try {
    const pdfFilePath = 'path/to/your/pdf.pdf'; // Replace with the actual path

    console.log('Processing PDF:', pdfFilePath);
    const textContent = await processPdf(pdfFilePath);

    console.log('Extracting flashcards from PDF content');
    const flashcards = await extractFlashcards(textContent);

    console.log('Storing flashcards in MongoDB');
    await storeFlashcardsInMongoDB(flashcards);

    console.log('Flashcards successfully stored in MongoDB');
  } catch (error) {
    console.error('Error processing PDF:', error);
  }
}

// Run the main function
main();

// Listen on port (if you want to use a web server)
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});