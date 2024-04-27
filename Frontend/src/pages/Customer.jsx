import React, { useState } from "react";

const Customer = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [showEditModal, setShowEditModal] = useState(false);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleEditProfile = () => {
    setShowEditModal(true);
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
  };

  const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const randomImageNumber = getRandomNumber(1, 10);

  const imageUrl = `https://source.unsplash.com/random/200x200/?portrait,${randomImageNumber}`;

  // Fake data for debts
  const debts = [
    { creditor: "Credit Card Company", amount: 1500, dueDate: "2024-05-15" },
    { creditor: "Student Loan", amount: 25000, dueDate: "2024-06-30" },
  ];

  const accounts = [
    { type: "Savings", accountNumber: "1234567890", balance: 5000 },
    { type: "Checking", accountNumber: "0987654321", balance: 2500 },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-800">Customer</h1>
          <button
            onClick={handleEditProfile}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md"
          >
            Edit Profile
          </button>
        </div>

        <div className="mt-6 border-b border-gray-200">
          <nav className="-mb-px flex">
            <button
              onClick={() => handleTabChange("profile")}
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === "profile"
                  ? "text-blue-500 border-b-2 border-blue-500"
                  : "text-gray-500"
              }`}
            >
              Profile
            </button>
            <button
              onClick={() => handleTabChange("debts")}
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === "debts"
                  ? "text-blue-500 border-b-2 border-blue-500"
                  : "text-gray-500"
              }`}
            >
              Debts
            </button>
            <button
              onClick={() => handleTabChange("accounts")}
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === "accounts"
                  ? "text-blue-500 border-b-2 border-blue-500"
                  : "text-gray-500"
              }`}
            >
              Accounts
            </button>
          </nav>
        </div>

        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          {activeTab === "profile" && (
            <div>
              <div className="flex items-center">
                <img
                  src={imageUrl}
                  alt="Customer Avatar"
                  className="w-16 h-16 rounded-full mr-4"
                />
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    John Doe
                  </h2>
                  <p className="text-sm text-gray-600">
                    john.doe@example.com
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-800">
                  Contact Information
                </h3>
                <p className="text-sm text-gray-600">Phone: +123 456 789</p>
                <p className="text-sm text-gray-600">
                  Address: 123 Main Street, City, Country
                </p>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-800">
                  Financial Summary
                </h3>
              </div>
            </div>
          )}

          {activeTab === "debts" && (
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                Debts
              </h3>
              <ul className="mt-4">
                {debts.map((debt, index) => (
                  <li key={index} className="mb-2">
                    <span className="font-semibold">{debt.creditor}:</span>{" "}
                    ${debt.amount} (Due: {debt.dueDate})
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === "accounts" && (
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                Accounts
              </h3>
              <ul className="mt-4">
                {accounts.map((account, index) => (
                  <li key={index} className="mb-2">
                    <span className="font-semibold">Type:</span>{" "}
                    {account.type}, <span className="font-semibold">Account Number:</span>{" "}
                    {account.accountNumber}, <span className="font-semibold">Balance:</span>{" "}
                    ${account.balance}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {showEditModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-md">
            <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
            <button
              onClick={handleCloseModal}
              className="text-sm text-blue-500 hover:underline"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Customer;
