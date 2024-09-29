import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import FlashCard from './FlashCard/FlashCard.js';
import Navbar from "../Navbar/Navbar.js";
import ChangeDifficulty from "./ChangeDifficulty/ChangeDifficulty.js";
import './FlashcardPage.css';
const FlashCardPage = () => {
    const location = useLocation(); // Use React Router's useLocation to get the difficulty
    const [difficulty, setDifficulty] = useState('Easy'); // Default to Easy

    // Set the difficulty from the router state when the page loads
    useEffect(() => {
        if (location.state && location.state.difficulty) {
            setDifficulty(location.state.difficulty);
            window.scrollTo(0, 0); // Scroll to the top of the page
        }
    }, [location.state]);

    const handleDifficultyChange = (newDifficulty) => {
        setDifficulty(newDifficulty);
    };

    return (
        <div className="flashcard-page">
            <Navbar />

            <div className="title-container">
                {/* Title showing current difficulty */}
                <h1 className="flashcard-title">
                    Flashcards - Difficulty: <span className={`difficulty-label ${difficulty.toLowerCase()}`}>{difficulty}</span>
                </h1>

                {/* Change Difficulty Buttons */}
                <div className="difficulty-buttons-container">
                    <ChangeDifficulty onDifficultyChange={handleDifficultyChange} />
                </div>
            </div>

            <FlashCard difficulty={difficulty} />
        </div>
    );
};

export default FlashCardPage;
