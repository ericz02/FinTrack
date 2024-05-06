import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../context/AuthContext"; // Ensure this path is correct

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [editExpenseId, setEditExpenseId] = useState(null);
  const { user } = useAuth();
  const userId = user?.id;

  const [newExpense, setNewExpense] = useState({
    category: "",
    vendor: "",
    date: "",
    amount: "",
    purpose: "",
    receipt: null,
    reimbursable: ""
  });

  useEffect(() => {
    fetchExpenses();
  }, [userId]);

  const fetchExpenses = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/users/${userId}/expenses`);
      setExpenses(response.data);
    } catch (error) {
      console.error("Error fetching expenses:", error);
      toast.error("Failed to fetch expenses");
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    for (const key in newExpense) {
      formData.append(`expense[${key}]`, newExpense[key]);
    }
    if (newExpense.receipt) {
      formData.append("expense[receipt]", newExpense.receipt);
    }

    try {
      const response = editExpenseId
        ? await axios.patch(`http://localhost:3000/users/${userId}/expenses/${editExpenseId}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
        : await axios.post(`http://localhost:3000/users/${userId}/expenses`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });

      setExpenses(editExpenseId ? expenses.map(exp => (exp.id === editExpenseId ? response.data : exp)) : [...expenses, response.data]);
      setNewExpense({ category: "", vendor: "", date: "", amount: "", purpose: "", receipt: null, reimbursable: "" });
      setEditExpenseId(null);
      toast.success(editExpenseId ? "Expense updated successfully!" : "Expense added successfully!");
    } catch (error) {
      console.error("Failed to save expense:", error.response);
      toast.error("Failed to save expense");
    }
  };

  const handleEdit = (expense) => {
    setNewExpense({ ...expense, receipt: null });
    setEditExpenseId(expense.id);
  };

  const handleDelete = async (expenseId) => {
    try {
      await axios.delete(`http://localhost:3000/users/${userId}/expenses/${expenseId}`);
      setExpenses(expenses.filter(exp => exp.id !== expenseId));
      toast.success("Expense deleted successfully!");
    } catch (error) {
      console.error("Failed to delete expense:", error);
      toast.error("Failed to delete expense");
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewExpense(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (event) => {
    setNewExpense(prev => ({
      ...prev,
      receipt: event.target.files[0]
    }));
  };

  return (
    <div className="container mx-auto p-4">
      <ToastContainer />
      <h2 className="text-center text-2xl font-bold mb-6">Manage Expenses</h2>
      <div className="flex justify-center">
        <form onSubmit={handleFormSubmit} encType="multipart/form-data" className="w-full max-w-lg">
          <div className="flex flex-wrap -mx-3 mb-6">
            {/* Category input */}
            <div className="w-full px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="category">
                Category
              </label>
              <input type="text" name="category" value={newExpense.category} onChange={handleChange} placeholder="Category" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" required />
            </div>
            {/* Vendor input */}
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="vendor">
                Vendor
              </label>
              <input type="text" name="vendor" value={newExpense.vendor} onChange={handleChange} placeholder="Vendor" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" required />
            </div>
            {/* Date input */}
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="date">
                Date
              </label>
              <input type="date" name="date" value={newExpense.date} onChange={handleChange} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" required />
            </div>
            {/* Amount input */}
            <div className="w-full md:w-1/2 px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="amount">
                Amount ($)
              </label>
              <input type="text" name="amount" value={newExpense.amount} onChange={handleChange} placeholder="Amount" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" required />
            </div>
            {/* Purpose input */}
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="purpose">
                Purpose
              </label>
              <textarea name="purpose" value={newExpense.purpose} onChange={handleChange} placeholder="Purpose" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" required />
            </div>
            {/* Receipt input */}
            <div className="w-full px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="receipt">
                Receipt
              </label>
              <input type="file" name="receipt" onChange={handleFileChange} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
            </div>
            {/* Reimbursable input */}
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="reimbursable">
                Reimbursable
              </label>
              <select name="reimbursable" value={newExpense.reimbursable} onChange={handleChange} className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" required>
                <option value="">Select Reimbursable</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
            {/* Submit button */}
            <div className="w-full px-3 mt-6">
              <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">
                {editExpenseId ? 'Update Expense' : 'Add Expense'}
              </button>
            </div>
          </div>
        </form>
      </div>

      <div className="mt-8">
        <div className="flex flex-wrap justify-center gap-4">
          {expenses.map(expense => (
            <div key={expense.id} className="bg-white rounded-lg shadow-lg p-6 max-w-sm">
              <h3 className="text-lg text-gray-900 font-semibold">{expense.category}</h3>
              <p className="text-gray-600"><strong>Vendor:</strong> {expense.vendor}</p>
              <p className="text-gray-600"><strong>Date:</strong> {expense.date}</p>
              <p className="text-gray-600"><strong>Amount:</strong> ${expense.amount}</p>
              <p className="text-gray-600"><strong>Purpose:</strong> {expense.purpose}</p>
              <p className="text-gray-600"><strong>Reimbursable:</strong> {expense.reimbursable}</p>
              <button onClick={() => handleEdit(expense)} className="text-blue-500 hover:text-blue-700 mr-4">
                Edit
              </button>
              <button onClick={() => handleDelete(expense.id)} className="text-red-500 hover:text-red-700">
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Expenses;
