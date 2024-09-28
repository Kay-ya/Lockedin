import React from 'react';
import './SearchUploadGenerateCard.css'; // CSS file for styling the search bar
import SearchBar from './Search_Bar/Search_Bar.js';
import FileUpload from './Upload_File/Upload_File.js';
import GenerateFlashCardsButton from './GenerateFlashCardsButton/GenerateFlashCardsButton.js';

const Card = () => {
    // Function to handle flashcard generation logic
    const handleGenerateFlashCards = () => {
        console.log('Generating flashcards...');
        // Add your logic for generating flashcards here
    };

    return (
        <div className="card-container">
            <SearchBar />
            <FileUpload />
            <GenerateFlashCardsButton onGenerate={handleGenerateFlashCards} />
        </div>
    );
};

export default Card;
