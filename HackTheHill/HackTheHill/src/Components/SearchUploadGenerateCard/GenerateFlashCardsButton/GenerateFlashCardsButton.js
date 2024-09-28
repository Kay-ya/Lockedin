import React from 'react';
// import './GenerateFlashCardsButton.css'; // Import CSS file for button styling

const GenerateFlashCardsButton = ({ onGenerate }) => {
    return (
        <div className="flashcard-button">
            <button onClick={onGenerate} className="generate-button">
                Generate Flash Cards
            </button>
        </div>
    );
};

export default GenerateFlashCardsButton;
