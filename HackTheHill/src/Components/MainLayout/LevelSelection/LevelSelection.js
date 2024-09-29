import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import './LevelSelection.css';

const LevelSelection = () => {
    const [selectedLevel, setSelectedLevel] = useState(null);
    const navigate = useNavigate(); // Initialize navigate function

    // Function to handle difficulty selection
    const handleLevelSelect = (level) => {
        setSelectedLevel(level);
        console.log(`Selected Level: ${level}`);
    };

    // Function to send difficulty change to server
    const sendDifficultyToServer = async (difficulty) => {
        try {
            const response = await fetch('https://your-backend-api.com/difficulty', {
                method: 'POST', // Send the difficulty level to the server
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ difficulty }),
            });
            if (!response.ok) {
                throw new Error('Failed to update difficulty on server');
            }
            console.log('Difficulty updated successfully');
        } catch (error) {
            console.log('Error sending difficulty to server:', error);
        }
    };

    // Navigate to the flashcard page after setting the difficulty
    const handleNext = async () => {
        if (selectedLevel) {
            console.log('Navigating to Flashcard page with difficulty:', selectedLevel);
            await sendDifficultyToServer(selectedLevel); // Send difficulty to the server
            navigate('/flashcards', { state: { difficulty: selectedLevel } }); // Pass difficulty to FlashCardPage
        }
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
                        <img
                            src="/right-arrow-7359.png"
                            alt="Next"
                            className="next-arrow"
                            onClick={selectedLevel ? handleNext : null}
                            style={{
                                cursor: 'pointer',
                                width: '30px',
                                marginLeft: '10px'
                            }} // Styling for the arrow image
                        />
                    </p>
                </div>
            )}
        </div>
    );
};

export default LevelSelection;
