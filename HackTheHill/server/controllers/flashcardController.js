// server/controllers/flashcardController.js
const fetchScrapedData = require('../models/scrapedContentModel'); // Adjust based on where you place the fetch function
const generateFlashcards = require('../services/openAIService');
const Flashcard = require('../models/flashcardModel');

async function processContentAndStoreFlashcards() {
  try {
    const scrapedContent = await fetchScrapedData();
    if (!scrapedContent) {
      console.error('No scraped content found');
      return;
    }

    const flashcardsData = await generateFlashcards(scrapedContent);
    if (!flashcardsData) {
      console.error('No flashcard data generated');
      return;
    }

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

module.exports = processContentAndStoreFlashcards;
