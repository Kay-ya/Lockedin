import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import './LevelSelection.css';

const LevelSelection = () => {
    const [selectedLevel, setSelectedLevel] = useState(null);
    const navigate = useNavigate(); // Initialize navigate function

    const handleLevelSelect = (level) => {
        setSelectedLevel(level);
        console.log(`Selected Level: ${level}`);
    };

    const handleNext = () => {
        console.log('Navigate to Flashcard page');
        navigate('/flashcards'); // Navigate to the flashcard page
    };

    const handleReturn = () => {
        console.log('reload the page');
        window.location.reload();
    };

    return (
        <div className="level-selection-card">
            {/* Add a return button with the image */}
            <img
                src="/return-svgrepo-com.png"
                alt="Return"
                className="return-button"
                onClick={handleReturn}
            />

            <h3>Select Difficulty Level</h3>
            <div className="level-buttons">
                <button
                    className={`level-button ${selectedLevel === 'Easy' ? 'selected' : ''}`}
                    onClick={() => handleLevelSelect('Easy')}
                >
                    Easy
                </button>
                <button
                    className={`level-button ${selectedLevel === 'Intermediate' ? 'selected' : ''}`}
                    onClick={() => handleLevelSelect('Intermediate')}
                >
                    Intermediate
                </button>
                <button
                    className={`level-button ${selectedLevel === 'Advanced' ? 'selected' : ''}`}
                    onClick={() => handleLevelSelect('Advanced')}
                >
                    Advanced
                </button>
            </div>

            {selectedLevel && (
                <div className="next-step">
                    <p className="selected-text">
                        You selected: {selectedLevel}
                        <span className="next-arrow" onClick={handleNext}>→</span>
                    </p>
                </div>
            )}
        </div>
    );
};

export default LevelSelection;
