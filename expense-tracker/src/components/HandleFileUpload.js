import React from 'react';
import FileUpload from './BankStatementUploader';
/*
const HandleFileUpload = () => {
    const handleFileUpload = (files) => {
      const file = files[0];
      const reader = new FileReader();
      
      reader.onload = () => {
        const fileContent = reader.result;
        
        // Parse CSV file
        const results = [];
        const parser = csvParser();
        parser.on('data', (data) => results.push(data));
        parser.on('end', () => {
          // Process the parsed data (results) here
          console.log(results);
        });
        
        parser.write(fileContent);
        parser.end();
      };
      
      reader.readAsText(file);
    };
  
    return (
      <div>
        <h1>Expense Tracker</h1>
        <FileUpload onFileUpload={handleFileUpload} />
        {/* Display spending breakdown and expenses list here }
      </div>
    );
  };

export default HandleFileUpload;

*/