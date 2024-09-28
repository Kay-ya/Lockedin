import React from 'react';
import FlashCard from './FlashCard/FlashCard.js';
// import './FlashCardPage.css';
import Navbar from "../Navbar/Navbar.js";


const FlashCardPage = () => {
    return (
        <div className="flashcard-page">
            <Navbar />
            <h1>Flashcard Page</h1>
            <FlashCard />
        </div>
    );
};

export default FlashCardPage;
