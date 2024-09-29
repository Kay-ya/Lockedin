// const cheerio = require('cheerio');
// const { MongoClient } = require('mongodb');  // Import MongoDB client
// const fetch = require('node-fetch'); // Dynamic import for fetch

// import 'dotenv/config';
// import { GoogleGenerativeAI } from "@google/generative-ai";
// const genAI = new GoogleGenerativeAI(process.env.API_KEY);
// const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// // MongoDB connection URL and database name
// const uri = 'mongodb://localhost:27017';  // Change this to your MongoDB connection URI
// const dbName = 'webScraperDB';            // Replace with your database name
// const collectionName = 'WebScrapedContent';   // Replace with your collection name

// // Function to scrape the web
// async function scrapeWeb(url) {
//     console.log(`Fetching content from: ${url}`);  // Log the URL being scraped
//     try {
//         const response = await fetch(url);
//         const html = await response.text();
//         const $ = cheerio.load(html);

//         const textContent = $('body').text();
//         console.log('Scraped content length:', textContent.length);  // Log the length of the scraped content
//         //console.log("type of web scrap:"+ textContent);
//         console.log("type of web scrap typeeeeeeee:"+ typeof textContent);
//         return textContent;
//     } catch (error) {
//         console.error('Error scraping web:', error);
//     }
// }






// const prompt = textContent;
// const result = await model.generateContent(prompt);
// console.log(result.response.text());




// // Function to connect to MongoDB and store the scraped data
// async function saveToMongo(data) {
//     console.log('Preparing to connect to MongoDB...');  // Log the connection process
//     const client = new MongoClient(uri);

//     try {
//         await client.connect();  // Connect to the MongoDB server
//         console.log('Connected to MongoDB');  // Log successful connection

//         const db = client.db(dbName);
//         const collection = db.collection(collectionName);

//         const document = { content: data, scrapedAt: new Date() };  // Prepare the document
//         const result = await collection.insertOne(document);  // Insert the document
//         console.log('Data stored in MongoDB. Inserted ID:', result.insertedId);  // Log the inserted document ID
//     } catch (error) {
//         console.error('Error connecting to MongoDB:', error);
//     } finally {
//         console.log('Closing MongoDB connection');  // Log the closing of the connection
//         await client.close();  // Close the connection
//     }
// }

// // Scrape and store function
// (async () => {
//     // const url = 'https://www.markdownguide.org/cheat-sheet/';  // Replace with the desired URL
//     const url = 'https://docs.spring.io/spring-boot/docs/2.7.8/reference/htmlsingle/';  // Replace with the desired URL
//     console.log('Starting the web scraping process...');  // Log the start of the process

//     const scrapedData = await scrapeWeb(url);

//     if (scrapedData) {
//         console.log('Scraping successful, now saving to MongoDB...');  // Log after scraping is successful
//         await saveToMongo(scrapedData);  // Store the scraped data in MongoDB
//     } else {
//         console.log('No data scraped from the URL.');  // Log if scraping fails
//     }
// })();


// module.exports = {scrapeWeb};





import * as cheerio from 'cheerio'; // Use named import
import { MongoClient } from 'mongodb';  // Import MongoDB client
import fetch from 'node-fetch'; // Dynamic import for fetch
import 'dotenv/config'; // Load environment variables
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// MongoDB connection URL and database name
const uri = 'mongodb://localhost:27017';  // Change this to your MongoDB connection URI
const dbName = 'webScraperDB';            // Replace with your database name
const collectionName = 'WebScrapedContent';   // Replace with your collection name

// Function to scrape the web
async function scrapeWeb(url) {
    console.log(`Fetching content from: ${url}`);  // Log the URL being scraped
    try {
        const response = await fetch(url);
        const html = await response.text();
        const $ = cheerio.load(html);

        const textContent = $('body').text();
        console.log('Scraped content length:', textContent.length);  // Log the length of the scraped content
        console.log("Type of web scrape:", typeof textContent);
        return textContent;
    } catch (error) {
        console.error('Error scraping web:', error);
    }
}

// Function to connect to MongoDB and store the scraped data
async function saveToMongo(data) {
    console.log('Preparing to connect to MongoDB...');  // Log the connection process
    const client = new MongoClient(uri);

    try {
        await client.connect();  // Connect to the MongoDB server
        console.log('Connected to MongoDB');  // Log successful connection

        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        const document = { content: data, scrapedAt: new Date() };  // Prepare the document
        const result = await collection.insertOne(document);  // Insert the document
        console.log('Data stored in MongoDB. Inserted ID:', result.insertedId);  // Log the inserted document ID
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    } finally {
        console.log('Closing MongoDB connection');  // Log the closing of the connection
        await client.close();  // Close the connection
    }
}

// Scrape and store function
(async () => {
    const url = 'https://docs.spring.io/spring-boot/docs/2.7.8/reference/htmlsingle/';  // Replace with the desired URL
    console.log('Starting the web scraping process...');  // Log the start of the process

    const scrapedData = await scrapeWeb(url);

    if (scrapedData) {
        console.log('Scraping successful, now saving to MongoDB...');  // Log after scraping is successful
        await saveToMongo(scrapedData);  // Store the scraped data in MongoDB
    } else {
        console.log('No data scraped from the URL.');  // Log if scraping fails
    }
})();

export { scrapeWeb };  // Use export instead of module.exports
