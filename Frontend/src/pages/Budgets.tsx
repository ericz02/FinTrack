import React, { useState, useEffect } from "react";
import { request } from "graphql-request";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Budget {
  id: string;
  name: string;
  savingsGoal: number;
  totalIncome: number;
  totalExpenses: number;
  status: string;
}

const Budgets: React.FC = () => {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [newBudgetName, setNewBudgetName] = useState("");
  const [newBudgetSavingsGoal, setNewBudgetSavingsGoal] = useState("");
  const [newBudgetTotalIncome, setNewBudgetTotalIncome] = useState("");
  const [newBudgetTotalExpenses, setNewBudgetTotalExpenses] = useState("");

  useEffect(() => {
    const fetchBudgets = async () => {
      const query = `
        query {
          budgets {
            id
            name
            savingsGoal
            totalIncome
            totalExpenses
            status
          }
        }
      `;

      try {
        const data = await request("http://localhost:3000/graphql", query);
        setBudgets(data.budgets);
      } catch (error) {
        console.error("Error fetching budgets:", error);
        toast.error("Failed to fetch budgets");
      }
    };

    fetchBudgets();
  }, []);

  const handleAddBudget = async () => {
    const mutation = `
      mutation CreateBudget($input: CreateBudgetInput!) {
        createBudget(input: $input) {
          id
          name
          savingsGoal
          totalIncome
          totalExpenses
          status
          createdAt
          updatedAt
        }
      }
    `;
  
    const variables = {
      input: {
        userId: 10, // Include the userId here
        name: newBudgetName,
        savingsGoal: parseFloat(newBudgetSavingsGoal),
        totalIncome: parseFloat(newBudgetTotalIncome),
        totalExpenses: parseFloat(newBudgetTotalExpenses),
        status: "active",
      },
    };
  
    try {
      const data = await request(
        "http://localhost:3000/graphql",
        mutation,
        variables
      );
      setBudgets([...budgets, data.createBudget]);
      setNewBudgetName("");
      setNewBudgetSavingsGoal("");
      setNewBudgetTotalIncome("");
      setNewBudgetTotalExpenses("");
    } catch (error) {
      console.error("Failed to add budget:", error);
      toast.error("Failed to add budget");
    }
  };
  
  const handleDeleteBudget = async (id: string) => {
    const mutation = `
    mutation DeleteBudget($input: DestroyBudgetInput!) {
      destroyBudget(input: $input) {
        id
      }
    }
    
    `;

    const variables = {
      input: {
        id: id,
      },
    };

    try {
      await request("http://localhost:3000/graphql", mutation, variables);
      setBudgets(budgets.filter((budget) => budget.id !== id));
    } catch (error) {
      console.error("Failed to delete budget:", error);
      toast.error("Failed to delete budget");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <ToastContainer />
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
          <button
            onClick={handleAddBudget}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Budget
          </button>
        </div>
      </div>
      <ul>
        {budgets.map((budget) => (
          <li key={budget.id} className="mb-4 border-b pb-4">
            <h2 className="text-xl font-bold mb-2">{budget.name}</h2>
            <p className="mb-2">Total Income: {budget.totalIncome}</p>
            <p className="mb-2">Total Expenses: {budget.totalExpenses}</p>
            <p className="mb-2">Savings Goal: {budget.savingsGoal}</p>
            <p className="mb-2">Status: {budget.status}</p>
            <div className="flex">
              <button
                onClick={() => handleDeleteBudget(budget.id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mr-2"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Budgets;
