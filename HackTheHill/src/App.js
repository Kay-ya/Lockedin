import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import MainLayout from './Components/MainLayout/MainLayout.js'; // Import the MainLayout component
import FlashcardPage from './Components/FlashcardPage/FlashcardPage.js'; // Import the FlashcardPage component
import './App.css'; // Import the App CSS file for global styles

function App() {
    const location = useLocation(); // Get the current route

    return (
        <div className="App">
            {/* Conditionally render the background effect for the MainLayout page */}
            {location.pathname === '/' && (
                <div className="sliding-background">
                    <div className="sliding-block"></div>
                    <div className="sliding-block"></div>
                    <div className="sliding-block"></div>
                    <div className="sliding-block"></div>
                    <div className="sliding-block"></div>
                    <div className="sliding-block"></div>
                    <div className="sliding-block"></div>
                    <div className="sliding-block"></div>
                    <div className="sliding-block"></div>
                    <div className="sliding-block"></div>
                    <div className="sliding-block"></div>
                    <div className="sliding-block"></div>
                </div>
            )}

            {/* Define the routing */}
            <Routes>
                {/* Define the route for the MainLayout component */}
                <Route path="/" element={<MainLayout />} />

                {/* Flashcard page route */}
                <Route path="/flashcards" element={<FlashcardPage />} />
            </Routes>
        </div>
    );
}

function RootApp() {
    return (
        <Router>
            <App />
        </Router>
    );
}

export default RootApp;
