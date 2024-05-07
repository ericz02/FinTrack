import React, { useState } from "react";
import Debts from "./Debts"; // Ensure this is correctly imported
import { useAuth } from "../context/AuthContext"; // Adjust the path to your AuthContext
import BankAccounts from "./BankAccount";
import User from "./User";

const Customer = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const { user } = useAuth();
  const userId = user?.id;

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="border-b border-gray-300">
        <ul className="flex cursor-pointer">
          <li
            className={`mr-6 p-4 ${
              activeTab === "profile"
                ? "text-blue-500 border-b-2 border-blue-500"
                : "text-gray-500"
            }`}
            onClick={() => handleTabClick("profile")}
          >
            Customer Details
          </li>
          <li
            className={`mr-6 p-4 ${
              activeTab === "account"
                ? "text-blue-500 border-b-2 border-blue-500"
                : "text-gray-500"
            }`}
            onClick={() => handleTabClick("account")}
          >
            Bank Accounts
          </li>

          <li
            className={`mr-6 p-4 ${
              activeTab === "debts"
                ? "text-blue-500 border-b-2 border-blue-500"
                : "text-gray-500"
            }`}
            onClick={() => handleTabClick("debts")}
          >
            Debts
          </li>
        </ul>
      </div>

      {activeTab === "profile" && (
        <div className="mt-4">
          <h2 className="text-xl font-bold">Profile Information</h2>
          <User userId={userId} />{" "}
        </div>
      )}

      {activeTab === "debts" && (
        <div className="mt-4">
          <Debts userId={userId} />{" "}
          {/* This assumes Debts component handles edits */}
        </div>
      )}
      
      {activeTab === "account" && (
        <div className="mt-4">
          <BankAccounts userId={userId} />{" "}
        </div>
      )}
    </div>
  );
};

export default Customer;
