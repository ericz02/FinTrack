import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const Dashboard = () => {
    // State to hold the financial data
    const {user} = useAuth()
    const userId = user?.id
    const [financialData, setFinancialData] = useState({
        netWorth: 0,
        totalBalance: 0,
        totalExpenses: 0,
        financialSummary: ''
    });

    // State to hold loading and error states
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Function to fetch data from the API
    const fetchFinancialData = async () => {
        try {
            const response = await axios.get(`/users/:${userId}/dashboard`); // Replace :user_id with actual user ID
            setFinancialData({
                netWorth: response.data.net_worth,
                totalBalance: response.data.total_balance,
                totalExpenses: response.data.total_expenses,
                financialSummary: response.data.financial_summary
            });
            setIsLoading(false);
        } catch (err) {
            setError(err.message);
            setIsLoading(false);
        }
    };

    // Effect to fetch data on component mount
    useEffect(() => {
        fetchFinancialData();
    }, []);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <>
            <h1>Dashboard Page</h1>
            <div className="financial-metrics">
                <div className="metric">
                    <h2>Net Worth</h2>
                    <p>${financialData.netWorth}</p>
                </div>
                <div className="metric">
                    <h2>Total Balance</h2>
                    <p>${financialData.totalBalance}</p>
                </div>
                <div className="metric">
                    <h2>Total Expenses</h2>
                    <p>${financialData.totalExpenses}</p>
                </div>
                <div className="metric">
                    <h2>Financial Summary</h2>
                    <p>{financialData.financialSummary}</p>
                </div>
            </div>
        </>
    );
};

export default Dashboard;
