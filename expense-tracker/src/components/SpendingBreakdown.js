import React from 'react';
import './SpendingBreakdown.css'; // Import the CSS file for styling
import bin from './images/icons8-bin-24.png';
import ProgressBar from "@ramonak/react-progress-bar";

const SpendingBreakdown = ({ categories, totals, onDeleteCategory }) => {
  const calculateBudget = (total, budget) => {
    return Math.round((total / budget) * 100 * 10) / 10;
  }
  return (
    <div class="spendingbreakdown-grid">
      <div class="spendingbreakdown-container">
        {categories.map((key, index) => (
          <div class="breakdown-container" key={key}>
            <p class="category">{key}</p>
            <div class="progress-bar"><ProgressBar completed={calculateBudget(totals[index], 300)} /></div>
            <p class="total">Total: {totals[index]}</p>
            <button onClick={() => onDeleteCategory(key)}><img src={bin} alt="Description" /></button>
          </div>
        ))}
      </div>
    </div>

  );
};

export default SpendingBreakdown;