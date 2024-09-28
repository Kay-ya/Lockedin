# Flashcard Generator

## Overview
The Flashcard Generator is a project that scrapes data from PDFs and web links, processes it using the OpenAI API, and stores the information in a MongoDB database. It aims to provide an interactive way to generate and manage flashcards for educational purposes.

## Features
- Scrapes data from PDF files and web links.
- Utilizes the OpenAI API to process scraped data.
- Stores flashcards in a MongoDB database.
- Fetches and displays flashcards in the console.

## Prerequisites
Before you begin, ensure you have met the following requirements:
- [Node.js](https://nodejs.org/en/download/) installed (version 14.x or higher).
- [MongoDB](https://www.mongodb.com/try/download/community) installed and running.
- A valid OpenAI API key.

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd lockedin/server
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory of the `server` folder and add your OpenAI API key and MongoDB connection string:
   ```env
   OPENAI_API_KEY=your_openai_api_key
   MONGODB_URI=mongodb://localhost:27017/your_database_name
   ```

4. **Run the application:**
   ```bash
   node index.js
   ```

## Usage
- The application will start a server on port 5000.
- Modify the code in the respective files to customize the scraping and processing logic as per your needs.
- Flashcards will be processed and stored in the MongoDB database, and you can view them in the console.

## Contributing
Contributions are welcome! Please feel free to submit a pull request or raise an issue if you encounter any problems.

## License
This project is licensed under the MIT License.

```
