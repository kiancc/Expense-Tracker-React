import React, { useState, useEffect } from 'react';
import ExpenseForm from './ExpenseForm';
import SpendingBreakdown from './SpendingBreakdown';
import CsvReader from './CsvReader';
import DatePicker from 'react-datepicker';
import Budgets from './Budgets'
import 'react-datepicker/dist/react-datepicker.css';
//import './ExpenseTracker.css'; // Import the CSS file for styling
import './ExpenseTrackerMobile.css'; // Import the CSS file for styling

const ExpenseTracker = () => {
  const [expenses, setExpenses] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [categories, setCategories] = useState([]);

  const [totals, setTotals] = useState([]);
  const [budgets, setBudgets] = useState({    
  "Groceries": 0,
  "Utilities": 0,
  "Off License": 0,
  "Transportation": 0,
  "Dining out": 0,
  "Entertainment": 0,
  "Health": 0,
  "Shopping": 0,
  "Others": 0});

  const addExpense = (newExpense) => {
    setExpenses([...expenses, newExpense]);
  };

  const handleCsvData = (csvData) => {
    // Assuming CSV data has columns: description, amount, category, date
    const parsedExpenses = csvData.map((item) => ({
        description: item.description,
        amount: parseFloat(item.amount),
        category: item.category,
        date: item.date,
    }));
    setExpenses((prevExpenses) => [...prevExpenses, ...parsedExpenses]);
  };

  const deleteCategory = (category) => {
    const newExpenses = expenses.filter(expense => expense.category !== category);
    setExpenses(newExpenses);
  };

  const updateBudget = (category, budget) => {
    setBudgets((prevBudgets) => ({
      ...prevBudgets,
      [category]: budget,
    }));
  };

  // Filter expenses based on selected date range
  const filteredExpenses = expenses.filter((expense) => {
    if (!startDate || !endDate) return true; // Return all expenses if no date range selected
    const expenseDate = new Date(expense.date);
    return expenseDate >= startDate && expenseDate <= endDate;
  });

  useEffect(() => {
    const calculateTotalByCategory = (expenses) => {
      const totals = {};
      expenses.forEach((expense) => {
        totals[expense.category] = (totals[expense.category] || 0) + expense.amount;
      });
      return totals;
    };
    const totals = calculateTotalByCategory(filteredExpenses);
    setCategories(Object.keys(totals));
    setTotals(Object.values(totals));
  }, [filteredExpenses]);

  return (
    <div class="grid-container">
    <header>
      <h1>Expense Tracker</h1>
    </header>
      <div class="ExpenseForm-container">
      <ExpenseForm addExpense={addExpense} />
      </div>
      <div class="DatePicker-container">
        <h2>Date Range</h2>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          placeholderText="Start Date"
        />
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          placeholderText="End Date"
        />
      </div>
    <div class="Budgets-Container">
      <Budgets onUpdateBudget={updateBudget} />
    </div>
    <div class="SpendingBreakdown-container">
      <h2>Spending Breakdown</h2>
      <SpendingBreakdown categories={categories} totals={totals} budgets={budgets} onDeleteCategory={deleteCategory} onUpdateBudget={updateBudget} />
      <br></br>
      <div class="total-spending-container">
        <h3>Total Spending: ${filteredExpenses.reduce((total, expense) => total + expense.amount, 0).toFixed(2)}</h3>
      </div>
    </div>
      <div class="ExpenseList-container">
      <h2>Expense List</h2>
        <table>
            <thead>
                <tr>
                    <th>Description</th>
                    <th>Amount</th>
                    <th>Category</th>
                    <th>Date</th>
                </tr>
            </thead>
            <tbody>
                {filteredExpenses.map((expense, index) => (
                    <tr key={index}>
                        <td>{expense.description}</td>
                        <td>${expense.amount.toFixed(2)}</td>
                        <td>{expense.category}</td>
                        <td>{expense.date}</td>
                    </tr>
                ))}
            </tbody>
        </table>
      </div>
      <div class="csvreader-container">
          <CsvReader onDataLoaded={handleCsvData} />
      </div> 
    </div>
  );
};



export default ExpenseTracker;
