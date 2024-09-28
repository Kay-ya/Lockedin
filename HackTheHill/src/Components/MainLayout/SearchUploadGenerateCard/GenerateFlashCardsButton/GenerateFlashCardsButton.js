import React from 'react';

const GenerateFlashCardsButton = ({ onGenerate }) => {
    return (
        <div className="generate-button">
            <button onClick={onGenerate} className="generate-button">
                Generate Flash Cards
            </button>
        </div>
    );
};

export default GenerateFlashCardsButton;
