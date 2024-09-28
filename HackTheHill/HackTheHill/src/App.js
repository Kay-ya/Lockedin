// Import necessary modules from React
import React from 'react';

// Import the Navbar component
import Navbar from './Components/Navbar/Navbar.js';

// Import the SearchBar and FileUpload components
import SearchUploadGenerateCard from './Components/SearchUploadGenerateCard/SearchUploadGenerateCard.js'; // Import the Card component


function App() {
    return (
        <div className="App">
            {/* Render the Navbar */}
            <Navbar />

            {/* Render the Card component */}
            <SearchUploadGenerateCard />
        </div>
    );
}

export default App;
