import React, { useState } from 'react';
import './SearchUploadGenerateCard.css';
import SearchBar from './Search_Bar/Search_Bar.js';
import FileUpload from './Upload_File/Upload_File.js';
import GenerateFlashCardsButton from './GenerateFlashCardsButton/GenerateFlashCardsButton.js';
import LevelSelection from '../LevelSelection/LevelSelection.js';

const Card = () => {
    const [showLevelSelection, setShowLevelSelection] = useState(false);
    const [url, setUrl] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);

    const handleGenerateFlashCards = () => {
        setShowLevelSelection(true);
    };

    const handleUrlChange = (urlInput) => {
        setUrl(urlInput);
    };

    const handleFileChange = (file) => {
        setSelectedFile(file);
    };

    const isReadyToGenerate = url !== '' || selectedFile !== null;

    return (
        <div className={`card-container ${isReadyToGenerate ? 'with-button' : ''}`}>
            {/* Flex container to align SearchBar and FileUpload horizontally */}
            <div className="flex-container">
                <SearchBar onUrlChange={handleUrlChange} />
                <FileUpload onFileChange={handleFileChange} />
            </div>

            {/* Only show the button if URL is entered or a file is uploaded */}
            {isReadyToGenerate && (
                <GenerateFlashCardsButton onGenerate={handleGenerateFlashCards} />
            )}

            {showLevelSelection && (
                <>
                    <div className="level-selection-overlay"></div>
                    <div className="level-selection-modal">
                        <LevelSelection />
                    </div>
                </>
            )}
        </div>
    );
};

export default Card;
