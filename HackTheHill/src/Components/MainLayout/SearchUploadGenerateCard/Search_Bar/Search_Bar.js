import React, { useState } from 'react';

const SearchBar = ({ onUrlChange }) => {
    const [url, setUrl] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        console.log('URL entered:', url);
    };

    const handleUrlInputChange = (e) => {
        setUrl(e.target.value);
        onUrlChange(e.target.value); // Pass URL up to parent component
    };

    return (
        <div className="search-bar">
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="Enter URL"
                    value={url}
                    onChange={handleUrlInputChange}
                    className="search-input"
                />
            </form>
        </div>
    );
};

export default SearchBar;
