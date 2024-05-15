import React, { useState } from 'react';
import './SpendingBreakdown.css'; // Import the CSS file for styling
import bin from './images/icons8-bin-24.png';
import edit from './images/icons8-edit-50.png';
import ProgressBar from "@ramonak/react-progress-bar";

const SpendingBreakdown = ({ categories, totals, budgets, onDeleteCategory, onUpdateBudget }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentCategory, setCurrentCategory] = useState('');
  const [newBudget, setNewBudget] = useState('');

  const calculateBudget = (total, budget) => {
    return Math.round((total / budget) * 100 * 10) / 10;
  };

  const handleEditClick = (category) => {
    setCurrentCategory(category);
    setIsEditing(true);
    setNewBudget(budgets[category] || '');
  };

  const handleSaveBudget = () => {
    onUpdateBudget(currentCategory, parseFloat(newBudget));
    setIsEditing(false);
  };

  return (
    <div className="spendingbreakdown-grid">
      <div className="spendingbreakdown-container">
        {categories.map((key, index) => (
          <div className="breakdown-container" key={key}>
            <p className="category">{key}</p>
            <div className="progress-bar"><ProgressBar completed={calculateBudget(totals[index], budgets[key] || 1)} /></div>
            <p className="total">Total: {totals[index]}/{budgets[key]}</p>
            <button className="delete" onClick={() => onDeleteCategory(key)}><img src={bin} alt="Delete" /></button>
            <button className="edit" onClick={() => handleEditClick(key)}><img src={edit} alt="Edit" /></button>
          </div>
        ))}
      </div>
      {isEditing && (
        <div className="budget-modal">
          <h2>Set Budget for {currentCategory}</h2>
          <input
            type="number"
            value={newBudget}
            onChange={(e) => setNewBudget(e.target.value)}
            placeholder="Enter new budget"
          />
          <button onClick={handleSaveBudget}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default SpendingBreakdown;
