import React, { useState } from 'react';

const FileUpload = ({ onFileChange }) => {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        onFileChange(file); // Pass file up to parent component
    };

    const handleFileUpload = (event) => {
        event.preventDefault();

        if (!selectedFile) {
            alert("Please select a file first!");
            return;
        }

        console.log('Uploading file:', selectedFile.name);
    };

    const triggerFileInput = () => {
        document.getElementById('fileInput').click();
    };

    return (
        <div className="file-upload">
            {/* Hidden file input */}
            <input
                id="fileInput"
                type="file"
                onChange={handleFileChange}
                style={{ display: 'none' }}  // Hide the default input
            />

            {/* Custom button to trigger file input */}
            <button type="button" onClick={triggerFileInput} className="file-upload-button">
                Upload File
            </button>

            {/* Optionally, show the selected file */}
            {selectedFile && <p>Selected file: {selectedFile.name}</p>}
        </div>
    );
};

export default FileUpload;
