import React, { useState } from 'react';

const SearchBar = () => {
    const [url, setUrl] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        console.log('URL entered:', url);
        // You can perform further actions with the entered URL here
    };

    return (
        <div className="search-bar">
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="Enter URL"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="search-input"
                />
                {/*<button type="submit" className="search-button">Search</button>*/}
            </form>
        </div>
    );
};

export default SearchBar;
