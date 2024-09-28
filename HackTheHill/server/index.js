const express = require('express');
const fileUpload = require('express-fileupload');
const connectDB = require('./config/db');
const { processContentAndStoreFlashcards } = require('./controllers/flashcardController'); // Adjust if needed

const app = express();
const port = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Configure file upload middleware
app.use(fileUpload({
    limits: { fileSize: 5000000 },
    createParentPath: true,
    useTempFiles: true,
}));

// Route for uploading PDF and parsing text
app.post('/upload', async (req, res) => {
    try {
        if (!req.files || !req.files.pdfFile) {
            return res.status(400).json({ error: 'No PDF file uploaded' });
        }

        const pdfFile = req.files.pdfFile;

        // Parse PDF using pdf2json
        const parsedText = await getPDFText(pdfFile.data);
        console.log('Parsed PDF text:', parsedText);

        // Process the extracted text
        const flashcards = extractFlashcards(parsedText);

        res.json({ message: 'PDF uploaded and parsed successfully', flashcards });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to upload or parse PDF' });
    }
});

function getPDFText(pdfData) {
    return new Promise((resolve, reject) => {
        const PDFParser = require('pdf2json');
        const pdfParser = new PDFParser(null, 1);
        pdfParser.on('pdfParser_dataError', reject);
        pdfParser.on('pdfParser_dataReady', (pdfData) => {
            resolve(pdfParser.getRawTextContent());
        });
        pdfParser.parseBuffer(pdfData);
    });
}

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

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
