// // Make sure to include these imports:
// import 'dotenv/config';
// import { GoogleGenerativeAI } from "@google/generative-ai";
// const genAI = new GoogleGenerativeAI(process.env.API_KEY);
// const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
// console.log('Initialized OpenAI API client');
// import mongoose from 'mongoose';

// import express from 'express'; // Import express
// const app = express(); // Create the Express app
// console.log('Express app created');

// import { MongoClient } from 'mongodb'; // Import MongoClient for MongoDB
// console.log('MongoClient imported for MongoDB');

// import { processPdf } from './pdf-scraper.js'; // Import processPdf function
// console.log('processPdf function imported from pdf-scraper.js');

// // import { scrapeWeb } from './web-scraper.js'; // Import scrapeWeb function
// // console.log('scrapeWeb function imported from web-scraper.js');


// const port = process.env.PORT || 5000;

// // MongoDB connection URL
// const mongoURI = 'mongodb://localhost:27017'; // Replace with your actual MongoDB URI

// // Connect to MongoDB
// let client; // Declare a global client variable to hold the connection

// async function connectToMongo() {
//     try {
//     client = await MongoClient.connect(mongoURI);
//     console.log('Connected to MongoDB server');
//     } catch (error) {
//     console.error('Error connecting to MongoDB:', error);
//     process.exit(1);
//     }
// }

// connectToMongo();


// //parsing pdf
// const pdfFilePath = 'C:/Users/thean/Downloads/proposal.pdf';  // Replace with your PDF file path

// const content1 = processPdf(pdfFilePath);

// const ObjectId = mongoose.Types.ObjectId;

// const queryId = new ObjectId('66f8861c2a12fc0f99c7c82a');

// content1.findOne({ _id: queryId })
//   .then(doc => {
//     console.log(doc);
//   })
//   .catch(err => {
//     console.error(err);
//   });

// //const content = "Acids are substances characterized by their ability to donate protons (H⁺ ions) in aqueous solutions. They play a crucial role in various chemical reactions and processes, including digestion, industrial manufacturing, and environmental interactions. Common examples of acids include hydrochloric acid (HCl), sulfuric acid (H₂SO₄), and citric acid, found in citrus fruits. Acids can be classified as strong or weak, depending on their dissociation in water. Strong acids, like sulfuric acid, completely dissociate, while weak acids, such as acetic acid, partially dissociate. The pH scale measures acidity, with lower values indicating higher acidity. Understanding acids is essential in fields like chemistry, biology, and environmental science.";
// //console.log(content1._id);

// const prompt = `Extract term and definition from this text: "${content1}"`;
// const result = await model.generateContent(prompt);

// console.log(result.response.text());

import 'dotenv/config';
import mongoose from 'mongoose';
import { MongoClient } from 'mongodb';

// MongoDB 连接 URI
const mongoURI = 'mongodb://localhost:27017';  // 替换为你的 MongoDB URI

// 连接到 MongoDB
let client;

async function connectToMongo() {
    try {
        client = await MongoClient.connect(mongoURI, { useUnifiedTopology: true });
        console.log('已成功连接到 MongoDB 服务器');
        const userId = '66f8861c2a12fc0f99c7c82a';  // 替换为你想查询的用户 _id
        getContentByUserId(userId);
    } catch (error) {
        console.error('连接 MongoDB 时出错:', error);
        process.exit(1);  // 退出进程
    }
}


// 查询用户 ID 并返回 content 值
async function getContentByUserId(userId) {
    try {
        const db = client.db('yourDatabaseName'); // 替换为你的数据库名称
        const collection = db.collection('yourCollectionName'); // 替换为你的集合名称

        // 查询 _id 等于给定 userId 的文档
        const document = await collection.findOne({ _id: mongoose.Types.ObjectId(userId) });

        if (document) {
            console.log('Content:', document.content);  // 输出 content 的值
            return document.content;  // 返回 content 值
        } else {
            console.log('没有找到匹配的文档');
            return null;
        }
    } catch (error) {
        console.error('查询文档时出错:', error);
        return null;
    }
}

// 示例：使用特定的用户 ID 查询
connectToMongo();
