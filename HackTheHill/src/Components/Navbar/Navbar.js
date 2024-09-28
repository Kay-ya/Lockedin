// Import necessary modules from React
import React from 'react';
import './Navbar.css'; // Import CSS for Navbar styling

// Define the Navbar component
const Navbar = () => {
    return (
        <nav>
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/ChatBox">ChatBox</a></li>
            </ul>
        </nav>
    );
};

export default Navbar;
