import fs from 'fs';
import mongoose from 'mongoose';
import dotenv from 'dotenv'; // Import dotenv
import fetchScrapedData from './models/scrapedContentModel.js'; // Adjust the import path
import connectDB from './config/db.js'; // Adjust the import path
import { fetchDataFromOpenAI } from './services/openAIService.js'; // Adjust the import path
import pdfParser from './pdf-scraper.js'; // Import the entire module
const { getPDFText } = pdfParser; // Destructure to get the function

// Load environment variables
dotenv.config();

// Log the API Key to verify it's loaded correctly
//console.log('API Key:', process.env.OPENAI_API_KEY); // Check if the API key is loaded

// Store flashcards function
async function storeFlashcards(flashcardData) {
    try {
        const flashcards = flashcardData.map(flashcard => new Flashcard({ basicInfo: { term: flashcard.term, definition: flashcard.definition } }));
        await Flashcard.insertMany(flashcards);
        console.log('Flashcards successfully stored');
    } catch (error) {
        console.error('Error storing flashcards:', error);
    }
}

// Function to extract flashcards from parsed text
function extractFlashcards(textContent) {
    const flashcards = [];
    const lines = textContent.split('\n');

    for (let i = 0; i < lines.length; i += 2) {
        const term = lines[i].trim();
        const definition = lines[i + 1] ? lines[i + 1].trim() : '';
        if (term) {
            flashcards.push({ term, definition });
        }
    }

    return flashcards;
}

// Fetch and display all flashcards
async function fetchAndDisplayFlashcards() {
    try {
        const flashcards = await Flashcard.find({});
        console.log('All Flashcards:', flashcards);
    } catch (error) {
        console.error('Error fetching flashcards:', error);
    }
}

// Main function to test web scraping and PDF parsing
const testCombined = async () => {
    // Connect to MongoDB
    await connectDB();

    // Specify your web scraping URL here
    const webScrapingURL = 'https://www.markdownguide.org/cheat-sheet/'; // Change to your desired URL

    // Test Web Scraping
    console.log('--- Testing Web Scraping ---');
    try {
        const scrapedContent = await fetchScrapedData(webScrapingURL); // Pass the URL to the scraping function
        console.log('Scraped Content:', scrapedContent);

        // Process scraped data with OpenAI
        const flashcardData = await fetchDataFromOpenAI(scrapedContent.join('\n'));
        console.log('Flashcard Data from OpenAI:', flashcardData);
        await storeFlashcards(flashcardData);
    } catch (error) {
        console.error('Error during web scraping test:', error);
    }

    // Test PDF Parsing
    console.log('--- Testing PDF Parsing ---');
    try {
        const pdfFilePath = 'C:/Users/thean/Downloads/proposal.pdf'; // Specify the path to your PDF file
        const pdfData = fs.readFileSync(pdfFilePath);
        const parsedText = await getPDFText(pdfData);
        console.log('Parsed PDF Text:', parsedText);

        // Process parsed text to generate flashcards
        const flashcards = extractFlashcards(parsedText);
        await storeFlashcards(flashcards);
    } catch (error) {
        console.error('Error during PDF parsing test:', error);
    }

    // Fetch and display all flashcards from the database
    console.log('--- Fetching All Flashcards ---');
    await fetchAndDisplayFlashcards();
};

// Run the tests
testCombined();
