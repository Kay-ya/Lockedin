import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ChangeDifficulty.css'; // Add CSS for button styles

const ChangeDifficulty = () => {
    const [selectedDifficulty, setSelectedDifficulty] = useState(null);
    const navigate = useNavigate();

    // Function to handle difficulty selection
    const handleDifficultySelect = (difficulty) => {
        setSelectedDifficulty(difficulty);
        console.log(`Selected Difficulty: ${difficulty}`);
    };

    // Function to send difficulty change to server
    const sendDifficultyToServer = async (difficulty) => {
        try {
            const response = await fetch('https://your-backend-api.com/difficulty', {
                method: 'POST',
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
    // Navigate to the flashcard page after setting the difficulty
    const handleNext = async () => {
        if (selectedDifficulty) {
            console.log('Navigating to Flashcard page with difficulty:', selectedDifficulty);
            await sendDifficultyToServer(selectedDifficulty);
            navigate('/flashcards', { state: { difficulty: selectedDifficulty } });
            // Reload the page after navigation
            window.location.reload();
        }
    };


    const handleReturn = () => {
        console.log('reload the page');
        window.location.reload();
    };

    return (
        <div className="change-difficulty-card">
            <h3>Select Difficulty Level</h3>
            <div className="difficulty-buttons">
                <button
                    className={`difficulty-button ${selectedDifficulty === 'Easy' ? 'selected' : ''}`}
                    onClick={() => handleDifficultySelect('Easy')}
                >
                    Easy
                </button>
                <button
                    className={`difficulty-button ${selectedDifficulty === 'Intermediate' ? 'selected' : ''}`}
                    onClick={() => handleDifficultySelect('Intermediate')}
                >
                    Intermediate
                </button>
                <button
                    className={`difficulty-button ${selectedDifficulty === 'Advanced' ? 'selected' : ''}`}
                    onClick={() => handleDifficultySelect('Advanced')}
                >
                    Advanced
                </button>
            </div>

            {selectedDifficulty && (
                <div className="next-step">
                    <p className="selected-text">
                        You selected: {selectedDifficulty}
                        <img
                            src="/right-arrow-7359.png"
                            alt="Next"
                            className="next-arrow"
                            onClick={handleNext}
                            style={{ cursor: 'pointer', width: '30px', marginLeft: '10px' }} // Styling for the arrow image
                        />
                    </p>
                </div>
            )}
        </div>
    );
};

export default ChangeDifficulty;
