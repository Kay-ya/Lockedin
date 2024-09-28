import React, { useState, useEffect } from 'react';
import './SearchHistorySidebar.css';

const SearchHistorySidebar = () => {
    const [searchHistory, setSearchHistory] = useState([]);

    // Function to fetch search history from backend
    const loadSearchHistory = async () => {
        try {
            const response = await fetch('https://your-backend-api.com/search-history'); // Replace with your actual API
            if (!response.ok) {
                throw new Error('Failed to fetch search history');
            }
            const data = await response.json();
            setSearchHistory(data);
        } catch (error) {
            console.log('Fetch failed, using fallback search history:', error);
            // Fallback to mock data
            setSearchHistory([
                'Search 1',
                'Search 2',
                'Search 3',
                'Search 4',
                'Search 1',
                'Search 2',
                'Search 3',
                'Search 4',
                'Search 1',
                'Search 2',
                'Search 3',
                'Search 4',
                'Search 1',
                'Search 2',
                'Search 3',
                'Search 4',
                'Search 1',
                'Search 2',
                'Search 3',
                'Search 4'
            ]);
        }
    };

    // Load search history on component mount
    useEffect(() => {
        loadSearchHistory();
    }, []);

    // Handle clearing the search history
    const clearHistory = () => {
        setSearchHistory([]);
    };

    return (
        <div className="sidebar">
            <h3 className="sidebar-title">Search History</h3>
            <div className="history-list">
                {searchHistory.length > 0 ? (
                    searchHistory.map((search, index) => (
                        <div key={index} className="history-item">
                            {search}
                        </div>
                    ))
                ) : (
                    <p className="no-history">No history available</p>
                )}
            </div>
            {searchHistory.length > 0 && (
                <button className="clear-button" onClick={clearHistory}>
                    Clear History
                </button>
            )}
        </div>
    );
};

export default SearchHistorySidebar;
