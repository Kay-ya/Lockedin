// Import necessary modules from React
import React from 'react';
import Footer from './Components/Footer/Footer.js'; // Import the Footer component


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

            {/* Render the Footer component */}
            <Footer />
        </div>
    );
}

export default App;
