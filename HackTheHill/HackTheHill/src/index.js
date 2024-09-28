// Import necessary modules from React and ReactDOM
import React from 'react';
import ReactDOM from 'react-dom';

// Import the main App component
import App from './App.js';

// Import a CSS file for global styles (create this file if needed)
import './index.css';

// Render the App component and attach it to the 'root' div in index.html
ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);
