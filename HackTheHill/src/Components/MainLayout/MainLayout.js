import React from 'react';
import Navbar from '../Navbar/Navbar.js';
import SearchUploadGenerateCard from './SearchUploadGenerateCard/SearchUploadGenerateCard.js';
import SearchHistorySidebar from './SearchHistorySidebar/SearchHistorySidebar.js';
import Footer from './Footer/Footer.js';
// import './MainLayout.css'; // If you need separate CSS for this layout

const MainLayout = () => {
    return (
        <div className="main-layout">
            {/* Render the Navbar */}
            <Navbar />

            {/* Render the Card component */}
            <SearchUploadGenerateCard />

            {/* Render the SearchHistorySidebar component */}
            <SearchHistorySidebar />

            {/* Render the Footer component */}
            <Footer />
        </div>
    );
};

export default MainLayout;
