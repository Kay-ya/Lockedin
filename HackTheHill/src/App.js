import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './Components/MainLayout/MainLayout.js'; // Import the new MainLayout component
import FlashcardPage from './Components/FlashcardPage/FlashcardPage.js'; // Import the new FlashcardPage component

function App() {
    return (
        <Router>
            <div className="App">
                {/* Use Routes to manage routing */}
                <Routes>
                    {/* Define the route for the MainLayout component */}
                    <Route path="/" element={<MainLayout />} />

                    {/* Flashcard page route */}
                    <Route path="/flashcards" element={<FlashcardPage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
