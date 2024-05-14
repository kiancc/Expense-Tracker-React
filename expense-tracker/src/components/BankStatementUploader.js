import React from 'react';
import { CSVReader } from 'react-csv-reader';
/*
const handleCSVData = (data) => {
  // Here you can process the CSV data and add it to your expenses list
  // For example, assuming the CSV has columns for description, amount, category, and date
  const newExpenses = data.map((row) => ({
    description: row[0],
    amount: parseFloat(row[1]),
    category: row[2],
    date: new Date(row[3]),
  }));

  // Add the new expenses to the existing expenses list
  setExpenses([...expenses, ...newExpenses]);
};

const BankStatementUploader = ({ processStatement }) => {
  return (
    <div>
      <h2>Upload Bank Statement</h2>
      <CSVReader onFileLoad={handleCSVData} />
    </div>
  );
};

export default BankStatementUploader;*/