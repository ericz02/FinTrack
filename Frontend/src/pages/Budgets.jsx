import React, { useState, useEffect } from 'react';

const Budgets = () => {
  const [budgets, setBudgets] = useState([]);
  const [newBudgetName, setNewBudgetName] = useState('');
  const [newBudgetSavingsGoal, setNewBudgetSavingsGoal] = useState('');
  const [newBudgetTotalIncome, setNewBudgetTotalIncome] = useState('');
  const [newBudgetTotalExpenses, setNewBudgetTotalExpenses] = useState('');

  useEffect(() => {
    const storedBudgets = JSON.parse(localStorage.getItem('budgets'));
    if (storedBudgets) {
      setBudgets(storedBudgets);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('budgets', JSON.stringify(budgets));
  }, [budgets]);

  const handleAddBudget = () => {
    const newBudget = {
      id: Math.random().toString(36).substr(2, 9),
      name: newBudgetName,
      savings_goal: newBudgetSavingsGoal,
      total_income: newBudgetTotalIncome,
      total_expenses: newBudgetTotalExpenses,
      status: 'Active', 
    };
    setBudgets([...budgets, newBudget]);
    setNewBudgetName('');
    setNewBudgetSavingsGoal('');
    setNewBudgetTotalIncome('');
    setNewBudgetTotalExpenses('');
  };

  const handleDeleteBudget = (id) => {
    setBudgets(budgets.filter(budget => budget.id !== id));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Budgets</h1>
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-2">Add New Budget</h2>
        <div className="flex mb-4">
          <input
            type="text"
            placeholder="Name"
            value={newBudgetName}
            onChange={(e) => setNewBudgetName(e.target.value)}
            className="border border-gray-300 p-2 mr-2 flex-1"
          />
          <input
            type="number"
            placeholder="Savings Goal"
            value={newBudgetSavingsGoal}
            onChange={(e) => setNewBudgetSavingsGoal(e.target.value)}
            className="border border-gray-300 p-2 mr-2 w-1/4"
          />
          <input
            type="number"
            placeholder="Total Income"
            value={newBudgetTotalIncome}
            onChange={(e) => setNewBudgetTotalIncome(e.target.value)}
            className="border border-gray-300 p-2 mr-2 w-1/4"
          />
          <input
            type="number"
            placeholder="Total Expenses"
            value={newBudgetTotalExpenses}
            onChange={(e) => setNewBudgetTotalExpenses(e.target.value)}
            className="border border-gray-300 p-2 mr-2 w-1/4"
          />
          <button onClick={handleAddBudget} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Add Budget</button>
        </div>
      </div>
      <ul>
        {budgets.map(budget => (
          <li key={budget.id} className="mb-4 border-b pb-4">
            <h2 className="text-xl font-bold mb-2">{budget.name}</h2>
            <p className="mb-2">Total Income: {budget.total_income}</p>
            <p className="mb-2">Total Expenses: {budget.total_expenses}</p>
            <p className="mb-2">Savings Goal: {budget.savings_goal}</p>
            <p className="mb-2">Status: {budget.status}</p>
            <button onClick={() => handleDeleteBudget(budget.id)} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Budgets;
