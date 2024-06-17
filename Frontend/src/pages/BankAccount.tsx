import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../context/AuthContext";
import { request } from "graphql-request";

interface BankAccount {
  id: string;
  account_type: string;
  account_number: string;
  balance: string;
  interest_rate?: string | Number | null;
  currency?: string;
  opening_date?: string;
  status?: string;
  branch_code?: string;
  overdraft_protection?: string;
}

interface BankAccountsProps {
  userId: string;
}

const BankAccounts: React.FC<BankAccountsProps> = ({ userId }) => {
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([]);
  const [newBankAccount, setNewBankAccount] = useState<BankAccount>({
    id: "",
    account_type: "",
    account_number: "",
    balance: "",
    interest_rate: 0.01,
    currency: "",
    opening_date: "",
    status: "",
    branch_code: "",
    overdraft_protection: "",
  });

  useEffect(() => {
    const fetchBankAccounts = async () => {
      if (!userId) return;

      const query = `
        query GetBankAccounts($userId: ID!) {
          user(id: $userId) {
            bankAccounts {
              id
              accountType
              accountNumber
              balance
              interestRate
              currency
              openingDate
              status
              branchCode
              overdraftProtection
            }
          }
        }
      `;

      const variables = { userId };

      try {
        const response = await request("http://localhost:3000/graphql", query, variables);
        setBankAccounts(response.user.bankAccounts);
      } catch (error) {
        console.error("Error fetching bank accounts:", error);
        toast.error("Failed to fetch bank accounts");
      }
    };

    fetchBankAccounts();
  }, [userId]);

  const addBankAccount = async (event: React.FormEvent) => {
    event.preventDefault();

    const balance = parseFloat(newBankAccount.balance);
    if (isNaN(balance)) {
      toast.error("Balance must be a valid number");
      return;
    }

    const mutation = `
      mutation createBankAccount($bankAccountInput: CreateBankAccountInput!) {
        createBankAccount(input: $bankAccountInput) {
          bankAccount {
            id
            accountType
            accountNumber
            balance
            interestRate
            currency
            openingDate
            status
            branchCode
            overdraftProtection
          }
          errors
        }
      }
    `;

    const variables = {
      bankAccountInput: {
        userId: userId,
        accountType: newBankAccount.account_type,
        accountNumber: newBankAccount.account_number,
        balance: balance,
      }
    };

    try {
      const response = await request("http://localhost:3000/graphql", mutation, variables);
      if (response.createBankAccount.errors.length === 0) {
        setBankAccounts([...bankAccounts, response.createBankAccount.bankAccount]);
        setNewBankAccount({
          id: "",
          account_type: "",
          account_number: "",
          balance: "",
          interest_rate: 0.01,
          currency: "",
          opening_date: "",
          status: "",
          branch_code: "",
          overdraft_protection: "",
        });
        toast.success("Bank account added successfully!");
      } else {
        toast.error("Failed to add bank account: " + response.createBankAccount.errors.join(", "));
      }
    } catch (error) {
      console.error("Failed to add bank account:", error);
      toast.error("Failed to add bank account");
    }
  };

  const deleteBankAccount = async (bankAccountId: string) => {
    const mutation = `
      mutation DeleteBankAccount($id: ID!) {
        deleteBankAccount(id: $id) {
          id
        }
      }
    `;

    const variables = { id: bankAccountId };

    try {
      await request("http://localhost:3000/graphql", mutation, variables);
      setBankAccounts(
        bankAccounts.filter(
          (account: BankAccount) => account.id !== bankAccountId
        )
      );
      toast.success("Bank account deleted successfully!");
    } catch (error) {
      console.error("Failed to delete bank account:", error);
      toast.error("Failed to delete bank account");
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewBankAccount((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="container mx-auto p-4">
      <ToastContainer />
      <h2 className="text-center text-2xl font-bold mb-6">
        Bank Account Management
      </h2>
      <div className="flex justify-center">
        <form onSubmit={addBankAccount} className="w-full max-w-lg">
          <div className="w-full px-3 mb-6">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="account_type"
            >
              Account Type
            </label>
            <input
              type="text"
              name="account_type"
              value={newBankAccount.account_type}
              onChange={handleChange}
              placeholder="Account Type"
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              required
            />
          </div>

          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="balance"
            >
              Balance
            </label>
            <input
              type="text"
              name="balance"
              value={newBankAccount.balance}
              onChange={handleChange}
              placeholder="Balance"
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              required
            />
          </div>
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700
              text-xs font-bold mb-2"
              htmlFor="balance"
            >
              Account number
            </label>
            <input
              type="text"
              name="account_number"
              value={newBankAccount.account_number}
              onChange={handleChange}
              placeholder="123456789"
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              required
            />
          </div>

          <div className="w-full px-3 mt-6">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
            >
              Add Bank Account
            </button>
          </div>
        </form>
      </div>

      <div className="mt-8">
        <div className="flex flex-wrap justify-center gap-4">
          {bankAccounts.map((account) => (
            <div
              key={account.id}
              className="bg-white rounded-lg shadow-lg p-6 max-w-sm"
            >
              <h3 className="text-lg text-gray-900 font-semibold">
                Account Number: {account.account_number}
              </h3>
              <p className="text-gray-600">
                <strong>Type:</strong> {account.account_type}
              </p>
              <p className="text-gray-600">
                <strong>Balance:</strong> {account.balance}
              </p>
              <button
                onClick={() => deleteBankAccount(account.id)}
                className="text-red-500 hover:text-red-700 font-bold py-1 px-3 rounded"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BankAccounts;
