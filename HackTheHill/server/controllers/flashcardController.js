// server/controllers/flashcardController.js
const fetchScrapedData = require('../models/scrapedContentModel'); // Adjust based on where you place the fetch function
const { fetchDataFromOpenAI } = require('../services/openAIService');
const Flashcard = require('../models/flashcardModel');

async function processContentAndStoreFlashcards(flashcards) {
  try {
    if (!flashcards || flashcards.length === 0) {
      console.error('No flashcards found');
      return;
    }

    // Generate data for each flashcard using OpenAI
    const flashcardsData = await Promise.all(flashcards.map(async (flashcard) => {
      const prompt = `Generate detailed flashcard data for: ${flashcard.term}`;
      const generatedData = await fetchDataFromOpenAI(prompt);
      return { term: flashcard.term, definition: generatedData };
    }));

    await storeFlashcards(flashcardsData);
  } catch (error) {
    console.error('Error processing and storing flashcards:', error);
  }
}

async function storeFlashcards(flashcardData) {
  try {
    const flashcards = flashcardData.map(flashcard => new Flashcard(flashcard));
    await Flashcard.insertMany(flashcards);
    console.log('Flashcards successfully stored');
  } catch (error) {
    console.error('Error storing flashcards:', error);
  }
}

module.exports = { processContentAndStoreFlashcards };
