import React, { useState, useEffect } from "react";
import axios from "axios";
import Plot from "react-plotly.js";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../context/AuthContext"; // Ensure this path is correct

const Dashboard = () => {
  const { user } = useAuth();
  const userId = user?.id;

  const [data, setData] = useState({
    transactions: [],
    expenses: [],
    bankAccounts: [],
    debts: [],
    netWorth: 0,
  });

  useEffect(() => {
    if (!userId) return;

    const fetchData = async () => {
      try {
        const [expensesRes, debtsRes, accountsRes] = await Promise.all([
          axios.get(`http://localhost:3000/users/${userId}/expenses`),
          axios.get(`http://localhost:3000/users/${userId}/debts`),
          axios.get(`http://localhost:3000/users/${userId}/bank_accounts`),
        ]);
        const expenses = expensesRes.data;
        const debts = debtsRes.data;
        const accounts = accountsRes.data;

        const totalDebts = debts.reduce(
          (sum, debt) => sum + (parseFloat(debt.amount) || 0),
          0
        );
        const totalAccounts = accounts.reduce(
          (sum, account) => sum + (parseFloat(account.balance) || 0),
          0
        );

        // Calculate net worth
        const netWorth = totalAccounts - totalDebts;

        setData({
          expenses,
          debts,
          bankAccounts: accounts,
          netWorth,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to fetch data");
      }
    };

    fetchData();
  }, [userId]);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(value);
  };

  const renderExpensesPieChart = () => {
    const pieData = [
      {
        values: data.expenses.map((exp) => parseFloat(exp.amount) || 0),
        labels: data.expenses.map((exp) => exp.category),
        type: "pie",
        hoverinfo: "label+percent",
        textinfo: "value",
      },
    ];

    return (
      <Plot
        data={pieData}
        layout={{ title: "Expenses by Category", width: 400, height: 400 }}
      />
    );
  };

  const renderExpensesBarChart = () => {
    const grouped = data.expenses.reduce((acc, { date, amount }) => {
      const month = new Date(date).getMonth();
      acc[month] = (acc[month] || 0) + (parseFloat(amount) || 0);
      return acc;
    }, {});

    const months = Object.keys(grouped).map((month) =>
      new Date(0, month).toLocaleString("default", { month: "long" })
    );
    const amounts = Object.values(grouped);

    return (
      <Plot
        data={[
          {
            x: months,
            y: amounts,
            type: "bar",
          },
        ]}
        layout={{ title: "Monthly Expenses", width: 500, height: 400 }}
      />
    );
  };

  const renderDebtSummary = () => {
    const totalDebt = data.debts.reduce(
      (sum, debt) => sum + (parseFloat(debt.amount) || 0),
      0
    );

    return (
      <div className="text-center p-4 border rounded-lg shadow-lg m-4">
        <h2 className="font-bold text-xl">Total Debt</h2>
        <p className="text-lg">{formatCurrency(totalDebt)}</p>
      </div>
    );
  };

  return (
    <div className="container mx-auto p-4">
      <ToastContainer />
      <h1 className="text-2xl font-bold text-center mb-6">
        Financial Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-center">
        <div>{renderExpensesPieChart()}</div>
        <div>{renderExpensesBarChart()}</div>
        <div>{renderDebtSummary()}</div>
        <div className="text-center p-4 border rounded-lg shadow-lg m-4">
          <h2 className="font-bold text-xl">Net Worth</h2>
          <p className="text-lg">{formatCurrency(data.netWorth)}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
