import React, { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';


const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // Filter expenses based on selected date range
  const filteredExpenses = expenses.filter((expense) => {
    if (!startDate || !endDate) return true; // Return all expenses if no date range selected
    const expenseDate = new Date(expense.date);
    return expenseDate >= startDate && expenseDate <= endDate;
  });

  return (
    <div>
      <h2>Expense List</h2>
      <ul>
        {filteredExpenses.map((expense, index) => (
          <li key={index}>
            {expense.description} - ${expense.amount.toFixed(2)} - {expense.category} - {expense.date}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;
