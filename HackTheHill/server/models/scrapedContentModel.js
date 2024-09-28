// server/models/scrapedContentModel.js
const mongoose = require('mongoose');

const scrapedContentSchema = new mongoose.Schema({
  content: String
});

const ScrapedContent = mongoose.model('ScrapedContent', scrapedContentSchema);
module.exports = ScrapedContent;
