import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../context/AuthContext";
import exportTransactions from "../exports/TransactionsExport";
import { request } from "graphql-request";


const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const { user } = useAuth();
  const userId = user?.id;
  const [newTransaction, setNewTransaction] = useState({
    name: "",
    amount: "",
    date: "",
    description: "",
    transaction_type: "",
    merchant: "",
  });

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!userId) return; // Don't fetch if userId is null or undefined

      const query = `
        query GetTransactions($userId: ID!) {
          user(id: $userId) {
            transactions {
              id
              name
              amount
              date
              description
              transactionType
              merchant
            }
          }
        }
      `;

      const variables = { userId };

      try {
        const response = await request("http://localhost:3000/graphql", query, variables);
        setTransactions(response.user.transactions);
      } catch (error) {
        console.error("Error fetching transactions:", error);
        toast.error("Failed to fetch transactions");
      }
    };

    fetchTransactions();
  }, [userId]);

  const addTransaction = async (event) => {
    event.preventDefault();
  
    const mutation = `
      mutation AddTransaction($input: TransactionInput!) {
        createTransaction(input: $input) {
          transaction {
            id
            name
            amount
            date
            description
            transactionType
            merchant
          }
        }
      }
    `;
  
    const variables = { input: newTransaction };
  
    try {
      const response = await request("http://localhost:3000/graphql", mutation, variables);
      setTransactions([...transactions, response.createTransaction.transaction]);
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
    if (!userId) {
      console.error("User ID is not set.");
      return;
    }
  
    const mutation = `
      mutation DeleteTransaction($input: DeleteTransactionInput!) {
        deleteTransaction(input: $input) {
          message
          errors
        }
      }
    `;
    
    const variables = { input: { id: transactionId, userId: userId } };
    
    try {
      await request("http://localhost:3000/graphql", mutation, variables);
      setTransactions(transactions.filter((transaction) => transaction.id !== transactionId));
      toast.success("Transaction deleted successfully!");
    } catch (error) {
      console.error("Failed to delete transaction:", error);
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
      <button
        onClick={() => exportTransactions(userId)}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        Export to Excel
      </button>
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
                  {transaction.transaction_type} | {transaction.merchant}
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
