import React, { useState, useEffect } from 'react';
import './FlashCard.css';

const FlashCard = () => {
    const [flashCards, setFlashCards] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false); // State to track whether to show the answer

    // Function to load flashcards from the backend
    const loadFlashCards = async () => {
        try {
            const response = await fetch('https://your-backend-api.com/flashcards'); // Replace with your API URL
            if (!response.ok) {
                throw new Error('Failed to fetch flashcards');
            }
            const data = await response.json();
            setFlashCards(data);
        } catch (error) {
            console.log('Fetch failed, using fallback data:', error);
            setFlashCards([
                { id: 1, question: 'What is React?', answer: 'React is a JavaScript library for building user interfaces.' },
                { id: 2, question: 'What is JSX?', answer: 'JSX is a syntax extension for JavaScript that looks similar to XML or HTML.' },
                { id: 3, question: 'What are hooks in React?', answer: 'Hooks are functions that let you use state and other React features in function components.' },
            ]);
        }
    };

    useEffect(() => {
        loadFlashCards(); // Load flashcards when the component mounts
    }, []);

    // Navigate to the previous flashcard
    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? flashCards.length - 1 : prevIndex - 1));
        setShowAnswer(false); // Reset to question view when navigating
    };

    // Navigate to the next flashcard
    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === flashCards.length - 1 ? 0 : prevIndex + 1));
        setShowAnswer(false); // Reset to question view when navigating
    };

    // Toggle between showing the question and answer
    const handleCardClick = () => {
        setShowAnswer((prevShowAnswer) => !prevShowAnswer); // Toggle between question and answer
    };

    return (
        <div className="flashcard-container">
            {flashCards.length > 0 ? (
                <>
                    <div className="flashcard" onClick={handleCardClick}>
                        <h2>FlashCard {currentIndex + 1}</h2>
                        <p>
                            {showAnswer
                                ? flashCards[currentIndex].answer // Show the answer if showAnswer is true
                                : flashCards[currentIndex].question} {/* Show question by default */}
                        </p>
                    </div>
                    <div className="flashcard-controls">
                        <button onClick={handlePrev} className="flashcard-button">Previous</button>
                        <button onClick={handleNext} className="flashcard-button">Next</button>
                    </div>
                </>
            ) : (
                <p>Loading flashcards...</p>
            )}
        </div>
    );
};

export default FlashCard;
