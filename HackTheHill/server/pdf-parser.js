const fs = require('fs');            // For reading PDF file
const pdfParse = require('pdf-parse'); // For extracting PDF content
const { MongoClient } = require('mongodb');

// MongoDB connection setup
const uri = 'mongodb://localhost:27017'; // Replace with your MongoDB URI
const client = new MongoClient(uri);
const dbName = 'webScraperDB';
const collectionName = 'scrapedContent';

// Function to parse the PDF
async function parsePdf(filePath) {
    const dataBuffer = fs.readFileSync(filePath);
    try {
        const data = await pdfParse(dataBuffer);
        return data.text; // Extracted text from the PDF
    } catch (error) {
        console.error('Error parsing PDF:', error);
        throw error;
    }
}

// Function to store data in MongoDB
async function storeInMongo(textContent) {
    try {
        await client.connect();
        console.log("Connected successfully to MongoDB server");

        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        const result = await collection.insertOne({ content: textContent });
        console.log("Data successfully stored in MongoDB", result.insertedId);
    } finally {
        await client.close();
    }
}

// Main function to handle everything
async function processPdf(filePath) {
    try {
        console.log("Reading and parsing PDF...");
        const textContent = await parsePdf(filePath);
        console.log("PDF content extracted:\n", textContent);

        console.log("Storing content in MongoDB...");
        await storeInMongo(textContent);
    } catch (error) {
        console.error("Error processing PDF:", error);
    }
}

// Test the script
const pdfFilePath = 'C:/Users/thean/Downloads/Anjali_Patel_Sep_2024.pdf';  // Replace with your PDF file path
processPdf(pdfFilePath);
