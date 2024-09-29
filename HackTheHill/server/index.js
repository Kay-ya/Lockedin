  const express = require('express');
  const fileUpload = require('express-fileupload');
  const connectDB = require('./config/db');
  const { processContentAndStoreFlashcards } = require('./controllers/flashcardController'); // Adjust if needed
  const openai = require('openai'); // Import OpenAI library
  
  const app = express();
  const port = process.env.PORT || 5000;
  
  // Connect to MongoDB
  connectDB();
  
  // Configure file upload middleware 
  // =========================================> what is this for?
  app.use(fileUpload({
    limits: { fileSize: 5000000 },
    createParentPath: true,
    useTempFiles: true,
  }));
  
  // OpenAI API key (replace with your actual key)
  openai.apiKey = process.env.OPENAI_API_KEY;
  
  // Route for uploading PDF and parsing text
  // we already have pdf-scraper.js filethat does that
  app.post('/upload', async (req, res) => {
    try {
      if (!req.files || !req.files.pdfFile) {
        return res.status(400).json({ error: 'No PDF file uploaded' });
      }
  
      const pdfFile = req.files.pdfFile;
  
      // Parse PDF using pdf2json
      const parsedText = await getPDFText(pdfFile.data);
      //console.log('Parsed PDF text:', parsedText);
  
      // Process the extracted text with OpenAI and categorize flashcards
      const flashcards = await processContentAndCategorize(parsedText);
  
      // Process and store flashcards
      await processContentAndStoreFlashcards(flashcards);
  
      res.json({ message: 'PDF uploaded, parsed, and flashcards stored successfully', flashcards });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to upload or parse PDF' });
    }
  });
  
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
  
    // Use OpenAI for NLP and extract terms/definitions (replace with your logic)
    // ... (replace with your logic to extract terms and definitions from content)
  
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
    // ... your web scraping logic to extract text content
    return extractedText;
  }
  

