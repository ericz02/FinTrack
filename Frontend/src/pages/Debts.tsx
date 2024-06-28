import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../context/AuthContext";
import { request } from "graphql-request";

interface Debt {
  id: string;
  category: string;
  creditor: string;
  date: string;
  amount: number;
  interestRate: number;
  purpose: string;
  userId: string;
  debtor: string;
}

const Debts: React.FC = () => {
  const [debts, setDebts] = useState<Debt[]>([]);
  const { user } = useAuth();
  const userId = user?.id;

  const [newDebt, setNewDebt] = useState<Debt>({
    id: "",
    category: "",
    creditor: "",
    date: "",
    amount: 0,
    interestRate: 0,
    purpose: "",
    userId: userId || "",
    debtor: "",
  });

  useEffect(() => {
    if (userId) {
      fetchDebts();
    }
  }, [userId]);

  const fetchDebts = async () => {
    const query = `
      query GetDebtsByUserId($userId: ID!) {
        user(id: $userId) {
          debts {
            id
            amount
            creditor
            debtor
            description
            dueDate
            status
            createdAt
            updatedAt
          }
        }
      }
    `;

    const variables = { userId };

    try {
      const response = await request(
        "https://fintrack-nygf.onrender.com/graphql",
        query,
        variables
      );
      setDebts(response.user.debts);
    } catch (error) {
      console.error("Error fetching debts:", error);
      toast.error("Failed to fetch debts");
    }
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!event.currentTarget) {
      return;
    }

    const formData = new FormData(event.currentTarget);
    const amount = parseFloat(formData.get("amount") as string);
    const creditor = formData.get("creditor") as string;
    const debtor = formData.get("debtor") as string;
    const description = formData.get("description") as string;
    const dueDate = formData.get("dueDate") as string;
    const status = formData.get("status") as string;

    if (!debtor) {
      toast.error("Debtor cannot be empty");
      return;
    }

    const mutation = `
      mutation CreateDebt($input: CreateDebtInput!) {
        createDebt(input: $input) {
          debt {
            id
            amount
            creditor
            debtor
            description
            dueDate
            status
            createdAt
            updatedAt
          }
        }
      }
    `;

    const variables = {
      input: {
        userId: 1, // Update with actual userId handling
        amount,
        creditor,
        debtor,
        description,
        dueDate,
        status,
      },
    };

    try {
      const response = await request(
        "https://fintrack-nygf.onrender.com/graphql",
        mutation,
        variables
      );
      setDebts([...debts, response.createDebt.debt]);
      // Reset the form fields
      toast.success("Debt added successfully!");
    } catch (error) {
      console.error("Failed to save debt:", error);
      toast.error("Failed to save debt");
    }
  };

  const handleDelete = async (debtId: string) => {
    const mutation = `
      mutation DeleteDebt($id: ID!) {
        destroyDebt(input: { id: $id }) {
          clientMutationId
        }
      }
    `;

    const variables = { id: debtId };

    try {
      await request(
        "https://fintrack-nygf.onrender.com/graphql",
        mutation,
        variables
      );
      setDebts(debts.filter((debt) => debt.id !== debtId));
      toast.success("Debt deleted successfully!");
    } catch (error) {
      console.error("Failed to delete debt:", error);
      toast.error("Failed to delete debt");
    }
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setNewDebt((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="container mx-auto p-4">
      <ToastContainer />
      <h2 className="text-center text-2xl font-bold mb-6">Manage Debts</h2>
      <div className="flex justify-center">
        <form
          onSubmit={handleFormSubmit}
          className="w-full max-w-lg"
        >
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="creditor"
              >
                Creditor
              </label>
              <input
                type="text"
                name="creditor"
                value={newDebt.creditor}
                onChange={handleChange}
                placeholder="Creditor"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                required
              />
            </div>
            <div className="w-full px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="debtor"
            >
              Debtor
            </label>
            <input
              type="text"
              name="debtor"
              value={newDebt.debtor}
              onChange={handleChange}
              placeholder="Debtor"
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              required
            />
          </div>
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="date"
              >
                Date
              </label>
              <input
                type="date"
                name="date"
                value={newDebt.date}
                onChange={handleChange}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                required
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="amount"
              >
                Amount ($)
              </label>
              <input
                type="text"
                name="amount"
                value={newDebt.amount}
                onChange={handleChange}
                placeholder="Amount"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                required
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="interestRate"
              >
                Interest Rate (%)
              </label>
              <input
                type="text"
                name="interestRate"
                value={newDebt.interestRate}
                onChange={handleChange}
                placeholder="Interest Rate"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                required
              />
            </div>
            <div className="w-full px-3 mt-6">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
              >
                Add Debt
              </button>
            </div>
          </div>
        </form>
      </div>

      <div className="mt-8">
        <div className="flex flex-wrap justify-center gap-4">
          {debts.map((debt) => (
            <div
              key={debt.id}
              className="bg-white rounded-lg shadow-lg p-6 max-w-sm"
            >
              <h3 className="text-lg text-gray-900 font-semibold">
                {debt.category}
              </h3>
              <p className="text-gray-600">
                <strong>Creditor:</strong> {debt.creditor}
              </p>
              <p className="text-gray-600">
                <strong>Debtor:</strong> {debt.debtor}
              </p>
              <p className="text-gray-600">
                <strong>Date:</strong> {new Date(debt.date).toLocaleDateString()}
              </p>
              <p className="text-gray-600">
                <strong>Amount:</strong> ${debt.amount.toFixed(2)}
              </p>
              <button
                onClick={() => handleDelete(debt.id)}
                className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
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

export default Debts;
