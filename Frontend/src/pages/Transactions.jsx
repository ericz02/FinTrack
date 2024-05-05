import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../context/AuthContext";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const { user } = useAuth();
  const userId = user?.id;
  console.log(userId);
  const [newTransaction, setNewTransaction] = useState({
    name: "",
    amount: "",
    date: "",
    description: "",
    transaction_type: "",
    merchant: "",
  });

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    console.debug(userId);
    try {
      const response = await axios.get(
        `http://localhost:3000/users/${userId}/transactions`
      );

      console.log("Response Data:", response.data);
      setTransactions(response.data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      toast.error("Failed to fetch transactions");
    }
  };

  const addTransaction = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:3000//users/${userId}/transactions`,
        newTransaction
      );
      setTransactions([...transactions, response.data]);
      setNewTransaction({
        name: "",
        amount: "",
        date: "",
        description: "",
        transaction_type: "",
        merchant: "",
      });
      toast.success("Transaction added successfully!");
    } catch (error) {
      console.error("Error adding transaction:", error);
      toast.error("Failed to add transaction");
    }
  };

  const deleteTransaction = async (transactionId) => {
    try {
      await axios.delete(`http://localhost:3000//users/${userId}/transactions`);
      setTransactions(
        transactions.filter((transaction) => transaction.id !== transactionId)
      );
      toast.success("Transaction deleted successfully!");
    } catch (error) {
      console.error("Error deleting transaction:", error);
      toast.error("Failed to delete transaction");
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewTransaction({ ...newTransaction, [name]: value });
  };

  return (
    <div className="container mx-auto p-4">
      <ToastContainer />
      <h2 className="text-center text-2xl font-bold mb-6">Transactions</h2>
      <form className="mb-6" onSubmit={addTransaction}>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            name="name"
            value={newTransaction.name}
            onChange={handleChange}
            placeholder="Name"
            className="border border-gray-300 p-2 rounded-md"
            required
          />
          <input
            type="number"
            name="amount"
            value={newTransaction.amount}
            onChange={handleChange}
            placeholder="Amount"
            className="border border-gray-300 p-2 rounded-md"
            required
          />
          <input
            type="date"
            name="date"
            value={newTransaction.date}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded-md"
            required
          />
          <input
            type="text"
            name="description"
            value={newTransaction.description}
            onChange={handleChange}
            placeholder="Description"
            className="border border-gray-300 p-2 rounded-md"
          />
          <input
            type="text"
            name="transaction_type"
            value={newTransaction.transaction_type}
            onChange={handleChange}
            placeholder="Type"
            className="border border-gray-300 p-2 rounded-md"
            //required
          />
          <input
            type="text"
            name="merchant"
            value={newTransaction.merchant}
            onChange={handleChange}
            placeholder="Merchant"
            className="border border-gray-300 p-2 rounded-md"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Transaction
        </button>
      </form>

      <ul className="space-y-4">
        {transactions.map((transaction) => (
          <li key={transaction.id} className="border rounded p-4 shadow-lg">
            <div className="flex justify-between">
              <div>
                <h3 className="font-bold">{transaction.name}</h3>
                <p className="text-gray-600">{transaction.description}</p>
                <p className="text-gray-600">
                  {transaction.type} | {transaction.merchant}
                </p>
                <p className="text-gray-600">{transaction.date}</p>
                <p className="text-gray-600">${transaction.amount}</p>
              </div>
              <button
                onClick={() => deleteTransaction(transaction.id)}
                className="text-red-500 hover:text-red-700"
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

export default Transactions;
