import React, { useState, useEffect } from "react";
import axios from "axios";
import Plot from "react-plotly.js";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../context/AuthContext";

interface FinancialSummary {
  totalDebt: number;
  totalSavings: number;
  totalExpenses: number;
  totalTransaction: number;
  TotalBankBalance: number;
}

interface Expense {
  id: string;
  amount: string;
  category: string;
  date: string;
}

interface DashboardData extends FinancialSummary {
  transactions: any[];
  expenses: Expense[];
  bankAccounts: any[];
  debts: any[];
  netWorth: number;
}

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const userId = user?.id;

  const [data, setData] = useState<DashboardData>({
    transactions: [],
    expenses: [],
    bankAccounts: [],
    debts: [],
    netWorth: 0,
    totalDebt: 0,
    totalSavings: 0,
    totalExpenses: 0,
    totalTransaction: 0,
    TotalBankBalance: 0,
  });

  useEffect(() => {
    if (!userId) return;

    const fetchData = async () => {
      interface DashboardData extends FinancialSummary {
        transactions: any[];
        expenses: Expense[];
        bankAccounts: any[];
        debts: any[];
        netWorth: number;
        totalDebt: number;
        totalSavings: number;
        totalExpenses: number;
        totalTransaction: number;
        TotalBankBalance: number;
        financial_summary: FinancialSummary;
      }

      try {
        const response = await axios.get<DashboardData>(
          `http://localhost:3000/users/${userId}/dashboard`
        );
        setData((prevData) => ({
          ...prevData,
          ...response.data.financial_summary,
          netWorth: response.data.netWorth,
          totalDebt: response.data.totalDebt,
          totalSavings: response.data.totalSavings,
          totalExpenses: response.data.totalExpenses,
          totalTransaction: response.data.totalTransaction,
          TotalBankBalance: response.data.TotalBankBalance,
        }));
        console.debug(response.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        toast.error("Failed to fetch dashboard data");
      }
    };

    fetchData();
  }, [userId]);

  const formatCurrency = (value: number) => {
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
    const grouped = data.expenses.reduce<{ [key: string]: number }>(
      (acc, { date, amount }) => {
        const month = new Date(date).getMonth();
        acc[month] = (acc[month] || 0) + (parseFloat(amount) || 0);
        return acc;
      },
      {}
    );

    const months = Object.keys(grouped).map((month) =>
      new Date(0, parseInt(month)).toLocaleString("default", { month: "long" })
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

  return (
    <div className="container mx-auto p-4">
      <button
        // onClick={() => exportDashboard(userId)}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        Export to Excel
      </button>
      <ToastContainer />
      <h1 className="text-2xl font-bold text-center mb-6">
        Financial Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-center">
        <div>{renderExpensesPieChart()}</div>
        <div>{renderExpensesBarChart()}</div>
        <br></br>
        <div className="text-center p-4 border rounded-lg shadow-lg m-4">
          <h2 className="font-bold text-xl">Total Debt</h2>
          <p className="text-lg">{formatCurrency(data.totalDebt)}</p>
        </div>
        <div className="text-center p-4 border rounded-lg shadow-lg m-4">
          <h2 className="font-bold text-xl">Net Worth</h2>
          <p className="text-lg">{formatCurrency(data.netWorth)}</p>
        </div>
        <div className="text-center p-4 border rounded-lg shadow-lg m-4">
          <h2 className="font-bold text-xl">Total Expenses</h2>
          <p className="text-lg">{formatCurrency(data.totalExpenses)}</p>
        </div>
        <div className="text-center p-4 border rounded-lg shadow-lg m-4">
          <h2 className="font-bold text-xl">Total Transactions</h2>
          <p className="text-lg">{formatCurrency(data.totalTransaction)}</p>
        </div>
        <div className="text-center p-4 border rounded-lg shadow-lg m-4">
          <h2 className="font-bold text-xl">Saving Goals</h2>
          <p className="text-lg">{formatCurrency(data.totalSavings)}</p>
        </div>
        <div className="text-center p-4 border rounded-lg shadow-lg m-4">
          <h2 className="font-bold text-xl">Bank Account Balance</h2>
          <p className="text-lg">{formatCurrency(data.TotalBankBalance)}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
