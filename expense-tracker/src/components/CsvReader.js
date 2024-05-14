import React from 'react';
import Papa from 'papaparse';
import './CsvReader.css';

const CsvReader = ({ onDataLoaded }) => {
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            Papa.parse(file, {
                header: true,
                complete: (results) => {
                    const filteredData = results.data
                        .map(item => ({
                            date: item.Date,
                            description: item.Description,
                            amount: Math.round(parseFloat(item.Value) * -1 * 10) / 10,
                            category: item.Category
                        }));
                    onDataLoaded(filteredData);
                },
                error: (error) => {
                    console.error('Error reading CSV file:', error);
                }
            });
        }
    };

    return (
        <div>
            <h2>CSV Reader</h2>
            <input type="file" accept=".csv" onChange={handleFileChange} />
        </div>
    );
};

export default CsvReader;
