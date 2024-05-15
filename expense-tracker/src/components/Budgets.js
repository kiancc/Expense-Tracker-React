import React, { useState } from 'react';

const Budgets = ({ onUpdateBudget }) => {
    const [amount, setAmount] = useState('');
  // Define the budgets dictionary
  const budgets = {
    "Groceries": 0,
    "Utilities": 0,
    "Off License": 0,
    "Transportation": 0,
    "Dining out": 0,
    "Entertainment": 0,
    "Health": 0,
    "Shopping": 0,
    "Others": 0
  };

  // Initialize state to manage the selected budget category
  const [selectedBudget, setSelectedBudget] = useState("");

  // Handle change in dropdown selection
  const handleChange = (e) => {
    setSelectedBudget(e.target.value);
    if (onUpdateBudget) {
      onUpdateBudget(e.target.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setAmount(amount);

  };

  return (
    <div>
      <label htmlFor="budget-select">Select a Budget Category:</label>
      <select
        id="budget-select"
        value={selectedBudget}
        onChange={handleChange}
      >
        <option value="" disabled>Select a category</option>
        {Object.keys(budgets).map((key) => (
          <option key={key} value={key}>{key}</option>
        ))}
      </select>
      <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        <div className="form-group">
          <button type="submit">Add Expense</button>
        </div>
    </div>
  );
};

export default Budgets;
